<script setup>
const route = useRoute();
const router = useRouter();
const event = useRequestEvent(); // 獲取當前請求的事件
setResponseStatus(event, 404); // 設定 HTTP 404 狀態碼
</script>

<template>
    <main style="margin-top: 350px">
        <div class="jc-elevator">
            <div id="myBtn" class="jc-floor">
                <h3>404</h3>
            </div>
            <div id="doors" class="jc-doors">
                <div>Ops... <br />Wrong floor</div>
            </div>

            <div class="jc-switch">
                <NuxtLink to="/" />
                <NuxtLink to="/" />
            </div>
        </div>
    </main>
</template>

<style lang="scss" scoped>
main {
    background: #f8f8f8;
    font-family: Arial, Helvetica, sans-serif;
    text-align: center;
}

.class-link {
    color: #333333;
    text-decoration: none;
    text-align: center;
}

.class-link:hover {
    color: #ffbb00;
}

.jc-elevator {
    background: #f8f8f8;
    width: 340px;
    height: 430px;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-left: 4px solid #43464b;
    border-right: 4px solid #43464b;
    border-top: 4px solid #43464b;
    border-bottom: 1px solid #43464b;
}

.jc-floor {
    position: relative;
    top: 3%;
    left: 40%;
    background: #f8f8f8;
    height: 30px;
    width: 20%;
    border: 2px solid #43464b;

    h3 {
        color: #36b079;
        position: relative;
        top: -42%;
        text-align: center;
        font: 25px;
    }
}

.jc-doors {
    z-index: 1;
    background: #ffffff;
    width: 250px;
    height: 370px;
    position: absolute;
    bottom: 0;
    left: 12%;
    overflow: hidden;
    border-left: 4px solid #43464b;
    border-right: 4px solid #43464b;
    border-top: 4px solid #43464b;
}

.jc-doors:before {
    content: '';
    background: #f8f8f8;
    border-right: 2px solid #abb7b2;
    width: 125px;
    height: 370px;
    position: absolute;
    top: 0;
    left: 0;
    animation: left 1s linear 0.5s forwards;
}

.jc-doors:after {
    content: '';
    background: #f8f8f8;
    border-left: 2px solid #abb7b2;
    width: 125px;
    height: 370px;
    position: absolute;
    top: 0;
    right: 0;
    animation: right 1s linear 0.5s forwards;
}

.jc-doors div {
    position: relative;
    z-index: -1;
    top: 20%;
    color: #333333;
    text-align: center;
    line-height: 2;
}

.jc-doors div:nth-child(1) {
    font-size: 30px;
}

.jc-doors div:nth-child(2) {
    font-size: 12px;
}

.jc-switch {
    position: absolute;
    background: #dadfe1;
    top: 45%;
    left: 89.1%;
    height: 50px;
    width: 30px;
    border: 2px solid #abb7b7;
}

.jc-switch a:nth-child(1) {
    position: absolute;
    top: 15%;
    left: 12%;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #36b079;
}

.jc-switch a:nth-child(2) {
    content: '';
    position: absolute;
    bottom: 15%;
    left: 12%;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid #37b079;
}

@keyframes left {
    0% {
        left: 0;
    }
    100% {
        left: -48%;
    }
}

@keyframes right {
    0% {
        right: 0;
    }
    100% {
        right: -48%;
    }
}
</style>
