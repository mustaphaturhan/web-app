import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // postCSS import of CSS module
import { RouterProvider } from '@tanstack/react-router';
import * as TanStackQueryProvider from './lib/tanstack-query/root-provider';
import { router } from './routes';
import { CLIENT_ID_PLACEHOLDER } from './utils/valhalla';

const TanStackQueryProviderContext = TanStackQueryProvider.getContext();

const rootElement = document.getElementById('valhalla-app-root');

const clientId = import.meta.env.VITE_CLIENT_ID;
const clientIdMissing = !clientId || clientId === CLIENT_ID_PLACEHOLDER;

if (rootElement && clientIdMissing) {
  const message = `VITE_CLIENT_ID is not configured (current value: ${clientId ? `"${clientId}"` : 'unset'}). Set it to your app identifier in .env before running the app.`;
  console.error(message);
  rootElement.innerHTML = `
    <div style="font-family: system-ui, sans-serif; max-width: 640px; margin: 4rem auto; padding: 1.5rem; border: 1px solid #d33; border-radius: 6px; color: #222;">
      <h1 style="margin: 0 0 0.5rem; font-size: 1.25rem; color: #d33;">Configuration error</h1>
      <p style="margin: 0;">${message}</p>
    </div>
  `;
} else if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <TanStackQueryProvider.Provider {...TanStackQueryProviderContext}>
        <RouterProvider router={router} />
      </TanStackQueryProvider.Provider>
    </StrictMode>
  );
}
