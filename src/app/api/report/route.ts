import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { storyId, results } = body

    if (!storyId || !results) {
      return NextResponse.json(
        { error: 'Missing required fields: storyId and results' },
        { status: 400 }
      )
    }

    // Create reports directory if it doesn't exist
    const reportsDir = join(process.cwd(), 'content', 'reports')
    try {
      await mkdir(reportsDir, { recursive: true })
    } catch (error) {
      // Directory already exists
    }

    // Create report data with timestamp
    const reportData = {
      id: storyId,
      timestamp: new Date().toISOString(),
      results: {
        ...results,
        summary: {
          seoScore: calculateSEOScore(results.seo),
          accessibilityScore: calculateAccessibilityScore(results.accessibility),
          overallScore: calculateOverallScore(results)
        }
      }
    }

    // Save report to file
    const filePath = join(reportsDir, `${storyId}.json`)
    await writeFile(filePath, JSON.stringify(reportData, null, 2))

    return NextResponse.json({
      success: true,
      reportId: storyId,
      filePath: `/content/reports/${storyId}.json`
    })

  } catch (error) {
    console.error('Error saving report:', error)
    return NextResponse.json(
      { error: 'Failed to save report' },
      { status: 500 }
    )
  }
}

// Helper functions to calculate scores
function calculateSEOScore(seoResults: any): number {
  if (!seoResults) return 0
  
  const checks = Object.values(seoResults).flat()
  const passedChecks = checks.filter((check: any) => check.status === 'pass')
  
  return Math.round((passedChecks.length / checks.length) * 100)
}

function calculateAccessibilityScore(accessibilityResults: any): number {
  if (!accessibilityResults) return 0
  
  const checks = Object.values(accessibilityResults).flat()
  const passedChecks = checks.filter((check: any) => check.status === 'pass')
  
  return Math.round((passedChecks.length / checks.length) * 100)
}

function calculateOverallScore(results: any): number {
  const seoScore = calculateSEOScore(results.seo)
  const accessibilityScore = calculateAccessibilityScore(results.accessibility)
  
  return Math.round((seoScore + accessibilityScore) / 2)
}