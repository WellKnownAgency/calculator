<template>
	<div class="wkn-steps-bar">
		<ul class="wkn-progressbar">
			<li v-for="step in steps" v-bind:class="{ 'active': step.is_active}" :key="step.id">{{ step.display_name }}</li>
		</ul>
	</div>
</template>


<script>
	import {mapGetters} from 'vuex'

	export default {
		name: 'stepsBar',
		computed: {
			...mapGetters('AppStore', [
				'steps'
			])
		},
		created() {
			//console.log(this.$root.title)
		},
		mounted() {

		}
	}
</script>
