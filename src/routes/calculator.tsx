import { CustomSiteTitle } from "~/components/CustomSiteTitle";
import CalculatorMain from "~/features/calculator/calculator";

export default function () {
    return (
        <>
            <CalculatorMain />
            <CustomSiteTitle title="Calculator" />
        </>
    )
}