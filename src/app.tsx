// app.tsx
import { MetaProvider } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./root.scss"
import { UserProvider } from "./components/shared/Signup/UserProvider";

export default function App() {
  return (
    <Router
      root={props => (
        <MetaProvider>
          <UserProvider>
            <Suspense>
              {props.children}
            </Suspense>
          </UserProvider>
        </MetaProvider>
      )}>
      <FileRoutes />
    </Router>
  )
}