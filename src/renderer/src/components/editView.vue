<template>
	<div class="form-group">
		<div class="form-el" v-for="(value, key) in product" :key="key">
			<div v-if="value != null && value.length > 80">
				<label for="">{{ key }}:</label>
				<div>
					<textarea :value="value"></textarea>
				</div>
			</div>
			<div v-else-if="key === 'izdelek_ean' || key === 'id' || key === 'DOBAVITELJ_dobavitelj' || key === 'spremenjen_na'">
				<label for="">{{ key }}:</label>
				<div>
					<input type="text" :value="value" readonly/>
				</div>
			</div>
			<div v-else-if="key === 'KATEGORIJA_kategorija'">
				<label for="">{{ key }}:</label>
				<div>
					<select type="text" :value="value">
						<option v-for="cat in categories" :key="cat">{{ cat }}</option>
					</select>
				</div>
			</div>
			<div v-else-if="key === 'zaloga'">
				<label for="">{{ key }}:</label>
				<select type="text" :value="value">
						<option>Na zalogi</option>
						<option>Ni na zalogi</option>
					</select>
			</div>
			<div v-else>
				<label for="">{{ key }}:</label>
				<div>
					<input type="text" :value="value" />
				</div>
			</div>
		</div>
	</div>
	<button class="btn btn-primary pill fw-medium save-btn" @click="$emit('closeEdit')">
		Shrani spremembe
	</button>
</template>

<script>
export default {
	props: {
		rowId: Number
	},
	data() {
		return {
			editScreen: 'Editing goes here',
			product: null,
			categories: null,
		}
	},
	methods: {
		closeEdit() {
			this.$emit('close')
		},
		showId() {
			console.log(this.rowId)
		},
		getSingleRow() {
			const row = window.api.getSingle(this.rowId)
			this.product = row
			console.log(this.product)
		},
		getCategories() {
			const categories = window.api.getTable('KATEGORIJA');
			this.categories = categories.map(el=> {
				return el.kategorija
			})
			console.log(this.categories);
		}
	},
	mounted() {
		this.getCategories();
		this.getSingleRow();
	}
}
</script>

<style lang="scss">
@use "../css/buttons.scss";
.form-group {
	background-color: #222628;
	color: white;
	width: 100%;
	height: 100%;
	padding-top: 1.5em;
	padding-left: 2rem;
	// padding-bottom: 1rem;
	padding-right: 1.5rem;
	display: flex;
	flex-flow: row wrap;
	justify-content: space-around;

	.form-el {
		width: 30%;

		label {
			font-size: 1.175rem;
			margin-bottom: 0.5rem;
		}

		input, select {
			width: 100%;
			height: 3rem;
			background-color: #3b3f43;
			color: white;
			border-radius: 0.5rem;
			margin-bottom: 2em;
			border: none;
			padding-left: 0.5rem;
			font-size: 1.2rem;
		}
		textarea {
			width: 100%;
			height: 10rem;
			background-color: #3b3f43;
			color: white;
			border-radius: 0.5rem;
			margin-bottom: 2em;
			border: none;
			padding-left: 0.5rem;
			font-size: 1.2rem;
		}
	}
}
// .save-btn {
// 	@include save-btn;
// }
</style>
