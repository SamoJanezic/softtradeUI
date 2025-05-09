<template>
	<div class="container">
		<h1>Pozdravljen v Softtrade App-u</h1>
		<button @click="clearDb">Izbriši bazo</button>
		<button @click="downloadXmls">Prenesi xml-je</button>
	</div>
</template>

<script>

export default {
	name: 'HomeView',
	data() {
		return {

		}
	},
	methods: {
		clearDb() {
			window.api.clearDb();
		},
		downloadXmls() {
			window.api.downloadXml();
		},
	},
}
</script>

<style lang="scss"></style>