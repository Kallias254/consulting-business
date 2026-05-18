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
  terracotta: {
    // Vibrant Earth & Warm Clay (Warm, welcoming, lively academic)
    background: '#FFFFFF',
    surface: '#FFFBF9', // Soft warm sand/clay tone
    primary: '#2E1912', // Deep rich espresso for text contrast
    accent: '#E65C38', // Beautiful, energetic terracotta orange
    action: '#BD3B19', // Deep clay orange
  },
  solar: {
    // Golden Scholar & Honey (Very inviting, prestigious, sunny)
    background: '#FFFFFF',
    surface: '#FCF9F3', // Soft parchment warm honey tint
    primary: '#2B261D', // Deep bronze text
    accent: '#E09C00', // Inviting, rich scholarly honey gold
    action: '#A37200', // Darker gold
  },
  cerulean: {
    // Vibrant Modern Research (Fresh, crisp, highly engaging)
    background: '#FFFFFF',
    surface: '#F1F7F9', // Clean ice blue surface
    primary: '#0B1C2C', // Deep sea dark navy text
    accent: '#0084C7', // Lively electric cerulean blue
    action: '#006294', // Deeper blue
  },
}

// TOGGLE THIS to change the entire site vibe (options: terracotta, solar, cerulean, heritage, midnight, emerald, crimson, royal, slate):
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
        },
      },
    },
    Text: {
      defaultProps: {
        c: 'dark.8',
      },
    },
    TextInput: {
      defaultProps: {
        radius: 0,
        size: 'md',
      },
      styles: {
        input: {},
      },
    },
    Textarea: {
      defaultProps: {
        radius: 0,
        size: 'md',
      },
      styles: {
        input: {},
      },
    },
    Accordion: {
      defaultProps: {
        variant: 'separated',
        radius: 0,
      },
      styles: {
        item: {
          backgroundColor: active.surface,
          borderColor: 'oklch(0% 0 0 / 0.06)',
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        },
        control: {
          color: active.primary,
        },
        label: {
          color: active.primary,
          fontWeight: 500,
        },
        chevron: {
          color: active.primary,
        },
      },
    },
    Badge: {
      defaultProps: {
        radius: 0,
        variant: 'light',
      },
      styles: {
        root: {
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        },
      },
    },
  },
})
