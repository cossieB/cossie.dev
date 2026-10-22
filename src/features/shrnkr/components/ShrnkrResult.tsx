import { CopyIcon, ExternalLinkIcon } from "@lucide/solid"
import QRCode from "qrcode"
import { createMemo, Loading } from "solid-js"
import styles from "./ShrnkrResult.module.css"

type Props = {
    shortenedUrl: string
}

export function ShrnkrResult(props: Props) {
    const qr = createMemo(() => QRCode.toDataURL(props.shortenedUrl))
    return (
        <Loading>
            <div class={styles.result}>
                <div class={styles.copy}>
                    <span> {props.shortenedUrl} </span>
                    <button
                        title="Copy URL"
                        onClick={() => {
                            navigator.clipboard.writeText(props.shortenedUrl)
                        }}
                    >
                        <CopyIcon />
                    </button>
                    <a href={props.shortenedUrl} rel="noopener" target="_blank">
                        <ExternalLinkIcon />
                    </a>
                </div>
                <div class={styles.qr}>
                    <img src={qr()} alt="" />
                    <a href={`${qr()}`} download="shrnkrd.png">
                        Download
                    </a>
                </div>
            </div>
        </Loading>
    )
}
