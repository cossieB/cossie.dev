import type { ParentProps } from 'solid-js';
import { HydrationScript } from '@solidjs/web';
import { ToastProvider } from './components/Toast/ToastContext';
import { enableRichArguments } from '@solidjs/web/server-functions/rich-args';
enableRichArguments()
// The document shell (the index.html replacement), picked up by the
// src/Document.* convention; it must render the full <html> and ships no
// client JS. <HydrationScript /> is stripped from the prerendered shell in
// client mode and activates under `ssr: true`. Delete this file to fall
// back to the plugin's built-in shell.
export default function Document(props: ParentProps) {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
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
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
        <link rel="manifest" href="/manifest.json" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;700&family=Press+Start+2P&family=Stick+No+Bills:wght@600&family=Orbitron:wght@500&display=swap"
          rel="stylesheet"
        />
        <title>Buntu Cossie</title>
        <HydrationScript />
      </head>
      <body>
        <ToastProvider>
          {props.children}
        </ToastProvider>
      </body>
    </html>
  );
}
