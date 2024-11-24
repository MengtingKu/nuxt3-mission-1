<script setup>
/**
 * 1. 原路由表的指向和架構是 path: '/user/:userId'：使用者相關的根路徑，UserLayout 組件來顯示主要結構
 * 2. 在 pages 資料夾新增建立 user 資料夾，並且新增 [userId].vue 作為主要的頁面，並且使用 <NuxtPage /> 來顯示嵌套式路由頁面的內容(嵌套路由的主容器)
 * 3. 因為有指定的使用者 layout 所以需要用 definePageMeta 指定模板
 */

definePageMeta({
    layout: 'user',
});
</script>

<template><NuxtPage /></template>

<style scoped></style>
