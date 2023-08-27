export function getYoutubeURL(iframe: string) {
    return /src\s*=\s*(?:"|')(.+?)(?:"|')/gi.exec(iframe)?.at(1);
}
