<template>
    <transition name="fade">
        <div v-if="visible" :class="['flash-message', flashStore.message.type]">
            {{ flashStore.message.text }}
        </div>
    </transition>
</template>

<script>
import { useFlashStore } from '../stores/FlashStore';

export default {
    name: 'FlashMessage',
    data() {
        return {
            visible: false,
            flashStore: useFlashStore(),
        };
    },
    watch: {
        'flashStore.message.text'(newVal) {
            if (newVal) {
                this.showMessage();
            }
        },
    },
    methods: {
        showMessage() {
            this.visible = true;
            setTimeout(() => {
                this.visible = false;
                this.flashStore.message.text = null;
                this.flashStore.message.type = null;
            }, 3000);
        },
    },
    mounted() {
        if (this.flashStore.message.text) {
            this.showMessage();
        }
    },
};
</script>

<style scoped>
.flash-message {
    position: fixed;
    width: 250px;
    height: auto;
    top: 25px;
    left: 50%;
    transform: translateX(-50%);
    padding: 10px 35px;
    border-radius: 20px;
    font-size: 1rem;
    color: white;
    z-index: 1000;
    opacity: 0.88;
}

.flash-message.success {
    background-color: #4caf50;
}

.flash-message.error {
    background-color: #f44336;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.8s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
