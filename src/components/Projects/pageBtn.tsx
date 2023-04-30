import { Accessor, Setter } from "solid-js";
import styles from "~/components/Projects/Projects.module.scss";
import { paginatedProjects } from "./ProjectList";
import { flipPage } from "../../lib/flipPage";

type Props = {
    page: Accessor<number>
    setPage: Setter<number>
    isNextBtn: boolean
    label: string
}

export default function PageBtn(props: Props) {
    let className = props.isNextBtn ? styles.nextBtn : styles.prevBtn
    className += " " + styles.pageBtn
    const incrementBy = props.isNextBtn ? 1 : -1

    const isDisabled = () => {
        if (!props.isNextBtn && props.page() == 0) {
            return true
        }
        if (props.isNextBtn && props.page() == paginatedProjects.length - 1)
            return true

        return false
    }

    return (
        <div
            class={className}
            classList={{[styles.disabled]: isDisabled()}}
            onClick={() => {
                const nextPage = flipPage(props.page(), incrementBy, paginatedProjects.length - 1);
                props.setPage(nextPage)
            }}
        >
            {props.label}
        </div>
    )
}