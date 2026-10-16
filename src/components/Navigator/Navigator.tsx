import { createSignal, onCleanup, For, onSettled } from "solid-js";
import styles from "./Navigator.module.css";
import { ChevronLeftIcon, ChevronRightIcon, MenuIcon } from "@lucide/solid";
import { projectArray } from "~/features/home/utils/projectArray";
import titleCase from "~/lib/titleCase";
import clickOutside from "~/lib/clickOutside";

type Project = typeof projectArray[number]['type'];

export function Navigator() {

    const [activeCategory, setActiveCategory] = createSignal<Project | null>(null)
    const [showNav, setShowNav] = createSignal(false)
    const [height, setHeight] = createSignal(0);
    const h = () => showNav() === false ? 0 : height()
    let container!: HTMLDivElement;
    let categoryPanel!: HTMLDivElement;
    let optionsPanel!: HTMLDivElement;

    const updateHeight = () => {
        const panel = activeCategory() ? optionsPanel : categoryPanel;

        if (panel) {
            setHeight(panel.scrollHeight);
        }
    };

    const selectCategory = (category: Project) => {
        setActiveCategory(category);
    };

    const goBack = () => {
        setActiveCategory(null);
    };

    onSettled(() => {
        const resizeObserver = new ResizeObserver(updateHeight);
        resizeObserver.observe(categoryPanel);
        resizeObserver.observe(optionsPanel);
        return () => resizeObserver?.disconnect();
    });

    return (
        <div
            class={styles.container}
            ref={[container, clickOutside(() => {
                setShowNav(false)
                setActiveCategory(null)
            })]}
            style={{ height: `${h()}px` }}
        >
            <button
                class={styles.toggle}
                onClick={() => {
                    setShowNav(prev => !prev);
                    setActiveCategory(null)
                }}
            >
                <MenuIcon />
            </button>
            {/* Category list */}
            <div
                ref={categoryPanel}
                class={[styles.panel, styles.categories, activeCategory() ? styles.exitLeft : styles.active]}
                inert={activeCategory() !== null}
            >
                <a class={styles.item} href="/">
                    Home
                </a>
                <a class={styles.item} href="/#about">
                    About Me
                </a>
                <a class={styles.item} href="/#projects">
                    Projects
                </a>
                <a class={styles.item} href="/#contact">
                    Contact Me
                </a>
                <For each={Array.from(new Set(projectArray.map(p => p.type)))}>
                    {(category) => (
                        <button
                            type="button"
                            class={styles.item}
                            onClick={() => selectCategory(category)}
                        >
                            <span>{titleCase(category)}</span>
                            <span class={styles.arrow} aria-hidden="true">
                                <ChevronRightIcon />
                            </span>
                        </button>
                    )}
                </For>
            </div>

            {/* Options panel */}
            <div
                ref={optionsPanel}
                class={[styles.panel, styles.options, activeCategory() ? styles.active : styles.enterRight]}
                inert={activeCategory() === null}
            >
                <button
                    type="button"
                    class={`${styles.item} ${styles.back}`}
                    onClick={goBack}
                    aria-label="Back to categories"
                >
                    <span aria-hidden="true">
                        <ChevronLeftIcon />
                    </span>
                    <span>{titleCase(activeCategory() ?? "")}</span>
                </button>

                <For each={projectArray.filter(p => p.type == activeCategory()) ?? []}>
                    {(option) => (
                        <a
                            class={styles.item}
                            href={option.path}
                        >
                            {option.title}
                        </a>
                    )}
                </For>
            </div>
        </div>
    );
}