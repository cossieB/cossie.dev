import { Variant } from "@motionone/solid";
import { BackendSvg, FrontendSvg, LanguageSvg, MiscSvg, QuestionMarkSvg } from "~/svgs";

export const aboutNavBtns = [
    ["About", <QuestionMarkSvg/>],
    ["Languages", <LanguageSvg/>],
    ["Front-End", <FrontendSvg/>],
    ["Back-End", <BackendSvg/>],
    ["Misc", <MiscSvg/>]
] as const

export const variant: Variant = {
    start: {
        x: -50,
        opacity: 0
    },
    end: ({index}) => ({
        opacity: 1,
        x: 0,
        transition: {
            ease: 'easeOut',
            delay: index * 0.1
        }
    }),
    exit: ({reverse}) => ({
        opacity: 0,
        x: -50,
        transition: {
            ease: 'easeInOut',
            delay: reverse * 0.05
        }
    })
}