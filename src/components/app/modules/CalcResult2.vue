<template>
	<div class="wkn-calc-result-layout">
		<div class="wkn-calc-result-layout__col">
			<div class="wkn-calc-result-map">
				<div class="wkn-calc-result-map__visual">
					<GmapMap
						ref="mapRef"
						map-type-id="terrain"
						:center="{lat: 41.85, lng: -87.65}"
						:zoom="7"
						style="width: 100%; height: 300px"
					>
						<DirectionsRenderer :from="info.from_coordinates" :to="info.to_coordinates"></DirectionsRenderer>
					</GmapMap>
				</div>
				<div class="wkn-calc-result-map__address" v-if="!isHiddenInfoProperty('from_formatted_address') && calcinfo.from_formatted_address">
					<div class="wkn-calc-result-map-address">
						<div class="wkn-calc-result-map-address__title">Moving From:</div>
						<div class="wkn-calc-result-map-address__content">
							<span class="wkn-calc-result-map-address__value">{{calcinfo.from_formatted_address}}</span>
							<span class="wkn-calc-result-map-address__description"> ({{selected_from_entrance_type.display_name}})</span>
						</div>
					</div>
				</div>
				<div class="wkn-calc-result-map__address" v-if="!isHiddenInfoProperty('to_formatted_address') && calcinfo.to_formatted_address">
					<div class="wkn-calc-result-map-address">
						<div class="wkn-calc-result-map-address__title">Moving To:</div>
						<div class="wkn-calc-result-map-address__content">
							<span class="wkn-calc-result-map-address__value">{{calcinfo.to_formatted_address}}</span>
							<span class="wkn-calc-result-map-address__description"> ({{selected_to_entrance_type.display_name}})</span>
						</div>
					</div>
				</div>
				<div class="wkn-calc-result-map__address" v-if="info.job_distance">
					<div class="wkn-calc-result-map-address">
						<div class="wkn-calc-result-map-address__title">Distance:</div>
						<div class="wkn-calc-result-map-address__content">
							<span class="wkn-calc-result-map-address__value">{{Math.ceil(info.job_distance / 1609.344)}} miles</span>
						</div>
					</div>
				</div>
				<div class="wkn-calc-result-map__address">
					<div class="wkn-calc-result-map-address">
						<div class="wkn-calc-result-map-address__title">Estimated Quote:</div>
						<div class="wkn-calc-result-map-address__content">
							<span class="wkn-calc-result-map-address__value">${{estimated_quote}}</span>
						</div>
					</div>
				</div>
				<div class="wkn-calc-result-map__button">
					<button type="button" class="wkn-btn-default" v-on:click.prevent="toBack()"><< Back To {{prev_step.display_name}}</button>
				</div>
			</div>
		</div>
		<div class="wkn-calc-result-layout__col">
			<div class="wkn-calc-result-info">
				<div class="wkn-calc-result-info__list">
					<div class="wkn-calc-result-info__item">
						<div class="wkn-calc-result-info-item">
							<div class="wkn-calc-result-info-item__title">Desired Move Date:</div>
							<div class="wkn-calc-result-info-item__content">
								<span class="wkn-calc-result-info-item__value">{{selected_move_date_pretty}}</span>
							</div>
						</div>
					</div>

					<div class="wkn-calc-result-info__item">
						<div class="wkn-calc-result-info-item">
							<div class="wkn-calc-result-info-item__title">Type Of Service:</div>
							<div class="wkn-calc-result-info-item__content">
								<span class="wkn-calc-result-info-item__value">{{selected_service_type.display_name}}</span>
							</div>
						</div>
					</div>

					<div class="wkn-calc-result-info__item">
						<div class="wkn-calc-result-info-item">
							<div class="wkn-calc-result-info-item__title">Size Of Move:</div>
							<div class="wkn-calc-result-info-item__content">
								<span class="wkn-calc-result-info-item__value">{{selected_move_size.display_name}}</span>
								<div v-if="selected_rooms_pretty" class="wkn-calc-result-info-item__description">({{selected_rooms_pretty}})</div>
							</div>
						</div>
					</div>

					<hr>

					<div class="wkn-calc-result-info__item">
						<div class="wkn-calc-result-info-item">
							<div class="wkn-calc-result-info-item__title">Crew Size:</div>
							<div class="wkn-calc-result-info-item__content">
								<span class="wkn-calc-result-info-item__value">{{info.count_movers}} Movers</span>
							</div>
						</div>
					</div>

					<div class="wkn-calc-result-info__item">
						<div class="wkn-calc-result-info-item">
							<div class="wkn-calc-result-info-item__title">Truck:</div>
							<div class="wkn-calc-result-info-item__content">
								<span class="wkn-calc-result-info-item__value">1 Truck</span>
							</div>
						</div>
					</div>

					<hr>

					<template v-if="false">
						<div class="wkn-calc-result-info__item">
							<div class="wkn-calc-result-info-item">
								<div class="wkn-calc-result-info-item__title">Full Time:</div>
								<div class="wkn-calc-result-info-item__content">
									<span class="wkn-calc-result-info-item__value">{{info.full_time}}</span>
								</div>
							</div>
						</div>

						<div class="wkn-calc-result-info__item">
							<div class="wkn-calc-result-info-item">
								<div class="wkn-calc-result-info-item__title">Full Distance:</div>
								<div class="wkn-calc-result-info-item__content">
									<span class="wkn-calc-result-info-item__value">{{info.full_distance}}</span>
								</div>
							</div>
						</div>

						<div class="wkn-calc-result-info__item">
							<div class="wkn-calc-result-info-item">
								<div class="wkn-calc-result-info-item__title">Travel Time:</div>
								<div class="wkn-calc-result-info-item__content">
									<span class="wkn-calc-result-info-item__value">{{info.travel_time}}</span>
								</div>
							</div>
						</div>

						<div class="wkn-calc-result-info__item">
							<div class="wkn-calc-result-info-item">
								<div class="wkn-calc-result-info-item__title">Travel Distance:</div>
								<div class="wkn-calc-result-info-item__content">
									<span class="wkn-calc-result-info-item__value">{{info.travel_distance}}</span>
								</div>
							</div>
						</div>

						<hr>
					</template>

					<div class="wkn-calc-result-info__item" v-if="selected_service_type.name !== 'long'">
						<div class="wkn-calc-result-info-item">
							<div class="wkn-calc-result-info-item__title">Hourly Rate:</div>
							<div class="wkn-calc-result-info-item__content">
								<span class="wkn-calc-result-info-item__value">${{info.movers_price_per_hour}}/Hr</span>
							</div>
						</div>
					</div>

					<div class="wkn-calc-result-info__item">
						<div class="wkn-calc-result-info-item">
							<div class="wkn-calc-result-info-item__title">Estimated Job Time:</div>
							<div class="wkn-calc-result-info-item__content">
								<span class="wkn-calc-result-info-item__value">{{estimated_job_duration}}</span>
							</div>
						</div>
					</div>

					<div class="wkn-calc-result-info__item">
						<div class="wkn-calc-result-info-item">
							<div class="wkn-calc-result-info-item__title">Estimated Quote:</div>
							<div class="wkn-calc-result-info-item__content">
								<span class="wkn-calc-result-info-item__value">${{estimated_quote}}</span>
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>
		<div class="wkn-calc-result-layout__col">
			<div class="wkn-calc-result-content">
				<div class="wkn-calc-result-content__title">Understand Your Quote</div>
				<div class="wkn-calc-result-content__body">
					<p><b>Please note, this quote is just an estimate and provided for your convenience only.</b> We give you a database average for generally similar moves. It is best to consider this a thinking tool. <b>However: your final cost is based on hourly rate and actual time your move will take.</b> Additional time may be required if your move involves long walks from your apartment to the truck, narrow hallways and/or tight staircases, disassembling and reassembling of furniture, hoisting, moving of oversized, antiques items, ones with glass and/or marble, appliances move and items over 300lb. It is important to understand, that the move time will also depend on how well you are packed and organized: all drawers of all the furniture must be emptied, and all miscellaneous items packed neatly into moving boxes of correct sizes.</p>
				</div>
				<div class="wkn-calc-result-map__button">
					<button type="button" class="wkn-btn-success" v-on:click.prevent="submit()">Go To {{next_step.display_name}}</button>
				</div>
			</div>
		</div>
	</div>

</template>


<script>
	import { mapState, mapGetters } from 'vuex'
	import DirectionsRenderer from '@/packages/DirectionsRenderer'

	export default {
		components: {DirectionsRenderer},
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
