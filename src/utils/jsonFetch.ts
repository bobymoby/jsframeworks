export const jsonFetch = async <T>(
    input: RequestInfo | URL,
    init?: RequestInit,
) => fetch(input, init).then((res) => res.json() as T)
