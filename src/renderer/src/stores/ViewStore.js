import { defineStore } from "pinia";

export const useViewStore = defineStore("viewStore", {
	state: () => ({
		currentTable: null,
		selectedRow: null,
		currentView: 'home',
		editState: false,
	}),
	getters: {
		getCurrentTable: (state) => {
			return state.currentTable;
		},
	},
	actions: {
		setCurrentTable(table) {
			this.currentTable = table;
		},
		setCurrentView(view) {
			this.currentView = view;
		},
		setEditState(state) {
			this.editState = state;
		}
	}
})