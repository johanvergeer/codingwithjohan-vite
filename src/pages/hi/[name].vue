<script setup lang="ts">
import { useUserStore } from "~/stores/user"

const props = defineProps<{ name: string }>()
const router = useRouter()
const user = useUserStore()

watchEffect(() => {
  user.setNewName(props.name)
})
</script>

<template>
  <div>
    <p class="text-4xl">
      <carbon-pedestrian class="inline-block" />
    </p>
    <p>Hi {{ props.name }}</p>

    <p class="text-sm opacity-50">
      <em></em>
    </p>

    <div>
      <button class="btn m-3 text-sm mt-6" @click="router.back()">Back</button>
    </div>
  </div>
</template>
