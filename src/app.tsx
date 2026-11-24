import { Loading } from 'solid-js';
import { Router } from './router';
import './reset.css'
import './app.css';
import { Navigator } from './components/Navigator/Navigator';
import { ToastContainer } from './components/Toast/Toast';
import { announceRoutes } from "@solidjs/prerender";

export default function App() {
  announceRoutes(Router)
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
