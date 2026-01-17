<template>
  <div
    class="flex flex-row md:flex-col lg:flex-row items-start lg:items-center gap-6 rounded-md bg-white shadow-[0_2px_5px_0_#C7C1A84D] p-6 md:p-8 lg:p-8 w-full h-full min-h-[180px] md:min-h-[240px] lg:min-h-[220px]"
  >
    <div class="relative w-12 h-12 md:w-14 md:h-14 lg:w-20 lg:h-20 flex-shrink-0">
      <img :alt="alt" class="object-contain w-full h-full" :src="image" />
    </div>
    <div class="flex flex-col flex-1 min-w-0">
      <span class="typography-h4 mb-2 md:mb-3">
        {{ title }}
      </span>
      <span class="font-roboto font-normal text-text-primary text-[12px] leading-relaxed">
        {{ subtitle }}
      </span>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    image: {
      type: String,
    },
    alt: {
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
