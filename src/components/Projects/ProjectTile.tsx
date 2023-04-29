import { Link } from "@solidjs/router";
import { Projs } from "~/components/Projects/projectArray";
import styles from "~/components/Projects/Projects.module.scss"
import { External } from "~/svgs";

type Props = {
    proj: Projs,
}

export default function ProjectTile({ proj }: Props) {
    return (
        <div class={styles.tile}>
            <img src={proj.img} alt={proj.path} />
            {proj.external ?
                <>
                    <a href={proj.path} target="_blank" rel="norefferer" >
                        {proj.title} &nbsp;
                        <span>{<External />}</span>
                    </a>
                </> :
                <>
                    {proj.path ?
                        <Link href={proj.path} >
                            {proj.title}
                        </Link> :
                        <div >
                            {proj.title}
                        </div>

                    }
                </>
            }
            {/* <div class={hovered ? `${styles.tileMask} ${styles.show}` : styles.tileMask} >
                <svg onClick={() => { setSelected(proj); setWrapper!(ref) }} xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="blue" class="bi bi-info-circle-fill" viewBox="0 0 16 16">
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                </svg>
                {proj.external ?
                    <a style={{ "margin-right": '1rem' }} href={proj.path} target="_blank" rel="norefferer" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="springgreen" class="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z" />
                            <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z" />
                        </svg>
                    </a> :
                    proj.path &&
                    <Link href={proj.path} style={{ "margin-right": '1rem' }}  >
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="springgreen" class="bi bi-arrow-bar-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8zm-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5z" />
                        </svg>
                    </Link>
                }
            </div> */}
        </div>
    )
}