<template>
  <div id="app">
		<h3 class="wkn-title-app">{{ title }}</h3>
		<steps-bar></steps-bar>
		<step-builder name="CalcForm" v-on:complete="nextStep()" v-on:back="prevStep()"></step-builder>
  </div>
</template>


<script>
	import StepsBar from '@/components/StepsBar'
	import StepBuilder from '@/components/StepBuilder'
	import { mapMutations, mapActions } from 'vuex';

	export default {
		components: {StepsBar, StepBuilder},
		props: ['title'],
		methods: {
			...mapMutations('CustomerInfoStore', {
				setPreferredTimes: 'SET_PREFERRED_TIMES',
				setInfoSources: 'SET_INFO_SOURCES',
			}),
			...mapMutations('AppStore', {
				nextStep: 'NEXT_STEP',
				prevStep: 'PREV_STEP',
			}),
			...mapActions('CalcFormStore', {
				setCalcForm: 'setCalcForm',
			}),
			...mapActions('AppStore', {
				setApp: 'setApp',
			}),
		},
		created() {
			this.setApp()
		}
	}
</script>
