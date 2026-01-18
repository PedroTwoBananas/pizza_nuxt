<template>
  <div
    :class="[
      'flex lg:flex-row items-start md:items-center gap-6 lg:gap-12 w-full',
      classReverse || '',
    ]"
  >
    <div class="relative lg:rounded-[130px] md:rounded-[90px] rounded-[60px] overflow-hidden">
      <img :src="image" :alt="alt" class="w-full h-full object-cover" />
    </div>
    <div class="w-full lg:w-1/2">
      <div class="space-y-4">
        <h3 class="typography-h3">
          {{ title }}
        </h3>
        <p class="font-roboto font-normal text-text-primary text-[14px] leading-relaxed">
          {{ subtitle }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  interface Props {
    image: string;
    alt: string;
    title: string;
    subtitle: string;
    classReverse?: string;
  }

  defineProps<Props>();
</script>
