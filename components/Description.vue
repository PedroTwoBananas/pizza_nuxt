<script setup lang="ts">
  import DescriptionCard from './ui/description-card/DescriptionCard.vue';
</script>

<template>
  <section class="bg-[#F8F6F3] w-screen relative left-1/2 -translate-x-1/2">
    <div
      class="flex flex-col items-center gap-6 md:gap-8 lg:gap-10 responsive-container py-20 md:py-24 lg:mt-40"
    >
      <span class="typography-h2 text-center"> Доставка и оплата </span>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8 w-full">
        <DescriptionCard
          alt="Заказ"
          image="/images/call.png"
          title="Заказ"
          subtitle="После оформления заказа мы свяжемся с вами для уточнения деталей."
        />
        <DescriptionCard
          alt="Доставка курьером"
          image="/images/deliver.png"
          title="Доставка курьером"
          subtitle="Мы доставим вашу пиццу горячей. Бесплатная доставка по городу."
        />
        <DescriptionCard
          alt="Оплата"
          image="/images/bill.png"
          title="Оплата"
          subtitle="Оплатить можно наличными или картой курьеру. И золотом тоже можно."
        />
      </div>
    </div>
  </section>
</template>
