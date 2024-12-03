// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: { enabled: true },
    app: {
        head: {
            viewport: 'width=device-width, initial-scale=1.0', // 渲染出 <meta name="viewport" content="width=device-width, initial-scale=1">
            title: '享樂酒店｜Enjoyment Luxury Hotel', // 渲染出 <title>享樂酒店｜Enjoyment Luxury Hotel</title>
            charset: 'utf-8', // 渲染出 <meta charset="UTF-8">,
            meta: [
                {
                    name: 'description',
                    content:
                        '探索 Enjoyment Luxury 的高雄頂級房型，從景觀尊榮家庭房到尊爵雙人房，享受絕美市景與舒適空間。立即預訂，享受獨特的住宿體驗！',
                },
                {
                    property: 'title',
                    content: '享樂酒店｜Enjoyment Luxury Hotel',
                },
                {
                    property: 'og:title',
                    content:
                        '探索 Enjoyment Luxury 的高雄頂級房型，從景觀尊榮家庭房到尊爵雙人房，享受絕美市景與舒適空間。立即預訂，享受獨特的住宿體驗！',
                },
                {
                    property: 'og:description',
                    content:
                        '探索 Enjoyment Luxury 的高雄頂級房型，從景觀尊榮家庭房到尊爵雙人房，享受絕美市景與舒適空間。立即預訂，享受獨特的住宿體驗！',
                },
            ],
            link: [
                { rel: 'icon', href: '/favicon.ico' },
                // 從外部載入 google 字體
                // 渲染 <link rel="preconnect" href="https://fonts.googleapis.com">
                { rel: 'preconnect', href: 'https://fonts.gohogleapis.com' },

                // 渲染 <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                {
                    rel: 'preconnect',
                    href: 'https://fonts.gstatic.com',
                    crossorigin: '',
                },

                // 渲染  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100..900&display=swap" rel="stylesheet">
                {
                    rel: 'stylesheet',
                    href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100..900&display=swap',
                },
            ],
        },
    },
    css: ['@/assets/styles/all.scss'],
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    api: 'modern-compiler',
                    quietDeps: true,
                    silenceDeprecations: ['import'],
                },
            },
        },
    },
    /**
     * 文件：https://nuxt.com/docs/guide/directory-structure/components
     * 原檔案有 global 全域資料夾，可以在 nuxt.config 中設定
     */
    components: {
        global: true,
        dirs: ['~/components/global'],
    },
});
