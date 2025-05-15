import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

console.log('React initialization starting...');

// Make sure the root element exists
const rootElement = document.getElementById("root");
if (rootElement) {
  console.log('Root element found, mounting React app...');
  createRoot(rootElement).render(<App />);
} else {
  console.error('Root element not found! Cannot mount React app.');
}
