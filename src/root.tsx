// @refresh reload
import { Suspense } from "solid-js";
import {
    Body,
    ErrorBoundary,
    FileRoutes,
    Head,
    Html,
    Meta,
    Routes,
    Scripts,
    Title,
    Link,
} from "solid-start";
import "./root.scss";
import { UserProvider } from "./components/shared/Signup/UserProvider";

export default function Root() {
    return (
        <Html lang="en">
            <Head>
                <Meta charset="utf-8" />
                <Meta name="viewport" content="width=device-width, initial-scale=1" />
                <Meta name="description" content="I am Buntu Cossie a full-stack developer from South Africa. I make web apps in TypeScript, C#, React, Next.js, Solid.js and PostgreSQL. This is my portfolio site built with Solid Start and SASS." />
                <Meta name="application-name" content="cossie.dev" />
                <Meta name="author" content="Buntu Cossie" />
                <Meta name="keywords"
                    content="solid.js,portfolio,project,full-stack developer,html,sass,single-page application,progressive web app,typescript,web developer,web development" />
                <Meta name="color-scheme" content="dark" />
                <Meta name="creator" content="Buntu Cossie" />
                <Meta name="robots" content="index, follow" />
                <Meta name="googlebot" content="index, follow" />
                <Meta property="og:title" content="cossie.dev" />
                <Meta property="og:description"
                    content="Porfolio page of full-stack developer Buntu Cossie, built with Solid.js, Solid Start, SASS" />
                <Link rel="shortcut icon" type="image/ico" href="/favicon.ico" />
                <Link rel="preconnect" href="https://fonts.googleapis.com" />
                <Link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                <Link rel="manifest" href="/manifest.json" />
                <Link rel="apple-touch--icon" sizes="180x180" href="/apple-touch-icon.png" />
                <Link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <Link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <Link
                    href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;700&family=Press+Start+2P&family=Stick+No+Bills:wght@600&family=Orbitron:wght@500&display=swap"
                    rel="stylesheet" />
                <Title>Cossie</Title>
            </Head>
            <UserProvider>
                <Body>
                    <Suspense>
                        <ErrorBoundary>
                            <Routes>
                                <FileRoutes />
                            </Routes>
                        </ErrorBoundary>
                    </Suspense>
                    <Scripts />
                </Body>
            </UserProvider>
        </Html>
    );
}
