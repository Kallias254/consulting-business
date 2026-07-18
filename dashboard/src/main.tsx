import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { MantineProvider, createTheme } from '@mantine/core'
import '@mantine/core/styles.css'
import './index.css'
import App from './App'

const theme = createTheme({
  fontFamily: 'Inter, system-ui, sans-serif',
  headings: { fontFamily: 'Outfit, sans-serif' },
  primaryColor: 'yellow',
  colors: {
    // Burnished gold mapped to Mantine yellow scale
    yellow: [
      '#FDF8EC', '#FAF0D0', '#F5E1A0', '#EDCB6A', '#E0B44A',
      '#C99A38', '#B8873A', '#9A6E2A', '#7C581E', '#5E4216',
    ],
  },
  defaultRadius: 0,
  components: {
    Button: { defaultProps: { radius: 0 } },
    Paper: { defaultProps: { radius: 0 } },
    Input: { defaultProps: { radius: 0 } },
    TextInput: { defaultProps: { radius: 0 } },
    PasswordInput: { defaultProps: { radius: 0 } },
    Badge: { defaultProps: { radius: 2 } },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <MantineProvider theme={theme}>
        <App />
      </MantineProvider>
    </BrowserRouter>
  </StrictMode>,
)
