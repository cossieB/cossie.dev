// @refresh reload
import { StartServer, createHandler } from "@solidjs/start/server";

export default createHandler(() => (
    <StartServer
        document={({ assets, children, scripts }) => (
            <html lang="en">
                <head>
                    <meta charset="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/favicon.ico" />
                    <meta name="description" content="I am Buntu Cossie a full-stack developer from South Africa. I make web apps in TypeScript, C#, React, Next.js, Solid.js and PostgreSQL. This is my portfolio site built with Solid Start and SASS." />
                    <meta name="application-name" content="cossie.dev" />
                    <meta name="author" content="Buntu Cossie" />
                    <meta name="keywords"
                        content="solid.js,portfolio,project,full-stack developer,html,sass,single-page application,progressive web app,typescript,web developer,web development" />
                    <meta name="color-scheme" content="dark" />
                    <link rel="mask-icon" href="/favicon.ico" color="#FFFFFF" />
                    <meta name="theme-color" content="#ffffff" />
                    <meta name="creator" content="Buntu Cossie" />
                    <meta name="robots" content="index, follow" />
                    <meta name="googlebot" content="index, follow" />
                    <meta property="og:title" content="cossie.dev" />
                    <meta property="og:description"
                        content="Porfolio page of full-stack developer Buntu Cossie, built with Solid.js, Solid Start, SASS" />
                    <link rel="shortcut icon" type="image/ico" href="/favicon.ico" />
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                    <link rel="manifest" href="/manifest.json" />
                    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;700&family=Press+Start+2P&family=Stick+No+Bills:wght@600&family=Orbitron:wght@500&display=swap"
                        rel="stylesheet" 
                        />
                    {assets}
                </head>
                <body>
                    <div id="app">{children}</div>
                    {scripts}
                </body>
            </html>
        )}
    />
));