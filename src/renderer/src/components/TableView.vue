<template>
	<!-- <div v-if="editing">
		<edit-view @closeEdit="closeEdit" :rowId/>
	</div> -->
	<div v-if="editState">
		<edit-view :rowId @closeEdit="closeEdit" />
	</div>
	<div v-else class="table-view">
		<ag-grid-vue
			:rowData="rowData"
			:columnDefs="columnDefs"
			class="table-view_grid ag-theme-alpine"
			@row-doubleClicked="rowClicked"
			:default-col-def="defaultColDef"
			pagination=true
			@cellKeyDown="onCellKeyDown"
			>
		</ag-grid-vue>
		<button v-if="viewStore.currentTable === 'KATEGORIJA'" @click="updateAll" class="btn btn-primary pill fw-medium save-btn cst-button">Shrani spremembe</button>
	</div>
</template>

<script>
import EditView from './editView.vue';
import { AgGridVue } from 'ag-grid-vue3';
// import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { useViewStore } from '../stores/ViewStore.js';
import { useFlashStore } from '../stores/FlashStore.js';

ModuleRegistry.registerModules([AllCommunityModule]);

export default {
	components: {
		AgGridVue,
		EditView,
	},
	props: {
		'editing': Boolean
	},
	data() {
		return {
			rowId: null,
			editState: false,
			flashStore: useFlashStore(),
			viewStore: useViewStore(),
			rowData: [],
			columnDefs: [],
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
		onCellKeyDown(event) {
			if(event.event.key === 'Enter') {
				this.changedData.push([event.value, event.data.kategorija_id]);
			}
			console.log('key pressed', event)
		},
		updateAll(){
			this.changedData.forEach(el => {
				try {
					window.api.updateKategorija(el[0], el[1]);
					this.flashStore.setFlashMessage('Spremembe so shranjene', 'success');
				} catch (err) {
					this.flashStore.setFlashMessage('Napaka pri shranjevanju sprememb', 'error');
					console.error(err);
				}
			})
		},
		rowClicked(event) {
			if(this.viewStore.currentTable === 'IZDELEK_DOBAVITELJ') {
				this.editState = true;
				this.rowId = parseInt(event.node.id) + 1;
			}
		},
		closeEdit() {
			this.editState = false;
			this.rowId = null;
		},
	},
	watch: {
		'viewStore.currentTable': function() {
			this.getData(this.viewStore.currentTable);
		},
		editing: function() {
			if(!this.editing) {
				this.getData(this.viewStore.currentTable);
			}
		}
	},
	mounted() {
		this.getData(this.viewStore.currentTable);
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

		.cst-button {
			right: -160px;
			bottom: 25px
		}
	}
</style>
