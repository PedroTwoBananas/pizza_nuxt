<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-[9998] flex items-center justify-center bg-black/90 p-4"
      @click.self="handleBackdropClick"
    >
      <div class="bg-white rounded-xl shadow-lg max-w-[90vh] w-full max-h-[90vh] overflow-y-auto">
        <div class="sticky z-[9998] top-0 bg-white flex justify-between items-center p-4 border-b">
          <span class="font-alegreya lg:text-[32px] md:text-[28px] text-[24px] font-black"
            >Ваш заказ</span
          >
          <button
            @click="handleClose"
            class="p-2 hover:bg-gray-100 rounded transition-colors text-2xl"
          >
            ✕
          </button>
        </div>
        <div class="p-6">
          <div v-if="selectedPizzas.length > 0" class="space-y-4 mb-6">
            <ModalCard
              v-for="pizza in selectedPizzas"
              :key="pizza.id"
              :pizza="pizza"
              @remove="handleRemove"
              @quantity-change="handleQuantityChange"
            />
          </div>
          <div v-if="selectedPizzas.length > 0" class="flex justify-end items-center gap-5">
            <span class="font-alegreya lg:text-[18px] md:text-[14px] text-[14px] font-black">
              Сумма заказа:
            </span>
            <span class="font-alegreya lg:text-[32px] md:text-[28px] text-[24px] font-black"
              >{{ calculateTotalPrice }} руб
            </span>
          </div>
          <div class="flex flex-col">
            <span class="font-alegreya lg:text-[18px] md:text-[14px] text-[8px] font-black">
              Контакты
            </span>
            <div class="flex justify-between">
              <Input placeholder="Ваше имя" label="Ваше имя" />
              <Input placeholder="Телефон" label="Телефон" />
            </div>
            <Input fullWidth placeholder="Адрес доставки" label="Адрес доставки" />
          </div>
          <div class="flex flex-col gap-3 mt-8">
            <span class="font-alegreya lg:text-[18px] md:text-[14px] text-[8px] font-black">
              Способ оплаты
            </span>
            <div class="flex flex-col gap-4">
              <Checkbox label="Оплата наличными или картой курьеру" />
              <Checkbox label="Оплата картой онлайн на сайте" />
            </div>
          </div>

          <Button v-if="selectedPizzas.length > 0" class="mt-6"> Оформить заказ </Button>

          <div class="mt-6">
            <p class="lg:text-[12px] md:text-[10px] text-[8px] text-[#848A9A] leading-relaxed">
              Нажимая кнопку «Оформить заказ» вы соглашаетесь с политикой конфиденциальности
            </p>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
  import type { CartPizza } from '~/types';
  import Button from './ui/button/Button.vue';
  import Input from './ui/input/Input.vue';
  import Checkbox from './ui/checkbox/Checkbox.vue';

  interface Props {
    isOpen: boolean;
    selectedPizzas: CartPizza[];
  }

  interface Emits {
    (e: 'close'): void;
    (e: 'remove-pizza', id: string): void;
    (e: 'quantity-change', id: string, quantity: number): void;
  }

  const props = defineProps<Props>();
  const emit = defineEmits<Emits>();

  const calculateTotalPrice = computed(() => {
    return props.selectedPizzas.reduce((total, pizza) => {
      return total + pizza.price * pizza.quantity;
    }, 0);
  });

  const handleRemove = (id: string) => {
    emit('remove-pizza', id);
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    emit('quantity-change', id, quantity);
  };

  const handleClose = () => {
    emit('close');
  };

  const handleBackdropClick = () => {
    handleClose();
  };

  if (process.client) {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && props.isOpen) {
        handleClose();
      }
    };

    onMounted(() => {
      document.addEventListener('keydown', handleEscape);
    });

    onUnmounted(() => {
      document.removeEventListener('keydown', handleEscape);
    });
  }
</script>
