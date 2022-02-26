import { defineStore } from "pinia"

export const useEnvironmentInfo = defineStore("environmentInfo", {
  state: () => {
    return {
      isProd: false,
      baseUrl: ""
    }
  }
})
