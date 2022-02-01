export const readableError = (error: any): void =>
  error.toString().split(':').pop().trim()
