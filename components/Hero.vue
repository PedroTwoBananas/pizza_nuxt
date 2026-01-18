<script setup lang="ts">
  import Button from './ui/button/Button.vue';
</script>

<template>
  <div
    class="flex flex-col-reverse md:flex-row items-center pt-20 md:pt-28 lg:pt-24 mb-20 md:mb-16 lg:mb-20"
  >
    <div
      class="flex flex-col items-center md:items-start gap-8 flex-shrink-0 w-full md:w-[45%] lg:w-[45%]"
    >
      <div class="flex items-center md:items-start flex-col gap-3">
        <span class="typography-h1"> Пицца на заказ </span>
        <span class="typography-accent text-center">
          Бесплатная и быстрая доставка за час в любое удобное для вас время
        </span>
      </div>
      <Button size="lg" class="w-full md:w-auto">Выбрать пиццу</Button>
    </div>

    <div class="flex-shrink-0 w-auto -mr-24 md:-mr-8 lg:-mr-[12.5%]">
      <NuxtImg
        src="/images/main.png"
        alt="Заказать пиццу"
        class="w-[320px] h-[200px] md:w-[500px] md:h-[315px] lg:w-[1007px] lg:h-[630px] object-contain"
        sizes="(max-width: 768px) 320px, (max-width: 1024px) 500px, 1007px"
        :width="1007"
        :height="630"
        loading="eager"
      />
    </div>
  </div>
</template>
