<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { Icon } from '@iconify/vue';

const { $bootstrap } = useNuxtApp();
const navbar = ref(null);
const dropdown = ref(null);
const isScrolled = ref(false);

const route = useRoute();
const transparentBgRoute = ['home', 'rooms'];

const isTransparentRoute = computed(() =>
    transparentBgRoute.includes(route.name)
);

const handleScroll = () => {
    isScrolled.value = window.scrollY > 50;
};

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
    $bootstrap.collapse(navbar.value);
    $bootstrap.dropdown(dropdown.value);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
    <header
        :class="{
            scrolled: isScrolled,
            'bg-transparent': isTransparentRoute,
            'bg-neutral-120': !isTransparentRoute,
        }"
        class="position-fixed top-0 z-3 w-100"
    >
        <nav class="navbar navbar-expand-md p-0 px-3 py-4 px-md-20 py-md-6">
            <div class="container-fluid justify-content-between p-0">
                <NuxtLink class="navbar-brand p-0" to="/">
                    <img
                        src="@/assets/images/logo-white.svg"
                        alt="logo"
                        class="logo img-fluid"
                    />
                </NuxtLink>
                <button
                    class="navbar-toggler collapsed p-2 text-white border-0 shadow-none"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbar"
                    aria-controls="navbar"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <Icon class="fs-1" icon="mdi:close" />
                    <Icon class="fs-5" icon="mdi:menu" />
                </button>
                <div id="navbar" ref="navbar" class="collapse navbar-collapse">
                    <ul class="navbar-nav gap-4 ms-auto fw-bold">
                        <li class="nav-item">
                            <NuxtLink
                                to="/rooms"
                                class="nav-link p-4 text-neutral-0"
                            >
                                客房旅宿
                            </NuxtLink>
                        </li>
                        <li class="d-none d-md-block nav-item">
                            <div class="btn-group">
                                <button
                                    type="button"
                                    ref="dropdown"
                                    class="nav-link d-flex gap-2 p-4 text-neutral-0"
                                    data-bs-toggle="dropdown"
                                >
                                    <Icon
                                        class="fs-5"
                                        icon="mdi:account-circle-outline"
                                    />
                                    Jessica
                                </button>
                                <ul
                                    class="dropdown-menu py-3 overflow-hidden"
                                    style="
                                        right: 0;
                                        left: auto;
                                        border-radius: 20px;
                                    "
                                >
                                    <li>
                                        <NuxtLink
                                            :to="{
                                                name: 'user-userId-profile',
                                                params: { userId: 'me' },
                                            }"
                                            class="dropdown-item px-6 py-4"
                                            >我的帳戶
                                        </NuxtLink>
                                    </li>
                                    <li>
                                        <NuxtLink
                                            to="/"
                                            class="dropdown-item px-6 py-4"
                                            >登出
                                        </NuxtLink>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li class="d-md-none nav-item">
                            <NuxtLink
                                to="/account"
                                class="nav-link p-4 text-neutral-0"
                            >
                                會員登入
                            </NuxtLink>
                        </li>
                        <li class="nav-item">
                            <NuxtLink
                                :to="{ name: 'rooms' }"
                                class="btn btn-primary-100 px-8 py-4 text-white fw-bold border-0 rounded-3"
                            >
                                立即訂房
                            </NuxtLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>

<style lang="scss" scoped>
@import 'bootstrap/scss/mixins/breakpoints';

$grid-breakpoints: (
    xs: 0,
    sm: 576px,
    md: 768px,
    lg: 992px,
    xl: 1200px,
    xxl: 1400px,
    xxxl: 1537px,
);

.logo {
    max-width: 27vw;
}

header {
    transition: background-color 0.3s;
}

header.scrolled {
    background-color: #000 !important;
}

@include media-breakpoint-down(md) {
    .navbar-toggler {
        z-index: 1;
        visibility: hidden;

        svg {
            transition: opacity 0.3s;
        }

        svg:nth-child(1) {
            position: absolute;
            top: 28px;
            right: 28px;
            opacity: 1;
            visibility: visible;
        }
        svg:nth-child(2) {
            opacity: 0;
            visibility: hidden;
        }
    }
    .navbar-toggler.collapsed {
        svg:nth-child(1) {
            opacity: 0;
            visibility: hidden;
        }
        svg:nth-child(2) {
            opacity: 1;
            visibility: visible;
        }
    }

    .navbar-collapse {
        min-height: 100vh;
        background-color: #140f0a;
        position: fixed;
        inset: 0;
        opacity: 0;
        overflow: hidden;
        transition: opacity 0.05s;
    }
    .navbar-collapse.show {
        opacity: 1;
    }
    .navbar-nav {
        height: 100%;
        justify-content: center;
        align-items: center;
        text-align: center;

        a {
            width: 90vw;
        }
    }
}

.dropdown-menu {
    --bs-dropdown-min-width: 16rem;
    --bs-dropdown-link-hover-color: #bf9d7d;
    --bs-dropdown-link-hover-bg: #f7f2ee;
    --bs-dropdown-link-active-color: #fff;
    --bs-dropdown-link-active-bg: #bf9d7d;
}
</style>
