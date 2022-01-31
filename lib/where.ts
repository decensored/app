export const inBrowser: boolean = typeof window !== 'undefined'
export const onServer = !inBrowser
