export default defineNuxtRouteMiddleware(async (to, from) => {
    const accountToken = useCookie('accountToken');
    if (!accountToken.value) return navigateTo('/account/login');

    try {
        const checkAuth = await $fetch('/api/v1/user/check', {
            method: 'GET',
            baseURL: 'https://nuxr3.zeabur.app',
            headers: {
                Authorization: accountToken.value,
            },
        });
    } catch (error) {
        const { message } = error.response._data;
        console.log('error=>', message);

        return navigateTo('/account/login');
    }
});
