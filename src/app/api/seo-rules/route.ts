import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const seoRules = {
      title: {
        min: 50,
        max: 60,
        message: "Title should be between 50-60 characters for optimal SEO"
      },
      description: {
        min: 140,
        max: 160,
        message: "Meta description should be between 140-160 characters"
      },
      keywords: {
        min: 3,
        max: 10,
        message: "Use 3-10 relevant keywords for better SEO"
      },
      checks: [
        {
          id: "canonical",
          name: "Canonical URL",
          description: "Page should have a canonical URL to prevent duplicate content",
          critical: true
        },
        {
          id: "ogTags",
          name: "OpenGraph Tags",
          description: "Social media sharing tags should be present",
          critical: false
        },
        {
          id: "h1Unique",
          name: "H1 Uniqueness",
          description: "Page should have exactly one H1 tag",
          critical: true
        },
        {
          id: "altNonEmpty",
          name: "Image Alt Text",
          description: "All images should have descriptive alt text",
          critical: true
        },
        {
          id: "viewport",
          name: "Mobile Viewport",
          description: "Page should have mobile viewport meta tag",
          critical: true
        },
        {
          id: "sitemap",
          name: "Sitemap",
          description: "Website should have a sitemap.xml file",
          critical: false
        },
        {
          id: "robots",
          name: "Robots.txt",
          description: "Website should have a robots.txt file",
          critical: false
        },
        {
          id: "headingStructure",
          name: "Heading Structure",
          description: "Proper heading hierarchy (H1 → H2 → H3)",
          critical: true
        },
        {
          id: "metaDescription",
          name: "Meta Description",
          description: "Unique meta description for each page",
          critical: true
        }
      ],
      performance: {
        lcp: {
          threshold: 2500,
          unit: "ms",
          message: "Largest Contentful Paint should be under 2.5 seconds"
        },
        cls: {
          threshold: 0.1,
          unit: "score",
          message: "Cumulative Layout Shift should be under 0.1"
        },
        tbt: {
          threshold: 200,
          unit: "ms",
          message: "Total Blocking Time should be under 200ms"
        }
      }
    }

    return NextResponse.json(seoRules)
  } catch (error) {
    console.error('Error fetching SEO rules:', error)
    return NextResponse.json(
      { error: 'Failed to fetch SEO rules' },
      { status: 500 }
    )
  }
}