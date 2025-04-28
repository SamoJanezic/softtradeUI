<template>
	<div class="app">
		<sidebar @change-view="changeView"/>
		<edit-view v-if="editing" @closeEdit="closeEdit" :rowId/>
		<table-view v-else :currentTable :editing @rowClicked="rowClicked" />
	</div>
</template>

<script>
import Sidebar from './components/SidebarView.vue'
import TableView from './components/TableView.vue'
import EditView from './components/EditView.vue';
// import { ref } from 'vue';


export default {
	name: 'App',
	components: {
		Sidebar,
		TableView,
		EditView,
	},
	data() {
		return {
			currentTable: 'IZDELEK_DOBAVITELJ',
			editing: false,
			rowId: null
		}
	},
	methods: {
		saveEdit() {
			console.log('save edit');
		},
		closeEdit() {
			this.editing = false;

		},
		changeView(table) {
			if(table === 'home') {
			}
			this.editing = false;
			this.currentTable = table;
		},
		rowClicked(event) {
			if(this.currentTable === 'IZDELEK_DOBAVITELJ') {
				this.rowId = parseInt(event.node.id) + 1;
				this.editing = true;
			}
		},
	}
}
</script>


<style lang="scss">
.app {
	display: flex;
	flex-direction: row;
}
</style>
