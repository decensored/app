export const inBrowser = typeof window !== 'undefined';
export const onServer = !inBrowser;