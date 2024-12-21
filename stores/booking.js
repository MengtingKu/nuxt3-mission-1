export const useBookingStore = defineStore('booking', () => {
    const { setSwal } = useSetSwal();
    const { formateApiDate } = useHandleDate();
    const accountToken = useCookie('accountToken');

    const baseURL = 'https://nuxr3.zeabur.app/api/v1';

    const isFetch = ref(false);
    const roomDetail = ref({});
    const bookingInfo = ref({});
    const userDetailInfo = ref({});
    const orderInfo = ref({});
    const NewOrderInfo = ref({});
    const ordersList = ref({});

    // 房型詳細的圖片排版 2 張一組渲染畫面
    const groupedImages = imageUrlList => {
        return imageUrlList.reduce((groups, currentImage, index) => {
            if (index % 2 === 0) {
                groups.push([currentImage]);
            } else {
                groups[groups.length - 1].push(currentImage);
            }

            return groups;
        }, []);
    };

    // 登入頁依照來源不同跳轉去不同的頁面
    const linkTo = (from, userId) => {
        switch (from) {
            case 'index':
                return `/user/${userId}/profile`;

            default:
                return '/rooms';
        }
    };

    // 登入
    const postLogin = async (request, from = '') => {
        if (isFetch.value) return;

        isFetch.value = true;
        try {
            const { token, result } = await $fetch('/user/login', {
                method: 'POST',
                baseURL,
                body: { ...request },
            });
            accountToken.value = token;
            const user = useCookie('user');
            user.value = result.name;

            setSwal('success', '登入成功');

            await Promise.allSettled([
                getUserInfo(),
                getOrders(),
            ]);
            navigateTo(`${linkTo(from, userDetailInfo.value._id)}`);
        } catch (error) {
            setSwal('error', '資料錯誤請重新登入');
        } finally {
            isFetch.value = false;
        }
    };

    // 忘記密碼 & 更新使用者資訊
    const forgetPassword = async resetData => {
        try {
            isFetch.value = true;
            await $fetch(`/user`, {
                method: 'PUT',
                baseURL,
                headers: {
                    authorization: accountToken.value,
                },
                body: {
                    ...resetData,
                    birthday: `${formateApiDate(resetData.birthday)}`,
                    userId: resetData._id,
                },
            });
            await getUserInfo();
            setSwal('success', '變更成功！');
        } catch (error) {
            const { message } = error.response._data;

            setSwal('error', message);
        } finally {
            isFetch.value = false;
        }
    };

    // 取得房型詳細的 api
    const getRoomDetail = async roomId => {
        if (isFetch.value) return;

        try {
            isFetch.value = true;
            const data = await $fetch(`/rooms/${roomId}`, {
                method: 'GET',
                baseURL,
            });

            roomDetail.value = data.result;
            if (roomDetail.value.imageUrlList) {
                roomDetail.value.groupedImages = groupedImages(
                    roomDetail.value.imageUrlList
                );
            }
        } catch (error) {
            const { message } = error.response._data;
            setSwal('error', message);

            navigateTo('/rooms');
        } finally {
            isFetch.value = false;
        }
    };

    // 設定訂房資訊
    const setBookingInfo = info => (bookingInfo.value = info);

    // 取得使用者資訊
    const getUserInfo = async () => {
        try {
            const data = await $fetch('/user/', {
                method: 'GET',
                baseURL,
                headers: {
                    authorization: accountToken.value,
                },
            });
            userDetailInfo.value = data.result;
        } catch (error) {
            const { message } = error.response._data;
            setSwal('error', message);

            navigateTo('/account/login');
        }
    };

    // 取得訂單詳細資料
    const getOrderInfo = async orderId => {
        try {
            isFetch.value = true;
            const data = await $fetch(`/orders/${orderId}`, {
                method: 'GET',
                baseURL,
                headers: {
                    authorization: accountToken.value,
                },
            });
            NewOrderInfo.value = data.result;
        } catch (error) {
            const { message } = error.response._data;
            setSwal('error', message);

            navigateTo('/account/login');
        } finally {
            isFetch.value = false;
            navigateTo(`/booking/confirmation/${orderInfo.value._id}`);
        }
    };

    // 新增訂單
    const postOrders = async booker => {
        try {
            isFetch.value = true;
            const data = await $fetch('/orders/', {
                method: 'POST',
                baseURL,
                headers: {
                    authorization: accountToken.value,
                },
                body: {
                    ...bookingInfo.value,
                    userInfo: { ...booker },
                },
            });
            orderInfo.value = data.result;
            await Promise.allSettled([
                getOrderInfo(data.result._id),
                getOrders(),
            ]);
        } catch (error) {
            const { message } = error.response._data;
            setSwal('error', message);

            navigateTo('/account/login');
        } finally {
            isFetch.value = false;
        }
    };

    // 取得自己的訂單列表
    const getOrders = async () => {
        try {
            isFetch.value = true;
            const data = await $fetch('/orders/', {
                method: 'GET',
                baseURL,
                headers: {
                    authorization: accountToken.value,
                },
            });
            ordersList.value = data.result;

            return data.result;
        } catch (error) {
            const { message } = error.response._data;
            setSwal('error', message);

            navigateTo('/account/login');
        } finally {
            isFetch.value = false;
        }
    };

    // 取消訂單
    const deleteOrder = async orderId => {
        try {
            isFetch.value = true;
            const data = await $fetch(`/orders/${orderId}`, {
                method: 'DELETE',
                baseURL,
                headers: {
                    authorization: accountToken.value,
                },
            });

            setSwal('success', '您已經取消訂單!');
        } catch (error) {
            const { message } = error.response._data;
            setSwal('error', message);

            navigateTo('/account/login');
        } finally {
            isFetch.value = false;
        }
    };

    return {
        postLogin,
        forgetPassword,
        getRoomDetail,
        setBookingInfo,
        getUserInfo,
        getOrders,
        postOrders,
        deleteOrder,
        roomDetail,
        bookingInfo,
        userDetailInfo,
        orderInfo,
        NewOrderInfo,
        ordersList,
    };
});
