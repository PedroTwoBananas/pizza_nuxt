<template>
  <div
    ref="containerRef"
    :id="id"
    :class="[
      bem(),
      disabled ? bem(null, 'disabled') : '',
      fullWidth ? bem(null, 'fullWidth') : '',
      className,
    ]"
  >
    <label
      v-if="label"
      :for="`${id}-input`"
      :class="[bem('label'), disabled ? bem('label', 'disabled') : '', labelClassName]"
    >
      {{ label }}
    </label>

    <div :class="[bem('wrapper'), fullWidth ? bem('wrapper', 'fullWidth') : '']">
      <button
        type="button"
        :class="[
          bem('button'),
          bem('button', 'decrement'),
          isDecrementDisabled ? bem('button', 'disabled') : '',
          buttonClassName,
        ]"
        @click="handleDecrement"
        :disabled="isDecrementDisabled"
        aria-label="Уменьшить"
      >
        <span :class="[bem('icon'), bem('icon', 'minus')]">
          <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 12H18"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
      </button>

      <div class="relative">
        <input
          :id="`${id}-input`"
          type="text"
          readonly
          :value="modelValue"
          :class="[bem('input'), disabled ? bem('input', 'disabled') : '', inputClassName]"
          :aria-label="label || 'Количество'"
          tabindex="-1"
        />
      </div>

      <button
        type="button"
        :class="[
          bem('button'),
          bem('button', 'increment'),
          isIncrementDisabled ? bem('button', 'disabled') : '',
          buttonClassName,
        ]"
        @click="handleIncrement"
        :disabled="isIncrementDisabled"
        aria-label="Увеличить"
      >
        <span :class="[bem('icon'), bem('icon', 'plus')]">
          <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 6V18M18 12H6"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, watch } from 'vue';

  export interface CounterProps {
    label?: string;
    min?: number;
    max?: number;
    step?: number;
    modelValue: number;
    className?: string;
    containerClassName?: string;
    labelClassName?: string;
    inputClassName?: string;
    buttonClassName?: string;
    disabled?: boolean;
    fullWidth?: boolean;
    id?: string;
  }

  const props = withDefaults(defineProps<CounterProps>(), {
    min: 1,
    max: 99,
    step: 1,
    disabled: false,
    fullWidth: false,
  });

  const emit = defineEmits<{
    (e: 'update:modelValue', value: number): void;
  }>();

  const containerRef = ref<HTMLElement>();
  const generatedId = `counter-${Math.random().toString(36).substr(2, 9)}`;
  const id = props.id || generatedId;

  // Инициализация BEM
  const bem = createBem('counter', useCssModule());

  // Вычисляемые свойства
  const isDecrementDisabled = computed(() => props.disabled || props.modelValue <= props.min);

  const isIncrementDisabled = computed(() => props.disabled || props.modelValue >= props.max);

  // Обработчики событий
  const handleDecrement = () => {
    if (isDecrementDisabled.value) return;

    const newValue = props.modelValue - props.step;
    const finalValue = Math.max(props.min, newValue);

    emit('update:modelValue', finalValue);
  };

  const handleIncrement = () => {
    if (isIncrementDisabled.value) return;

    const newValue = props.modelValue + props.step;
    const finalValue = Math.min(props.max, newValue);

    emit('update:modelValue', finalValue);
  };

  // Обработка клавиатуры
  const handleKeyDown = (event: KeyboardEvent) => {
    if (props.disabled) return;

    switch (event.key) {
      case 'ArrowUp':
      case '+':
        event.preventDefault();
        handleIncrement();
        break;
      case 'ArrowDown':
      case '-':
        event.preventDefault();
        handleDecrement();
        break;
      case 'Home':
        event.preventDefault();
        emit('update:modelValue', props.min);
        break;
      case 'End':
        event.preventDefault();
        emit('update:modelValue', props.max);
        break;
    }
  };

  // Добавляем обработчики клавиатуры
  onMounted(() => {
    if (containerRef.value) {
      containerRef.value.addEventListener('keydown', handleKeyDown);
    }
  });

  // Экспорт методов если нужно
  defineExpose({
    increment: handleIncrement,
    decrement: handleDecrement,
    reset: () => emit('update:modelValue', props.min),
  });
</script>

<style lang="scss" module>
  .counter {
    display: inline-flex;
    flex-direction: column;
    align-items: center;

    &_disabled {
      .counter__input {
        background-color: #f9fafb;
        border-color: #e5e7eb !important;
        color: #6b7280;
      }

      .counter__button,
      .counter__input {
        opacity: 0.6;
        cursor: not-allowed;
      }

      .counter__icon path {
        opacity: 0.7;
      }
    }

    &_fullWidth {
      width: 100%;

      .counter__container {
        width: 100%;
        align-items: stretch;
      }
    }

    &__container {
      display: inline-flex;
      flex-direction: column;
      align-items: center;

      &_fullWidth {
        width: 100%;
        align-items: stretch;

        .counter__wrapper {
          width: 100%;
          justify-content: space-between;
        }
      }
    }

    &__wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;

      &_fullWidth {
        width: 100%;
        justify-content: space-between;
      }
    }

    &__button {
      position: relative;
      cursor: pointer;
      user-select: none;
      width: 24px;
      height: 24px;
      min-width: 24px;
      min-height: 24px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      border-radius: 50%;
      transition: all 0.2s ease;
      background-color: #c5cbd5;

      &:focus {
        outline: none;
        box-shadow: 0 0 0 2px rgba(229, 45, 45, 0.2);
      }

      &_decrement {
        &:not(:disabled):hover {
          background-color: #e52d2d;
        }

        &:active:not(:disabled) {
          background-color: #e52d2d;
          transform: scale(0.95);
        }
      }

      &_increment {
        &:not(:disabled):hover {
          background-color: #e52d2d;
        }

        &:active:not(:disabled) {
          background-color: #e52d2d;
          transform: scale(0.95);
        }
      }

      &_disabled {
        background-color: #eef0f3 !important;
        cursor: not-allowed;

        .counter__icon path {
          stroke: white !important;
          opacity: 0.7;
        }
      }

      &:active:not(:disabled)::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(229, 45, 45, 0.1);
        border-radius: 50%;
        animation: ripple 0.3s ease-out;
      }
    }

    &__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 12px;
      height: 12px;

      &_minus,
      &_plus {
        transition: all 0.2s ease;

        path {
          stroke: white !important;
        }
      }
    }

    &__input {
      font-family: inherit;
      width: 60px;
      height: 40px;
      min-width: 60px;
      min-height: 40px;
      text-align: center;
      font-size: 1rem;
      font-weight: 600;
      border: 1px solid #c4c7ca;
      border-radius: 4px;
      background-color: white;
      box-shadow: none;
      padding: 0 0.5rem;
      transition: border-color 0.2s ease;

      &:focus {
        outline: none;
        border-color: #c4c7ca;
        box-shadow: none;
      }

      &[readonly] {
        pointer-events: none;
        background-color: white;
        cursor: default;

        &:focus {
          border-color: #c4c7ca;
        }
      }

      &_disabled {
        background-color: #f9fafb;
        border-color: #e5e7eb;
        color: #6b7280;
      }

      &:not(:disabled):hover {
        border-color: #9ca3af;
      }
    }

    &__label {
      font-size: 0.875rem;
      font-weight: 500;
      margin-bottom: 0.5rem;
      color: #374151;
      display: block;

      &_disabled {
        opacity: 0.6;
        color: #9ca3af;
      }
    }
  }

  @keyframes ripple {
    0% {
      transform: scale(0);
      opacity: 1;
    }
    100% {
      transform: scale(1.5);
      opacity: 0;
    }
  }
</style>
