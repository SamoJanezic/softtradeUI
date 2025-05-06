<template>
	<div class="app">
		<flash-message/>
		<sidebar/>
		<component :is="activeComp" />
	</div>
</template>

<script>
import HomeView from './components/HomeView.vue'
import Sidebar from './components/SidebarView.vue'
import TableView from './components/TableView.vue'
import FlashMessage from './components/FlashMessage.vue';
import { useViewStore } from './stores/ViewStore';

export default {
	name: 'App',
	components: {
		Sidebar,
		TableView,
		FlashMessage,
		HomeView,
	},
	data() {
		return {
			viewStore: useViewStore(),
			activeComp: 'home-view',
		}
	},
	methods: {
		changeView(view) {
			if(view === 'home') {
				this.activeComp = 'home-view';
				return;
			}
			this.activeComp = 'table-view';
		}
	},
	watch: {
		'viewStore.currentTable': function() {
			this.changeView(this.viewStore.currentTable);
			console.log('watcher in app.vue: ', this.viewStore.currentTable);
		}
	}
}
</script>

<style>
.app {
	display: flex;
	flex-direction: row;
}
</style>
