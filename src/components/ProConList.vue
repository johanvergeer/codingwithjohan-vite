<template>
  <div>
    <h4 v-if="title">{{ title }}</h4>
    <div
      class="grid"
      :class="[`md:grid-cols-${columns}`, columns > 1 ? 'gap-4' : '']"
    >
      <ul
        class="procon list-none list-outside"
        :class="[columns > 1 ? '' : 'procon-list-mb']"
      >
        <li v-for="(pro, index) in pros" :key="`pro-${index}`" class="flex">
          <div class="mr-5 pt-2"><akar-icons-circle-plus-fill /></div>
          <div>{{ pro }}</div>
        </li>
      </ul>
      <ul class="procon list-none list-outside">
        <li v-for="(con, index) in cons" :key="`con-${index}`" class="flex">
          <div class="mr-5 pt-2"><akar-icons-circle-minus-fill /></div>
          <div>{{ con }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue"
import type { PropType } from "vue-demi"

defineProps({
  columns: { type: Number, default: 2 },
  title: { type: String, default: "Pro's and Con's" },
  pros: { type: Array as PropType<String[]> },
  cons: { type: Array as PropType<String[]> },
})
</script>

<style scoped>
.procon {
  padding-left: 0;
}

.procon-list-mb {
  @apply mb-5;
}
</style>
