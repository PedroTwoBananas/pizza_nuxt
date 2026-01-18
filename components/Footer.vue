<template>
  <footer>
    <div class="responsive-container">
      <div class="flex flex-col items-center lg:gap-3 md:gap-2 gap-4 lg:mb-10 md:mb-5 mb-5">
        <span class="typography-h2"> Следите за нами в Instagram </span>
        <span class="!text-[#848A9A] typography-h4"> @pizzamenu </span>
      </div>
    </div>

    <div class="full-width-section">
      <div class="flex flex-row flex-wrap">
        <div
          v-for="(img, index) in instagramImages"
          :key="index"
          :class="['relative aspect-square w-1/2 md:w-1/3 lg:w-1/5', img.visibilityClasses]"
        >
          <NuxtImg
            :src="img.src"
            :alt="img.alt"
            class="w-full h-full object-cover"
            width="371"
            height="371"
            loading="lazy"
          />
        </div>
      </div>

      <div class="bg-black">
        <div class="responsive-container py-8 md:py-12 lg:py-16">
          <div class="flex flex-col md:flex-row lg:flex-row justify-between items-center gap-8">
            <div class="flex flex-col md:flex-row items-center gap-8 md:gap-16">
              <NuxtLink to="/" class="flex-shrink-0">
                <Logo
                  color="white"
                  class="w-[85px] h-[40px] sm:w-[130px] sm:h-[60px] md:w-[150px] md:h-[69px] lg:w-[182px] lg:h-[84px] object-contain"
                />
              </NuxtLink>

              <div class="flex flex-col items-center md:items-start">
                <NuxtLink href="tel:+79991234567">
                  <span class="!text-white typography-h4"> +7 (918) 432-65-87 </span>
                </NuxtLink>
                <span class="!text-white typography-description mt-1">
                  Ежедневно с 9:00 до 23:00
                </span>
              </div>
            </div>

            <span class="!text-white typography-description"> Политика конфиденциальности </span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
  import Logo from './ui/logo/Logo.vue';

  const instagramImages = [
    { src: '/images/inst01.png', alt: 'inst01', visibilityClasses: '' },
    { src: '/images/inst02.png', alt: 'inst02', visibilityClasses: '' },
    { src: '/images/inst03.png', alt: 'inst03', visibilityClasses: '' },
    { src: '/images/inst04.png', alt: 'inst04', visibilityClasses: '' },
    { src: '/images/inst05.png', alt: 'inst05', visibilityClasses: 'hidden md:block' },
    { src: '/images/inst06.png', alt: 'inst06', visibilityClasses: 'hidden md:block' },
    { src: '/images/inst07.png', alt: 'inst07', visibilityClasses: 'hidden lg:block' },
    { src: '/images/inst08.png', alt: 'inst08', visibilityClasses: 'hidden lg:block' },
    { src: '/images/inst09.png', alt: 'inst09', visibilityClasses: 'hidden lg:block' },
    { src: '/images/inst10.png', alt: 'inst10', visibilityClasses: 'hidden lg:block' },
  ];
</script>

<style scoped>
  .full-width-section {
    width: 100vw;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
  }
</style>
