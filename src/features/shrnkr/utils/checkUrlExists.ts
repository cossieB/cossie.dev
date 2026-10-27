export async function checkUrlExists(targetUrl: string, timeoutMs = 5000): Promise<boolean> {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

        let response = await fetch(targetUrl, {
            method: "HEAD",
            signal: controller.signal,
            headers: {
                "User-Agent": "Shrnkr-Bot/1.0",
            },
        });

        if (response.status === 405 || response.status === 403) {
            response = await fetch(targetUrl, {
                method: "GET",
                signal: controller.signal,
                headers: {
                    "User-Agent": "Shrnkr-Bot/1.0",
                },
            });
        }

        clearTimeout(timeoutId);

        return response.ok || (response.status >= 200 && response.status < 400);
    } 
    catch {
        return false;
    }
}