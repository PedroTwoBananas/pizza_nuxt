<script setup lang="ts">
  import AboutCard from './ui/about-card/AboutCard.vue';
</script>

<template>
  <section class="flex flex-col items-center my-10 responsive-container lg:gap-30 md:gap-16 gap-20">
    <AboutCard
      image="/images/traditions.png"
      alt="Традиции"
      title="Изготавливаем пиццу по своим рецептам в лучших традициях"
      subtitle="Наша пицца получается сочной, вкусной и главное хрустящей с нежной и аппетитной начинкой, готовим по своим итальянским рецептам"
    />
    <AboutCard
      image="/images/fresh.png"
      alt="Свежесть"
      title="Используем только свежие ингридиенты"
      subtitle="Ежедневно заготавливаем продукты и овощи для наших пицц, соблюдаем все сроки хранения"
      classReverse="lg:flex-row-reverse md:flex-row-reverse"
    />
    <AboutCard
      image="/images/need_for_speed.png"
      alt="Доставка"
      title="Доставка в течение 60 минут или заказ за нас счёт"
      subtitle="Все наши курьеры - фанаты серии Need for Speed и призеры гонок World Rally Championship и World Superbike во всех категориях"
    />
  </section>
</template>
