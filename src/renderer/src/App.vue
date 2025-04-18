<template>
	<div class="app">
		<Sidebar />
		<TableView />

	</div>
</template>

<script setup>
import Sidebar from './components/SidebarView.vue'
import TableView from './components/TableView.vue'

</script>


<style lang="scss">
.app {
	display: flex;
	flex-direction: row;
}
</style>
