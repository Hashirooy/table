
import { createRoot } from 'react-dom/client'
import './app/styles/index.module.scss'
import App from './app/App'
import { BrowserRouter } from 'react-router-dom'
import { StoreProvider } from './app/providers/StoreProviders/ui/StoreProvier'


createRoot(document.getElementById('root')!).render(
<BrowserRouter>
    <StoreProvider>
        <App />
    </StoreProvider>
</BrowserRouter>

)
