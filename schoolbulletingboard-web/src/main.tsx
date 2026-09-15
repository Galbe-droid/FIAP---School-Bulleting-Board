import { StrictMode } from 'react'
import { ThemeProvider } from "@mui/material/styles";
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import theme from "./theme/theme.ts";
import {CssBaseline} from "@mui/material";
import {AuthProvider} from "./providers/AuthProvider.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthProvider>
                <App />
            </AuthProvider>
        </ThemeProvider>
    </StrictMode>
)
