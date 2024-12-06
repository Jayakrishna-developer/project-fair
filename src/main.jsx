import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import './bootstrap.min.css'
import ContextShare from './Components/ContextAPI/ContextShare.jsx'
import TokenAuth from './Components/ContextAPI/TokenAuth.jsx'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <TokenAuth>
        <ContextShare>
          <App />
        </ContextShare>
      </TokenAuth>
    </BrowserRouter>
  </StrictMode>
);