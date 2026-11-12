const crypto = await import("crypto");
export function createHexId() {
    return [...crypto.getRandomValues(new Uint8Array(20))]
        .map((m) => ("0" + m.toString(16))
        .slice(-2))
        .join("");
}
export function getMostRecent(acc, curr) {
    var _a;
    const lastReviewed = (_a = curr.lastReviewedAt) === null || _a === void 0 ? void 0 : _a.split("/").map((str) => Number(str));
    if (!lastReviewed)
        return acc;
    const [day, month, year] = lastReviewed;
    const [accDay, accMonth, accYear] = acc;
    if (year > accYear) {
        acc = lastReviewed;
        return acc;
    }
    if (month > accMonth && year === accYear) {
        acc = lastReviewed;
        return acc;
    }
    if (day > accDay && month === accMonth && year === accYear) {
        acc = lastReviewed;
        return acc;
    }
    return acc;
}
export async function getPlaylistVideos(apiKey, playlistId) {
    if (!apiKey || !playlistId)
        return;
    try {
        const res = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${apiKey}`);
        const data = await res.json();
        return data.items;
    }
    catch (err) {
        console.error(err);
        return;
    }
}
export async function setAwaitLimit(promise, awaitLimit, resolveValue) {
    let timeoutId;
    const promiseWithTimeout = new Promise((resolve) => {
        timeoutId = setTimeout(() => resolve(resolveValue), awaitLimit);
    });
    return Promise.race([promise, promiseWithTimeout]).finally(() => clearTimeout(timeoutId));
}
//# sourceMappingURL=utils.js.map