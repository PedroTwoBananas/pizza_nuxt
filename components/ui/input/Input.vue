<template>
  <div :class="containerClasses">
    <div :class="wrapperClasses">
      <input
        :id="id"
        ref="inputRef"
        :type="type"
        :class="inputClasses"
        :disabled="disabled"
        :placeholder="placeholder || ' '"
        :aria-invalid="error"
        :aria-describedby="helperText ? `${id}-helper` : undefined"
        :aria-required="required"
        :data-state="error ? 'error' : 'default'"
        v-bind="$attrs"
        @input="handleInput"
      />

      <label v-if="label" :for="id" :class="labelClasses">
        {{ label }}
        <span v-if="required" class="text-red-500 ml-1">*</span>
      </label>
    </div>

    <div
      v-if="helperText"
      :id="`${id}-helper`"
      :class="helperClasses"
      :role="error ? 'alert' : 'note'"
    >
      {{ helperText }}
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';

  interface InputProps {
    fullWidth?: boolean;
    error?: boolean;
    disabled?: boolean;
    label?: string;
    helperText?: string;
    required?: boolean;
    type?: string;
    placeholder?: string;
    modelValue?: string | number;
    class?: string;
    containerClass?: string;
    labelClass?: string;
    helperClass?: string;
    id?: string;
  }

  const props = withDefaults(defineProps<InputProps>(), {
    fullWidth: false,
    error: false,
    disabled: false,
    required: false,
    type: 'text',
    modelValue: '',
  });

  const emit = defineEmits<{
    'update:modelValue': [value: string | number];
    input: [event: Event];
    focus: [event: FocusEvent];
    blur: [event: FocusEvent];
  }>();

  const inputRef = ref<HTMLInputElement>();

  const bem = createBem('input', useCssModule());

  const containerClasses = computed(() => {
    return [bem('container'), props.fullWidth && 'w-full', props.containerClass]
      .filter(Boolean)
      .join(' ');
  });

  const wrapperClasses = computed(() => bem('wrapper'));

  const inputClasses = computed(() => {
    const baseClasses = [
      'transition-all duration-200',
      'border-2 border-gray-200',
      'rounded-md',
      'px-2 py-2',
      props.fullWidth && 'w-full',
      props.class,
    ]
      .filter(Boolean)
      .join(' ');

    const bemClasses = [
      bem(),
      props.fullWidth && bem(null, 'fullWidth'),
      props.error && bem(null, 'error'),
      props.disabled && bem(null, 'disabled'),
      props.required && bem(null, 'required'),
    ]
      .filter(Boolean)
      .join(' ');

    return [baseClasses, bemClasses].filter(Boolean).join(' ');
  });

  const labelClasses = computed(() => {
    return [bem('label'), 'block text-sm', props.labelClass].filter(Boolean).join(' ');
  });

  const helperClasses = computed(() => {
    return [bem('helper'), 'text-xs mt-1', props.helperClass].filter(Boolean).join(' ');
  });

  const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    emit('update:modelValue', target.value);
    emit('input', event);
  };

  defineExpose({
    inputRef,
    focus: () => inputRef.value?.focus(),
    blur: () => inputRef.value?.blur(),
  });
</script>

<style lang="scss" module>
  .input {
    position: relative;
    font-family: 'Roboto', sans-serif;
    border: solid 1px #c4c7ca;
    width: 100%;
    font-size: 16px;
    background-color: white;
    box-sizing: border-box;

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    &:hover:not(.input_disabled) {
      border: solid 1px #000000;
    }

    &:focus {
      outline: 3px solid #8fc9ff;
      border-color: #3f8fe5;
    }

    &:active:not(.input_disabled) {
      border: solid 1px #3f8fe5;
    }

    &::placeholder {
      opacity: 0;
      color: transparent;
    }

    &_error {
      border: solid 1px #fb7a7a;
    }

    &_disabled {
      background-color: #eef0f3;
      border: none;

      &:hover {
        transform: none;
      }
    }

    &:not(.input_fullWidth) {
      width: auto;
      min-width: 200px;
    }

    &_fullWidth {
      width: 100% !important;
      display: block;
    }

    &__container {
      position: relative;
      display: inline-block;
      margin-top: 16px;

      &_fullWidth {
        width: 100% !important;
        display: block;
      }
    }

    &__wrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    &__label {
      font-weight: 400;
      letter-spacing: 0.05em;
      position: absolute;
      top: 50%;
      left: 12px;
      transform: translateY(-50%);
      transition: all 0.3s ease;
      pointer-events: none;
      color: #999;
      background-color: transparent;
      padding: 0 4px;
      z-index: 2;
      font-size: 16px;

      .input_disabled ~ & {
        color: #999;
        opacity: 0.7;
      }

      .input_error ~ & {
        color: #fb7a7a !important;
      }

      .input_disabled ~ & {
        color: #747474;
      }
    }

    .input:focus ~ &__label {
      top: -8px;
      transform: translateY(0);
      font-size: 12px;
      background-color: white;
      z-index: 3;
      color: #3f8fe5;
    }

    .input:not(:placeholder-shown) ~ &__label {
      top: -8px;
      transform: translateY(0);
      font-size: 12px;
      background-color: white;
      z-index: 3;
      color: #c4c7ca;
    }

    .input:not(:placeholder-shown):focus ~ &__label {
      color: #3f8fe5;
    }

    &__helper {
      font-weight: 400;
      margin-top: 4px;
      font-size: 12px;
      color: #fb7a7a;

      .input_disabled ~ & {
        opacity: 0.5;
      }
    }
  }
</style>
