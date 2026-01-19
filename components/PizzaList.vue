<template>
  <section class="flex flex-col lg:my-40 md:my-20 my-10">
    <div class="flex flex-col items-center gap-5">
      <span class="typography-h2"> Выберите пиццу </span>
      <div class="flex flex-row gap-7 md:gap-10 mb-10">
        <button
          :class="[
            'font-alegreya cursor-pointer lg:text-[18px] md:text-[16px] font-black hover:text-[#E52D2D] transition-colors',
            activeFilter === 'all' ? 'text-[#E52D2D]' : 'text-[#000000]',
          ]"
          @click="() => filterPizzas('all')"
        >
          Все
        </button>
        <button
          :class="[
            'font-alegreya cursor-pointer lg:text-[18px] md:text-[16px] font-black hover:text-[#E52D2D] transition-colors',
            activeFilter === 'hot' ? 'text-[#E52D2D]' : 'text-[#000000]',
          ]"
          @click="() => filterPizzas('hot')"
        >
          Острые
        </button>
        <button
          :class="[
            'font-alegreya cursor-pointer lg:text-[18px] md:text-[16px] font-black hover:text-[#E52D2D] transition-colors',
            activeFilter === 'meat' ? 'text-[#E52D2D]' : 'text-[#000000]',
          ]"
          @click="() => filterPizzas('meat')"
        >
          Мясные
        </button>
        <button
          :class="[
            'font-alegreya cursor-pointer lg:text-[18px] md:text-[16px] font-black hover:text-[#E52D2D] transition-colors',
            activeFilter === 'cheese' ? 'text-[#E52D2D]' : 'text-[#000000]',
          ]"
          @click="() => filterPizzas('cheese')"
        >
          Сырные
        </button>
        <button
          :class="[
            'font-alegreya cursor-pointer lg:text-[18px] md:text-[16px] font-black hover:text-[#E52D2D] transition-colors',
            activeFilter === 'vegan' ? 'text-[#E52D2D]' : 'text-[#000000]',
          ]"
          @click="() => filterPizzas('vegan')"
        >
          Веганские
        </button>
      </div>
    </div>
    <div
      class="w-full flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8 md:grid md:grid-cols-3 lg:grid-cols-4"
    >
      <PizzaCard
        height="auto"
        width="auto"
        v-for="product in pizzaList"
        :key="product.id"
        :product="product"
        @add-to-cart="handleAddToCart"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { pizzas } from '~/configs';
  import type { CartPizza, Product } from '~/types';
  import PizzaCard from './ui/pizza-card/PizzaCard.vue';

  type PizzaType = 'all' | 'hot' | 'meat' | 'cheese' | 'vegan';

  const pizzaList = ref<Product[]>(pizzas);
  const activeFilter = ref<PizzaType>('all');

  const emit = defineEmits<{
    (e: 'add-to-cart', cartPizza: CartPizza): void;
  }>();

  const handleAddToCart = (cartPizza: CartPizza) => {
    emit('add-to-cart', cartPizza);
  };

  const filterPizzas = (type: PizzaType) => {
    activeFilter.value = type;

    if (type === 'all') {
      pizzaList.value = pizzas;
    } else {
      const filtered = pizzas.filter((pizza) => pizza.type === type);
      pizzaList.value = filtered;
    }
  };
</script>
