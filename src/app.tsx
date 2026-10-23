import { Loading } from 'solid-js';
// Typed client env, validated and baked in at build time (see env.ts).
import { paths, Router } from './router';
import './reset.css'
import './App.css';
import { Navigator } from './components/Navigator/Navigator';
import { ToastProvider } from './components/Toast/ToastContext';
import { ToastContainer } from './components/Toast/Toast';


export default function App() {
  return (
    
      <Router>
        {(props) => (
          <>
            <Navigator />
            <ToastContainer />
            <Loading fallback={<main>Loading…</main>}>{props.children}</Loading>
          </>
        )}
      </Router>
    
  );
}
