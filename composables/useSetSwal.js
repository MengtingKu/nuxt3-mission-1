export const useSetSwal = () => {
    const { $swal } = useNuxtApp();

    const setSwal = (icon, title) =>
        $swal.fire({
            position: 'center',
            icon,
            title,
            showConfirmButton: false,
            timer: 1500,
        });

    return { setSwal };
};
