import { BackendSvg, FrontendSvg, LanguageSvg, MiscSvg, QuestionMarkSvg } from "~/svgs";

export const aboutNavBtns = [
    ["About", <QuestionMarkSvg/>],
    ["Languages", <LanguageSvg/>],
    ["Front-End", <FrontendSvg/>],
    ["Back-End", <BackendSvg/>],
    ["Misc", <MiscSvg/>]
] as const
