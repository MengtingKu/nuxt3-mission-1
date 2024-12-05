<script setup>
/**
 * 1. RoomDetailView.vue 是動態房型詳細頁面，所以在 rooms 資料夾中建立動態子路由 pages/rooms/[roomId].vue
 * 2. 路由表裡有預約房型，這是從動態房型詳細頁面開出去，所以需要把原來檔案變更成動態路由中設置嵌套路由 pages/rooms/[roomId]/index.vue
 */

import DatePickerModal from '@/components/rooms/DatePickerModal.vue';
import { Icon } from '@iconify/vue';

const datePickerModal = ref(null);

// seo
const { title } = useSetMetaTitle();

useSeoMeta({
    title: title('房型詳細'),
});

const openModal = () => {
    datePickerModal.value.openModal();
};

const MAX_BOOKING_PEOPLE = 10;
const bookingPeople = ref(1);

const daysCount = ref(0);

const daysFormatOnMobile = date => date?.split('-').slice(1, 3).join(' / ');

const formatDate = date => {
    const offsetToUTC8 = date.getHours() + 8;
    date.setHours(offsetToUTC8);
    return date.toISOString().split('T')[0];
};

const currentDate = new Date();

const bookingDate = reactive({
    date: {
        start: formatDate(currentDate),
        end: null,
    },
    minDate: new Date(),
    maxDate: new Date(currentDate.setFullYear(currentDate.getFullYear() + 1)),
});

const handleDateChange = bookingInfo => {
    const { start, end } = bookingInfo.date;
    bookingDate.date.start = start;
    bookingDate.date.end = end;

    bookingPeople.value = bookingInfo?.people || 1;
    daysCount.value = bookingInfo.daysCount;
};
</script>

<template>
    <main class="mt-18 mt-md-30 bg-neutral-100">
        <section class="p-md-20 bg-primary-10">
            <div class="d-none d-md-block position-relative">
                <div class="d-flex gap-2 rounded-3xl overflow-hidden">
                    <div style="width: 52.5vw">
                        <img
                            class="w-100"
                            src="@/assets/images/room-a-1.png"
                            alt="room-a-1"
                        />
                    </div>
                    <div
                        class="d-flex flex-wrap gap-md-2"
                        style="width: 42.5vw"
                    >
                        <div class="d-flex gap-md-2">
                            <img
                                class="w-50"
                                src="@/assets/images/room-a-2.png"
                                alt="room-a-2"
                            />
                            <img
                                class="w-50"
                                src="@/assets/images/room-a-3.png"
                                alt="room-a-3"
                            />
                        </div>
                        <div class="d-flex gap-md-2">
                            <img
                                class="w-50"
                                src="@/assets/images/room-a-4.png"
                                alt="room-a-4"
                            />
                            <img
                                class="w-50"
                                src="@/assets/images/room-a-5.png"
                                alt="room-a-5"
                            />
                        </div>
                    </div>
                </div>
                <button
                    class="position-absolute btn btn-primary-10 px-8 py-4 me-3 text-primary-100 border-primary-100 fw-bold rounded-3"
                    style="bottom: 40px; right: 40px"
                    type="button"
                >
                    看更多
                </button>
            </div>
            <div class="d-md-none position-relative">
                <img
                    class="img-fluid"
                    src="@/assets/images/room-a-1.png"
                    alt="room-a-1"
                />
                <button
                    class="position-absolute btn btn-primary-10 px-8 py-4 text-primary-100 border-primary-100 fw-bold rounded-3"
                    style="bottom: 23px; right: 12px"
                    type="button"
                >
                    看更多
                </button>
            </div>
        </section>

        <section class="py-10 py-md-30 bg-primary-10">
            <div class="container">
                <div class="row">
                    <div
                        class="col-12 col-md-7 d-flex flex-column gap-6 gap-md-20"
                    >
                        <div>
                            <h1 class="mb-4 text-neutral-100 fw-bold">
                                尊爵雙人房
                            </h1>
                            <p
                                class="mb-0 text-neutral-80 fs-8 fs-md-7 fw-medium"
                            >
                                享受高級的住宿體驗，尊爵雙人房提供給您舒適寬敞的空間和精緻的裝潢。
                            </p>
                        </div>

                        <section>
                            <h3
                                class="title-deco mb-4 mb-md-6 text-neutral-100 fs-7 fs-md-5 fw-bold"
                            >
                                房型基本資訊
                            </h3>
                            <ul class="d-flex gap-4 list-unstyled">
                                <li
                                    class="card-info px-4 py-5 bg-neutral-0 border border-primary-40 rounded-3"
                                >
                                    <Icon
                                        class="mb-2 fs-5 text-primary-100"
                                        icon="fluent:slide-size-24-filled"
                                    />
                                    <p
                                        class="mb-0 fw-bold text-neutral-80 text-nowrap"
                                    >
                                        24 坪
                                    </p>
                                </li>
                                <li
                                    class="card-info px-4 py-5 bg-neutral-0 border border-primary-40 rounded-3"
                                >
                                    <Icon
                                        class="mb-2 fs-5 text-primary-100"
                                        icon="material-symbols:king-bed"
                                    />
                                    <p
                                        class="mb-0 fw-bold text-neutral-80 text-nowrap"
                                    >
                                        1 張大床
                                    </p>
                                </li>
                                <li
                                    class="card-info px-4 py-5 bg-neutral-0 border border-primary-40 rounded-3"
                                >
                                    <Icon
                                        class="mb-2 fs-5 text-primary-100"
                                        icon="ic:baseline-person"
                                    />
                                    <p
                                        class="mb-0 fw-bold text-neutral-80 text-nowrap"
                                    >
                                        2-4 人
                                    </p>
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h3
                                class="title-deco mb-4 mb-md-6 text-neutral-100 fs-7 fs-md-5 fw-bold"
                            >
                                房間格局
                            </h3>
                            <ul
                                class="d-flex flex-wrap gap-6 gap-md-10 p-6 bg-neutral-0 fs-8 fs-md-7 rounded-3 list-unstyled"
                            >
                                <li class="d-flex gap-2">
                                    <Icon
                                        class="fs-5 text-primary-100"
                                        icon="material-symbols:check"
                                    />
                                    <p class="mb-0 text-neutral-80 fw-bold">
                                        市景
                                    </p>
                                </li>
                                <li class="d-flex gap-2">
                                    <Icon
                                        class="fs-5 text-primary-100"
                                        icon="material-symbols:check"
                                    />
                                    <p class="mb-0 text-neutral-80 fw-bold">
                                        獨立衛浴
                                    </p>
                                </li>
                                <li class="d-flex gap-2">
                                    <Icon
                                        class="fs-5 text-primary-100"
                                        icon="material-symbols:check"
                                    />
                                    <p class="mb-0 text-neutral-80 fw-bold">
                                        客廳
                                    </p>
                                </li>
                                <li class="d-flex gap-2">
                                    <Icon
                                        class="fs-5 text-primary-100"
                                        icon="material-symbols:check"
                                    />
                                    <p class="mb-0 text-neutral-80 fw-bold">
                                        書房
                                    </p>
                                </li>
                                <li class="d-flex gap-2">
                                    <Icon
                                        class="fs-5 text-primary-100"
                                        icon="material-symbols:check"
                                    />
                                    <p class="mb-0 text-neutral-80 fw-bold">
                                        樓層電梯
                                    </p>
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h3
                                class="title-deco mb-4 mb-md-6 text-neutral-100 fs-7 fs-md-5 fw-bold"
                            >
                                房內設備
                            </h3>
                            <ul
                                class="d-flex flex-wrap row-gap-2 column-gap-10 p-6 mb-0 bg-neutral-0 fs-8 fs-md-7 rounded-3 list-unstyled"
                            >
                                <li class="flex-item d-flex gap-2">
                                    <Icon
                                        class="fs-5 text-primary-100"
                                        icon="material-symbols:check"
                                    />
                                    <p class="mb-0 text-neutral-80 fw-bold">
                                        平面電視
                                    </p>
                                </li>
                                <li class="flex-item d-flex gap-2">
                                    <Icon
                                        class="fs-5 text-primary-100"
                                        icon="material-symbols:check"
                                    />
                                    <p class="mb-0 text-neutral-80 fw-bold">
                                        吹風機
                                    </p>
                                </li>
                                <li class="flex-item d-flex gap-2">
                                    <Icon
                                        class="fs-5 text-primary-100"
                                        icon="material-symbols:check"
                                    />
                                    <p class="mb-0 text-neutral-80 fw-bold">
                                        冰箱
                                    </p>
                                </li>
                                <li class="flex-item d-flex gap-2">
                                    <Icon
                                        class="fs-5 text-primary-100"
                                        icon="material-symbols:check"
                                    />
                                    <p class="mb-0 text-neutral-80 fw-bold">
                                        熱水壺
                                    </p>
                                </li>
                                <li class="flex-item d-flex gap-2">
                                    <Icon
                                        class="fs-5 text-primary-100"
                                        icon="material-symbols:check"
                                    />
                                    <p class="mb-0 text-neutral-80 fw-bold">
                                        檯燈
                                    </p>
                                </li>
                                <li class="flex-item d-flex gap-2">
                                    <Icon
                                        class="fs-5 text-primary-100"
                                        icon="material-symbols:check"
                                    />
                                    <p class="mb-0 text-neutral-80 fw-bold">
                                        衣櫃
                                    </p>
                                </li>
                                <li class="flex-item d-flex gap-2">
                                    <Icon
                                        class="fs-5 text-primary-100"
                                        icon="material-symbols:check"
                                    />
                                    <p class="mb-0 text-neutral-80 fw-bold">
                                        除濕機
                                    </p>
                                </li>
                                <li class="flex-item d-flex gap-2">
                                    <Icon
                                        class="fs-5 text-primary-100"
                                        icon="material-symbols:check"
                                    />
                                    <p class="mb-0 text-neutral-80 fw-bold">
                                        浴缸
                                    </p>
                                </li>
                                <li class="flex-item d-flex gap-2">
                                    <Icon
                                        class="fs-5 text-primary-100"
                                        icon="material-symbols:check"
                                    />
                                    <p class="mb-0 text-neutral-80 fw-bold">
                                        書桌
                                    </p>
                                </li>
                                <li class="flex-item d-flex gap-2">
                                    <Icon
                                        class="fs-5 text-primary-100"
                                        icon="material-symbols:check"
                                    />
                                    <p class="mb-0 text-neutral-80 fw-bold">
                                        音響
                                    </p>
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h3
                                class="title-deco mb-4 mb-md-6 text-neutral-100 fs-7 fs-md-5 fw-bold"
                            >
                                備品提供
                            </h3>
                            <ul
                                class="d-flex flex-wrap row-gap-2 column-gap-10 p-6 mb-0 bg-neutral-0 fs-8 fs-md-7 rounded-3 list-unstyled"
                            >
                                <li class="flex-item d-flex gap-2">
                                    <Icon
                                        class="fs-5 text-primary-100"
                                        icon="material-symbols:check"
                                    />
                                    <p class="mb-0 text-neutral-80 fw-bold">
                                        衛生紙
                                    </p>
                                </li>
                                <li class="flex-item d-flex gap-2">
                                    <Icon
                                        class="fs-5 text-primary-100"
                                        icon="material-symbols:check"
                                    />
                                    <p class="mb-0 text-neutral-80 fw-bold">
                                        拖鞋
                                    </p>
                                </li>
                                <li class="flex-item d-flex gap-2">
                                    <Icon
                                        class="fs-5 text-primary-100"
                                        icon="material-symbols:check"
                                    />
                                    <p class="mb-0 text-neutral-80 fw-bold">
                                        沐浴用品
                                    </p>
                                </li>
                                <li class="flex-item d-flex gap-2">
                                    <Icon
                                        class="fs-5 text-primary-100"
                                        icon="material-symbols:check"
                                    />
                                    <p class="mb-0 text-neutral-80 fw-bold">
                                        清潔用品
                                    </p>
                                </li>
                                <li class="flex-item d-flex gap-2">
                                    <Icon
                                        class="fs-5 text-primary-100"
                                        icon="material-symbols:check"
                                    />
                                    <p class="mb-0 text-neutral-80 fw-bold">
                                        刮鬍刀
                                    </p>
                                </li>
                                <li class="flex-item d-flex gap-2">
                                    <Icon
                                        class="fs-5 text-primary-100"
                                        icon="material-symbols:check"
                                    />
                                    <p class="mb-0 text-neutral-80 fw-bold">
                                        吊衣架
                                    </p>
                                </li>
                                <li class="flex-item d-flex gap-2">
                                    <Icon
                                        class="fs-5 text-primary-100"
                                        icon="material-symbols:check"
                                    />
                                    <p class="mb-0 text-neutral-80 fw-bold">
                                        浴巾
                                    </p>
                                </li>
                                <li class="flex-item d-flex gap-2">
                                    <Icon
                                        class="fs-5 text-primary-100"
                                        icon="material-symbols:check"
                                    />
                                    <p class="mb-0 text-neutral-80 fw-bold">
                                        刷牙用品
                                    </p>
                                </li>
                                <li class="flex-item d-flex gap-2">
                                    <Icon
                                        class="fs-5 text-primary-100"
                                        icon="material-symbols:check"
                                    />
                                    <p class="mb-0 text-neutral-80 fw-bold">
                                        罐裝水
                                    </p>
                                </li>
                                <li class="flex-item d-flex gap-2">
                                    <Icon
                                        class="fs-5 text-primary-100"
                                        icon="material-symbols:check"
                                    />
                                    <p class="mb-0 text-neutral-80 fw-bold">
                                        梳子
                                    </p>
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h3
                                class="title-deco mb-4 mb-md-6 text-neutral-100 fs-7 fs-md-5 fw-bold"
                            >
                                訂房須知
                            </h3>
                            <ol class="text-neutral-80 fs-8 fs-md-7 fw-medium">
                                <li>入住時間為下午3點，退房時間為上午12點。</li>
                                <li>
                                    如需延遲退房，請提前與櫃檯人員聯繫，視當日房況可能會產生額外費用。
                                </li>
                                <li>
                                    請勿在房間內抽煙，若有抽煙需求，可以使用設在酒店各樓層的專用吸煙區。
                                </li>
                                <li>
                                    若發現房間內的設施有損壞或遺失，將會按照價值收取賠償金。
                                </li>
                                <li>
                                    請愛惜我們的房間與公共空間，並保持整潔。
                                </li>
                                <li>
                                    如需額外的毛巾、盥洗用品或其他物品，請聯繫櫃檯。
                                </li>
                                <li>
                                    我們提供免費的Wi-Fi，密碼可以在櫃檯或是房間內的資訊卡上找到。
                                </li>
                                <li>
                                    請勿帶走酒店房內的物品，如有需要購買，請與我們的櫃檯人員聯繫。
                                </li>
                                <li>
                                    我們提供24小時櫃檯服務，若有任何需求或疑問，歡迎隨時詢問。
                                </li>
                                <li>
                                    為了確保所有客人的安全，請勿在走廊或公共區域大聲喧嘩，並遵守酒店的其他規定。
                                </li>
                            </ol>
                        </section>
                    </div>
                    <div class="d-none d-md-block col-md-5">
                        <div
                            class="rounded-3xl position-sticky d-flex flex-column gap-10 p-10 ms-auto bg-neutral-0"
                            style="top: 160px; max-width: 478px"
                        >
                            <h5
                                class="pb-4 mb-0 text-neutral-100 fw-bold border-bottom border-neutral-40"
                            >
                                預訂房型
                            </h5>

                            <div class="text-neutral-80">
                                <h2 class="fw-bold">尊爵雙人房</h2>
                                <p class="mb-0 fw-medium">
                                    享受高級的住宿體驗，尊爵雙人房提供給您舒適寬敞的空間和精緻的裝潢。
                                </p>
                            </div>

                            <div>
                                <div class="d-flex flex-wrap gap-2 mb-4">
                                    <div
                                        class="form-floating flex-grow-1 flex-shrink-1"
                                    >
                                        <input
                                            id="checkinInput"
                                            readonly
                                            type="date"
                                            :value="bookingDate.date.start"
                                            class="form-control p-4 pt-9 text-neutral-100 fw-medium border-neutral-100 rounded-3"
                                            style="min-height: 74px"
                                            placeholder="yyyy-mm-dd"
                                            @click="openModal"
                                        />
                                        <label
                                            class="text-neutral-80 fw-medium"
                                            style="top: 8px; left: 8px"
                                            for="checkinInput"
                                            >入住
                                        </label>
                                    </div>

                                    <div
                                        class="form-floating flex-grow-1 flex-shrink-1"
                                    >
                                        <input
                                            id="checkoutInput"
                                            readonly
                                            type="date"
                                            :value="bookingDate.date.end"
                                            class="form-control p-4 pt-9 text-neutral-100 fw-medium border-neutral-100 rounded-3"
                                            style="min-height: 74px"
                                            placeholder="yyyy-mm-dd"
                                            @click="openModal"
                                        />
                                        <label
                                            class="text-neutral-80 fw-medium"
                                            style="top: 8px; left: 8px"
                                            for="checkoutInput"
                                            >退房
                                        </label>
                                    </div>
                                </div>

                                <div
                                    class="d-flex justify-content-between align-items-center text-neutral-100"
                                >
                                    <p class="mb-0">人數</p>
                                    <div
                                        class="d-flex align-items-center gap-4"
                                    >
                                        <button
                                            :class="{
                                                'disabled bg-neutral-40':
                                                    bookingPeople === 1,
                                            }"
                                            class="btn btn-neutral-0 p-4 border border-neutral-40 rounded-circle"
                                            type="button"
                                            @click="bookingPeople--"
                                        >
                                            <Icon
                                                class="fs-5 text-neutral-100"
                                                icon="ic:baseline-minus"
                                            />
                                        </button>

                                        <h6
                                            id="people"
                                            class="d-flex justify-content-center align-items-center fw-bold text-neutral-100"
                                            style="width: 24px"
                                            name="people"
                                        >
                                            {{ bookingPeople }}
                                        </h6>

                                        <button
                                            :class="{
                                                'disabled bg-neutral-40':
                                                    bookingPeople ===
                                                    MAX_BOOKING_PEOPLE,
                                            }"
                                            class="btn btn-neutral-0 p-4 border border-neutral-40 rounded-circle"
                                            type="button"
                                            @click="bookingPeople++"
                                        >
                                            <Icon
                                                class="fs-5 text-neutral-100"
                                                icon="ic:baseline-plus"
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <h5 class="mb-0 text-primary-100 fw-bold">
                                NT$ 10,000
                            </h5>
                            <NuxtLink
                                :to="{
                                    name: 'rooms-roomId-booking',
                                    params: { roomId: $route.params.roomId },
                                }"
                                class="btn btn-primary-100 py-4 text-neutral-0 fw-bold rounded-3"
                            >
                                立即預訂
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>

            <div
                class="d-flex d-md-none justify-content-between align-items-center position-fixed bottom-0 w-100 p-3 bg-neutral-0"
            >
                <template v-if="bookingDate.date.end === null">
                    <small class="text-neutral-80 fw-medium"
                        >NT$ 10,000 / 晚</small
                    >
                    <button
                        class="btn btn-primary-100 px-12 py-4 text-neutral-0 fw-bold rounded-3"
                        type="button"
                        @click="openModal"
                    >
                        查看可訂日期
                    </button>
                </template>

                <template v-else>
                    <div class="d-flex flex-column gap-1">
                        <small class="text-neutral-80 fw-medium"
                            >NT$ 10,000 / {{ daysCount }} 晚 /
                            {{ bookingPeople }} 人</small
                        >
                        <span
                            class="text-neutral fs-9 fw-medium text-decoration-underline"
                            >{{ daysFormatOnMobile(bookingDate.date?.start) }} -
                            {{
                                daysFormatOnMobile(bookingDate.date?.end)
                            }}</span
                        >
                    </div>
                    <NuxtLink
                        :to="{
                            name: 'rooms-roomId-booking',
                            params: { roomId: $route.params.roomId },
                        }"
                        class="btn btn-primary-100 px-12 py-4 text-neutral-0 fw-bold rounded-3"
                    >
                        立即預訂
                    </NuxtLink>
                </template>
            </div>
        </section>

        <DatePickerModal
            ref="datePickerModal"
            :date-time="bookingDate"
            @handle-date-change="handleDateChange"
        />
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

.rounded-3xl {
    border-radius: 1.25rem;
}

.card-info {
    width: 97px;
    height: 97px;
}

.title-deco {
    display: flex;
    align-items: center;
}

.title-deco::before {
    content: '';
    display: inline-block;
    width: 4px;
    height: 24px;
    background-color: #bf9d7d;
    border-radius: 10px;
    margin-right: 0.75rem;
}

.flex-item {
    flex: 1 1 15%;

    @include media-breakpoint-down(md) {
        flex-basis: 40%;
    }
}

input[type='date'] {
    cursor: pointer;
}
</style>
