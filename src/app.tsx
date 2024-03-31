// app.tsx
import { MetaProvider } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./root.scss"
import { UserProvider } from "./components/shared/Signup/UserProvider";
import { AdminContextProvider } from "./components/admin/AdminContextProvider";

export default function App() {
  return (
    <Router 
      root={props => (
        <MetaProvider>
          <UserProvider>
            <AdminContextProvider>
              <Suspense>
                {props.children}
              </Suspense>
            </AdminContextProvider>
          </UserProvider>
        </MetaProvider>
      )}>
        <FileRoutes />
      </Router>
  )
    // <MetaProvider>
    //   <UserProvider>
    //     <AdminContextProvider>
    //       <Router
    //         root={props => (
    //           <>
    //             <Suspense >
    //               {props.children}
    //             </Suspense>
    //           </>
    //         )}
    //       >
    //         <FileRoutes />
    //       </Router>
    //     </AdminContextProvider>
    //   </UserProvider>
    // </MetaProvider>
  // );
}