<template>
	<!--<transition name="wkn-slide">-->
	<Motion :value="offset" tag="div">
		<div slot-scope="props" :style="{ transform: `translateX(${props.value}px)` }">
			<component
				:is="currentView"
				v-on:complete="$emit('complete')"
				v-on:back="$emit('back')"
			></component>
			<button type="button" v-on:click="cl()">ok</button>
		</div>
	</Motion>
	<!--</transition>-->
</template>

<style>
	/*.slide-enter { transform: translateX(100%) }
	.slide-enter-to { transform: translateX(0) }
	.slide-enter-active { position: absolute }
	!*.slide-leave-active { position: absolute }*!

	.slide-leave { transform: translateX(0) }
	.slide-leave-to { transform: translateX(-100%) }

	.slide-enter-active,
	.slide-leave-active { transition: all 300ms ease-in-out }*/
</style>

<script>
	import { Motion } from 'vue-motion'
	import Empty from './steps/Empty'
	import CalcForm from './steps/CalcForm'
	import CustomerInfo from './steps/CustomerInfo'
	import CalcResult from './steps/CalcResult'
	import Confirmation from './steps/Confirmation'
	import {mapGetters} from 'vuex'

	export default {
		components: {Motion, Empty, CalcForm, CustomerInfo, CalcResult, Confirmation},
		props: ['name'],
		data() {
			return {
				offset: 0
			}
		},
		methods: {
			cl() {
				this.offset = '100%'
			}
		},
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
		created() {

		}
	}
</script>
