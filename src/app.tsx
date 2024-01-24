// app.tsx
import { MetaProvider } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start"; // only thing imported from SolidStart
import { Suspense } from "solid-js";
import "./root.scss"
import { UserProvider } from "./components/shared/Signup/UserProvider";

export default function App() {
  return (
    <MetaProvider>
      <UserProvider>
        <Router
          root={props => (
            <>
              <Suspense >
                {props.children}
              </Suspense>
            </>
          )}
        >
          <FileRoutes />
        </Router>
      </UserProvider>
    </MetaProvider>
  );
}