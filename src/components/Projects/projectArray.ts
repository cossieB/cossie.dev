import { langs, frontend, backend, misc, type Lang } from './vars'

export const stack: { [key: string]: string } = {
    "framer motion": "https://pagepro.co/blog/wp-content/uploads/2020/03/framer-motion.png",
    firestore: "https://res.cloudinary.com/practicaldev/image/fetch/s--VnDDBkku--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/akm5od0383lcbhxvb9zb.png",
    marked: "https://avatars.githubusercontent.com/u/19886934?v=4",
    heroku: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Heroku_logo.svg",
    vercel: "https://logowik.com/content/uploads/images/vercel1868.jpg",
    "entity framework": "https://i.imgur.com/DU7Cbis.png",
    pug: "https://miro.medium.com/max/1012/1*XQrm5n6_iX2mY93lT4d4cA.png",
    "json web token": "/logos/jwt.svg",
    supabase: "https://miro.medium.com/max/1200/1*xOqCfciF90c8nH0HhMpapQ.png",
    render: "https://intellyx.com/wp-content/uploads/2019/08/Render-cloud-intellyx-BC-logo.png",
    netlify: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Netlify_logo.svg",
    apollo: "https://user-images.githubusercontent.com/841294/53402609-b97a2180-39ba-11e9-8100-812bab86357c.png",
    trpc: "https://trpc.io/img/logo.svg"
}
const sections = [langs, frontend, backend, misc]

function updateStack(arr: Lang[]) {
    arr.forEach(item => {
        stack[item.language.toLowerCase()] = item.logo
    })
}
sections.forEach(item => {
    updateStack(item)
})

export type Projs = {
    title: string,
    img: string,
    imgMobile?: string,
    description: string,
    stack: string[],
    repo: string,
    type: 'large' | 'game' | 'api' | 'interactive'
} & ({
    external: true
    path: string
} | {
    external?: false 
    path?: string
})

export const projectArray: Projs[] = [
    {
        title: "Meme Machine",
        img: "/screenshots/memes.png",
        imgMobile: "/screenshots/memes_mobile.png",
        path: "https://mememachine.vercel.app/",
        external: true,
        description: "Full-stack CRUD application for posting and viewing memes. Features 'like', 'follow' functionality and OAuth login with Google and Facebook. Developed with TypeScript, Next.js, React and Tailwind CSS. The data is stored in Supabase PostgreSQL and Prisma ORM is used to interact with the database. Uses the Next-Auth library for authentication and tRPC to bridge the front-end and back-end. ",
        stack: ["typescript", "next.js", "react", "node.js", "postgresql", "prisma", "json web token", "vercel", "trpc", "tailwind"],
        repo: 'https://github.com/cossieB/meme-machine',
        type: 'large'
    }, {
        title: "Spaza Game Store",
        img: "/screenshots/spaza.png",
        description: "Full-stack ecommerce website. Developed with TypeScript, React on the frontend and C#, ASP.NET, Entity Framework and Postgres on the backend. Features a JsonWebToken based authentication system. To view a working demo, please clone the repo and run docker-compose up in your terminal.",
        stack: ["typescript", "react", "c#", "postgresql", "entity framework", "asp.net", "bootstrap", "json web token", "docker"],
        repo: "https://github.com/cossieB/spaza-ecommerce",
        type: 'large'
    }, {
        title: "Internet Games Database",
        img: "/screenshots/igdb.png",
        imgMobile: "/screenshots/igdb_mobile.png",
        path: "https://internet-games-database.vercel.app/",
        external: true,
        description: "CRUD application for adding information about games and the gaming industry. Developed with TypeScript, Next.js, React and SASS. Uses Supabase Postgres as a database and Prisma ORM to interact with the database.",
        stack: ["typescript", "next.js", "react", "node.js", "postgresql", "prisma", "mongodb", "supabase", "mongoose", "vercel", "framer motion", "sass"],
        repo: "https://github.com/cossieB/internet-games-database",
        type: 'large'
    },{
        title: "2048",
        img: "/screenshots/2048.png",
        imgMobile: "/screenshots/2048_mobile.png",
        path: "/2048",
        description: "Clone of the 2048 puzzle/strategy game. Features mobile swipe controls. High scores stored in Firestore and local storage. This game has complex logic, so it was quite challenging to develop.",
        stack: ["typescript", "react", "firebase", "framer motion", "firestore", "sass"],
        repo: "https://github.com/cossieB/cossie.dev/tree/main/src/components/2048",
        type: "game"
    }, {
        title: "Microservices",
        img: "/screenshots/microservices.png",
        imgMobile: "/screenshots/microservices_mobile.png",
        path: "https://cossie.netlify.app/",
        external: true,
        description: "Various REST APIs including header parser, file metadata, timestamp microservices, issue and exercise trackers and translator services. Deployed on Netlify and uses serverless Netlify functions.",
        stack: ["typescript", "node.js", "mongodb", "mongoose", "netlify"],
        repo: 'https://github.com/cossieB/serverless',
        type: 'api'
    }, {
        title: "GraphQL API",
        img: "/screenshots/graphql.png",
        path: "https://cossie-91.web.app/graphiql",
        external: true,
        description: "GraphQL API to get data from my Internet Games Database project. The project is deployed on Vercel and it uses Apollo Server. The data is stored in Supabase Postgres.",
        stack: ['typescript', 'node.js', 'next.js', 'postgresql', 'prisma', 'apollo', 'supabase', 'graphql', 'vercel'],
        repo: "https://github.com/cossieB/internet-games-database/tree/main/graphql",
        type: 'api'
    }, {
        title: "Wordle",
        img: "/screenshots/wordle.png",
        imgMobile: "/screenshots/wordle_mobile.png",
        path: "/wordle",
        description: "My recreation of the popular game Wordle",
        stack: ["typescript", "react", "firebase", "framer motion"],
        repo: "https://github.com/cossieB/cossie.dev/tree/main/src/components/Wordle",
        type: "game"
    }, {
        title: 'Memory Game',
        path: '/memory',
        img: "/screenshots/memory.png",
        imgMobile: "/screenshots/memory_mobile.png",
        description: "Quiz that tests your memory. Features customizable game size. High scores stored in Firestore and local storage.",
        stack: ["typescript", "react", "firebase", "framer motion", "firestore"],
        repo: "https://github.com/cossieB/cossie.dev/tree/main/src/components/Memory",
        type: "game"
    }, {
        title: "Sudoku",
        img: '/screenshots/sudoku.png',
        imgMobile: '/screenshots/sudoku_mobile.png',
        path: "/sudoku",
        description: "Play sudoku. Features clash highlighting and custom puzzle creator. It can also solve most puzzles using the backtracking algorithm.",
        stack: ["typescript", "react", "firebase", "framer motion"],
        repo: "https://github.com/cossieB/cossie.dev/tree/main/src/components/Sudoku",
        type: "game"
    }, {
        title: "Pomodoro",
        img: "/screenshots/pomodoro.png",
        imgMobile: "/screenshots/pomodoro_mobile.png",
        path: "/pomodoro",
        description: "Timer for the pomodoro technique. You can change the session and the break lengths.",
        stack: ["typescript", "react", "firebase", "framer motion"],
        repo: "https://github.com/cossieB/cossie.dev/tree/main/src/components/Pomodoro",
        type: "interactive"
    }, {
        title: "Calculator",
        img: "/screenshots/calculator.png",
        imgMobile: "/screenshots/calculator_mobile.png",
        path: "/calculator",
        description: "Non-scientific calculator.",
        stack: ["typescript", "react", "firebase", "framer motion"],
        repo: "https://github.com/cossieB/cossie.dev/tree/main/src/components/Calculator",
        type: "interactive"
    }, {
        title: "Random Quote Machine",
        path: "/quotes",
        img: "/screenshots/quotes.png",
        imgMobile: "/screenshots/quotes_mobile.png",
        description: "Random quotes from across the ages. Features filters and Twitter and Tumblr share buttons",
        stack: ["typescript", "react", "firebase", "framer motion"],
        repo: "https://github.com/cossieB/cossie.dev/tree/main/src/components/Quotes",
        type: "interactive"
    }
]