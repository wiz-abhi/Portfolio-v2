import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.js'
import { NAME } from './constants'
import "./index.css";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// ensure browser tab title matches NAME (keeps index.html fallback in sync)
document.title = `${NAME} — Portfolio`