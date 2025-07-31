import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
//import { MediaStreamProvider } from './USERCONTEXT/mediastream';
//import { UserProvider } from './USERCONTEXT/usercontext.jsx';

createRoot(document.getElementById('root')).render(
 // <StrictMode>
 //<UserProvider>
  //<MediaStreamProvider>
    <App />
    //</MediaStreamProvider>
    //</UserProvider>
  //</StrictMode>,
)
