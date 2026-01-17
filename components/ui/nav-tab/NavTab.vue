<template>
  <NuxtLink :href="href" class="typography-h4 hover:text-[#E52D2D] transition-colors">
    <span class="">{{ title }}</span>
  </NuxtLink>
</template>

<script setup>
  const props = defineProps({
    href: {
      type: String,
    },
    title: {
      type: String,
    },
  });
</script>
