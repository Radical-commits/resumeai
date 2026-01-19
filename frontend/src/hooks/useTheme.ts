import { useEffect } from 'react'
import { getSiteConfig } from '../config/loader'

interface ThemeColors {
  primary: string
  primaryHover: string
  accent: string
  background: string
  backgroundSecondary: string
  text: string
  textSecondary: string
  border: string
  success: string
  warning: string
  error: string
}

interface Theme {
  name: string
  description: string
  colors: ThemeColors
  fonts: {
    heading: string
    body: string
    mono: string
  }
  spacing: {
    containerMaxWidth: string
    sectionPadding: string
    cardPadding: string
  }
  borderRadius: {
    small: string
    medium: string
    large: string
  }
  animations: {
    transitionSpeed: string
    hoverScale: string
  }
}

/**
 * Hook to load and apply theme from configuration
 */
export const useTheme = () => {
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const config = getSiteConfig()
        const themeName = config.theme || 'professional'

        // Dynamically import theme file
        const theme = await import(`../../../themes/${themeName}.json`) as { default: Theme }
        const themeData = theme.default

        // Apply theme colors as CSS variables
        const root = document.documentElement
        root.style.setProperty('--color-primary', themeData.colors.primary)
        root.style.setProperty('--color-primary-dark', themeData.colors.primaryHover)
        root.style.setProperty('--color-primary-light', themeData.colors.accent)
        root.style.setProperty('--color-bg-primary', themeData.colors.background)
        root.style.setProperty('--color-bg-secondary', themeData.colors.backgroundSecondary)
        root.style.setProperty('--color-text-primary', themeData.colors.text)
        root.style.setProperty('--color-text-secondary', themeData.colors.textSecondary)
        root.style.setProperty('--color-text-tertiary', themeData.colors.textSecondary)
        root.style.setProperty('--color-border', themeData.colors.border)
        root.style.setProperty('--color-success', themeData.colors.success)
        root.style.setProperty('--color-warning', themeData.colors.warning)
        root.style.setProperty('--color-error', themeData.colors.error)

        // Apply fonts
        root.style.setProperty('--font-serif', themeData.fonts.heading)
        root.style.setProperty('--font-sans', themeData.fonts.body)
        root.style.setProperty('--font-mono', themeData.fonts.mono)

        // Apply border radius
        root.style.setProperty('--radius-base', themeData.borderRadius.small)
        root.style.setProperty('--radius-md', themeData.borderRadius.medium)
        root.style.setProperty('--radius-lg', themeData.borderRadius.large)

        console.log(`✓ Loaded theme: ${themeData.name}`)
      } catch (error) {
        console.warn('Failed to load theme, using defaults:', error)
      }
    }

    loadTheme()
  }, [])
}
