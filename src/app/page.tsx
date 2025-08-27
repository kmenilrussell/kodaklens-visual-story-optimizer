'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Upload, Camera, FileText, BarChart3, Palette, Accessibility, AlertCircle } from 'lucide-react'
import { extractEXIFData, formatEXIFData, validateImageFile, type EXIFData } from '@/lib/utils'

export default function Home() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<'classic' | 'magazine' | 'showcase'>('classic')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [exifData, setExifData] = useState<EXIFData | null>(null)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file
    const validation = validateImageFile(file)
    if (!validation.valid) {
      setUploadError(validation.error || 'Invalid file')
      return
    }

    setUploadError(null)
    setIsProcessing(true)

    try {
      // Extract EXIF data
      const exif = await extractEXIFData(file)
      setExifData(exif)

      // Create image preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
        setIsProcessing(false)
      }
      reader.readAsDataURL(file)
    } catch (error) {
      console.error('Error processing image:', error)
      setUploadError('Error processing image')
      setIsProcessing(false)
    }
  }

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const file = event.dataTransfer.files?.[0]
    if (!file || !file.type.startsWith('image/')) return

    // Validate file
    const validation = validateImageFile(file)
    if (!validation.valid) {
      setUploadError(validation.error || 'Invalid file')
      return
    }

    setUploadError(null)
    setIsProcessing(true)

    try {
      // Extract EXIF data
      const exif = await extractEXIFData(file)
      setExifData(exif)

      // Create image preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
        setIsProcessing(false)
      }
      reader.readAsDataURL(file)
    } catch (error) {
      console.error('Error processing image:', error)
      setUploadError('Error processing image')
      setIsProcessing(false)
    }
  }

  const runAnalysis = () => {
    setIsAnalyzing(true)
    setTimeout(() => setIsAnalyzing(false), 2000)
  }

  const formattedExif = exifData ? formatEXIFData(exifData) : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Camera className="h-8 w-8 text-orange-600" />
              <h1 className="text-2xl font-bold text-gray-900">KodakLens</h1>
              <Badge variant="secondary" className="ml-2">Visual Story Optimizer</Badge>
            </div>
            <nav className="flex space-x-4">
              <Button variant="ghost">Home</Button>
              <Button variant="ghost">Stories</Button>
              <Button variant="ghost">Analytics</Button>
              <Button variant="ghost">Settings</Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Upload & Settings */}
          <div className="lg:col-span-1 space-y-6">
            {/* Upload Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Upload Photo
                </CardTitle>
                <CardDescription>
                  Upload a photo to create your visual story (JPG/PNG, max 8MB)
                </CardDescription>
              </CardHeader>
              <CardContent>
                {uploadError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <span className="text-sm text-red-800">{uploadError}</span>
                  </div>
                )}
                
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
                    isProcessing 
                      ? 'border-gray-300 bg-gray-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() => !isProcessing && document.getElementById('file-input')?.click()}
                >
                  <input
                    id="file-input"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                    disabled={isProcessing}
                  />
                  
                  {isProcessing ? (
                    <div className="space-y-4">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
                      <p className="text-gray-600">Processing image...</p>
                    </div>
                  ) : (
                    <>
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">Drag & drop your photo here</p>
                      <p className="text-sm text-gray-500">or click to browse</p>
                    </>
                  )}
                </div>

                {/* EXIF Data */}
                {formattedExif && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-sm mb-2">Camera Details</h4>
                    <div className="space-y-1 text-xs text-gray-600">
                      <div><span className="font-medium">Camera:</span> {formattedExif.camera}</div>
                      <div><span className="font-medium">Lens:</span> {formattedExif.lens}</div>
                      <div><span className="font-medium">Settings:</span> {formattedExif.settings}</div>
                      {formattedExif.date && (
                        <div><span className="font-medium">Date:</span> {formattedExif.date}</div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Template Selector */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Template Style
                </CardTitle>
                <CardDescription>
                  Choose a template for your visual story
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { id: 'classic', name: 'Classic', desc: 'Clean and timeless' },
                  { id: 'magazine', name: 'Magazine', desc: 'Editorial layout' },
                  { id: 'showcase', name: 'Showcase', desc: 'Bold and modern' }
                ].map((template) => (
                  <div
                    key={template.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedTemplate === template.id
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedTemplate(template.id as any)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{template.name}</h3>
                        <p className="text-sm text-gray-600">{template.desc}</p>
                      </div>
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        selectedTemplate === template.id ? 'border-orange-500 bg-orange-500' : 'border-gray-300'
                      }`} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Analysis Controls */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Analysis Tools
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  onClick={runAnalysis} 
                  disabled={!uploadedImage || isAnalyzing}
                  className="w-full"
                >
                  {isAnalyzing ? 'Analyzing...' : 'Run SEO & Accessibility Check'}
                </Button>
                <Button variant="outline" className="w-full" disabled={!uploadedImage}>
                  Generate Story
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Preview & Analysis */}
          <div className="lg:col-span-2 space-y-6">
            {/* Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Story Preview</CardTitle>
                <CardDescription>
                  Preview your visual story with the selected template
                </CardDescription>
              </CardHeader>
              <CardContent>
                {uploadedImage ? (
                  <div className="space-y-4">
                    <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={uploadedImage}
                        alt="Uploaded preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h2 className="text-xl font-semibold mb-2">Your Story Title</h2>
                      <p className="text-gray-600">This is where your story description will appear. The content will be optimized for SEO and accessibility.</p>
                      {formattedExif && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <p className="text-sm text-gray-500">
                            Shot with {formattedExif.camera} • {formattedExif.settings}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">Upload an image to see preview</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Analysis Results */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Accessibility className="h-5 w-5" />
                  Analysis Results
                </CardTitle>
                <CardDescription>
                  SEO and accessibility analysis for your story
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="seo" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="seo">SEO Analysis</TabsTrigger>
                    <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="seo" className="space-y-4">
                    {isAnalyzing ? (
                      <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto mb-4"></div>
                        <p>Analyzing SEO factors...</p>
                      </div>
                    ) : uploadedImage ? (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                          <span className="text-green-800">Image Alt Text</span>
                          <Badge variant="outline" className="text-green-600 border-green-600">✓ Good</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <span className="text-yellow-800">Meta Description</span>
                          <Badge variant="outline" className="text-yellow-600 border-yellow-600">⚠ Needs Work</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                          <span className="text-green-800">Title Length</span>
                          <Badge variant="outline" className="text-green-600 border-green-600">✓ Good</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                          <span className="text-green-800">Image Filename</span>
                          <Badge variant="outline" className="text-green-600 border-green-600">✓ Optimized</Badge>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Upload an image and run analysis to see results</p>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="accessibility" className="space-y-4">
                    {isAnalyzing ? (
                      <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto mb-4"></div>
                        <p>Checking accessibility...</p>
                      </div>
                    ) : uploadedImage ? (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                          <span className="text-green-800">Color Contrast</span>
                          <Badge variant="outline" className="text-green-600 border-green-600">✓ 4.5:1</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                          <span className="text-green-800">Keyboard Navigation</span>
                          <Badge variant="outline" className="text-green-600 border-green-600">✓ Good</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <span className="text-yellow-800">ARIA Labels</span>
                          <Badge variant="outline" className="text-yellow-600 border-yellow-600">⚠ Missing</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                          <span className="text-green-800">Image Alt Text</span>
                          <Badge variant="outline" className="text-green-600 border-green-600">✓ Present</Badge>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <Accessibility className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Upload an image and run analysis to see results</p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}