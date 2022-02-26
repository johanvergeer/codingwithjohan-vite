import { useEnvironmentInfo } from "~/stores/environmentInfo"

export const useBaseUrl = (): string => {
  const environmentInfo = useEnvironmentInfo()

  return environmentInfo.baseUrl
}
