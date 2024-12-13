export default defineNuxtRouteMiddleware(async (to, from) => {
    const token = useCookie('auth');
    if (!token.value) return navigateTo('/account/login');

    try {
        const checkAuth = await $fetch('/api/v1/user/check', {
            method: 'GET',
            baseURL: 'https://nuxr3.zeabur.app',
            headers: {
                Authorization: token.value,
            },
        });
    } catch (error) {
        console.log(error);

        return navigateTo('/account/login');
    }
});
