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
	import { mapMutations } from 'vuex';

	export default {
		components: {StepsBar, StepBuilder},
		props: ['title'],
		methods: {
			...mapMutations('CalcFormStore', {
				setCalcFormServiceTypes: 'SET_SERVICE_TYPES',
				setCalcFormMoveSizes: 'SET_MOVE_SIZES',
				setCalcFormEntranceTypes: 'SET_ENTRANCE_TYPES',
			}),
			...mapMutations('CustomerInfoStore', {
				setPreferredTimes: 'SET_PREFERRED_TIMES',
				setInfoSources: 'SET_INFO_SOURCES',
			}),
			...mapMutations('AppStore', {
				nextStep: 'NEXT_STEP',
				prevStep: 'PREV_STEP',
			}),
		},
		created() {
			this.setCalcFormServiceTypes([
				'Local Moving',
				'Moving With Storage',
				'Loading Help',
				'Unloading Help',
				'Flat Rate',
				'Overnight',
				'Long Distance',
				'Packing Day'
			])
			this.setCalcFormMoveSizes([
				'Room or less',
				'Studio Apartment',
				'Small 1 Bedroom Apartment',
				'Large 1 Bedroom Apartment',
				'Small 2 Bedroom Apartment',
				'Large 2 Bedroom Apartment',
				'3 Bedroom Apartment',
				'2 Bedroom house/townhouse',
				'3 Bedroom house/townhouse',
				'4 Bedroom house/townhouse'
			])
			this.setCalcFormEntranceTypes([
				'No Stairs - Ground Floor',
				'Stairs - 2nd Floor',
				'Stairs - 3rd Floor',
				'Stairs - 4th Floor',
				'Stairs - 5th Floor',
				'Elevator',
				'Private House'
			])
			this.setPreferredTimes([
				'Any Time',
				'8AM-10AM',
				'12PM-3PM',
				'1PM-4PM',
				'3PM-7PM'
			])
			this.setInfoSources([
				'Yelp',
				'Google search',
				'Word of mouth',
				'HomeAdvisor',
				'Thumbtack',
				'Repeat customer'
			])
		}
	}
</script>
