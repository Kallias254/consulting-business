import { createTheme } from '@mantine/core';

export const theme = createTheme({
  primaryColor: 'deep-green',
  colors: {
    'deep-green': [
      '#F0F4F2', // 0: Ultra Light
      '#D1DFD9', // 1
      '#B2CABF', // 2
      '#93B5A6', // 3
      '#74A08C', // 4
      '#558B73', // 5
      '#367659', // 6
      '#176140', // 7: Main Institutional Green
      '#0E4D32', // 8
      '#0A140F', // 9: Dark Forest
    ],
    'burnished-gold': [
      '#FBF7F2',
      '#F2E5D5',
      '#E9D3B8',
      '#E0C19B',
      '#D7AF7E',
      '#CE9D61',
      '#C58B44',
      '#B08D57', // 7: Main Accent
      '#96784A',
      '#7C633D',
    ],
    'parchment': [
      '#F9F8F6', // 0: High-quality paper
      '#F4F1EA', // 1: Classic
      '#EAE6DB', // 2
      '#E0DBCC', // 3
      '#D6D0BD', // 4
      '#C2BA9F', // 5
      '#B8AF90', // 6
      '#AEA481', // 7
      '#A49A72', // 8
      '#9A9069', // 9
    ],
    'dark-forest': [
      '#0A140F',
      '#0A140F',
      '#0A140F',
      '#0A140F',
      '#0A140F',
      '#0A140F',
      '#0A140F',
      '#0A140F',
      '#0A140F',
      '#0A140F',
    ],
  },
  fontFamily: 'var(--font-body)',
  headings: {
    fontFamily: 'var(--font-display)',
    fontWeight: '700',
  },
  defaultRadius: 0,
  components: {
    Button: {
      defaultProps: {
        radius: 0,
        variant: 'filled',
      },
      styles: {
        root: {
          textTransform: 'uppercase',
          letterSpacing: '1px',
          fontWeight: 600,
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
          backgroundColor: '#FFFFFF',
          border: '1px solid #E0DBCC',
        },
      },
    },
    Paper: {
      defaultProps: {
        radius: 0,
        withBorder: true,
      },
      styles: {
        root: {
          backgroundColor: '#FFFFFF',
          border: '1px solid #E0DBCC',
        },
      },
    },
    Badge: {
      defaultProps: {
        radius: 0,
        variant: 'outline',
      },
      styles: {
        root: {
          textTransform: 'uppercase',
          letterSpacing: '1.5px',
          fontFamily: 'var(--font-body)',
        },
      },
    },
    AppShell: {
      styles: {
        main: {
          backgroundColor: '#F9F8F6',
        },
      },
    },
  },
});
