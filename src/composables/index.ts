export const useBaseUrl = (): string => {
  if (import.meta.env.DEV) {
    return "http://localhost:3333"
  } else {
    return process.env.DEPLOY_PRIME_URL || "http://localhost:3333"
  }
}
