export function arrayChanged<T>(oldArr: T[], newArr: T[]) {
    const ogSet = new Set(oldArr);
    const newSet = new Set(newArr);
    for (const val of newSet) {
        if (!ogSet.has(val))
            return true;
    }
    for (const val of ogSet) {
        if (!newSet.has(val))
            return true
    }
    return false;
}

export function itemsAddedToArray<T>(oldArr: T[], newArr: T[]) {
    const ogSet = new Set(oldArr);
    const newSet = new Set(newArr);
    for (const val of newSet) {
        if (!ogSet.has(val))
            return true;
    }
    return false;
}