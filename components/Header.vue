<script setup lang="ts">
  import Logo from './ui/logo/Logo.vue';
  import NavTab from './ui/nav-tab/NavTab.vue';
  import TabItem from './ui/tab-item/TabItem.vue';

  const isScrolled = ref(false);

  const handleScroll = () => {
    isScrolled.value = window.scrollY > 50;
  };

  onMounted(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });
</script>

<template>
  <header class="fixed top-0 left-0 w-full bg-white z-50 transition-all duration-300">
    <div
      class="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#A5A9B04D] to-[#A5A9B04D] transition-transform duration-300 transform origin-left"
      :class="{ 'scale-x-100': isScrolled, 'scale-x-0': !isScrolled }"
    ></div>

    <div class="responsive-container py-3 md:py-4 lg:py-10">
      <div class="flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center space-x-2">
          <Logo color="black" class="object-contain w-auto h-10 sm:h-12 md:h-14 lg:h-16 xl:h-20" />
        </NuxtLink>
        <nav class="hidden lg:flex items-center gap-16">
          <NavTab href="#menu" title="Меню" />
          <NavTab href="#about" title="О нас" />
          <NavTab href="#contacts" title="Контакты" />
        </nav>
        <div class="flex flex-row gap-8 md:gap-14">
          <div class="flex flex-row gap-6 md:gap-8 lg:gap-12">
            <TabItem
              href="tel:+79991234567"
              image="/phone.svg"
              title="+7 (918) 432-65-87"
              subtitle="Ежедневно с 9:00 до 23:00"
            />
            <TabItem
              href="/"
              image="/pizza.svg"
              title="Ваш заказ"
              subtitle="Итальянская и ещё 2 пиццы"
            />
          </div>
          <div class="flex md:gap-8">
            <button
              class="hidden md:flex items-center justify-center bg-[#EFF0F1] w-12 h-12 rounded-full hover:bg-[#E52D2D] transition-all group relative"
            >
              <span class="font-alegreya text-lg text-[#000000] font-black">RU </span>
            </button>

            <button class="lg:hidden">
              <div class="relative">
                <image width="{40}" height="{40}" src="/menu.svg" alt="Меню" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
