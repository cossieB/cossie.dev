import { JSXElement } from "solid-js"

export type Projs = {
    title: string,
    img: string,
    imgMobile?: string,
    description: () => JSXElement,
    stack: string[],
    repo: string,
    type: "full-stack" | "backend" | "frontend"
    external: boolean
    path: string
}

export const projectArray: Projs[] = [
    {
        title: "1Clip",
        img: "/projects/1clip.png",
        imgMobile: "/projects/1clip_mobile.png",
        description: () => (
            <>
                1Clip is the ultimate digital hangout for gamers to showcase their gameplay skills, screenshots, fan art, and fan fiction. The platform handles media uploads using Cloudflare R2 and secures user accounts with BetterAuth. Its robust backend relies on PostgreSQL, Redis, and Railway for seamless deployment and scaling.
            </>
        ),
        repo: "https://github.com/cossieB/1clip",
        stack: ["tanstack-router", "solidjs", "typescript", "node.js", "postgres", "drizzle", "railway", "redis", "better-auth", "cloudflare", "tanstack-query", "nodemailer", "ag-grid"],
        type: "full-stack",
        external: true,
        path: "https://1clip.cossie.dev"
    }, {
        title: "Miniger",
        img: "/projects/miniger.png",
        description: () => (
            <>
                Miniger is a multi-platform desktop application designed for managing movie libraries. Built using Tauri, TypeScript, and Rust, it stores data in an SQLite database managed through the Kysely ORM. The application leverages FFmpeg for video thumbnail generation, metadata extraction, and format conversion, and integrates with TMDB to automatically tag movies and actors.
            </>
        ),
        repo: "https://github.com/cossieB/miniger",
        stack: ["tauri", "solidjs", "typescript", "tailwind", "rust", "sqlite", "kysely", "ag-grid"],
        type: "full-stack",
        external: true,
        path: "https://github.com/cossieB/miniger/releases/"
    }, {
        title: "OAuth2.1 Authorization Server",
        img: "/projects/oauth2.png",
        description: () => (
            <>
                <p>My custom built OAuth2.1 authorization server. It was built with Typescript, Hono, Drizzle ORM and deployed to Cloudflare Workers.</p>
                <p>It uses the Authorization Code flow with PKCE and JWT access tokens.</p>
                <p>A demonstration playground is available at <a target="__blank" href="https://oauth2-demo.netlify.app">https://oauth2-demo.netlify.app</a> </p>
            </>
        ),
        external: true,
        path: "https://oauth2.cossie.workers.dev",
        repo: "https://github.com/cossieB/oauth2",
        stack: ["typescript", "sqlite", "drizzle", "cloudflare", "node.js", "hono", "jwt", "tailwind"],
        type: "backend"
    }, {
        title: "IGDB Rest API",
        description: () => (
            <p>IGDB is a public REST API for information about the video game industry. Users can also leave reviews for games. It was built with Hono server library on Cloudflare Workers and uses Better-Auth for authentication</p>
        ),
        type: "backend",
        external: true,
        img: "/projects/rest.png",
        path: "https://igdb.cossie.workers.dev/scalar",
        repo: "https://github.com/cossieB/igdb",
        stack: ["typescript", "cloudflare", "sqlite", "drizzle", "better-auth"]
    }, {
        title: "IGDB GraphQL API",
        description: () => (
            <p>The GraphQL version of the IGDB API. Set x-api-key header to <code>uk_QOFDUChUqBhrAvaxVLNZudHsoZunRxlPAaArZUeTyktQIibZlGEHbmyemOwHYCNg</code> </p>
        ),
        type: "backend",
        external: true,
        img: "/projects/graphql.png",
        path: "https://igdb.cossie.workers.dev/graphql",
        repo: "https://github.com/cossieB/igdb/tree/nodejs/src/graphql",
        stack: ["typescript", "hono", "cloudflare", "sqlite", "drizzle", "better-auth", "graphql"]
    }, {
        title: "2048",
        img: "/projects/2048.png",
        imgMobile: "/projects/2048_mobile.png",
        path: "/2048",
        description: () => "Clone of the 2048 puzzle/strategy game. Features mobile swipe controls. High scores stored in Firestore and local storage.",
        stack: ["typescript", "solidjs", "firebase", "firestore"],
        repo: "https://github.com/cossieB/cossie.dev/tree/main/src/features/2048",
        type: "frontend",
        external: false
    }, {
        title: "Image Converter",
        img: "/projects/image-converter.png",
        imgMobile: "/projects/image-converter_mobile.png",
        path: "/image-converter",
        description: () => "A serverless, in-browser image converter and resizer. It handles local conversion to WebP, PNG, JPEG, JPEG-XL, and AVIF based on browser support.",
        stack: ["typescript", "solidjs"],
        repo: "https://github.com/cossieB/cossie.dev/tree/main/src/features/image-converter",
        type: "frontend",
        external: false
    }, {
        title: "Wordle",
        img: "/projects/wordle.png",
        imgMobile: "/projects/wordle_mobile.png",
        path: "/wordle",
        description: () => "My recreation of the popular game Wordle",
        stack: ["typescript", "solidjs", "firebase",],
        repo: "https://github.com/cossieB/cossie.dev/tree/main/src/features/wordle",
        type: "frontend",
        external: false
    }, {
        title: 'Memory Game',
        path: '/memory',
        img: "/projects/memory.png",
        imgMobile: "/projects/memory_mobile.png",
        description: () => "Quiz that tests your memory. Features customizable game size. High scores stored in Firestore and local storage.",
        stack: ["typescript", "solidjs", "firebase", "firestore"],
        repo: "https://github.com/cossieB/cossie.dev/tree/main/src/features/memory",
        type: "frontend",
        external: false
    }, {
        title: "Sudoku",
        img: '/projects/sudoku.png',
        imgMobile: '/projects/sudoku_mobile.png',
        path: "/sudoku",
        description: () => "Play sudoku. Features clash highlighting and custom puzzle creator. It can also solve most puzzles using the backtracking algorithm.",
        stack: ["typescript", "solidjs", "firebase",],
        repo: "https://github.com/cossieB/cossie.dev/tree/main/src/features/sudoku",
        type: "frontend",
        external: false
    }, {
        title: "Random Quote Machine",
        path: "/quotes",
        img: "/projects/quotes.png",
        imgMobile: "/projects/quotes_mobile.png",
        description: () => "Random quotes from across the ages. Features filters and Twitter and Tumblr share buttons",
        stack: ["typescript", "solidjs", "firebase",],
        repo: "https://github.com/cossieB/cossie.dev/tree/main/src/features/quotes",
        type: "frontend",
        external: false
    }, {
        title: "Pomodoro",
        img: "/projects/pomodoro.png",
        imgMobile: "/projects/pomodoro_mobile.png",
        path: "/pomodoro",
        description: () => "Timer for the pomodoro technique. You can change the session and the break lengths.",
        stack: ["typescript", "solidjs", "firebase",],
        repo: "https://github.com/cossieB/cossie.dev/tree/main/src/features/pomodoro",
        type: "frontend",
        external: false
    }
]