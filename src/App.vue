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
				<step-builder name="CalcForm" v-on:complete="NEXT_STEP()" v-on:back="PREV_STEP()" />
			</template>

		</l-app>
	</div>
</template>


<script>
	import Vue from 'vue'
	import LApp from '@/components/app/layouts/App'
	import StepsBar from '@/components/app/StepsBar'
	import StepBuilder from '@/components/app/StepBuilder'
	import {mapState, mapMutations, mapActions} from 'vuex';

	export default {
		components: {LApp, StepsBar, StepBuilder},
		props: ['apptitle', 'styles'],
		computed: {
			...mapState('services', {
					services: state => state.data,
				}
			),
		},
		methods: {
			...mapMutations('CustomerInfoStore', {
				setPreferredTimes: 'SET_PREFERRED_TIMES',
				setInfoSources: 'SET_INFO_SOURCES',
			}),
			...mapMutations('AppStore', {
				NEXT_STEP: 'NEXT_STEP',
				PREV_STEP: 'PREV_STEP',
				SET_STYLES: 'SET_STYLES',
			}),
			...mapActions('CalcFormStore', {
				setCalcForm: 'setCalcForm',
			}),
			...mapActions('AppStore', {
				setApp: 'setApp',
			}),
		},
		created() {
			//this.setApp()
			//Vue.prototype.$styleVars = JSON.parse(this.styles)
		}
	}
</script>
