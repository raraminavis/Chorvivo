/** Local product artwork. No network lookup or runtime icon service. */
export type BrandAsset = {
  name: string
  category: 'Payments' | 'Banks' | 'Apps' | 'Crypto'
  light: string
  dark: string
  tileArtwork?: string
  tileBackground?: string
  proportion: number
  scale: number
}

// DoDance build: no third-party marks are bundled.
export const brandMarks = {} as Record<string, BrandAsset>
export type BrandName = string
