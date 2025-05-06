import { defineStore } from "pinia";

export const useFlashStore = defineStore("flashStore", {
	state: () => ({
		message: {
			text: null,
			type: null,
		}
	}),
	actions: {
		setFlashMessage(text, type) {
			this.message.text = text;
			this.message.type = type;
		}
	}
})