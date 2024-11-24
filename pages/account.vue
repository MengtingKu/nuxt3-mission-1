<script setup>
/**
 * 1. 原路由表的指向和架構是 path: '/account'：帳戶相關的根路徑，AccountLayout 組件來顯示主要結構
 * 2. 在 pages 資料夾新增建立 account.vue 作為主要的帳號頁面，並且使用 <NuxtPage /> 來顯示嵌套式路由頁面的內容(嵌套路由的主容器)
 * 3. 因為有指定的帳號 layout 所以需要用 definePageMeta 指定模板
 * 4. 設定 definePageMeta 之後，pages/account.vue 就不會使用預設模板 default.vue
 */

definePageMeta({
    layout: 'account',
});
</script>

<template><NuxtPage /></template>

<style scoped></style>
