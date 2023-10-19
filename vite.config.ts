import solid from "solid-start/vite";
import { defineConfig } from "vite";
import vercel from "solid-start-vercel"
import { VitePWA, type ManifestOptions, type VitePWAOptions } from 'vite-plugin-pwa'

const pwaOptions: Partial<VitePWAOptions> = {
    base: "/",
    includeAssets: ["favicon.ico"],
    strategies: 'generateSW',
    workbox: {
        navigateFallback: "/",
        navigateFallbackDenylist: [/\/admin\/*/],
        runtimeCaching: [{
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
                cacheName: 'google-fonts-cache',
                expiration: {
                    maxEntries: 10,
                    maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
                },
                cacheableResponse: {
                    statuses: [0, 200]
                }
            }
        }, {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
                cacheName: 'gstatic-fonts-cache',
                expiration: {
                    maxEntries: 10,
                    maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
                },
                cacheableResponse: {
                    statuses: [0, 200]
                },
            }
        }, {
            urlPattern: (t) => t.request.destination === "document" && t.sameOrigin,
            handler: 'NetworkFirst',
            method: "GET",
            options: {
                cacheName: "pages",
                expiration: {
                    maxEntries: 10
                },
                cacheableResponse: {
                    statuses: [0, 200]
                },
                matchOptions: {
                    ignoreSearch: true
                },
            }
        }]
    },
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
            sizes: "512x512",
            purpose: "any maskable"
        }],
    },
    devOptions: {
        enabled: true,
        /* when using generateSW the PWA plugin will switch to classic */
        type: 'module',
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
    ssr: {
        external: ['ag-grid-solid'],
    },
    plugins: [
        solid({
            adapter: vercel({
                prerender: {
                    expiration: 60*60*24
                }
            })
        }),
        VitePWA(pwaOptions),
    ],
});
