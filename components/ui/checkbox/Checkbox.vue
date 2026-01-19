<template>
  <div :class="containerClasses">
    <input
      :id="id"
      ref="checkboxRef"
      type="checkbox"
      :class="inputClasses"
      :disabled="disabled"
      :checked="modelValue"
      v-bind="$attrs"
      @change="handleChange"
    />

    <label :for="id" :class="labelClasses">
      <span :class="boxClasses">
        <span :class="innerCircleClasses" />
      </span>

      <span v-if="label" class="flex-1">
        <span :class="textClasses">
          {{ label }}
        </span>
      </span>
    </label>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';

  interface CheckboxProps {
    label?: string;
    disabled?: boolean;
    modelValue?: boolean;
    class?: string;
    containerClass?: string;
    labelClass?: string;
    id?: string;
  }

  const props = withDefaults(defineProps<CheckboxProps>(), {
    disabled: false,
    modelValue: false,
  });

  const emit = defineEmits<{
    'update:modelValue': [value: boolean];
    change: [event: Event, value: boolean];
  }>();

  const checkboxRef = ref<HTMLInputElement>();

  const bem = createBem('checkbox', useCssModule());

  const containerClasses = computed(() => {
    return [bem('container'), props.containerClass].filter(Boolean).join(' ');
  });

  const inputClasses = computed(() => {
    return ['sr-only', bem(), props.disabled && bem(null, 'disabled'), props.class]
      .filter(Boolean)
      .join(' ');
  });

  const labelClasses = computed(() => {
    return [
      bem('label'),
      'flex items-center gap-3',
      props.disabled ? 'cursor-not-allowed' : 'cursor-pointer',
      props.disabled && bem('label', 'disabled'),
      props.labelClass,
    ]
      .filter(Boolean)
      .join(' ');
  });

  const boxClasses = computed(() => {
    const baseClasses = [
      bem('box'),
      'relative w-6 h-6 flex items-center justify-center',
      'border-2 rounded-full transition-all duration-200',
      'focus-within:ring-2 focus-within:ring-red-500 focus-within:ring-offset-2',
    ];

    if (props.modelValue) {
      baseClasses.push(bem('box', 'checked'));
    }

    if (props.disabled) {
      baseClasses.push(bem('box', 'disabled'));
    }

    return baseClasses.filter(Boolean).join(' ');
  });

  const innerCircleClasses = computed(() => {
    return [bem('inner-circle'), 'w-3 h-3 rounded-full transition-all duration-200']
      .filter(Boolean)
      .join(' ');
  });

  const textClasses = computed(() => {
    return [bem('text'), 'text-base leading-normal'].filter(Boolean).join(' ');
  });

  const handleChange = (event: Event) => {
    if (props.disabled) return;

    const target = event.target as HTMLInputElement;
    const newValue = target.checked;

    emit('update:modelValue', newValue);
    emit('change', event, newValue);
  };

  defineExpose({
    checkboxRef,
    focus: () => checkboxRef.value?.focus(),
    blur: () => checkboxRef.value?.blur(),
  });
</script>

<style lang="scss" module>
  .checkbox {
    &__container {
      display: inline-block;

      &_fullWidth {
        width: 100%;
      }
    }

    &__wrapper {
      display: inline-flex;
      align-items: flex-start;
    }

    &__box {
      flex-shrink: 0;
      position: relative;

      &:not(.checkbox__box_disabled) {
        cursor: pointer;
        border-color: #d1d5db;

        &:hover {
          border-color: #000000 !important;
        }
      }

      &_disabled {
        background-color: #f5f5f5;
        cursor: not-allowed !important;
        border-color: #d1d5db !important;

        &:hover {
          border-color: #d1d5db !important;
        }
      }

      &_checked {
        border-color: #000000;
        background-color: #f3f4f6;

        &.checkbox__box_disabled {
          border-color: #9ca3af;
        }
      }
    }

    &__inner-circle {
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

      .checkbox__box_checked & {
        background-color: #dc2626;
        opacity: 1;
        transform: scale(1);
      }

      .checkbox__box_checked.checkbox__box_disabled & {
        background-color: #9ca3af;
      }

      &:not(.checkbox__box_checked &) {
        opacity: 0;
        transform: scale(0);
      }
    }

    &__label {
      user-select: none;
      transition: opacity 0.2s;

      &:not(.checkbox__label_disabled):hover {
        .checkbox__box {
          border-color: #000000;
        }
      }

      &_disabled {
        cursor: not-allowed;

        &:hover {
          .checkbox__box {
            border-color: #d1d5db !important;
          }
        }
      }
    }

    &__text {
      font-size: 16px;
      line-height: 1.5;
      color: #000000;

      .checkbox_disabled & {
        color: #b2b2b2 !important;
      }
    }
  }
</style>
