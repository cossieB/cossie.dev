import { JSXElement } from "solid-js"

export type Projs = {
    title: string,
    img: string,
    imgMobile?: string,
    description: JSXElement,
    stack: string[],
    repo: string,
    type: 'large' | 'game' | 'api' | 'interactive'
    external: boolean
    path: string
} 

export const projectArray: Projs[] = [
    {
        title: "1Clip",
        img: "/projects/1clip.png",
        imgMobile: "/projects/1clip_mobile.png",
        description: (
            <>
                <p>1Clip is the ultimate gamer hangout. It is a place where gamers can showcase their skills, their screenshots, fanart or even fanfic.</p>
                <p>Users can upload their videos or images to Cloudflare R2. Uses BetterAuth for authorization, Postgres, Redis and Railway as the PaaS.</p>
            </>
        ),
        repo: "https://github.com/cossieB/1clip",
        stack: ["tanstack-router", "solidjs", "typescript", "node.js", "postgres", "drizzle", "railway", "redis", "better-auth", "cloudflare", "tanstack-query", "nodemailer", "ag-grid"],
        type: "large",
        external: true,
        path: "https://1clip.cossie.dev"
    },{
        title: "Miniger",
        img: "/projects/miniger.png",
        description: (
            <>
                <p>Miniger is a multi-platform desktop application to manage and play movies. </p>
                <p>It was built with Tauri, Typescript and Rust. It uses SQLite as a database and Kysely ORM to interact with the database</p>
                <p>It uses FFMPEG to generate video thumbnails, get metadata and do video conversions.</p>
                <small>*currently FFMPEG isn't bundled with the app and needs to be installed separately by the user.</small>
            </>
        ),
        repo: "https://github.com/cossieB/1clip",
        stack: ["tauri", "solidjs", "typescript", "rust", "sqlite", "kysely", "ag-grid"],
        type: "large",
        external: true,
        path: "https://github.com/cossieB/miniger/releases/tag/v0.4.1"
    },{
        title: "REST API",
        img: "/projects/rest.png",
        imgMobile: "/projects/rest_mobile.png",
        path: "/api",
        description: "Various REST APIs including header parser, timestamp, issue and exercise trackers and translator services. Uses MongoDB as a database",
        stack: ["typescript", "node.js", "mongodb"],
        repo: 'https://github.com/cossieB/serverless',
        type: 'api',
        external: false
    }, {
        title: "2048",
        img: "/projects/2048.png",
        imgMobile: "/projects/2048_mobile.png",
        path: "/2048",
        description: "Clone of the 2048 puzzle/strategy game. Features mobile swipe controls. High scores stored in Firestore and local storage. This game has complex logic, so it was quite challenging to develop.",
        stack: ["typescript", "react", "firebase", "firestore", "sass"],
        repo: "https://github.com/cossieB/cossie.dev/tree/main/src/components/2048",
        type: "game",
        external: false
    }, {
        title: "Wordle",
        img: "/projects/wordle.png",
        imgMobile: "/projects/wordle_mobile.png",
        path: "/wordle",
        description: "My recreation of the popular game Wordle",
        stack: ["typescript", "solidjs", "firebase", ],
        repo: "https://github.com/cossieB/cossie.dev/tree/main/src/components/Wordle",
        type: "game",
        external: false
    }, {
        title: 'Memory Game',
        path: '/memory',
        img: "/projects/memory.png",
        imgMobile: "/projects/memory_mobile.png",
        description: "Quiz that tests your memory. Features customizable game size. High scores stored in Firestore and local storage.",
        stack: ["typescript", "solidjs", "firebase", "firestore"],
        repo: "https://github.com/cossieB/cossie.dev/tree/main/src/components/Memory",
        type: "game",
        external: false
    }, {
        title: "Sudoku",
        img: '/projects/sudoku.png',
        imgMobile: '/projects/sudoku_mobile.png',
        path: "/sudoku",
        description: "Play sudoku. Features clash highlighting and custom puzzle creator. It can also solve most puzzles using the backtracking algorithm.",
        stack: ["typescript", "solidjs", "firebase", ],
        repo: "https://github.com/cossieB/cossie.dev/tree/main/src/components/Sudoku",
        type: "game",
        external: false
    }, {
        title: "Random Quote Machine",
        path: "/quotes",
        img: "/projects/quotes.png",
        imgMobile: "/projects/quotes_mobile.png",
        description: "Random quotes from across the ages. Features filters and Twitter and Tumblr share buttons",
        stack: ["typescript", "solidjs", "firebase", ],
        repo: "https://github.com/cossieB/cossie.dev/tree/main/src/components/Quotes",
        type: "interactive",
        external: false
    }, {
        title: "Pomodoro",
        img: "/projects/pomodoro.png",
        imgMobile: "/projects/pomodoro_mobile.png",
        path: "/pomodoro",
        description: "Timer for the pomodoro technique. You can change the session and the break lengths.",
        stack: ["typescript", "solidjs", "firebase", ],
        repo: "https://github.com/cossieB/cossie.dev/tree/main/src/components/Pomodoro",
        type: "interactive",
        external: false
    }, {
        title: "Calculator",
        img: "/projects/calculator.png",
        imgMobile: "/projects/calculator_mobile.png",
        path: "/calculator",
        description: "Non-scientific calculator.",
        stack: ["typescript", "solidjs", "firebase", ],
        repo: "https://github.com/cossieB/cossie.dev/tree/main/src/components/Calculator",
        type: "interactive",
        external: false
    }
]