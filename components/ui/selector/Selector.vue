<template>
  <div
    :id="id"
    ref="selectorRef"
    :class="[bem(), disabled && bem(null, 'disabled'), className]"
    v-bind="$attrs"
  >
    <input type="hidden" :name="hiddenInputName" :value="value" />

    <div :class="[bem('container'), 'inline-flex flex-col items-center', containerClassName]">
      <label
        v-if="label"
        :for="`${id}-selector`"
        :class="[
          bem('label'),
          'text-xs font-medium text-gray-700 mb-4',
          disabled && 'text-gray-400',
          labelClassName,
        ]"
      >
        {{ label }}
      </label>

      <div
        :id="`${id}-selector`"
        :class="[bem('options-container'), 'flex rounded-lg overflow-hidden']"
        role="radiogroup"
        :aria-label="label || 'Выбор размера'"
      >
        <button
          v-for="(option, index) in normalizedOptions"
          :key="option.value"
          type="button"
          :class="getOptionClasses(option, index)"
          @click="() => handleOptionClick(option.value)"
          :disabled="disabled"
          role="radio"
          :aria-checked="option.value === value"
          :aria-label="`${label} ${option.label}`"
        >
          <span :class="getOptionValueClasses(option)">
            {{ option.label }}
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';

  export interface SelectorOption {
    value: string;
    label: string;
  }

  export interface SelectorProps {
    options: string[] | SelectorOption[];
    value: string;
    onChange: (value: string) => void;
    label?: string;
    disabled?: boolean;
    className?: string;
    containerClassName?: string;
    labelClassName?: string;
    optionClassName?: string;
    id?: string;
    name?: string;
  }

  const props = withDefaults(defineProps<SelectorProps>(), {
    label: 'Размер, см:',
    disabled: false,
  });

  const emit = defineEmits<{
    change: [value: string];
  }>();

  const selectorRef = ref<HTMLDivElement>();

  const generateId = () => `selector-${Math.random().toString(36).substr(2, 9)}`;
  const id = props.id || generateId();

  const bem = createBem('selector', useCssModule());

  const normalizedOptions = computed(() => {
    return props.options.map((option) => {
      if (typeof option === 'string') {
        return {
          value: option,
          label: option,
        };
      }
      return option;
    });
  });

  const hiddenInputName = computed(() => props.name || `selector-${id}`);

  const getOptionClasses = (option: SelectorOption, index: number) => {
    const isSelected = option.value === props.value;
    const isDisabled = props.disabled;

    const classes = [
      bem('option'),
      'flex items-center justify-center',
      'w-[58px] h-[28px]',
      'cursor-pointer transition-all duration-200',
      'relative border-none',
      index === 0 && 'rounded-l-lg',
      index === normalizedOptions.value.length - 1 && 'rounded-r-lg',
      isSelected ? 'bg-white shadow-sm' : 'bg-[#EFF0F1]',
      isDisabled && 'opacity-60 cursor-not-allowed',
      props.optionClassName,
    ]
      .filter(Boolean)
      .join(' ');

    return classes;
  };

  const getOptionValueClasses = (option: SelectorOption) => {
    const isSelected = option.value === props.value;

    const classes = [
      bem('option-value'),
      'text-sm font-bold',
      isSelected ? 'text-gray-900' : 'text-gray-600',
      props.disabled && 'text-gray-400',
    ]
      .filter(Boolean)
      .join(' ');

    return classes;
  };

  const handleOptionClick = (optionValue: string) => {
    if (props.disabled || optionValue === props.value) return;
    emit('change', optionValue);
  };

  defineExpose({
    selectorRef,
  });
</script>

<style lang="scss" module>
  $color-bg-unselected: #eff0f1;
  $color-bg-selected: #ffffff;
  $color-text-primary: #111827;
  $color-text-secondary: #6b7280;
  $color-text-disabled: #9ca3af;

  $option-width: 58px;
  $option-height: 28px;
  $border-radius: 6px;
  $transition-duration: 150ms;
  $container-padding: 2px;

  .selector {
    display: inline-block;
  }

  .selector__container {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
  }

  .selector__label {
    font-size: 0.75rem;
    font-weight: 500;
    margin-bottom: 0.25rem;
    white-space: nowrap;

    .selector_disabled & {
      color: $color-text-disabled;
    }
  }

  .selector__options-container {
    display: flex;
    height: $option-height + ($container-padding * 2);
    border-radius: $border-radius;
    overflow: hidden;
    padding: $container-padding;
    background-color: $color-bg-unselected;
    gap: 0;

    border: none;
  }

  .selector__option {
    position: relative;
    user-select: none;
    width: $option-width;
    height: $option-height;
    min-width: $option-width;
    min-height: $option-height;
    display: flex;
    align-items: center;
    justify-content: center;

    border: none;
    outline: none;

    &:focus-visible {
      outline: 2px solid #3b82f6;
      outline-offset: -2px;
      z-index: 10;
    }

    &:active:not(:disabled) {
      transform: scale(0.98);
    }

    &[aria-checked='true'] {
      background-color: $color-bg-selected !important;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      border-radius: 4px;
    }

    &:not([aria-checked='true']):not(:disabled):hover {
      background-color: darken($color-bg-unselected, 3%);
      border-radius: 4px;
    }
  }

  .selector__option-value {
    line-height: 1;
    font-weight: 600;
    font-size: 0.875rem;

    .selector__option[aria-checked='true'] & {
      color: $color-text-primary;
    }

    .selector__option:not([aria-checked='true']) & {
      color: $color-text-secondary;
    }

    .selector_disabled .selector__option & {
      color: $color-text-disabled;
    }
  }

  .selector_disabled {
    opacity: 0.6;

    .selector__option {
      cursor: not-allowed;

      &:hover {
        background-color: $color-bg-unselected !important;
      }
    }
  }
</style>
