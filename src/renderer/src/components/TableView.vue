<template>
	<div class="table-view">
		<ag-grid-vue
			:rowData="rowData"
			:columnDefs="columnDefs"
			class="table-view_grid"
			>
		</ag-grid-vue>
		<button @click="getData">Click me to show Data</button>
		<p>{{ data }}</p>
	</div>
</template>

<script>
import { AgGridVue } from 'ag-grid-vue3'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'

ModuleRegistry.registerModules([AllCommunityModule])

export default {
	name: 'App',
	components: {
		AgGridVue
	},
	data() {
		return {
			data: 'Nothing to show',
			rowData: [],
			columnDefs: []
		}
	},
	methods: {
		getData() {
			const rows = window.api.getCategories();

			this.columnDefs = Object.keys(rows[0]).map(key => {
				return {field: key};
			})

			this.rowData = rows;
		}
	},
	mounted() {
		this.getData()
	}
}
</script>

<style lang="scss">
	.table-view {
		width: 100vw;

		&_grid {
			height: 80vh;
			width: 100%;
		}
	}
</style>
