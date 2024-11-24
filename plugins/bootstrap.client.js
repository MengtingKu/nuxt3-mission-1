// import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min';

// export default defineNuxtPlugin(nuxtApp => {
//     nuxtApp.provide('bootstrap', bootstrap);
// });

import * as bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min';

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.provide('bootstrap', { ...bootstrap });
});
