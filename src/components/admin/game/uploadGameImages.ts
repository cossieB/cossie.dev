import { GameImages } from "./types";
import { upload, uploadMultiple } from "~/utils/uploadToUploadThing";
import { Props } from "./GameForm";
import { SetStoreFunction } from "solid-js/store";
import { Game } from "~/drizzle/types";

type State = {
    isUploading: boolean;
    uploadOk: boolean;
    uploadError: boolean;
}

export async function uploadGameImages(
    files: GameImages,
    props: Props,
    setState: SetStoreFunction<State>,
    game: Game,
    setGame: SetStoreFunction<Game>,
    data?: Game & { tags: string[] }
) {
    setState({ isUploading: true })
    try {
        const promises: Promise<any>[] = [];
        if (files.cover && game.cover != props.data?.cover) {
            promises.push(upload(
                'game',
                game.title,
                'cover',
                list => setGame('cover', list[0]),
                [files.cover]
            ));
        }

        if (files.banner && game.banner != props.data?.banner) {
            promises.push(upload(
                'game',
                game.title,
                'banner',
                list => setGame('banner', list[0]),
                [files.banner]
            ));
        }

        if (files.screens.length > 0) {
            if (!data)
                promises.push(upload(
                    'game',
                    game.title,
                    'images',
                    list => setGame('images', list),
                    files.screens
                ));
            else {
                uploadScreenshots(game, files, data, files => setGame('images', files));

            }
        }
        await Promise.all(promises);
        setState({ uploadOk: true });
    } catch (error) {
        console.error(error);
        setState({ uploadError: true })
    }
    finally {
        setState({ isUploading: false })
    }
}

async function uploadScreenshots(
    game: Game,
    files: GameImages,
    data: Game & { tags: string[]; },
    setImages: (files: string[]) => void
    ) {
    const arr = game.images.map((img, i) => ({
        url: img,
        file: files.screens[i],
    }));
    const newFiles = getNewImages(data.images, arr);
    const res = await uploadMultiple('game', game.title, 'images', newFiles.map(x => x.file))
    const arrCopy = [...game.images]
    newFiles.forEach((val, i) => {
        arrCopy[val.i] = res[i].url;
    })
    setImages(arrCopy);
}

function getNewImages(original: string[], current: { url: string, file: File }[]) {
    const arr: { i: number, url: string, file: File }[] = [];
    current.forEach((val, i) => {
        if (!original.includes(val.url))
            arr.push({ url: val.url, i, file: val.file })
    })
    return arr
}
