import { createTheme } from '@mantine/core'

export const palettes = {
  heritage: {
    // Your current classic look
    background: '#FFFFFF',
    surface: '#F9F8F6',
    primary: '#111111',
    accent: '#B08D57', // Gold
    action: '#8B0000', // Crimson
  },
  midnight: {
    // Trust and Modern Research
    background: '#FFFFFF',
    surface: '#F1F3F5',
    primary: '#002147', // Oxford Blue
    accent: '#708090', // Slate
    action: '#00356B', // Yale Blue
  },
  emerald: {
    // Growth and Tradition
    background: '#FFFFFF',
    surface: '#F4F5F0',
    primary: '#004225', // Forest Green
    accent: '#8B7355', // Bronze
    action: '#00693E', // Dartmouth Green
  },
}

// TOGGLE THIS to change the entire site vibe:
//const active = palettes.heritage
const active = palettes.midnight

export const theme = createTheme({
  primaryColor: 'dark',
  colors: {
    academic: [
      active.surface, // 0
      active.surface, // 1
      active.surface, // 2
      '#E5E5E5', // 3
      '#D4D4D4', // 4
      active.accent, // 5
      active.accent, // 6
      active.primary, // 7
      active.primary, // 8
      active.primary, // 9
    ],
  },
  other: {
    ...active,
  },
  fontFamily: 'var(--font-sans)',
  headings: {
    fontFamily: 'var(--font-serif)',
    fontWeight: '400', // Editorial serifs often look better at lower weights
    sizes: {
      h1: { fontSize: '3.5rem', lineHeight: '1.1' },
      h2: { fontSize: '2.75rem', lineHeight: '1.2' },
      h3: { fontSize: '2rem', lineHeight: '1.3' },
    },
  },
  defaultRadius: 0,
  components: {
    Container: {
      defaultProps: {
        size: 1100,
      },
    },
    Button: {
      defaultProps: {
        radius: 0,
        variant: 'filled',
        color: 'dark.9',
      },
      styles: {
        root: {
          textTransform: 'uppercase',
          letterSpacing: '1px',
          fontWeight: 500,
          paddingLeft: '2rem',
          paddingRight: '2rem',
        },
      },
    },
    Text: {
      defaultProps: {
        c: 'dark.8',
      },
    },
  },
})
