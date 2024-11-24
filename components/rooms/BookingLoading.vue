<template>
  <div
    class="position-fixed z-3 d-flex justify-content-center align-items-center px-3"
    style="inset: 0; background-color: #0005;; backdrop-filter: blur(10px);"
  >
    <div
      class="w-100 h-50 h-md-75 d-flex flex-column justify-content-center align-items-center bg-neutral-0"
      style="max-width: 1020px; border-radius: 20px;"
    >
      <div class="d-flex gap-4 mb-15">
        <div
          class="spinner-grow bg-neutral-100"
          style="--bs-spinner-animation-speed: 1s"
          role="status"
        >
          <span class="visually-hidden">Loading...</span>
        </div>
        <div
          class="spinner-grow bg-neutral-80"
          style="--bs-spinner-animation-speed: 1.5s"
          role="status"
        >
          <span class="visually-hidden">Loading...</span>
        </div>
        <div
          class="spinner-grow bg-neutral-60"
          style="--bs-spinner-animation-speed: 2s"
          role="status"
        >
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <img
        class="mb-4"
        style="max-width: 144px;"
        src="@/assets/images/logo-primary.svg"
        alt="logo"
      >
      <p class="mb-0 text-neutral-100 fs-5 fw-bold">
        正在處理你的預訂
      </p>
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
$breakpoint-md: 768px;

.h-md-75 {
  @media (min-width: $breakpoint-md) {
    height: 75% !important;
  }
}

.spinner-grow, .spinner-border {
  width: 12px;
  height: 12px;
}
</style>