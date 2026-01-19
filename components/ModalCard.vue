<!-- components/ModalCardSimple.vue -->
<template>
  <div class="flex justify-between items-center gap-3 p-3 border-b border-gray-100 relative group">
    <!-- Кнопка удаления -->
    <button
      @click="handleRemove"
      class="absolute -top-1 -right-1 w-9 h-9 text-[#A9A9A9] hover:text-red-500 rounded-full flex items-center justify-center text-xl font-light transition-colors hover:bg-gray-100 active:scale-95 opacity-0 group-hover:opacity-100 md:opacity-100"
      aria-label="Удалить пиццу"
    >
      ×
    </button>

    <!-- Левая часть -->
    <div class="flex items-center gap-3 flex-1 min-w-0">
      <div class="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-50">
        <NuxtImg
          :src="pizza.image"
          :alt="pizza.title"
          :width="64"
          :height="64"
          class="w-full h-full object-cover hover:scale-105 transition-transform"
          sizes="64px"
        />
      </div>

      <div class="flex flex-col min-w-0">
        <span class="font-alegreya text-black text-[18px] font-black">
          {{ pizza.title }}
        </span>
        <div class="font-roboto text-[12px] text-black mt-1">{{ pizza.size }} см</div>
      </div>
    </div>

    <!-- Правая часть -->
    <div class="flex items-center gap-8 lg:gap-12">
      <!-- Счетчик -->
      <Counter
        :model-value="pizza.quantity"
        :min="1"
        :max="99"
        @update:model-value="handleQuantityChange"
      />

      <!-- Общая цена -->
      <div class="flex flex-col items-end">
        <div class="font-alegreya font-black text-black text-lg">
          {{ formatPrice(pizza.price * pizza.quantity) }} руб
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { CartPizza } from '~/types';
  import Counter from './ui/counter/Counter.vue';

  interface Props {
    pizza: CartPizza;
  }

  interface Emits {
    (e: 'remove', id: string): void;
    (e: 'quantity-change', id: string, quantity: number): void;
  }

  const props = defineProps<Props>();
  const emit = defineEmits<Emits>();

  const handleRemove = () => {
    emit('remove', props.pizza.id);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemove();
    } else {
      emit('quantity-change', props.pizza.id, newQuantity);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price);
  };
</script>
