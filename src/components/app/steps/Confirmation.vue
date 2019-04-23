<template>
	<div class="wkn-confirmation">
		<div class="wkn-confirmation__title">Success</div>
		<div>
			<button type="button" class="wkn-btn-success" v-on:click.prevent="toStartStep()">View account page</button>
		</div>
	</div>
</template>

<script>
	import { mapMutations } from 'vuex'

	export default {
		data() {
			return {}
		},
		computed: {

		},
		methods: {
			...mapMutations('AppStore', {
				SET_START_STEP: 'SET_START_STEP',
			}),
			toStartStep() {
				this.SET_START_STEP()
			}
		},
		created() {

		}
	}
</script>
