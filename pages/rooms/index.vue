<script setup>
/**
 * 建立房型資料夾 rooms，裡面要放房型內容介紹頁 & 動態路由頁面
 */

import { Icon } from '@iconify/vue';

import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useSetMetaTitle } from '~/composables/useSetMetaTitle';

const modules = ref([Autoplay, Navigation, Pagination]);

// api
const roomsUrl = 'https://nuxr3.zeabur.app/api/v1/rooms/';

const { data: roomList } = await useFetch(roomsUrl, {
    transform: response => {
        const { result } = response;

        return result;
    }
});

// seo
const { title } = useSetMetaTitle();

useSeoMeta({
    title: title('房型列表'),
});

const importImage = url => {
    const image = new URL(url, import.meta.url);
    return image.href;
};
</script>

<template>
    <main>
        <section class="hero position-relative">
            <ClientOnly>
                <swiper
                    :modules="modules"
                    :slides-per-view="1"
                    :pagination="true"
                    :autoplay="{
                        delay: 3000,
                        disableOnInteraction: false,
                    }"
                >
                    <swiper-slide v-for="(num, index) in 5" :key="index">
                        <picture>
                            <source
                                srcset="/images/home-hero.png"
                                media="(min-width:576px)"
                            />
                            <img
                                class="hero-img"
                                src="/images/home-hero-sm.png"
                                alt="hero banner"
                            />
                        </picture>
                    </swiper-slide>
                </swiper>
            </ClientOnly>

            <div
                class="hero-wrapper d-flex flex-column justify-content-center align-items-center flex-md-row gap-10 gap-md-20 w-100 position-absolute z-2"
            >
                <div
                    class="d-flex flex-column align-items-center text-center d-md-block text-md-start"
                >
                    <div
                        class="mt-10 mb-5 mt-md-0 mb-md-10 text-primary-100 fw-bold"
                    >
                        <h2 class="fw-semibold">享樂酒店</h2>
                        <h5 class="fs-7 fs-md-5 fw-semibold">
                            Enjoyment Luxury Hotel
                        </h5>
                    </div>
                    <div class="deco-line" />
                </div>
                <h1 class="mb-0 text-neutral-0 fw-bold">客房旅宿</h1>
            </div>
        </section>

        <section class="py-10 py-md-30 bg-primary-10">
            <div class="container mb-md-12">
                <h4 class="mb-2 mb-md-4 fs-8 fs-md-6 fw-bold text-neutral-80">
                    房型選擇
                </h4>
                <h2 class="mb-10 mb-md-20 fs-1 fw-bold text-primary-100">
                    各種房型，任您挑選
                </h2>
                <ul class="d-flex flex-column gap-6 gap-md-12 list-unstyled">
                    <li
                        v-for="room in roomList"
                        :key="room._id"
                        class="card flex-lg-row border-0 rounded-3xl overflow-hidden"
                    >
                        <div class="row">
                            <div class="col-12 col-lg-7">
                                <ClientOnly>
                                    <swiper
                                        :modules="modules"
                                        :slides-per-view="1"
                                        navigation
                                        :pagination="{ clickable: true }"
                                        :autoplay="{
                                            delay: 2500,
                                            disableOnInteraction: false,
                                        }"
                                    >
                                        <swiper-slide
                                            v-for="(
                                                imageUrl, index
                                            ) in room.imageUrlList"
                                            :key="index"
                                        >
                                            <picture>
                                                <source
                                                    :srcset="imageUrl"
                                                    media="(min-width: 768px)"
                                                />
                                                <img
                                                    class="w-100 object-fit-cover"
                                                    :src="imageUrl"
                                                    loading="lazy"
                                                    :alt="room.name"
                                                />
                                            </picture>
                                        </swiper-slide>
                                    </swiper>
                                </ClientOnly>
                            </div>
                            <div class="col-12 col-lg-5">
                                <div class="card-body pe-md-10 py-md-10">
                                    <h3 class="card-title fs-2 fw-bold text-neutral-100">
                                        {{ room.name }}
                                    </h3>
                                    <p class="card-text mb-6 mb-md-10 fs-8 fs-md-7 fw-medium text-neutral-80">
                                        {{ room.description }}
                                    </p>
                                    <ul class="d-flex gap-4 mb-6 mb-md-10 list-unstyled">
                                        <li
                                            class="card-info px-4 py-5 border border-primary-40 rounded-3"
                                        >
                                            <Icon
                                                class="mb-2 fs-5 text-primary-100"
                                                icon="fluent:slide-size-24-filled"
                                            />
                                            <p class="mb-0 fw-bold text-neutral-80 text-nowrap">
                                                {{ room.areaInfo }}
                                            </p>
                                        </li>
                                        <li
                                            class="card-info px-4 py-5 border border-primary-40 rounded-3"
                                        >
                                            <Icon
                                                class="mb-2 fs-5 text-primary-100"
                                                icon="material-symbols:king-bed"
                                            />
                                            <p class="mb-0 fw-bold text-neutral-80 text-nowrap">
                                                {{ room.bedInfo }}
                                            </p>
                                        </li>
                                        <li
                                            class="card-info px-4 py-5 border border-primary-40 rounded-3"
                                        >
                                            <Icon
                                                class="mb-2 fs-5 text-primary-100"
                                                icon="ic:baseline-person"
                                            />
                                            <p class="mb-0 fw-bold text-neutral-80 text-nowrap">
                                                2-4 人
                                            </p>
                                        </li>
                                    </ul>
                                    <div
                                        class="deco-line w-100 mb-6 mb-md-10"
                                    />
                                    <div
                                        class="d-flex justify-content-between align-items-center fs-7 fs-md-5 text-primary-100"
                                    >
                                        <p class="mb-0 fw-bold">NT$ {{ `${room.price.toLocaleString()}` }}</p>
                                        <NuxtLink
                                            :to="`/rooms/${room._id}`"
                                            class="icon-link icon-link-hover text-primary-100"
                                        >
                                            <Icon
                                                class="bi fs-5"
                                                icon="mdi:arrow-right"
                                            />
                                        </NuxtLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    </main>
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

.hero img {
    width: 100%;
    height: 100vh;
    object-fit: cover;
    filter: brightness(40%);
}

.hero-wrapper {
    inset: 0;
}

.deco-line {
    width: 33vw;
    height: 2px;
    background-image: linear-gradient(to right, #be9c7c, #ffffff);
}

.hero .deco-line {
    @include media-breakpoint-down(md) {
        width: 2px;
        height: 83px;
        z-index: 1;
        background-image: linear-gradient(to bottom, #be9c7c, #fff);
        margin-bottom: 2.5rem;
    }
}

.rounded-3xl {
    border-radius: 1.25rem;
}

.card-info {
    width: 97px;
    height: 97px;
}

.swiper {
    display: grid;
}
.swiper :deep(.swiper-wrapper) {
    min-width: 0;
}

.swiper :deep(.swiper-button-prev),
.swiper :deep(.swiper-button-next) {
    width: 56px;
    height: 56px;
    background-color: #ffffff;
    color: #4b4b4b;
    border-radius: 100px;

    @include media-breakpoint-down(md) {
        display: none;
    }
}

.swiper :deep(.swiper-button-prev::after),
.swiper :deep(.swiper-button-next::after) {
    font-size: 40px;
}

.swiper :deep(.swiper-button-prev::after) {
    display: inline-block;
    width: 1em;
    height: 1em;
    --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='m14 18l-6-6l6-6l1.4 1.4l-4.6 4.6l4.6 4.6z'/%3E%3C/svg%3E");
    background-color: currentColor;
    -webkit-mask-image: var(--svg);
    mask-image: var(--svg);
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-size: 100% 100%;
    mask-size: 100% 100%;
}

.swiper :deep(.swiper-button-next::after) {
    display: inline-block;
    width: 1em;
    height: 1em;
    --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M12.6 12L8 7.4L9.4 6l6 6l-6 6L8 16.6z'/%3E%3C/svg%3E");
    background-color: currentColor;
    -webkit-mask-image: var(--svg);
    mask-image: var(--svg);
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-size: 100% 100%;
    mask-size: 100% 100%;
}

.hero .swiper :deep(.swiper-pagination) {
    bottom: 32px;
}

.swiper :deep(.swiper-pagination) {
    bottom: 24px;
}

.swiper :deep(.swiper-pagination-bullet) {
    width: 32px;
    height: 4px;
    background-color: #f1eae4;
    border-radius: 100px;
    opacity: 1;
}

.swiper :deep(.swiper-pagination-bullet-active) {
    width: 60px;
    background-color: #bf9d7d;
}
</style>
