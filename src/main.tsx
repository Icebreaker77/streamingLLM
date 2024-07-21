import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {MantineProvider} from "@mantine/core";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient();


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <MantineProvider theme={{fontFamily: 'Roboto, sans-serif'}}>
            <QueryClientProvider client={queryClient}>
                <App/>
            </QueryClientProvider>
        </MantineProvider>
    </React.StrictMode>,
)
