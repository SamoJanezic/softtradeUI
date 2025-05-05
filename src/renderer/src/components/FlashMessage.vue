<template>
    <transition name="fade">
        <div v-if="visible" :class="['flash-message', type]">
            {{ message }}
        </div>
    </transition>
</template>

<script>
export default {
    name: 'FlashMessage',
    props: {
        message: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            default: 'success', // Can be 'success', 'error', etc.
        },
    },
    data() {
        return {
            visible: false, // Controls visibility for transitions
        };
    },
    watch: {
        message(newVal) {
            if (newVal) {
                this.showMessage();
            }
        },
    },
    methods: {
        showMessage() {
            this.visible = true; // Show the message
            setTimeout(() => {
                this.visible = false; // Hide the message after 3 seconds
            }, 3000);
        },
    },
    mounted() {
        if (this.message) {
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
    padding: 10px 20px;
    border-radius: 20px;
    font-size: 1rem;
    color: white;
    z-index: 1000;
    opacity: 0.88;
}

.flash-message.success {
    background-color: #4caf50; /* Green for success */
}

.flash-message.error {
    background-color: #f44336; /* Red for error */
}

/* Transition classes */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.8s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
