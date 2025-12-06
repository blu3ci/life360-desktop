import React from 'react'
import { Button } from '@/components/ui/button'
import "./App.css";
import Home from './pages/Home';
import { ThemeProvider } from './components/theme-provider';

const App = () => {
  return (
    <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
      <Home />
    </ThemeProvider>
  )
}

export default App