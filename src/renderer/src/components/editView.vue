<template>
	<div>
		<h1>{{ editScreen }}</h1>
		<h2>{{ row }}</h2>
	</div>
	<button @click="$emit('closeEdit')">Close editing</button>
</template>

<script>
export default {
	props: {
		"rowId": Number,
	},
	data() {
		return {
			editScreen: 'Editing goes here',
			product: null
		}
	},
	methods: {
		closeEdit() {
			this.$emit('close');
		},
		showId() {
			console.log(this.rowId)
		},
		getSingleRow() {
			const row = window.api.getSingle(this.rowId);
			this.product = row;
			console.log(row)
		}
	},
	mounted() {
		this.getSingleRow()
	}
}

</script>