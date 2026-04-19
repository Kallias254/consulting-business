import { createTheme } from '@mantine/core'

export const theme = createTheme({
  primaryColor: 'dark',
  colors: {
    // Adding a more neutral palette for academic feel
    'academic-neutral': [
      '#FDFDFD',
      '#F7F7F7',
      '#F0F0F0',
      '#E5E5E5',
      '#D4D4D4',
      '#A3A3A3',
      '#737373',
      '#525252',
      '#404040',
      '#262626',
    ],
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
