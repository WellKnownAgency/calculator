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
	import Empty from './visuals/Empty'
	import Room from './visuals/Room'
	import Studio from './visuals/Studio'
	import SmallBedroomApt from './visuals/SmallBedroomApt'
	import LargeBedroomApt from './visuals/LargeBedroomApt'
	import BedroomHouse from './visuals/BedroomHouse'
	import {mapGetters} from 'vuex'

	export default {
		components: {Empty, Room, Studio, SmallBedroomApt, LargeBedroomApt, BedroomHouse},
		props: ['name'],
		data() {
			return {}
		},
		methods: {},
		computed: {
			...mapGetters("CalcFormStore", [
				"selected_move_size",
			]),
			currentView () {
				if (this.selected_move_size) {
					switch (this.selected_move_size.name) {
						case 'room':
							return 'room';
						case 'studio':
							return 'studio';
						case 'small-1-bedroom-apt':
						case 'small-2-bedroom-apt':
							return 'small-bedroom-apt';
						case 'large-1-bedroom-apt':
						case 'large-2-bedroom-apt':
						case '3-bedroom-apt':
							return 'large-bedroom-apt';
						case '2-bedroom-house':
						case '3-bedroom-house':
						case '4-bedroom-house':
							return 'bedroom-house';
						default:
							return 'empty';
					}
				}
				return 'empty';
			}
		},
		created() {}
	}
</script>
