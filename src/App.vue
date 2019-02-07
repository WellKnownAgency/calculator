<template>
	<div class="wkn-app">
		<l-app>

			<template slot="title">
				<h3 class="wkn-title-app">{{ apptitle }}</h3>
			</template>

			<template slot="bar">
				<steps-bar></steps-bar>
			</template>

			<template slot="body">
				<step-builder name="CalcForm" v-on:complete="nextStep()" v-on:back="prevStep()" />
			</template>

		</l-app>
	</div>
</template>


<script>
	import Vue from 'vue'
	import LApp from '@/components/layouts/App'
	import StepsBar from '@/components/StepsBar'
	import StepBuilder from '@/components/StepBuilder'
	import {mapMutations, mapActions} from 'vuex';

	export default {
		components: {LApp, StepsBar, StepBuilder},
		props: ['apptitle', 'styles'],
		methods: {
			...mapMutations('CustomerInfoStore', {
				setPreferredTimes: 'SET_PREFERRED_TIMES',
				setInfoSources: 'SET_INFO_SOURCES',
			}),
			...mapMutations('AppStore', {
				nextStep: 'NEXT_STEP',
				prevStep: 'PREV_STEP',
				setStyles: 'SET_STYLES',
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
			Vue.prototype.$styleVars = JSON.parse(this.styles)
		}
	}
</script>
