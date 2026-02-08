export function useLocalStorage<T = any>(key: string) {
    function get() {
        const data = localStorage.getItem(key)
        if (data == null) return null
        return JSON.parse(data) as T
    }
    function set(data: T) {
        localStorage.setItem(key, JSON.stringify(data))
    }
    return [get, set] as const
}