import { createSignal, createMemo, onMount, For, Show, onCleanup, createUniqueId } from "solid-js";
import { createStore, produce } from "solid-js/store";
import styles from "./ImageConverter.module.css";
import { TrashIcon, DownloadIcon, Link2Icon, Link2OffIcon, LoaderCircleIcon } from "lucide-solid";
import { canConvertToFormat, convertImage, type ImageFormat } from "../utils/canConvertToFormat";

type Status = "idle" | "converting" | "done" | "error";

type Item = {
    id: string;
    file: File;
    objectUrl: string;
    format: ImageFormat;
    status: Status;
    resultBlob?: Blob;
    resultUrl?: string;
    errorMessage?: string;
    naturalWidth?: number;
    naturalHeight?: number;
    // Desired output dimensions. Undefined means "keep original".
    resizeWidth?: number;
    resizeHeight?: number;
    lockAspect: boolean;
};

const CANDIDATE_FORMATS: ImageFormat[] = ["webp", "jpeg", "png", "avif"];

function formatBytes(bytes: number) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

function swapExtension(fileName: string, format: ImageFormat) {
    const ext = format === "jpeg" ? "jpg" : format;
    const dot = fileName.lastIndexOf(".");
    const base = dot > 0 ? fileName.slice(0, dot) : fileName;
    return `${base}.${ext}`;
}

function readDimensions(objectUrl: string): Promise<{ width: number; height: number }> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
        img.onerror = () => reject(new Error("Could not read image dimensions"));
        img.src = objectUrl;
    });
}

function parseDimension(raw: string): number | undefined {
    if (raw.trim() === "") return undefined;
    const n = Math.round(Number(raw));
    return Number.isFinite(n) && n > 0 ? n : undefined;
}

export default function ImageConverter() {
    const [list, setList] = createStore<Item[]>([]);
    const [isDragging, setIsDragging] = createSignal(false);
    const [availableFormats, setAvailableFormats] = createSignal<ImageFormat[]>([]); //formats browser can encode
    
    onMount(() => {
        setAvailableFormats(CANDIDATE_FORMATS.filter((f) => canConvertToFormat(`image/${f}`)));
    });

    const defaultFormat = createMemo(() => availableFormats()[0] ?? "webp");

    const findIndex = (id: string) => list.findIndex((item) => item.id === id);

    const invalidateResult = (items: Item[], index: number) => {
        const item = items[index];
        if (item.resultUrl) URL.revokeObjectURL(item.resultUrl);
        item.status = "idle";
        item.resultBlob = undefined;
        item.resultUrl = undefined;
        item.errorMessage = undefined;
    };

    const handleFiles = (files: FileList | null) => {
        if (!files) return;

        const newItems: Item[] = Array.from(files).map((file) => ({
            id: createUniqueId(),
            file,
            objectUrl: URL.createObjectURL(file),
            format: defaultFormat(),
            status: "idle",
            lockAspect: true,
        }));

        setList((prev) => [...prev, ...newItems]);

        newItems.forEach((item) => {
            readDimensions(item.objectUrl)
                .then(({ width, height }) => {
                    const index = findIndex(item.id);
                    if (index === -1) return;
                    setList(produce((items) => {
                        items[index].naturalWidth = width;
                        items[index].naturalHeight = height;
                    }));
                })
                .catch(() => { /* Preview still works without known dimensions */ });
        });
    };

    const removeFile = (id: string) => {
        const index = findIndex(id);
        if (index === -1) return;
        const item = list[index];
        URL.revokeObjectURL(item.objectUrl); // Prevent memory leaks
        if (item.resultUrl) URL.revokeObjectURL(item.resultUrl);
        setList((prev) => prev.filter((i) => i.id !== id));
    };

    const setFormat = (id: string, format: ImageFormat) => {
        const index = findIndex(id);
        if (index === -1) return;
        setList(produce((items) => {
            items[index].format = format;
            invalidateResult(items, index);
        }));
    };

    const setWidth = (id: string, raw: string) => {
        const index = findIndex(id);
        if (index === -1) return;
        setList(produce((items) => {
            const item = items[index];
            const width = parseDimension(raw);
            item.resizeWidth = width;
            if (item.lockAspect && width && item.naturalWidth && item.naturalHeight) {
                item.resizeHeight = Math.round((width * item.naturalHeight) / item.naturalWidth);
            }
            invalidateResult(items, index);
        }));
    };

    const setHeight = (id: string, raw: string) => {
        const index = findIndex(id);
        if (index === -1) return;
        setList(produce((items) => {
            const item = items[index];
            const height = parseDimension(raw);
            item.resizeHeight = height;
            if (item.lockAspect && height && item.naturalWidth && item.naturalHeight) {
                item.resizeWidth = Math.round((height * item.naturalWidth) / item.naturalHeight);
            }
            invalidateResult(items, index);
        }));
    };

    const toggleLock = (id: string) => {
        const index = findIndex(id);
        if (index === -1) return;
        setList(produce((items) => {
            const item = items[index];
            item.lockAspect = !item.lockAspect;
            // Re-sync height to the current width under the new lock, if we can.
            if (item.lockAspect && item.resizeWidth && item.naturalWidth && item.naturalHeight) {
                item.resizeHeight = Math.round((item.resizeWidth * item.naturalHeight) / item.naturalWidth);
            }
        }));
    };

    const convertOne = async (id: string) => {
        const index = findIndex(id);
        if (index === -1) return;

        setList(produce((items) => {
            items[index].status = "converting";
            items[index].errorMessage = undefined;
        }));

        try {
            const item = list[index];
            const blob = await convertImage(item.file, {
                format: item.format,
                width: item.resizeWidth,
                height: item.resizeHeight,
            });
            const url = URL.createObjectURL(blob);

            setList(produce((items) => {
                const i = findIndex(id);
                if (i === -1) {
                    // Item was removed while converting; discard the result.
                    URL.revokeObjectURL(url);
                    return;
                }
                if (items[i].resultUrl) URL.revokeObjectURL(items[i].resultUrl!);
                items[i].resultBlob = blob;
                items[i].resultUrl = url;
                items[i].status = "done";
            }));
        } catch (err) {
            setList(produce((items) => {
                const i = findIndex(id);
                if (i === -1) return;
                items[i].status = "error";
                items[i].errorMessage = err instanceof Error ? err.message : "Conversion failed";
            }));
        }
    };

    const convertAll = () => {
        list.forEach((item) => {
            if (item.status === "idle" || item.status === "error") {
                convertOne(item.id);
            }
        });
    };

    const pendingCount = createMemo(
        () => list.filter((item) => item.status === "idle" || item.status === "error").length
    );

    onCleanup(() => {
        list.forEach((item) => {
            URL.revokeObjectURL(item.objectUrl);
            if (item.resultUrl) URL.revokeObjectURL(item.resultUrl);
        });
    });

    return (
        <div class={styles.wrapper}>
            <div
                class={`${styles.uploadbox} ${isDragging() ? styles.dragging : ''}`}
                onDragEnter={() => setIsDragging(true)}
                onDragLeave={() => setIsDragging(false)}
                onDrop={() => setIsDragging(false)}
            >
                <input
                    class={styles.fileInput}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleFiles(e.target.files)}
                    title="" 
                />
                <div class={styles.uploadContent}>
                    <svg class={styles.uploadIcon} xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
                    <p class={styles.uploadText}>
                        <strong>Click to upload</strong> or drag and drop files here
                    </p>
                    <p class={styles.uploadSubtext}>Image Files</p>
                </div>
            </div>

            <Show when={list.length > 0}>
                <div class={styles.toolbar}>
                    <span class={styles.toolbarCount}>{list.length} file{list.length === 1 ? '' : 's'}</span>
                    <button
                        class={styles.convertAllBtn}
                        onClick={convertAll}
                        disabled={pendingCount() === 0}
                    >
                        Convert all
                    </button>
                </div>
            </Show>

            <div class={styles.files}>
                <For each={list}>
                    {(item) => (
                        <div class={styles.file}>
                            <div class={styles.fileRow}>
                                <img
                                    src={item.objectUrl}
                                    alt={item.file.name}
                                    class={styles.preview}
                                />
                                <div class={styles.fileDetails}>
                                    <span class={styles.fileName}>{item.file.name}</span>
                                    <span class={styles.fileMeta}>
                                        {formatBytes(item.file.size)} • {item.file.type.split('/')[1]?.toUpperCase()}
                                        <Show when={item.naturalWidth && item.naturalHeight}>
                                            {' '}• {item.naturalWidth}×{item.naturalHeight}
                                        </Show>
                                    </span>
                                    <Show when={item.status === "done" && item.resultBlob}>
                                        <span class={styles.resultMeta}>
                                            → {formatBytes(item.resultBlob!.size)} {item.format.toUpperCase()}
                                            <Show when={item.resizeWidth && item.resizeHeight}>
                                                {' '}({item.resizeWidth}×{item.resizeHeight})
                                            </Show>
                                        </span>
                                    </Show>
                                    <Show when={item.status === "error"}>
                                        <span class={styles.errorMeta}>{item.errorMessage}</span>
                                    </Show>
                                </div>

                                <button
                                    class={styles.deleteBtn}
                                    onClick={() => removeFile(item.id)}
                                    aria-label="Remove image"
                                >
                                    <TrashIcon />
                                </button>
                            </div>

                            <div class={styles.controlsRow}>
                                <select
                                    class={styles.formatSelect}
                                    value={item.format}
                                    disabled={item.status === "converting"}
                                    onChange={(e) => setFormat(item.id, e.currentTarget.value as ImageFormat)}
                                >
                                    <For each={availableFormats()}>
                                        {(format) => <option value={format}>{format.toUpperCase()}</option>}
                                    </For>
                                </select>

                                <div class={styles.dimensionGroup}>
                                    <input
                                        type="number"
                                        class={styles.dimensionInput}
                                        placeholder={item.naturalWidth ? String(item.naturalWidth) : "W"}
                                        min="1"
                                        value={item.resizeWidth ?? ""}
                                        disabled={item.status === "converting"}
                                        onInput={(e) => setWidth(item.id, e.currentTarget.value)}
                                        aria-label="Output width in pixels"
                                    />
                                    <button
                                        class={styles.lockBtn}
                                        classList={{ [styles.lockBtnActive]: item.lockAspect }}
                                        onClick={() => toggleLock(item.id)}
                                        disabled={item.status === "converting"}
                                        aria-label={item.lockAspect ? "Unlock aspect ratio" : "Lock aspect ratio"}
                                        title={item.lockAspect ? "Aspect ratio locked" : "Aspect ratio unlocked"}
                                    >
                                        <Show when={item.lockAspect} fallback={<Link2OffIcon size={14} />}>
                                            <Link2Icon size={14} />
                                        </Show>
                                    </button>
                                    <input
                                        type="number"
                                        class={styles.dimensionInput}
                                        placeholder={item.naturalHeight ? String(item.naturalHeight) : "H"}
                                        min="1"
                                        value={item.resizeHeight ?? ""}
                                        disabled={item.status === "converting"}
                                        onInput={(e) => setHeight(item.id, e.currentTarget.value)}
                                        aria-label="Output height in pixels"
                                    />
                                </div>

                                <Show
                                    when={item.status !== "done"}
                                    fallback={
                                        <a
                                            class={styles.downloadBtn}
                                            href={item.resultUrl}
                                            download={swapExtension(item.file.name, item.format)}
                                            aria-label="Download converted image"
                                        >
                                            <DownloadIcon size={16} />
                                            Download
                                        </a>
                                    }
                                >
                                    <button
                                        class={styles.convertBtn}
                                        onClick={() => convertOne(item.id)}
                                        disabled={item.status === "converting"}
                                    >
                                        <Show when={item.status === "converting"} fallback="Convert">
                                            <LoaderCircleIcon size={16} class={styles.spinner} />
                                        </Show>
                                    </button>
                                </Show>
                            </div>
                        </div>
                    )}
                </For>
            </div>
        </div>
    );
}
