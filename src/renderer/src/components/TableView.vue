<template>
	<div v-if="editing">
		<edit-view @closeEdit="closeEdit" :rowId/>
	</div>
	<div class="table-view" v-else>
		<ag-grid-vue
			:rowData="rowData"
			:columnDefs="columnDefs"
			class="table-view_grid ag-theme-alpine-dark"
			@row-doubleClicked="rowClicked"
			:default-col-def="defaultColDef"
			pagination=true
			@cellKeyDown="onCellKeyDown"
			>
		</ag-grid-vue>
		<button v-if="currentTable === 'KATEGORIJA'" @click="updateAll" class="btn btn-primary pill fw-medium save-btn">Shrani spremembe</button>
	</div>
</template>

<script>
import EditView from './EditView.vue';
import { AgGridVue } from 'ag-grid-vue3';
// import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

export default {
	components: {
		AgGridVue,
		EditView
	},
	props: {
		'currentTable': String,
	 },
	data() {
		return {
			editing: false,
			rowData: [],
			columnDefs: [],
			rowId: null,
			defaultColDef: {
				resizable: true,
				sortable: true,
				filter: true,
				flex: 1,
				minWidth: 100,
			},
			changedData: [],
		}
	},
	methods: {
		getData(table) {
			const rows = window.api.getTable(table);

			this.columnDefs = Object.keys(rows[0]).map(key => {
				if(key === 'marza') {
					return {field: key, editable: true}
				}
				return {field: key};
			})

			this.rowData = rows;
		},
		rowClicked(event) {
			if(this.currentTable === 'IZDELEK_DOBAVITELJ') {
				console.log('Row was double clicked', event.node.id);
				this.rowId = parseInt(event.node.id)+1;
				this.editing = true;
			}
		},
		closeEdit() {
			this.editing = false;
		},
		onCellKeyDown(event) {
			if(event.event.key === 'Enter') {
				this.changedData.push([event.value, event.data.kategorija_id]);
			}
			console.log('key pressed', event)
		},
		updateAll(){
			this.changedData.forEach(el => {
				window.api.updateKategorija(el[0], el[1])
			})
		}
	},
	watch: {
		currentTable: function() {
			this.getData(this.currentTable);
			this.closeEdit();
		},
	},
	mounted() {
		this.getData('KATEGORIJA')
	}
}
</script>

<style lang="scss">
	.table-view {
		width: 100vw;

		&_grid {
			height: 100vh;
			width: 100%;
		}
	}

</style>
