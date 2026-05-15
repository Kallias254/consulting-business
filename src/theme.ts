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
  crimson: {
    // Bold & Established
    background: '#FFFFFF',
    surface: '#FAFAFA',
    primary: '#A51C30', // Harvard Crimson
    accent: '#F2A900', // Gold
    action: '#000000',
  },
  royal: {
    // Prestigious & Calm
    background: '#FFFFFF',
    surface: '#F0F3F8',
    primary: '#011F5B', // Penn State Blue
    accent: '#B3A369', // Gold
    action: '#000000',
  },
  slate: {
    // Modern & Clean
    background: '#FFFFFF',
    surface: '#F8F9FA',
    primary: '#343A40', // Slate Gray
    accent: '#008080', // Teal
    action: '#005F5F',
  },
}

// TOGGLE THIS to change the entire site vibe:
const active = palettes.royal

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
    fontWeight: '400',
    sizes: {
      h1: { fontSize: '3.5rem', lineHeight: '1.1' },
      h2: { fontSize: '2.75rem', lineHeight: '1.2' },
      h3: { fontSize: '2rem', lineHeight: '1.3' },
      h4: { fontSize: '1.5rem', lineHeight: '1.4' },
      h5: { fontSize: '1.25rem', lineHeight: '1.4' },
      h6: { fontSize: '1rem', lineHeight: '1.5' },
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
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 24px oklch(0% 0 0 / 0.1)',
          },
        },
      },
    },
    Card: {
      defaultProps: {
        radius: 0,
        withBorder: true,
      },
      styles: {
        root: {
          transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.5s ease',
          borderColor: 'oklch(0% 0 0 / 0.06)',
          boxShadow: '0 4px 24px oklch(0% 0 0 / 0.02)',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 16px 40px oklch(0% 0 0 / 0.06)',
            borderColor: 'oklch(0% 0 0 / 0.1)',
          },
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
