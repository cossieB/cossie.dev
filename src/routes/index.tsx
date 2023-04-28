import styles from '~/components/Home/Home.module.scss'
import { puzzleSvg, questionMarkSvg, phoneSvg, githubSvg, linkedInSvg, dockerSvg, freeCCSvg } from "../svgs";
import { Title } from 'solid-start';
import NavItem from '~/components/Home/NavItem';
import ExternalLink from '~/components/shared/ExternalLink';

export default function Home() {
    return (
        <main id={styles.homeContainer} class="container">
            <Title>&lt;Hello World/&gt;</Title>
            <nav id={styles.navbar}>
                <NavItem
                    href='/projects'
                    icon={puzzleSvg}
                    label='Projects'
                />
                <NavItem
                    href='/about'
                    icon={questionMarkSvg}
                    label='About'
                />
                <NavItem
                    href='/contact'
                    icon={phoneSvg}
                    label='Contact'
                />
            </nav>
            <div id={styles.welcome}>
                {/* <motion.h1 initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1 }} id={styles.name}>Cossie</motion.h1>
                <motion.hr initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 1 }} />
                <motion.h2 initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1 }} id={styles.title}>Full-Stack Developer</motion.h2> */}
            </div>
            <div class={styles.socials}>
                <ExternalLink href='https://github.com/cossieB' title="GitHub">
                    {githubSvg}
                </ExternalLink>
                <ExternalLink href="https://www.linkedin.com/in/cossieb/" title="LinkedIn" >
                    {linkedInSvg}
                </ExternalLink>
                <ExternalLink href="https://hub.docker.com/u/cossie" title="Docker Hub">
                    {dockerSvg}
                </ExternalLink>
                <ExternalLink href="https://www.freecodecamp.org/cossie" title="freeCodeCamp">
                    {freeCCSvg}
                </ExternalLink>
                <a href="https://www.freecodecamp.org/cossie" target="_blank" rel="noreferrer" title="freeCodeCamp">
                </a>
                <div class={styles.lineV} />
            </div>
        </main>
    )
}
