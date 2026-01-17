<template>
  <NuxtLink :href="href" class="flex items-center gap-3 group">
    <div class="relative">
      <img :width="40" :height="40" :src="image" alt="Телефон" />
    </div>
    <div class="hidden lg:block">
      <span class="typography-h4 group-hover:text-[#E52D2D] transition-colors">
        {{ title }}
      </span>
      <span class="typography-description block"> {{ subtitle }} </span>
    </div>
  </NuxtLink>
</template>

<script setup>
  const props = defineProps({
    href: {
      type: String,
    },
    image: {
      type: String,
    },
    title: {
      type: String,
    },
    subtitle: {
      type: String,
    },
  });
</script>
