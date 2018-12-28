<template>
	<div class="wkn-steps-bar">
		<div class="wkn-steps-bar__line" ref="steps-bar-line"></div>
		<div class="wkn-steps-bar__list">
			<div v-for="step in steps" :key="step.id" class="wkn-steps-bar__item">
				<div class="wkn-steps-bar-item">
					<div class="wkn-steps-bar-item__title">{{ step.display_name }}</div>
					<div class="wkn-steps-bar-item__status">
						<div class="wkn-steps-bar-item-status" v-bind:class="{ 'wkn-steps-bar-item-status--active': step.is_active, 'wkn-steps-bar-item-status--inactive': !step.is_active }"></div>
					</div>
				</div>
			</div>
		</div>
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
