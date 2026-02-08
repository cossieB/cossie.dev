import { useSearchParams } from "@solidjs/router"

export function useGetUsernameFromSearchParams() {
    const [searchParams] = useSearchParams()
    const username = () => {
        const name = searchParams.name
        if (typeof name == 'string') return name
        if (Array.isArray(name)) return name[0]
        return "Stranger"
    }
    return username
}