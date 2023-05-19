import styles from '~/components/Home/Home.module.scss'
import { PuzzleSvg, QuestionMarkSvg, PhoneSvg, GithubSvg, LinkedInSvg, DockerSvg, FreeCCSvg } from '~/svgs'
import ExternalLink from '../shared/ExternalLink'
import MySiteTitle from '../shared/MySiteTitle'
import NavItem from './NavItem'

export default function HomeMain() {
    return (
        <main id={styles.homeContainer} class="container">
            <MySiteTitle>Hello World</MySiteTitle>
            <nav id={styles.navbar}>
                <NavItem
                    href='/projects'
                    icon={<PuzzleSvg />}
                    label='Projects'
                />
                <NavItem
                    href='/about'
                    icon={<QuestionMarkSvg />}
                    label='About'
                />
                <NavItem
                    href='/contact'
                    icon={<PhoneSvg />}
                    label='Contact'
                />
            </nav>
            <div id={styles.welcome}>
                <h1 id={styles.name}>Cossie</h1>
                <hr class={styles.line} />
                <h2 id={styles.title}>Full-Stack Developer</h2>
            </div>
            <div class={styles.socials}>
                <ExternalLink href='https://github.com/cossieB' title="GitHub">
                    {<GithubSvg />}
                </ExternalLink>
                <ExternalLink href="https://www.linkedin.com/in/cossieb/" title="LinkedIn" >
                    {<LinkedInSvg />}
                </ExternalLink>
                <ExternalLink href="https://hub.docker.com/u/cossie" title="Docker Hub">
                    {<DockerSvg />}
                </ExternalLink>
                <ExternalLink href="https://www.freecodecamp.org/cossie" title="freeCodeCamp">
                    {<FreeCCSvg />}
                </ExternalLink>
                <a href="https://www.freecodecamp.org/cossie" target="_blank" rel="noreferrer" title="freeCodeCamp">
                </a>
                <div class={styles.lineV} />
            </div>
        </main>
    )
}