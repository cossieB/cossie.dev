import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./reset.css"
import "./app.css";
import Navigator from "./components/Navigator/Navigator";

export default function App() {
    return (
        <Router
            root={props => (
                <MetaProvider>
                    <Title>Cossie</Title>
                    <Navigator />
                    <Suspense>{props.children}</Suspense>
                </MetaProvider>
            )}
        >
            <FileRoutes />
        </Router>
    );
}
