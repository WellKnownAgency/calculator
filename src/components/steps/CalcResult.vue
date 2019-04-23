<template>
	<l-screen>
		<template slot="body">
			<l-res>
				<template slot="mid">
					<b-row class="wkn-my-4">
						<b-col>
							<div class="wkn-calc-result-map__visual">
								<GmapMap
									ref="mapRef"
									map-type-id="terrain"
									:center="{lat: 41.85, lng: -87.65}"
									:zoom="7"
									style="width: 100%; height: 300px;"
								>
									<DirectionsRenderer :from="info.from_coordinates" :to="info.to_coordinates"></DirectionsRenderer>
								</GmapMap>
							</div>
						</b-col>
						<b-col>
							<div class="wkn-calc-res" v-if="!isHiddenInfoProperty('from_formatted_address') && calcinfo.from_formatted_address">
								<span class="wkn-calc-res__title">Moving From: </span>&nbsp;
								<span class="wkn-calc-res__description"> {{calcinfo.from_formatted_address}} ({{selected_from_entrance_type.display_name}})</span>
							</div>
							<div class="wkn-calc-res" v-if="!isHiddenInfoProperty('to_formatted_address') && calcinfo.to_formatted_address">
								<span class="wkn-calc-res__title">Moving To: </span>&nbsp;
								<span class="wkn-calc-res__description"> {{calcinfo.to_formatted_address}} ({{selected_to_entrance_type.display_name}})</span>
							</div>
							<div class="wkn-calc-res" v-if="info.job_distance">
								<span class="wkn-calc-res__title">Distance: </span>&nbsp;
								<span class="wkn-calc-res__description"> {{Math.ceil(info.job_distance / 1609.344)}} miles</span>
							</div>
							<div class="wkn-calc-res">
								<span class="wkn-calc-res__title">Desired Moving Date: </span>&nbsp;
								<span class="wkn-calc-res__description"> {{selected_move_date_pretty}}</span>
							</div>
							<div class="wkn-calc-res">
								<span class="wkn-calc-res__title">Type Of Service: </span>&nbsp;
								<span class="wkn-calc-res__description"> {{selected_service_type.display_name}}</span>
							</div>
							<div class="wkn-calc-res">
								<span class="wkn-calc-res__title">Size Of Move: </span>&nbsp;
								<span class="wkn-calc-res__description"> {{selected_move_size.display_name}} <span v-if="selected_rooms_pretty">({{selected_rooms_pretty}})</span></span>
							</div>
								<div class="wkn-calc-res">
									<span class="wkn-calc-res__title">Crew Size: </span>&nbsp;
									<span class="wkn-calc-res__description"> {{info.count_movers}} Movers</span>
								</div>
								<div class="wkn-calc-res">
									<span class="wkn-calc-res__title">Truck: </span>&nbsp;
									<span class="wkn-calc-res__description"> 1 Truck</span>
								</div>

							<hr>
							<div class="wkn-calc-res" v-if="selected_service_type.name !== 'long'">
								<span class="wkn-calc-res__title">Hourly Rate: </span>&nbsp;
								<span class="wkn-calc-res__description"> ${{info.movers_price_per_hour}}/Hr</span>
							</div>
							<div class="wkn-calc-res">
								<span class="wkn-calc-res__title">Estimated Work Time: </span>&nbsp;
								<span class="wkn-calc-res__description"> {{estimated_job_duration}}</span>
							</div>
							<div class="wkn-calc-res">
								<span class="wkn-calc-res__title">Estimated Quote: </span>&nbsp;
								<span class="wkn-calc-res__description"> ${{estimated_quote}}</span>
							</div>
						</b-col>
					</b-row>
				</template>
			</l-res>
		</template>

		<template slot="btn-prev">
			<button type="button" class="wkn-btn-action" v-on:click.prevent="toBack()">Back</button>
		</template>
		<template slot="btn-next">
			<button class="wkn-btn-action" v-on:click.prevent="submit()">Confirm</button>
		</template>
	</l-screen>
</template>


<script>
	import { mapState, mapGetters } from 'vuex'
	import DirectionsRenderer from '@/packages/DirectionsRenderer'
	import LScreen from "@/components/layouts/Screen"
	import LRes from "@/components/layouts/Res"

	export default {
		components: {DirectionsRenderer, LScreen, LRes},
		data() {
			return {}
		},
		computed: {
			...mapState('CalcResultStore', {
					info: state => state.info,
				}
			),
			...mapState('CalcFormStore', {
					calcform: state => state.form,
					calcinfo: state => state.info,
				}
			),
			...mapGetters('CalcResultStore', [
				'estimated_quote',
				'estimated_job_duration'
			]),
			...mapGetters('CalcFormStore', [
				'selected_from_entrance_type',
				'selected_to_entrance_type',
				'selected_service_type',
				'selected_move_date_pretty',
				'selected_move_size',
				'selected_rooms_pretty'
			]),
			...mapGetters('CalcFormStore', [
				'isHiddenInfoProperty'
			]),
			...mapGetters('AppStore', [
				'next_step',
				'prev_step',
			])
		},
		methods: {
			toBack() {
				this.$emit('back')
			},
			submit() {
				this.$emit('complete')
			},
		},
		created() {},
	}
</script>
<style>
.vue-map-container .vue-map {
	border-radius: 20px;
	border: none;
}
</style>
