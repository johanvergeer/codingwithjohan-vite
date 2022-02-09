<template>
  <div class="alert border-l-4 p-4 mb-4 mt-4" :class="`alert-${type}`">
    <div class="flex">
      <div class="flex-shrink-0 self-start pt-1">
        <carbon-information-filled v-if="type === 'info'" />
        <carbon-notebook v-else-if="type === 'note'" class="alert-note" />
        <carbon-next-outline v-else-if="type === 'next'" class="alert-next" />
        <carbon-star-filled v-else-if="type === 'star'" class="alert-star" />
      </div>
      <div class="ml-2 alert-content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ type: string }>()
</script>

<style scoped>
.alert p {
  @apply m-0;
}

/* Note Icon */
.alert-note {
  @apply bg-gray-200 border-gray-400

  .alert-icon {
    @apply text-gray-400;
  }

  .alert-content {
    @apply text-gray-700;
  }

  .alert-info .dark-mode .alert-note {
    @apply bg-gray-900 border-gray-700;
  }
}

/* Next Icon */
.alert-next {
  @apply bg-gray-100 border-gray-400;

  code {
    @apply bg-gray-200 shadow-none;
  }

  .alert-icon {
    @apply text-gray-400;
  }

  .alert-content {
    @apply text-gray-700;
  }
}

/* Star Icon */
.alert-star {
  @apply bg-purple-100 border-purple-400;

  code {
    @apply bg-purple-200 shadow-none;
  }

  .alert-icon {
    @apply text-purple-400;
  }

  .alert-content {
    @apply text-purple-700;
  }
}
</style>
