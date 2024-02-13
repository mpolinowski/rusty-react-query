import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import App from '@/views/App.tsx'
import { ThemeProvider } from "@/components/ThemeProvider"
import '@/styles/index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 15
    },
    mutations: {},
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={ queryClient }>
        <App />
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>,
)