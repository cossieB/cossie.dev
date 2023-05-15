import { Motion } from '@motionone/solid'
import styles from './about.module.scss'
import { useResize } from '~/hooks/useResize'

export default function AboutMe() {
    const windowWidth = useResize()
    return (
        <div>
            <div id={styles.nameAndPic}>
                <img id={styles.myPic} src="/me.jpg" alt="Buntu Cossie" />
                <h1>Buntu Cossie</h1>
            </div>
            <Motion.article
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ 'font-size': "16px" }} >
                <p>
                    I am Buntu Cossie a full-stack developer from South Africa. I make web apps in TypeScript, C#, React, Next.js, Solid.js and PostgreSQL amongst a whole list of other technologies. Soon I'll be adding Blazor Webassembly and Rust to my repertoire.
                </p>
                <p>
                    Perhaps my two greatest assets are my passion for software development and tech in general, and my ability to quickly learn new skills. These drive me to look for new and creative ways to develop software and solve real world problems.
                </p>
                <p>Select a tab {windowWidth() > 768 ? "on the left" : "at the top of the page"} to view my proficiencies.</p>
            </Motion.article>
        </div>
    )
}