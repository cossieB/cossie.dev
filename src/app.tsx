import { Title } from '@solidjs/meta';
import { Loading } from 'solid-js';
// Typed client env, validated and baked in at build time (see env.ts).
import { paths, Router } from './router';
import './reset.css'
import './App.css';
import { Navigator } from './components/Navigator/Navigator';


export default function App() {
  return (
    <Router>
      {(props) => (
        <>
          <Navigator />
          <Loading fallback={<main>Loading…</main>}>{props.children}</Loading>
        </>
      )}
    </Router>
  );
}
