<script setup lang="ts">
  import OffersCard from './ui/offers-card/OffersCard.vue';
  import { ref } from 'vue';

  const offers = [
    {
      id: 1,
      image: '/images/slide1.png',
      alt: 'Закажи 2 пиццы – 3-я в подарок',
      title: 'Закажи 2 пиццы – 3-я в подарок',
      subtitle: 'При заказе 2-х больших пицц – средняя пицца в подарок',
    },
    {
      id: 2,
      image: '/images/slide2.png',
      alt: 'Напиток в подарок',
      title: 'Напиток в подарок',
      subtitle: 'Скидка на заказ от 3 000 рублей + напиток в подарок',
    },
    {
      id: 3,
      image: '/images/slide3.png',
      alt: '25% при первом заказе',
      title: '25% при первом заказе',
      subtitle: 'Скидка новым клиентам!',
    },
  ];

  const currentSlide = ref(0);

  const goToSlide = (index: number) => {
    currentSlide.value = index;
  };
</script>

<template>
  <div class="offers-section">
    <div class="md:hidden">
      <div class="relative overflow-hidden">
        <div
          class="flex transition-transform duration-300 ease-in-out"
          :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
        >
          <div v-for="offer in offers" :key="offer.id" class="w-full flex-shrink-0">
            <OffersCard
              :image="offer.image"
              :alt="offer.alt"
              :title="offer.title"
              :subtitle="offer.subtitle"
            />
          </div>
        </div>
      </div>

      <div class="flex justify-center gap-2 mt-6">
        <button
          v-for="(_, index) in offers"
          :key="index"
          @click="goToSlide(index)"
          :class="[
            'w-3 h-3 rounded-full',
            currentSlide === index ? 'bg-[#E52D2D]' : 'bg-gray-300 hover:bg-gray-400',
          ]"
          :aria-label="`Перейти к слайду ${index + 1}`"
        />
      </div>
    </div>

    <div class="hidden md:flex flex-row justify-between gap-8">
      <OffersCard
        v-for="offer in offers"
        :key="offer.id"
        :image="offer.image"
        :alt="offer.alt"
        :title="offer.title"
        :subtitle="offer.subtitle"
      />
    </div>
  </div>
</template>
