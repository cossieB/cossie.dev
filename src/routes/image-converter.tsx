import { clientOnly } from "@solidjs/start";

const ImageConverter = clientOnly(() => import("~/features/image-converter/components/ImageConverter"))

export default ImageConverter