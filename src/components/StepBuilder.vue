<template>
	<component
		:is="currentView"
		v-on:complete="$emit('complete')"
		v-on:back="$emit('back')"
	></component>
</template>

<script>
	import Empty from './steps/Empty'
	import CalcForm from './steps/CalcForm'
	import CustomerInfo from './steps/CustomerInfo'
	import CalcResult from './steps/CalcResult'
	import Confirmation from './steps/Confirmation'
	import {mapGetters} from 'vuex'

	export default {
		components: {Empty, CalcForm, CustomerInfo, CalcResult, Confirmation},
		props: ['name'],
		data() {
			return {}
		},
		methods: {},
		computed: {
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
		created() {}
	}
</script>
