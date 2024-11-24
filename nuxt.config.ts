// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: { enabled: true },
    css: ['@/assets/styles/all.scss'],
    /**
     * 文件：https://nuxt.com/docs/guide/directory-structure/components
     * 原檔案有 global 全域資料夾，可以在 nuxt.config 中設定
     */
    components: {
        global: true,
        dirs: ['~/components/global'],
    }
});
