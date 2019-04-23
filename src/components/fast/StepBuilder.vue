<template>
	<div class="wkn-builder">
		<transition name="wkn-fade" mode="out-in">
				<component
					:is="currentView"
					v-on:complete="$emit('complete')"
					v-on:back="$emit('back')"
				></component>
		</transition>
	</div>
</template>

<style>
	.fade-enter-active, .fade-leave-active {
		transition: opacity 1s ease !important;
	}
	.fade-enter, .fade-leave-to {
		opacity: 0 !important;
	}
</style>

<script>
	import Empty from './steps/Empty'
	import MoveDateForm from './steps/MoveDateForm'
	import MoveSizeForm from './steps/MoveSizeForm'
	import CustomerInfo from './steps/CustomerInfo'
	import {mapState, mapGetters} from 'vuex'

	export default {
		components: {Empty, MoveDateForm, MoveSizeForm, CustomerInfo},
		props: ['name'],
		data() {
			return {}
		},
		methods: {},
		computed: {
			...mapState('AppStore', {
				slide_step_name: state => state.slide_step_name,
			}),
			...mapGetters('AppStore', [
				'steps',
			]),
			currentView() {
				let nameView = null
				for (let i in this.steps) {
					if (this.steps[i].is_current) {
						nameView = this.steps[i].name;
						break;
					}
				}
				if(nameView)
					return nameView
				else
					return 'empty'
			}
		},
		created() {

		}
	}
</script>
