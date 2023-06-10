import solid from "solid-start/vite";
import { defineConfig } from "vite";
import vercel from "solid-start-vercel"
import { VitePWA, type ManifestOptions, type VitePWAOptions } from 'vite-plugin-pwa'

const pwaOptions: Partial<VitePWAOptions> = {
    mode: "development",
    base: "/",
    includeAssets: ["favicon.ico"],
    manifest: {
        name: "Buntu Cossie's Portfolio App",
        short_name: "cossie.dev",
        display: "standalone",
        theme_color: "#141b26",
        background_color: "#2f4f4f",
        start_url: "/",
        orientation: "portrait-primary",
        id: "/",
        description: "Portfolio page of full-stack developer Buntu Cossie",
        icons: [{
            src: "favicon.ico",
            sizes: "48x48",
            type: "image/x-icon"
        }, {
            src: "logo192.png",
            type: "image/png",
            sizes: "192x192"
        }, {
            src: "logo512.png",
            type: "image/png",
            sizes: "512x512"
        }],
    },
    devOptions: {
        enabled: true,
        /* when using generateSW the PWA plugin will switch to classic */
        type: 'module',
        navigateFallback: 'index.html',
    },
}

const replaceOptions = { __DATE__: new Date().toISOString() }
const claims = process.env.CLAIMS === 'true'
const reload = process.env.RELOAD_SW === 'true'
const selfDestroying = process.env.SW_DESTROY === 'true'

if (process.env.SW === 'true') {
    pwaOptions.srcDir = 'src'
    pwaOptions.filename = claims ? 'claims-sw.ts' : 'prompt-sw.ts'
    pwaOptions.strategies = 'injectManifest';
    (pwaOptions.manifest as Partial<ManifestOptions>).name = 'PWA Inject Manifest';
    (pwaOptions.manifest as Partial<ManifestOptions>).short_name = 'PWA Inject'
}

if (claims)
    pwaOptions.registerType = 'autoUpdate'

if (reload) {
    // @ts-expect-error just ignore
    replaceOptions.__RELOAD_SW__ = 'true'
}

if (selfDestroying)
    pwaOptions.selfDestroying = selfDestroying

export default defineConfig({
    plugins: [
        solid({
            adapter: vercel({})
        }),
        VitePWA(pwaOptions),
    ],
});
