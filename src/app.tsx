import { Title } from '@solidjs/meta';
import { Loading } from 'solid-js';
// Typed client env, validated and baked in at build time (see env.ts).
import { paths, Router } from './router';
import './reset.css'
import './App.css';

export default function App() {
  return (
    <Router>
      {(props) => (
        <>
          <Loading fallback={<main>Loading…</main>}>{props.children}</Loading>
        </>
      )}
    </Router>
  );
}
