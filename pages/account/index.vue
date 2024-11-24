<script setup>
/**
 * 1. 路由表顯示有 2 個嵌套子路由 login 會員登入 & signup 註冊會員
 * 2. 建立 account 資料夾將用來放置帳號相關的子路由，並新增子頁面 index.vue 作為帳號主列表頁面
 * 3. 在 account 資料夾內新增子頁面 index.vue 作為主列表頁面
 * 4. 一般會先顯示登入體感會好些，所以用 Nuxt 內建的轉址工具 navigateTo 導去登入頁面
 * 文件：https://nuxt.com/docs/api/utils/navigate-to
 */

navigateTo('/account/login');
</script>

<template>
    <div></div>
</template>

<style scoped></style>
