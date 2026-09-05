const formatCache = new Map<string, boolean>();

export function canConvertToFormat(mimeType: string): boolean {
    if (typeof document === 'undefined') return false;
    if (formatCache.has(mimeType)) {
        return formatCache.get(mimeType)!;
    }

    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;

    // Browsers fall back to 'image/png' if the requested MIME type is unsupported
    const dataUrl = canvas.toDataURL(mimeType);
    const isSupported = dataUrl.startsWith(`data:${mimeType}`);

    formatCache.set(mimeType, isSupported);
    return isSupported;
}

export type ImageSource = HTMLImageElement | HTMLCanvasElement | Blob | File | ImageData | string;
export type ImageFormat = 'webp' | 'jpeg' | 'jpg' | 'png' | 'avif' | 'jxl' | string;

export interface ConvertOptions {
    format: ImageFormat;
    quality?: number; // Value between 0.0 and 1.0 (defaults to 0.92 for lossy formats)
    width?: number;   // Optional resizing width
    height?: number;  // Optional resizing height
}

/**
 * Converts an image source into a target format Blob.
 */
export async function convertImage(source: ImageSource, options: ConvertOptions): Promise<Blob> {
    const mimeType = normalizeMimeType(options.format);
    const canvas = await sourceToCanvas(source, options.width, options.height);

    return new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
            (blob) => {
                if (!blob) {
                    return reject(new Error(`Conversion failed for format: ${mimeType}`));
                }

                // Canvas.toBlob falls back to image/png if the format is unsupported
                if (mimeType !== 'image/png' && blob.type === 'image/png') {
                    return reject(new Error(`Browser does not support encoding to ${mimeType}`));
                }

                resolve(blob);
            },
            mimeType,
            options.quality
        );
    });
}


// Helper: Convert any input type into an HTMLCanvasElement
async function sourceToCanvas(
    source: ImageSource,
    targetWidth?: number,
    targetHeight?: number
): Promise<HTMLCanvasElement> {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) throw new Error('Could not get 2D canvas context');

    // Handle HTMLCanvasElement
    if (source instanceof HTMLCanvasElement) {
        canvas.width = targetWidth ?? source.width;
        canvas.height = targetHeight ?? source.height;
        ctx.drawImage(source, 0, 0, canvas.width, canvas.height);
        return canvas;
    }

    // Handle ImageData
    if (source instanceof ImageData) {
        if (targetWidth || targetHeight) {
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = source.width;
            tempCanvas.height = source.height;
            tempCanvas.getContext('2d')?.putImageData(source, 0, 0);

            canvas.width = targetWidth ?? source.width;
            canvas.height = targetHeight ?? source.height;
            ctx.drawImage(tempCanvas, 0, 0, canvas.width, canvas.height);
        } else {
            canvas.width = source.width;
            canvas.height = source.height;
            ctx.putImageData(source, 0, 0);
        }
        return canvas;
    }

    // Handle Blob, File, HTMLImageElement, or URL string via createImageBitmap
    let bitmap: ImageBitmap;
    if (typeof source === 'string') {
        const img = await loadImageFromUrl(source);
        bitmap = await createImageBitmap(img);
    } else if (source instanceof HTMLImageElement) {
        bitmap = await createImageBitmap(source);
    } else {
        // Blob or File
        bitmap = await createImageBitmap(source);
    }

    canvas.width = targetWidth ?? bitmap.width;
    canvas.height = targetHeight ?? bitmap.height;
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close(); // Clean up GPU memory allocation

    return canvas;
}

function normalizeMimeType(format: string): string {
    const lower = format.toLowerCase().trim();
    if (lower.startsWith('image/')) return lower;
    if (lower === 'jpg') return 'image/jpeg';
    return `image/${lower}`;
}

function loadImageFromUrl(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous'; // Enable CORS for remote assets
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load image from URL: ${url}`));
        img.src = url;
    });
}