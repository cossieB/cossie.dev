import styles from '~/components/Home/Home.module.scss'
import NavItem from '~/components/Home/NavItem';
import ExternalLink from '~/components/shared/ExternalLink';
import MySiteTitle from '~/components/shared/MySiteTitle';
import { Motion } from '@motionone/solid';
import { DockerSvg, FreeCCSvg, GithubSvg, LinkedInSvg, PhoneSvg, PuzzleSvg, QuestionMarkSvg } from '~/svgs';

export default function Home() {
    return (
        <main id={styles.homeContainer} class="container">
            <MySiteTitle>Hello World</MySiteTitle>
            <nav id={styles.navbar}>
                <NavItem
                    href='/projects'
                    icon={<PuzzleSvg/>}
                    label='Projects'
                />
                <NavItem
                    href='/about'
                    icon={<QuestionMarkSvg/>}
                    label='About'
                />
                <NavItem
                    href='/contact'
                    icon={<PhoneSvg />}
                    label='Contact'
                />
            </nav>
            <div id={styles.welcome}>
                <Motion.h1 initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1 }} id={styles.name}>Cossie</Motion.h1>
                <Motion.hr initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 1 }} class={styles.line} />
                <Motion.h2 initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1 }} id={styles.title}>Full-Stack Developer</Motion.h2>
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
