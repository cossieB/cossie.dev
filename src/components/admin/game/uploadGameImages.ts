import { GameImages } from "./types";
import { upload, uploadAndUpdateUrl } from "~/utils/uploadToUploadThing";
import { Props } from "./GameForm";
import { SetStoreFunction } from "solid-js/store";
import { Game } from "~/drizzle/types";

type State = {
    isUploading: boolean;
    uploadOk: boolean;
    uploadErrored: boolean;
}

export async function uploadGameImages(
    files: GameImages,
    props: Props,
    setState: SetStoreFunction<State>,
    game: Game,
    setGame: SetStoreFunction<Game>,
    data?: Game & { tags: string[] }
) {
    setState({ isUploading: true }); 
    
    try {
        const promises: Promise<unknown>[] = [];
        if (files.cover && game.cover != props.data?.cover) {
            promises.push(uploadAndUpdateUrl(
                'game',
                files.cover,
                game.title,
                'cover',
                list => setGame('cover', list[0]),
            ));
        }
        if (files.banner && game.banner != props.data?.banner) {
            promises.push(uploadAndUpdateUrl(
                'game',
                files.banner,
                game.title,
                'banner',
                list => setGame('banner', list[0]),
            ));
        }
        if (files.screens.length > 0) {
            promises.push(uploadScreenshots(
                game,
                files.screens,
                data?.images ?? [],
                files => setGame('images', files)
            ));
        }
        await Promise.all(promises);
        setState({ uploadOk: true });
    } catch (error) {
        console.error(error);
        setState({ uploadErrored: true })
    }
    finally {
        setState({ isUploading: false })
    }
}

async function uploadScreenshots(
    game: Game, // updated game
    files: File[], // files consists of only new images
    oldImages: string[],
    setImages: (files: string[]) => void
) {
    const newFiles = filterNew(oldImages, game.images, files)
    const res = await upload('game', game.title, 'images', newFiles.map(x => x.file))
    const arrCopy = [...game.images];
    newFiles.forEach((val, i) => {
        arrCopy[val.i] = res[i].url;
    })
    setImages(arrCopy);
}

function filterNew(oldImgs: string[], newImgs: string[], files: File[]) {
    const arr: { file: File; i: number, url: string }[] = [];
    const oldSet = new Set(oldImgs)
    let j = 0
    newImgs.forEach((img, i) => {
        if (!oldSet.has(img)) {
            arr.push({ i, url: img, file: files[j] })
            j++
        }
    })
    if (arr.length != files.length)
        throw new Error("Mismatched array sizes", {cause: {arr, files}})
    return arr
}