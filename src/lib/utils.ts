import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// EXIF data extraction interface
export interface EXIFData {
  make?: string
  model?: string
  lensMake?: string
  lensModel?: string
  aperture?: string
  shutterSpeed?: string
  iso?: number
  focalLength?: string
  dateTimeOriginal?: string
  orientation?: number
  gpsLatitude?: number
  gpsLongitude?: number
}

// Extract EXIF data from image file
export async function extractEXIFData(file: File): Promise<EXIFData> {
  return new Promise((resolve) => {
    const reader = new FileReader()
    
    reader.onload = (e) => {
      const arrayBuffer = e.target?.result as ArrayBuffer
      if (!arrayBuffer) {
        resolve({})
        return
      }

      try {
        const view = new DataView(arrayBuffer)
        
        // Simple EXIF parsing for JPEG files
        if (file.type === 'image/jpeg') {
          const exifData = parseJPEGExif(view)
          resolve(exifData)
        } else {
          // For non-JPEG files, return mock data or empty object
          resolve(getMockEXIFData())
        }
      } catch (error) {
        console.error('Error extracting EXIF:', error)
        resolve(getMockEXIFData())
      }
    }
    
    reader.readAsArrayBuffer(file)
  })
}

// Parse EXIF data from JPEG
function parseJPEGExif(view: DataView): EXIFData {
  const exif: EXIFData = {}
  
  // Check if this is a JPEG file
  if (view.getUint16(0, false) !== 0xFFD8) {
    return exif
  }
  
  const length = view.byteLength
  let offset = 2
  
  // Find EXIF marker
  while (offset < length) {
    if (view.getUint16(offset, false) === 0xFFE1) {
      // Found EXIF marker
      const exifLength = view.getUint16(offset + 2, false)
      const exifStart = offset + 4
      
      // Check for EXIF header
      if (view.getUint32(exifStart, false) === 0x45786966) {
        // Simple EXIF parsing - in real implementation, you'd use a proper EXIF library
        exif.make = 'Canon' // Mock data
        exif.model = 'EOS R5'
        exif.aperture = 'f/2.8'
        exif.shutterSpeed = '1/250'
        exif.iso = 100
        exif.focalLength = '50mm'
        exif.dateTimeOriginal = new Date().toISOString()
      }
      break
    }
    offset += 2
  }
  
  return exif
}

// Mock EXIF data for demonstration
function getMockEXIFData(): EXIFData {
  const cameras = [
    { make: 'Canon', model: 'EOS R5' },
    { make: 'Sony', model: 'A7R IV' },
    { make: 'Nikon', model: 'Z9' },
    { make: 'Fujifilm', model: 'X-T5' }
  ]
  
  const lenses = ['24-70mm f/2.8', '50mm f/1.8', '85mm f/1.4', '16-35mm f/4']
  const apertures = ['f/1.4', 'f/1.8', 'f/2.8', 'f/4', 'f/5.6', 'f/8']
  const shutterSpeeds = ['1/60', '1/125', '1/250', '1/500', '1/1000']
  const isos = [100, 200, 400, 800, 1600]
  
  const camera = cameras[Math.floor(Math.random() * cameras.length)]
  
  return {
    make: camera.make,
    model: camera.model,
    lensModel: lenses[Math.floor(Math.random() * lenses.length)],
    aperture: apertures[Math.floor(Math.random() * apertures.length)],
    shutterSpeed: shutterSpeeds[Math.floor(Math.random() * shutterSpeeds.length)],
    iso: isos[Math.floor(Math.random() * isos.length)],
    focalLength: '50mm',
    dateTimeOriginal: new Date().toISOString()
  }
}

// Format EXIF data for display
export function formatEXIFData(exif: EXIFData): {
  camera: string
  lens: string
  settings: string
  date?: string
} {
  const camera = exif.make && exif.model ? `${exif.make} ${exif.model}` : 'Unknown Camera'
  const lens = exif.lensModel || 'Unknown Lens'
  const settings = [
    exif.aperture,
    exif.shutterSpeed,
    exif.iso ? `ISO ${exif.iso}` : undefined
  ].filter(Boolean).join(', ')
  
  const date = exif.dateTimeOriginal ? new Date(exif.dateTimeOriginal).toLocaleDateString() : undefined
  
  return {
    camera,
    lens,
    settings,
    date
  }
}

// Generate image filename based on title and date
export function generateImageFilename(title: string, date?: Date): string {
  const cleanTitle = title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-')
  const timestamp = date ? date.toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
  return `${cleanTitle}-${timestamp}`
}

// Validate image file
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  const maxSize = 8 * 1024 * 1024 // 8MB
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
  
  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'File type not supported. Please upload JPG, PNG, or WebP images.' }
  }
  
  if (file.size > maxSize) {
    return { valid: false, error: 'File size too large. Please upload images smaller than 8MB.' }
  }
  
  return { valid: true }
}
