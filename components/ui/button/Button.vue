<template>
  <button
    ref="buttonRef"
    :class="[
      bem(),
      fullWidth && bem(null, 'fullWidth'),
      disabled && bem(null, 'disabled'),
      tailwindClasses,
    ]"
    :disabled="disabled"
    :aria-disabled="disabled"
    v-bind="$attrs"
    @click="handleClick"
  >
    <span :class="bem('content')">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';

  interface ButtonProps {
    fullWidth?: boolean;
    disabled?: boolean;
    class?: string;
  }

  const props = withDefaults(defineProps<ButtonProps>(), {
    fullWidth: false,
    disabled: false,
  });

  const emit = defineEmits<{
    click: [event: MouseEvent];
  }>();

  const buttonRef = ref<HTMLButtonElement>();

  const bem = createBem('button', useCssModule());

  const tailwindClasses = computed(() => {
    const classes = [
      'px-10 py-2 md:px-12 md:py-3 lg:px-14 lg:py-4',

      'inline-flex items-center justify-center',
      'font-bold transition-all duration-200',
      'rounded-md',

      props.disabled ? 'cursor-not-allowed' : 'cursor-pointer',

      props.fullWidth && 'w-full',

      props.class,
    ]
      .filter(Boolean)
      .join(' ');

    return classes;
  });

  const handleClick = (event: MouseEvent) => {
    if (!props.disabled && emit) {
      emit('click', event);
    }
  };

  defineExpose({
    buttonRef,
  });
</script>

<style lang="scss" module>
  .button {
    font-size: 18px;
    position: relative;
    cursor: pointer;
    user-select: none;
    letter-spacing: 1px;
    text-transform: uppercase;
    font-weight: 900;
    background-color: #e52d2d;
    color: #ffffff;
    font-family: 'Alegreya';

    &::-moz-focus-inner {
      border: 0;
      padding: 0;
    }

    &_disabled {
      background-color: #dbdbdb;
      color: #939393;
    }

    &:hover:not(.button_disabled) {
      background-color: #ff3c3c;
    }

    &:active:not(.button_disabled) {
      background-color: #bf221e;
    }

    &:focus {
      outline: 3px solid #8fc9ff;
    }

    &_fullWidth {
      display: flex;
      width: 100%;

      .button__content {
        justify-content: center;
        width: 100%;
      }
    }

    &__content {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    }
  }
</style>
