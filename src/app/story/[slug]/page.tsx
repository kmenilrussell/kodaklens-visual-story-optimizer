import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Camera, Share2, Heart, Download } from 'lucide-react'
import Image from 'next/image'

// Mock data - in real implementation, this would come from CMS or database
const mockStories: Record<string, any> = {
  'sample-story': {
    id: 'sample-story',
    slug: 'sample-story',
    title: 'Golden Hour Photography',
    description: 'A stunning capture of the golden hour magic in the countryside',
    heroImageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
    alt: 'Golden hour landscape with rolling hills and warm sunlight',
    caption: 'Captured during the perfect golden hour, this photograph showcases the breathtaking beauty of rural landscapes bathed in warm, golden light.',
    exif: {
      takenAt: '2024-01-15T18:30:00Z',
      camera: 'Canon EOS R5',
      lens: '24-70mm f/2.8',
      settings: 'f/8, 1/250s, ISO 100'
    },
    template: 'classic',
    publishedAt: '2024-01-15T19:00:00Z',
    tags: ['landscape', 'golden-hour', 'nature', 'photography'],
    author: {
      name: 'Jane Photographer',
      avatar: '/api/placeholder/40/40'
    }
  }
}

interface StoryPageProps {
  params: {
    slug: string
  }
}

export default function StoryPage({ params }: StoryPageProps) {
  const story = mockStories[params.slug]

  if (!story) {
    notFound()
  }

  const renderTemplate = () => {
    switch (story.template) {
      case 'magazine':
        return (
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              <div className="lg:col-span-2">
                <div className="aspect-[4/3] relative overflow-hidden rounded-lg">
                  <Image
                    src={story.heroImageUrl}
                    alt={story.alt}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <Badge variant="secondary" className="mb-2">Featured Story</Badge>
                  <h1 className="text-3xl font-bold mb-4">{story.title}</h1>
                  <p className="text-gray-600 leading-relaxed">{story.caption}</p>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>By {story.author.name}</span>
                  <span>•</span>
                  <span>{new Date(story.publishedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            <div className="prose prose-lg max-w-none">
              <p className="text-xl leading-relaxed text-gray-700 mb-8">
                This photograph represents the perfect intersection of technical skill and artistic vision. 
                The golden hour lighting creates a natural warmth that brings out the rich textures and colors of the landscape.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold mb-2">Technical Details</h3>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>Camera: {story.exif.camera}</li>
                    <li>Lens: {story.exif.lens}</li>
                    <li>Settings: {story.exif.settings}</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold mb-2">Location & Time</h3>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>Date: {new Date(story.exif.takenAt).toLocaleDateString()}</li>
                    <li>Time: {new Date(story.exif.takenAt).toLocaleTimeString()}</li>
                    <li>Golden Hour</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )

      case 'showcase':
        return (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">Showcase</Badge>
              <h1 className="text-5xl font-bold mb-4">{story.title}</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{story.caption}</p>
            </div>
            <div className="aspect-[16/9] relative overflow-hidden rounded-2xl mb-12 shadow-2xl">
              <Image
                src={story.heroImageUrl}
                alt={story.alt}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Camera className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="font-semibold mb-2">Professional Gear</h3>
                <p className="text-gray-600 text-sm">Shot with professional equipment for maximum quality</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="font-semibold mb-2">Perfect Timing</h3>
                <p className="text-gray-600 text-sm">Captured during the golden hour for optimal lighting</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="font-semibold mb-2">High Resolution</h3>
                <p className="text-gray-600 text-sm">Available in high resolution for print and digital use</p>
              </div>
            </div>
          </div>
        )

      default: // classic
        return (
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <Badge variant="secondary" className="mb-4">Classic</Badge>
              <h1 className="text-4xl font-bold mb-4">{story.title}</h1>
              <p className="text-lg text-gray-600 mb-6">{story.caption}</p>
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <span>By {story.author.name}</span>
                <span>•</span>
                <span>{new Date(story.publishedAt).toLocaleDateString()}</span>
                <span>•</span>
                <span>{story.exif.camera}</span>
              </div>
            </div>
            <div className="aspect-[3/2] relative overflow-hidden rounded-lg mb-8">
              <Image
                src={story.heroImageUrl}
                alt={story.alt}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                This photograph captures a moment of natural beauty that exemplifies the art of landscape photography. 
                The interplay of light and shadow creates depth and dimension, while the golden hour lighting adds warmth and atmosphere.
              </p>
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h3 className="font-semibold mb-3">Photography Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Camera:</span> {story.exif.camera}
                  </div>
                  <div>
                    <span className="font-medium">Lens:</span> {story.exif.lens}
                  </div>
                  <div>
                    <span className="font-medium">Settings:</span> {story.exif.settings}
                  </div>
                  <div>
                    <span className="font-medium">Date:</span> {new Date(story.exif.takenAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Camera className="h-8 w-8 text-orange-600" />
              <h1 className="text-2xl font-bold text-gray-900">KodakLens</h1>
            </div>
            <nav className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">Home</Button>
              <Button variant="ghost" size="sm">Stories</Button>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <Heart className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {renderTemplate()}
        
        {/* Tags */}
        <div className="max-w-4xl mx-auto mt-12 pt-8 border-t">
          <div className="flex flex-wrap gap-2">
            {story.tags.map((tag: string) => (
              <Badge key={tag} variant="outline" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">Created with KodakLens - Visual Story Optimizer</p>
            <p className="text-sm">© 2024 KodakLens. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Generate metadata for SEO
export async function generateMetadata({ params }: StoryPageProps) {
  const story = mockStories[params.slug]
  
  if (!story) {
    return {
      title: 'Story Not Found',
      description: 'The requested story could not be found.'
    }
  }

  return {
    title: `${story.title} - KodakLens`,
    description: story.description,
    openGraph: {
      title: story.title,
      description: story.description,
      images: [story.heroImageUrl],
      type: 'article',
      publishedTime: story.publishedAt,
      authors: [story.author.name],
      tags: story.tags
    },
    twitter: {
      card: 'summary_large_image',
      title: story.title,
      description: story.description,
      images: [story.heroImageUrl]
    }
  }
}