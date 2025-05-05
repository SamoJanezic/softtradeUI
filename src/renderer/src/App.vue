<template>
	<div class="app">
		<flash-message v-if="flashMessage" :message="flashMessage.text" :type="flashMessage.type" />
		<sidebar @change-view="changeView" />
		<home-view v-if="isHome" />
		<edit-view v-if="editing" @closeEdit="closeEdit" @showFlash="showFlashMessage" :rowId />
		<table-view v-else-if="!isHome" :currentTable :editing @rowClicked="rowClicked" @showFlash="showFlashMessage" />
	</div>
</template>

<script>
import HomeView from './components/HomeView.vue'
import Sidebar from './components/SidebarView.vue'
import TableView from './components/TableView.vue'
import EditView from './components/editView.vue';
import FlashMessage from './components/FlashMessage.vue';


export default {
	name: 'App',
	components: {
		Sidebar,
		TableView,
		EditView,
		FlashMessage,
		HomeView,
	},
	data() {
		return {
			currentTable: 'IZDELEK_DOBAVITELJ',
			editing: false,
			rowId: null,
			isHome: true,
			flashMessage: null
		}
	},
	methods: {
		closeEdit() {
			this.editing = false;
		},
		changeView(view) {
			if(view === 'home') {
				this.isHome = true;
				this.editing = false;
				return;
			}
			this.isHome = false;
			this.editing = false;
			this.currentTable = view;
		},
		rowClicked(event) {
			if(this.currentTable === 'IZDELEK_DOBAVITELJ') {
				this.rowId = parseInt(event.node.id) + 1;
				this.editing = true;
			}
		},
		showFlashMessage(text, type) {
            this.flashMessage = { text: text, type: type };
            setTimeout(() => {
                this.flashMessage = null;
            }, 3500);
        },
	}
}
</script>


<style>
.app {
	display: flex;
	flex-direction: row;
}
</style>
