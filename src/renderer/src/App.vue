<template>
	<div class="app">
		<sidebar @change-view="callback"/>
		<table-view :currentTable :edit />
	</div>
</template>

<script>
import Sidebar from './components/SidebarView.vue'
import TableView from './components/TableView.vue'
// import { ref } from 'vue'

export default {
	name: 'App',
	components: {
		Sidebar,
		TableView,
	},
	data() {
		return {
			currentTable: null,
			edit: false
		}
	},
	methods: {
		callback(table) {
			this.currentTable = table;
		}
	}
}
</script>


<style lang="scss">
.app {
	display: flex;
	flex-direction: row;
}
</style>
