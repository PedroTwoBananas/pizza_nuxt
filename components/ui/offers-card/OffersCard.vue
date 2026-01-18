<template>
  <div class="flex flex-col gap-3 w-full">
    <div class="relative w-full aspect-video md:aspect-[16/9]">
      <NuxtImg
        :src="image"
        :alt="alt"
        class="w-full h-full object-cover rounded-lg"
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 416px"
        width="416"
        height="247"
        loading="lazy"
      />
    </div>
    <div class="flex flex-col gap-2">
      <span class="typography-h4">
        {{ title }}
      </span>
      <span class="!text-black typography-paragraph">
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
