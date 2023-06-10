import styles from './about.module.scss'

export default function AboutMe() {
    return (
        <div>
            <div id={styles.nameAndPic}>
                <img id={styles.myPic} src="/me.jpg" alt="Buntu Cossie" />
                <h1>Buntu Cossie</h1>
            </div>
            <article
                style={{ 'font-size': "16px" }} >
                <p>
                    I am Buntu Cossie a full-stack developer from South Africa. I make web apps in TypeScript, C#, React, Next.js, Solid.js and PostgreSQL amongst a whole list of other technologies. Soon I'll be adding Blazor Webassembly and Rust to my repertoire.
                </p>
                <p>
                    Perhaps my two greatest assets are my passion for software development and tech in general, and my ability to quickly learn new skills. These drive me to look for new and creative ways to develop software and solve real world problems.
                </p>
                <p>
                    Outside of coding, I enjoy video games, sci-fi and to a lesser extent fantasy. Specifically, I am a huge fan of the Mass Effect trilogy, The Expanse, Game of Thrones and The Boys TV series.
                </p>
            </article>
        </div>
    )
}