<script setup>
/**
 * 1. 使用插槽 <slot>，假設在某個頁面中使用這個佈局，內容就會被插入到 default.vue 的 <slot> 位置
 * 2. 更名：FrontLayout.vue -> default.vue
 * 3. nuxt3 可以用資料夾當作路徑，把元件名稱新增路徑當前綴
 * 4. 說明：Nuxt3 預設會將 default.vue 作為預設的模板，當頁面元件與 <NuxtLayout> 沒有特別指定模板，將會使用 default.vue 作為預設的 Layout
 */
// import { RouterView } from 'vue-router';
import AppHeader from '@/components/global/AppHeader.vue';
import AppFooter from '@/components/global/AppFooter.vue';
</script>

<template>
    <AppHeader />
    <slot />
    <AppFooter />
</template>

<style lang="scss" scoped></style>
