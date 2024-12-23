export const useHandleDate = () => {
    const { $dayjs } = useNuxtApp();

    if (!$dayjs) {
        console.error('Error: $dayjs is not available');
        return;
    }

    const today = $dayjs();

    const formateApiDate = date => $dayjs(date).format('YYYY/M/D');

    const formateDate = date => $dayjs(date).format('YYYY年 MM月 DD日 dddd');

    const formateDateNoWeek = date => $dayjs(date).format('YYYY年 MM月 DD日');

    const calculateDaysDiff = (start, end) =>
        $dayjs(end).diff($dayjs(start), 'day');

    const filterHistoryOrders = ordersList =>
        ordersList.filter(order =>
            $dayjs(today).isBefore(order.checkInDate, 'day')
        );

    const findClosestOrder = ordersList =>
        ordersList.reduce((closest, current) => {
            const closestDiff = $dayjs(closest.checkInDate).diff(today, 'day');
            const currentDiff = $dayjs(current.checkInDate).diff(today, 'day');

            return Math.abs(currentDiff) < Math.abs(closestDiff)
                ? current
                : closest;
        });

    return {
        formateApiDate,
        formateDate,
        formateDateNoWeek,
        calculateDaysDiff,
        filterHistoryOrders,
        findClosestOrder,
    };
};
