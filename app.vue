<script setup lang="ts">
  import About from './components/About.vue';
  import Header from '~/components/Header.vue';
  import Hero from './components/Hero.vue';
  import type { CartPizza } from './types';
  const isOpenModal = ref(false);
  const openModal = () => {
    isOpenModal.value = true;
  };

  const closeModal = () => {
    isOpenModal.value = false;
  };

  const selectedPizzas = ref<CartPizza[]>([]);

  const handleAddToCart = (cartPizza: CartPizza) => {
    const existingIndex = selectedPizzas.value.findIndex((item) => item.id === cartPizza.id);

    if (existingIndex !== -1) {
      selectedPizzas.value[existingIndex].quantity += 1;
    } else {
      selectedPizzas.value.push(cartPizza);
    }
  };

  // Функция для изменения количества (аналог React версии)
  const handleQuantityChange = (id: string, quantity: number) => {
    selectedPizzas.value = selectedPizzas.value.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
  };

  // Функция для удаления пиццы
  const handleRemovePizza = (id: string) => {
    selectedPizzas.value = selectedPizzas.value.filter((item) => item.id !== id);
  };
</script>

<template>
  <div class="responsive-container">
    <Modal
      :selected-pizzas="selectedPizzas"
      :is-open="isOpenModal"
      @close="closeModal"
      @remove-pizza="handleRemovePizza"
      @quantity-change="handleQuantityChange"
    />
    <Header @open="openModal" />
    <Hero />
    <Offers />
    <PizzaList @add-to-cart="handleAddToCart" />
    <Description />
    <About />
    <Footer />
  </div>
</template>
