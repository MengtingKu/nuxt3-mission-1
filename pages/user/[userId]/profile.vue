<script setup>
const isEditPassword = ref(false);
const isEditProfile = ref(false);
const { findAreaByZipCode } = useConversionZip();

// store
const bookingStore = useBookingStore();
const { userDetailInfo } = storeToRefs(bookingStore);

const accountToken = useCookie('accountToken');
const { formateDateNoWeek } = useHandleDate();

const resetInfo = ref({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    name: '',
    email: '',
    phone: '',
    birthday: {
        year: null,
        month: null,
        day: null,
    },
    address: {
        zipcode: null,
        detail: '',
    },
});

onMounted(() => {
    if (accountToken.value || !userDetailInfo.value) {
        bookingStore.getUserInfo();
    }
});

// 忘記密碼 & 更新使用者資訊
const showError = ref(false);

const resetData = computed(() => {
    return { ...resetInfo.value, ...userDetailInfo.value };
});

const checkPasswords = () => {
    if (resetInfo.value.newPassword && resetInfo.value.confirmPassword) {
        showError.value =
            resetInfo.value.newPassword !== resetInfo.value.confirmPassword;
    }
};

const reset = async (from = 'password') => {
    if (accountToken.value || !userDetailInfo.value) {
        await bookingStore.getUserInfo();
    }

    delete resetData.value.confirmPassword;
    delete resetData.value.updatedAt;
    delete resetData.value.createdAt;
    if (from === 'baseInfo') {
        delete resetData.value.oldPassword;
        delete resetData.value.newPassword;
    }
    await bookingStore.forgetPassword(resetData.value);
    isEditProfile.value = false;
};

// seo
const { title } = useSetMetaTitle();

useSeoMeta({
    title: title('個人資料'),
});
</script>

<template>
    <div class="row gap-6 gap-md-0">
        <div class="col-12 col-md-5">
            <section
                class="rounded-3xl d-flex flex-column gap-6 gap-md-10 p-6 p-md-10 bg-neutral-0"
            >
                <h2 class="fs-6 fs-md-5 fw-bold">修改密碼</h2>
                <div class="d-flex flex-column gap-4 gap-md-6">
                    <div class="fs-8 fs-md-7">
                        <p class="mb-2 text-neutral-80 fw-medium">電子信箱</p>
                        <span
                            class="form-control pe-none p-0 text-neutral-100 fw-bold border-0"
                            >{{ userDetailInfo.email ?? '-' }}</span
                        >
                    </div>

                    <div
                        class="d-flex justify-content-between align-items-center"
                        :class="{ 'd-none': isEditPassword }"
                    >
                        <div>
                            <label
                                class="mb-0 text-neutral-80 fs-8 fs-md-7 fw-medium"
                            >
                                密碼
                            </label>
                            <input
                                class="form-control pe-none p-0 text-neutral-100 fs-5 fs-md-3 fw-bold border-0"
                                type="password"
                                :value="userDetailInfo.email"
                            />
                        </div>

                        <button
                            class="flex-shrink-0 text-primary-100 fs-8 fs-md-7 fw-bold text-decoration-underline border-0 bg-transparent"
                            type="button"
                            @click="isEditPassword = !isEditPassword"
                        >
                            重設
                        </button>
                    </div>

                    <div
                        class="d-flex flex-column gap-4 gap-md-6"
                        :class="{ 'd-none': !isEditPassword }"
                    >
                        <div>
                            <label
                                for="oldPassword"
                                class="form-label fs-8 fs-md-7 fw-bold"
                                >舊密碼</label
                            >
                            <input
                                id="oldPassword"
                                type="password"
                                class="form-control p-4 fs-7 rounded-3"
                                placeholder="請輸入舊密碼"
                                v-model="resetInfo.oldPassword"
                            />
                        </div>

                        <div>
                            <label
                                for="newPassword"
                                class="form-label fs-8 fs-md-7 fw-bold"
                                >新密碼</label
                            >
                            <input
                                id="newPassword"
                                type="password"
                                class="form-control p-4 fs-7 rounded-3"
                                placeholder="請輸入新密碼"
                                v-model="resetInfo.newPassword"
                                @blur="checkPasswords()"
                            />
                        </div>

                        <div>
                            <label
                                for="confirmPassword"
                                class="form-label fs-8 fs-md-7 fw-bold"
                                >確認新密碼</label
                            >
                            <input
                                id="confirmPassword"
                                type="password"
                                class="form-control p-4 fs-7 rounded-3"
                                placeholder="請再輸入一次新密碼"
                                v-model="resetInfo.confirmPassword"
                                @blur="checkPasswords()"
                            />
                            <small v-if="showError" class="text-danger mt-2">
                                密碼不一致，請再確認一次。
                            </small>
                        </div>
                    </div>
                        <button
                            :class="{ 'd-none': !isEditPassword }"
                            class="btn btn-outline-neutral-100 align-self-md-start px-8 py-3 text-neutral-60 rounded-3 w-75 ms-auto"
                            type="button"
                            :disabled="!showError && !resetInfo.oldPassword"
                            @click="reset()"
                        >
                            儲存設定
                        </button>
                        
                        <button
                            :class="{ 'd-none': !isEditPassword }"
                            class="btn btn-neutral-100 align-self-md-start px-8 py-3 text-neutral-0 rounded-3 w-75 ms-auto"
                            type="button"
                            @click="isEditPassword = !isEditPassword"
                        >
                            取消
                        </button>
                </div>
            </section>
        </div>

        <div class="col-12 col-md-7">
            <section
                class="rounded-3xl d-flex flex-column gap-6 gap-md-10 p-6 p-md-10 bg-neutral-0"
            >
                <h2 class="fs-6 fs-md-5 fw-bold">基本資料</h2>
                <div class="d-flex flex-column gap-4 gap-md-6">
                    <div class="fs-8 fs-md-7">
                        <label
                            class="form-label"
                            :class="{
                                'fw-bold text-neutral-100': isEditProfile,
                                'fw-medium text-neutral-80': !isEditProfile,
                            }"
                            for="name"
                        >
                            姓名
                        </label>
                        <input
                            id="name"
                            name="name"
                            class="form-control text-neutral-100 fw-bold"
                            :class="{
                                'pe-none p-0 border-0': !isEditProfile,
                                'p-4': isEditProfile,
                            }"
                            type="text"
                            :value="userDetailInfo.name"
                        />
                    </div>

                    <div class="fs-8 fs-md-7">
                        <label
                            class="form-label"
                            :class="{
                                'fw-bold text-neutral-100': isEditProfile,
                                'fw-medium text-neutral-80': !isEditProfile,
                            }"
                            for="phone"
                        >
                            手機號碼
                        </label>
                        <input
                            id="phone"
                            name="phone"
                            class="form-control text-neutral-100 fw-bold"
                            :class="{
                                'pe-none p-0 border-0': !isEditProfile,
                                'p-4': isEditProfile,
                            }"
                            type="tel"
                            :value="userDetailInfo.phone"
                        />
                    </div>

                    <div class="fs-8 fs-md-7">
                        <label
                            class="form-label"
                            :class="{
                                'fw-bold text-neutral-100': isEditProfile,
                                'fw-medium text-neutral-80': !isEditProfile,
                            }"
                            for="birth"
                        >
                            生日
                        </label>
                        <span
                            class="form-control pe-none p-0 text-neutral-100 fw-bold border-0"
                            :class="{ 'd-none': isEditProfile }"
                        >
                            {{
                                `${formateDateNoWeek(userDetailInfo.birthday)}`
                            }}
                        </span>
                        <div
                            class="d-flex gap-2"
                            :class="{ 'd-none': !isEditProfile }"
                        >
                            <select
                                id="birth"
                                class="form-select p-4 text-neutral-80 fw-medium rounded-3"
                                v-model="resetInfo.birthday.year"
                            >
                                <option
                                    v-for="year in 65"
                                    :key="year"
                                    :value="`${year + 1958}`"
                                >
                                    {{ year + 1958 }} 年
                                </option>
                            </select>
                            <select
                                class="form-select p-4 text-neutral-80 fw-medium rounded-3"
                                v-model="resetInfo.birthday.month"
                            >
                                <option
                                    v-for="month in 12"
                                    :key="month"
                                    :value="`${month} 月`"
                                >
                                    {{ month }} 月
                                </option>
                            </select>
                            <select
                                class="form-select p-4 text-neutral-80 fw-medium rounded-3"
                                v-model="resetInfo.birthday.day"
                            >
                                <option
                                    v-for="day in 30"
                                    :key="day"
                                    :value="`${day} 日`"
                                >
                                    {{ day }} 日
                                </option>
                            </select>
                        </div>
                    </div>

                    <div class="fs-8 fs-md-7">
                        <label
                            class="form-label"
                            :class="{
                                'fw-bold text-neutral-100': isEditProfile,
                                'fw-medium text-neutral-80': !isEditProfile,
                            }"
                            for="address"
                        >
                            地址
                        </label>
                        <span
                            class="form-control pe-none p-0 text-neutral-100 fw-bold border-0"
                            :class="{ 'd-none': isEditProfile }"
                            >{{
                                `${findAreaByZipCode(
                                    userDetailInfo.address?.zipcode
                                )}${userDetailInfo.address?.detail}`
                            }}</span
                        >
                        <div :class="{ 'd-none': !isEditProfile }">
                            <div class="d-flex gap-2 mb-2">
                                <select
                                    class="form-select p-4 text-neutral-80 fw-medium rounded-3"
                                >
                                    <option value="臺北市">臺北市</option>
                                    <option value="臺中市">臺中市</option>
                                    <option selected value="高雄市">
                                        高雄市
                                    </option>
                                </select>
                                <select
                                    class="form-select p-4 text-neutral-80 fw-medium rounded-3"
                                >
                                    <option value="前金區">前金區</option>
                                    <option value="鹽埕區">鹽埕區</option>
                                    <option selected value="新興區">
                                        新興區
                                    </option>
                                </select>
                            </div>
                            <input
                                id="address"
                                type="text"
                                class="form-control p-4 rounded-3"
                                placeholder="請輸入詳細地址"
                                v-model="resetInfo.address.detail"
                            />
                        </div>
                    </div>
                </div>
                <button
                    :class="{ 'd-none': isEditProfile }"
                    class="btn btn-outline-primary-100 align-self-start px-8 py-4 rounded-3"
                    type="button"
                    @click="isEditProfile = !isEditProfile"
                >
                    編輯
                </button>
                <div class="d-flex justify-content-between align-items-center">
                    <button
                        :class="{ 'd-none': !isEditProfile }"
                        class="btn btn-outline-neutral-100 align-self-md-start px-8 py-4 text-neutral-60 rounded-3"
                        type="button"
                        :disabled="
                            resetInfo.birthday.year === null ||
                            resetInfo.birthday.month === null ||
                            resetInfo.birthday.day === null
                        "
                        @click="reset('baseInfo')"
                    >
                        儲存設定
                    </button>
                    <button
                        :class="{ 'd-none': !isEditProfile }"
                        class="btn btn-neutral-100 align-self-md-start px-8 py-4 text-neutral-00 rounded-3"
                        type="button"
                        @click="isEditProfile = !isEditProfile"
                    >
                        取消編輯
                    </button>
                </div>
            </section>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.rounded-3xl {
    border-radius: 1.25rem;
}

input[type='password'] {
    font: small-caption;
}

.form-control::placeholder {
    --neutral-60: #909090;
    color: var(--neutral-60);
    font-weight: 500;
}
</style>
