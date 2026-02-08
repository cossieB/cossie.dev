import { CustomSiteTitle } from "~/components/CustomSiteTitle";
import QuotesMain from "~/features/quotes/QuotesMain";

export default function () {
    return (
        <>
            <QuotesMain />
            <CustomSiteTitle title="Random Quote Machine" />
        </>
    )
}