<template>
  <div class="card flex flex-row md:flex-col lg:flex-row items-start lg:items-center gap-6">
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

<style scoped lang="scss">
  .card {
    border-radius: 0.375rem;
    background-color: #ffffff;
    box-shadow: 0 2px 5px 0 rgba(199, 193, 168, 0.3);
    padding: 1.5rem;
    width: 100%;
    height: 100%;
    min-height: 180px;

    @media (min-width: 768px) {
      padding: 2rem;
      min-height: 240px;
    }

    @media (min-width: 1024px) {
      padding: 2rem;
      min-height: 220px;
    }
  }
</style>
