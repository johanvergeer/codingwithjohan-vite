import { createPinia } from "pinia"
import type { UserModule } from "~/types"
import { useEnvironmentInfo } from "~/stores/environmentInfo"

// Setup Pinia
// https://pinia.esm.dev/
export const install: UserModule = ({ isClient, initialState, app }) => {
  const pinia = createPinia()
  app.use(pinia)

  const environmentInfo = useEnvironmentInfo()
  environmentInfo.isProd = import.meta.env.PROD
  environmentInfo.baseUrl = import.meta.env.PROD
    ? // https://docs.netlify.com/configure-builds/environment-variables/#deploy-urls-and-metadata
      process.env.URL || ""
    : "http://localhost:3333"

  // Refer to
  // https://github.com/antfu/vite-ssg/blob/main/README.md#state-serialization
  // for other serialization strategies.
  if (isClient) {
    if (import.meta.env.PROD && !initialState.pinia) {
      throw new Error("The initial state for Pinia should be set!")
    }

    throw new Error("THIS IS NOT AN ERROR")

    pinia.state.value = initialState.pinia || {}
  } else {
    initialState.pinia = pinia.state.value
  }
}
