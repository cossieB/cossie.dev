import { CustomSiteTitle } from "~/components/CustomSiteTitle";
import Wordle from "~/features/wordle/components/Wordle";

export default function() {
    return (
        <>
            <Wordle />
            <CustomSiteTitle title="2048" />            
        </>
    )
}