<template>
  <li>
    <a target="_blank" class="text-white hover:text-gray-400" :href="href">
      <slot></slot>
    </a>
  </li>
</template>

<script setup lang="ts">
interface Props {
  href: string
}

const href = defineProps<Props>()
</script>
