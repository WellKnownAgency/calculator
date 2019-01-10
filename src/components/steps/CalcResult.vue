<template>
	<div class="wkn-calc-result-layout">
		<div class="wkn-calc-result-layout__col">
			<div class="wkn-calc-result-map">
				<div class="wkn-calc-result-map__visual">
					<GmapMap
						:center="{lat:42.351835, lng:-71.062700}"
						:zoom="7"
						map-type-id="terrain"
						style="width: 100%; height: 300px"
					></GmapMap>
				</div>
				<div class="wkn-calc-result-map__address">
					<div class="wkn-calc-result-map-address">
						<div class="wkn-calc-result-map-address__title">Moving Address:</div>
						<div class="wkn-calc-result-map-address__content">
							<span class="wkn-calc-result-map-address__value">Boston, MA 02111 </span>
							<span class="wkn-calc-result-map-address__description">(No Stairs - Ground Floor)</span>
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
								<span class="wkn-calc-result-info-item__value">Thursday, Dec 27, 2018</span>
							</div>
						</div>
					</div>

					<div class="wkn-calc-result-info__item">
						<div class="wkn-calc-result-info-item">
							<div class="wkn-calc-result-info-item__title">Type Of Service:</div>
							<div class="wkn-calc-result-info-item__content">
								<span class="wkn-calc-result-info-item__value">Unloading Help</span>
							</div>
						</div>
					</div>

					<div class="wkn-calc-result-info__item">
						<div class="wkn-calc-result-info-item">
							<div class="wkn-calc-result-info-item__title">Desired Move Date:</div>
							<div class="wkn-calc-result-info-item__content">
								<span class="wkn-calc-result-info-item__value">Thursday, Dec 27, 2018</span>
								<div class="wkn-calc-result-info-item__description">(with basement/storage)</div>
							</div>
						</div>
					</div>

					<hr>

					<div class="wkn-calc-result-info__item">
						<div class="wkn-calc-result-info-item">
							<div class="wkn-calc-result-info-item__title">Crew Size:</div>
							<div class="wkn-calc-result-info-item__content">
								<span class="wkn-calc-result-info-item__value">2 Movers</span>
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

					<div class="wkn-calc-result-info__item">
						<div class="wkn-calc-result-info-item">
							<div class="wkn-calc-result-info-item__title">Travel Time:</div>
							<div class="wkn-calc-result-info-item__content">
								<span class="wkn-calc-result-info-item__value">1 Hr</span>
							</div>
						</div>
					</div>

					<div class="wkn-calc-result-info__item">
						<div class="wkn-calc-result-info-item">
							<div class="wkn-calc-result-info-item__title">Hourly Rate:</div>
							<div class="wkn-calc-result-info-item__content">
								<span class="wkn-calc-result-info-item__old-value">$132/Hr </span> <span class="wkn-calc-result-info-item__value">$99/Hr</span>
							</div>
						</div>
					</div>

					<div class="wkn-calc-result-info__item">
						<div class="wkn-calc-result-info-item">
							<div class="wkn-calc-result-info-item__title">Estimated Job Time:</div>
							<div class="wkn-calc-result-info-item__content">
								<span class="wkn-calc-result-info-item__value">3 Hrs (Minimum)</span>
							</div>
						</div>
					</div>

					<div class="wkn-calc-result-info__item">
						<div class="wkn-calc-result-info-item">
							<div class="wkn-calc-result-info-item__title">Estimated Quote:</div>
							<div class="wkn-calc-result-info-item__content">
								<span class="wkn-calc-result-info-item__old-value">$396.00 </span> <span class="wkn-calc-result-info-item__value">$297.00</span>
							</div>
						</div>
					</div>

					<hr>
					<hr>
					<hr>
					<hr>

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
							<div class="wkn-calc-result-info-item__title">Hourly Rate:</div>
							<div class="wkn-calc-result-info-item__content">
								<!--<span class="wkn-calc-result-info-item__old-value">$132/Hr </span>--> <span class="wkn-calc-result-info-item__value">${{info.movers_price_per_hour}}/Hr</span>
							</div>
						</div>
					</div>

					<div class="wkn-calc-result-info__item">
						<div class="wkn-calc-result-info-item">
							<div class="wkn-calc-result-info-item__title">Estimated Job Time:</div>
							<div class="wkn-calc-result-info-item__content">
								<span class="wkn-calc-result-info-item__value">{{info.job_time}} Hrs</span>
							</div>
						</div>
					</div>

					<div class="wkn-calc-result-info__item">
						<div class="wkn-calc-result-info-item">
							<div class="wkn-calc-result-info-item__title">Estimated Quote:</div>
							<div class="wkn-calc-result-info-item__content">
								<!--<span class="wkn-calc-result-info-item__old-value">$396.00 </span>--> <span class="wkn-calc-result-info-item__value">${{info.price}}</span>
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

	export default {
		data() {
			return {}
		},
		computed: {
			...mapState('CalcResultStore', {
					info: state => state.info,
				}
			),
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
			}
		},
		created() {

		}
	}
</script>
