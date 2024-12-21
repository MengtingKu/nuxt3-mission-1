import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.locale('zh-cn');
dayjs.extend(isSameOrAfter);

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.provide('dayjs', dayjs);
});
