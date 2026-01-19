<template>
  <article
    :class="[
      bem(),
      'flex flex-col bg-white rounded-sm overflow-hidden transition-all duration-300',
      'shadow-[0_2px_5px_0_rgba(165,169,176,0.3)] hover:shadow-[0_2px_10px_0_rgba(165,169,176,0.5)]',
      'relative',
      widthClass,
      heightClass,
      alignClass,
      paddingClass,
      className,
    ]"
    @mouseenter="!disabled && (isHovered = true)"
    @mouseleave="isHovered = false"
  >
    <div
      v-if="showTypeIcon && !disabled"
      :class="[
        'absolute top-2 left-2 z-10 transition-all duration-300',
        isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90',
      ]"
    >
      <div
        :class="[
          'w-10 h-10 flex items-center justify-center rounded-br-sm',
          'bg-white/90 backdrop-blur-sm',
          typeIconClassName,
        ]"
      >
        <div
          :class="[
            'w-5 h-5 flex items-center justify-center transition-all duration-300',
            isHovered ? 'opacity-100' : 'opacity-0',
          ]"
        >
          <div class="relative w-full h-full">
            <div :class="['absolute inset-0 flex items-center justify-center']"></div>
            <NuxtImg
              :src="typeIcon.src"
              :alt="typeIcon.alt"
              width="20"
              height="20"
              class="w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>

    <div :class="[bem('container'), 'flex flex-col flex-1', containerClassName]">
      <div
        :class="[
          bem('image-container'),
          'relative flex-shrink-0 mx-auto my-6',
          'w-[183px] h-[183px] min-w-[183px] min-h-[183px]',
          'flex items-center justify-center',
          imageClassName,
          imageChanging && bem('image-container', `changing-${imageChanging}`),
        ]"
      >
        <div
          ref="imageWrapperRef"
          :class="[
            bem('image-wrapper'),
            'relative w-full h-full',
            'flex items-center justify-center',
            'transition-all duration-300 ease-in-out',
            imageChanging && 'changing',
            imageChanging === 'up' && 'changing-up',
            imageChanging === 'down' && 'changing-down',
          ]"
          :style="{ '--target-scale': currentScale, transform: `scale(${currentScale})` }"
        >
          <NuxtImg
            :src="product.image"
            :alt="product.imageAlt || product.title"
            :width="183"
            :height="183"
            sizes="183px"
            :class="['object-contain', 'transition-all duration-300']"
            loading="lazy"
          />
        </div>
      </div>

      <div
        :class="[
          bem('content'),
          'flex flex-col flex-1 px-5',
          align === 'center' && 'justify-center',
          align === 'left' && 'justify-start',
          align === 'right' && 'justify-end',
        ]"
      >
        <div
          :class="[
            'flex flex-col mb-4',
            align === 'center' && 'items-center',
            align === 'right' && 'items-end',
          ]"
        >
          <span
            :class="[
              bem('title'),
              'typography-h4 mb-2 transition-colors duration-300',
              titleColor,
              titleClassName,
            ]"
          >
            {{ product.title }}
          </span>
          <p
            v-if="product.subtitle"
            :class="[
              bem('subtitle'),
              'typography-description max-w-[90%]',
              align === 'center' && 'mx-auto',
              subtitleClassName,
            ]"
          >
            {{ product.subtitle }}
          </p>
        </div>

        <div
          :class="[
            bem('selector-wrapper'),
            'mb-6',
            align === 'center' && 'flex justify-center',
            align === 'right' && 'flex justify-end',
          ]"
        >
          <Selector
            :options="product.size"
            :value="selectedSize"
            @change="handleSizeChange"
            label="Размер, см:"
            :disabled="disabled"
            :container-class="[
              align === 'center' && 'flex flex-col items-center',
              align === 'right' && 'flex flex-col items-end',
            ]"
            :label-class="[
              'mb-2',
              align === 'center' && 'text-center',
              align === 'right' && 'text-right',
            ]"
          />
        </div>

        <div
          :class="[
            bem('price-container'),
            'flex items-baseline gap-1 mb-6',
            align === 'center' && 'justify-center',
            align === 'right' && 'justify-end',
            priceClassName,
          ]"
        >
          <span :class="[bem('price'), 'text-2xl font-bold text-black']">
            от {{ formatPrice(currentPrice) }} руб.
          </span>
        </div>

        <div
          :class="[
            bem('button-container'),
            'mt-auto',
            align === 'center' && 'flex justify-center',
            align === 'right' && 'flex justify-end',
          ]"
        >
          <Button @click="handleAddToCart" :disabled="disabled">
            {{ buttonText }}
          </Button>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';
  import type { CartPizza, Product, ProductSize, ProductType } from '~/types.ts';
  import Button from '../button/Button.vue';
  import Selector from '../selector/Selector.vue';

  export interface CardProps {
    product: Product;
    buttonText?: string;
    disabled?: boolean;
    showTypeIcon?: boolean;
    width?: 'sm' | 'md' | 'lg' | 'auto' | string;
    height?: 'sm' | 'md' | 'lg' | 'auto' | string;
    align?: 'left' | 'center' | 'right';
    padding?: 'none' | 'sm' | 'md' | 'lg' | 'custom';
    className?: string;
    containerClassName?: string;
    imageClassName?: string;
    titleClassName?: string;
    subtitleClassName?: string;
    priceClassName?: string;
    buttonClassName?: string;
    typeIconClassName?: string;
  }

  const emit = defineEmits<{
    (e: 'add-to-cart', cartPizza: CartPizza): void;
  }>();

  const props = withDefaults(defineProps<CardProps>(), {
    buttonText: 'В корзину',
    disabled: false,
    showTypeIcon: true,
    width: 'sm',
    height: 'auto',
    align: 'center',
    padding: 'md',
  });

  const selectedSize = ref<ProductSize>('30');
  const isHovered = ref(false);
  const imageChanging = ref<'up' | 'down' | null>(null);
  const imageWrapperRef = ref<HTMLDivElement>();

  const bem = createBem('card', useCssModule());

  const widthClasses = {
    sm: 'w-64 min-w-64 max-w-64',
    md: 'w-80 min-w-80 max-w-80',
    lg: 'w-96 min-w-96 max-w-96',
    auto: 'w-auto min-w-64',
  };

  const heightClasses = {
    sm: 'h-96 min-h-96',
    md: 'h-[28rem] min-h-[28rem]',
    lg: 'h-[32rem] min-h-[32rem]',
    auto: 'h-auto min-h-96',
  };

  const alignClasses = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right',
  };

  const paddingClasses = {
    none: 'p-0',
    sm: 'p-3',
    md: 'py-10 px-5',
    lg: 'p-8',
    custom: '',
  };

  const widthClass = computed(() => {
    if (typeof props.width === 'string' && props.width in widthClasses) {
      return widthClasses[props.width as keyof typeof widthClasses];
    }
    return props.width;
  });

  const heightClass = computed(() => {
    if (typeof props.height === 'string' && props.height in heightClasses) {
      return heightClasses[props.height as keyof typeof heightClasses];
    }
    return props.height;
  });

  const alignClass = computed(() => alignClasses[props.align]);
  const paddingClass = computed(() => paddingClasses[props.padding]);

  const titleColor = computed(() => (isHovered.value ? 'text-[#E52D2D]' : 'text-black'));

  const currentScale = computed(() => {
    switch (selectedSize.value) {
      case '20':
        return 0.85;
      case '30':
        return 1.0;
      case '40':
        return 1.16;
      default:
        return 1.0;
    }
  });

  const currentPrice = computed((): number => {
    if (!props.product.size.includes(selectedSize.value)) {
      selectedSize.value = props.product.size[0] || '30';
    }
    const sizeIndex = props.product.size.indexOf(selectedSize.value);

    if (sizeIndex >= 0 && sizeIndex < props.product.price.length) {
      return props.product.price[sizeIndex] as number;
    }
    return (props.product.price[0] as number) || 0;
  });

  const typeIcon = computed(() => {
    const icons: Record<ProductType, { src: string; alt: string }> = {
      hot: { src: '/icons/hot.svg', alt: 'Острое' },
      vegan: { src: '/icons/vegan.svg', alt: 'Веганское' },
      cheese: { src: '/icons/cheese.svg', alt: 'Сырное' },
      meat: { src: '/icons/meat.svg', alt: 'Мясное' },
    };
    return icons[props.product.type];
  });

  const handleSizeChange = (sizeStr: string) => {
    const size = sizeStr as ProductSize;
    if (size === selectedSize.value) return;

    const currentIndex = props.product.size.indexOf(selectedSize.value);
    const newIndex = props.product.size.indexOf(size);
    const direction = newIndex > currentIndex ? 'up' : 'down';

    imageChanging.value = direction;

    setTimeout(() => {
      selectedSize.value = size;
      setTimeout(() => {
        imageChanging.value = null;
      }, 300);
    }, 50);
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('ru-RU').format(price);
  };

  const generatePizzaId = (title: string, size: ProductSize): string => {
    return `${title.toLowerCase().replace(/\s+/g, '-')}-${size}`;
  };

  const handleAddToCart = () => {
    if (props.disabled) return;

    const pizzaId = generatePizzaId(props.product.title, selectedSize.value);

    const cartPizza: CartPizza = {
      id: pizzaId,
      title: props.product.title,
      subtitle: props.product.subtitle,
      size: selectedSize.value,
      price: currentPrice.value,
      image: props.product.image,
      quantity: 1,
      addedAt: new Date(),
    };

    emit('add-to-cart', cartPizza);
  };

  defineExpose({
    imageWrapperRef,
  });
</script>

<style lang="scss" module>
  .card {
    &__image-container {
      position: relative;

      &--changing-up {
        .card__image-wrapper {
          animation: scaleDown 0.3s ease-in-out;
        }
      }

      &--changing-down {
        .card__image-wrapper {
          animation: scaleUp 0.3s ease-in-out;
        }
      }
    }

    &__image-wrapper {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease-in-out;

      &.changing {
        opacity: 0.7;

        &.changing-up {
          transform: scale(0.95) !important;
        }

        &.changing-down {
          transform: scale(1.05) !important;
        }
      }
    }
  }

  @keyframes scaleDown {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(0.95);
      opacity: 0.7;
    }
    100% {
      transform: scale(var(--target-scale, 1));
      opacity: 1;
    }
  }

  @keyframes scaleUp {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.05);
      opacity: 0.7;
    }
    100% {
      transform: scale(var(--target-scale, 1));
      opacity: 1;
    }
  }
</style>
