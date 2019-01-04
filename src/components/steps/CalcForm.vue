<template>
	<div class="wkn-calc-form-layout">
		<div class="wkn-calc-form-layout__fast-info">
			<div class="wkn-calc-form-fast-info">
				<div class="wkn-calc-form-fast-info-properties">
					<div class="wkn-calc-form-fast-info-properties__list">
						<div class="wkn-calc-form-fast-info-properties-item" v-if="selected_move_date_pretty">
							<div class="wkn-calc-form-fast-info-properties-item__list">
								<div class="wkn-calc-form-fast-info-properties-item__label">Move Date:</div>
								<div class="wkn-calc-form-fast-info-properties-item__value">{{selected_move_date_pretty}}</div>
							</div>
						</div>
						<div class="wkn-calc-form-fast-info-properties-item" v-if="selected_service_type">
							<div class="wkn-calc-form-fast-info-properties-item__list">
								<div class="wkn-calc-form-fast-info-properties-item__label">Type Of Service:</div>
								<div class="wkn-calc-form-fast-info-properties-item__value">{{selected_service_type.display_name}}</div>
							</div>
						</div>
						<div class="wkn-calc-form-fast-info-properties-item" v-if="address_pretty.from">
							<div class="wkn-calc-form-fast-info-properties-item__list">
								<div class="wkn-calc-form-fast-info-properties-item__label">Moving From:</div>
								<div class="wkn-calc-form-fast-info-properties-item__value">{{address_pretty.from}}</div>
							</div>
						</div>
						<div class="wkn-calc-form-fast-info-properties-item" v-if="address_pretty.to">
							<div class="wkn-calc-form-fast-info-properties-item__list">
								<div class="wkn-calc-form-fast-info-properties-item__label">Moving To:</div>
								<div class="wkn-calc-form-fast-info-properties-item__value">{{address_pretty.to}}</div>
							</div>
						</div>
						<div class="wkn-calc-form-fast-info-properties-item" v-if="selected_move_size">
							<div class="wkn-calc-form-fast-info-properties-item__list">
								<div class="wkn-calc-form-fast-info-properties-item__label">Size Of Move:</div>
								<div class="wkn-calc-form-fast-info-properties-item__value">{{selected_move_size.display_name}}</div>
							</div>
							<div class="wkn-calc-form-fast-info-properties-item__extra" v-if="selected_rooms_pretty">({{selected_rooms_pretty}})</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="wkn-calc-form-layout__form">
			<form action="" class="wkn-calc-form">
			<div class="wkn-form-row">
				<div class="wkn-form-group">
					<div class="wkn-form-field">
						<label for="move-date" class="wkn-form-label">Desired Move Date:</label>
						<date-picker class="wkn-form-input" id="move-date"
												 :value="form.move_date"
												 @input="(value) => updateFormFieldDate('move_date', value)"
												 format="MM.DD.YYYY"
												 :not-before="new Date()"
												 lang="en"
												 @clear="CLEAR_FIELD('move_date')"
						></date-picker>
					</div>
					<div class="wkn-form-field">
						<label for="service-type" class="wkn-form-label">Service Type:</label>
						<select id="service-type" class="wkn-form-input" :value="form.service_type_id" @input="updateFormField('service_type_id', parseInt($event.target.value))">
							<option :value="null">– Choose select ... –</option>
							<option v-for="type in service_types" :key="type.id" :value="type.id">{{type.display_name}}</option>
						</select>
					</div>
				</div>
			</div>

			<div class="wkn-form-row">
				<div class="wkn-form-group">
					<div class="wkn-form-field">
						<label for="from-zip" class="wkn-form-label">From Zip:</label>
						<input type="number" class="wkn-form-input" id="from-zip" :value="form.from_zip" @input="updateFormFieldFromZip('from_zip', $event.target.value)">
					</div>
					<div class="wkn-form-field">
						<label for="to-zip" class="wkn-form-label">To Zip:</label>
						<input type="number" class="wkn-form-input" id="to-zip" :value="form.to_zip" @input="updateFormFieldToZip('to_zip', $event.target.value)">
					</div>
				</div>
			</div>

			<div class="wkn-form-row">
				<div class="wkn-form-group">
					<div class="wkn-form-field">
						<label for="move_size" class="wkn-form-label">Size of Move:</label>
						<select id="move_size" class="wkn-form-input" :value="form.move_size_id" @input="updateFormFieldSize('move_size_id', parseInt($event.target.value))">
							<option :value="null">– Choose select ... –</option>
							<option v-for="size in move_sizes" :key="size.id" :value="size.id">{{size.display_name}}</option>
						</select>
						<div class="wkn-calc-form__extra">
							<div class="wkn-calc-form-extra">
								<div class="wkn-calc-form-extra__list">
									<div class="wkn-calc-form-extra__item" v-for="room in size_rooms" :key="room.id">
										<input type="checkbox" class="wkn-calc-form-extra__input" :id="'extra-room-label-' + room.id" :disabled="!!room.pivot.is_included" :value="room.id" v-model="move_size_extra">
										<label class="wkn-calc-form-extra__label" :for="'extra-room-label-' + room.id">{{room.display_name}}</label>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="wkn-form-row">
				<div class="wkn-form-group">
					<div class="wkn-form-field">
						<label for="entrance_type_from" class="wkn-form-label">Type of entrance (From):</label>
						<select id="entrance_type_from" class="wkn-form-input" :value="form.from_entrance_type_id" @input="updateFormField('from_entrance_type_id', $event.target.value)">
							<option :value="null">– Choose select ... –</option>
							<option v-for="type in entrance_types" :key="type.id" :value="type.id">{{type.display_name}}</option>
						</select>
					</div>
				</div>
			</div>

			<div class="wkn-form-row">
				<div class="wkn-form-group">
					<div class="wkn-form-field">
						<label for="entrance_type_to" class="wkn-form-label">Type of entrance (To):</label>
						<select id="entrance_type_to" class="wkn-form-input" :value="form.to_entrance_type_id" @input="updateFormField('to_entrance_type_id', $event.target.value)">
							<option :value="null">– Choose select ... –</option>
							<option v-for="type in entrance_types" :key="type.id" :value="type.id">{{type.display_name}}</option>
						</select>
					</div>
				</div>
			</div>

			<div class="wkn-form-row">
				<div class="wkn-calc-form-buttons">
					<div class="wkn-calc-form-buttons__item">
						<button type="button" class="wkn-btn-success" v-on:click.prevent="submit()">Calculate >></button>
					</div>
					<div class="wkn-calc-form-buttons__item">
						<button type="button" v-on:click.prevent="clearForm()" class="wkn-btn-default">Clear Form</button>
					</div>
				</div>
			</div>

		</form>
		</div>
	</div>
</template>


<script>
	/* eslint-disable */
	import DatePicker from 'vue2-datepicker'
	import moment from '@/packages/Moment'
	import _ from 'lodash'
	import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

	export default {
		components: {DatePicker},
		data() {
			return {}
		},
		computed: {
			...mapState('CalcFormStore', {
					form: state => state.form,
					info: state => state.info,
					service_types: state => state.service_types,
					move_sizes: state => state.move_sizes,
					entrance_types: state => state.entrance_types,
					address_pretty: state => state.address_pretty,
				}
			),
			...mapGetters('CalcFormStore', {
				selected_move_date_pretty: 'selected_move_date_pretty',
				selected_service_type: 'selected_service_type',
				selected_move_size: 'selected_move_size',
				size_rooms: 'size_rooms',
				selected_rooms_pretty: 'selected_rooms_pretty',
			}),
			move_size_extra: {
				get: function () {
					return this.$store.state.CalcFormStore.form.move_size_extra
				},
				// сеттер:
				set: function (newValue) {
					this.ADD_MOVE_SIZE_EXTRA_VALUE(newValue)
				}
			}
		},
		methods: {
			...mapMutations('CalcFormStore', {
				CLEAR_FORM: 'CLEAR_FORM',
				CLEAR_FIELD: 'CLEAR_FIELD',
				ADD_MOVE_SIZE_EXTRA_VALUE: 'ADD_MOVE_SIZE_EXTRA_VALUE',
				UPD_ACTUAL_SIZE_EXTRA: 'UPD_ACTUAL_SIZE_EXTRA',
			}),
			...mapActions('CalcFormStore', {
				updFormField: 'updateFormField',
				updActualSizeExtra: 'updateActualSizeExtra',
				updFormFieldFromZip: 'updateFormFieldFromZip',
				updFormFieldToZip: 'updateFormFieldToZip',
			}),
			updateFormFieldDate: function(field, value)
			{
				let formatValue = moment(value).format("MM.DD.YYYY")
				this.updateFormField(field, formatValue)
			},
			updateFormFieldDebounce: _.debounce(function (field, value) {
				this.updFormField({field: field, value: value})
			}, 1500),
			updateFormField: function (field, value) {
				this.updFormField({field: field, value: value})
			},
			updateFormFieldSize: function (field, value) {
				this.updateFormField(field, value)
				this.updActualSizeExtra()
			},
			updateFormFieldFromZip:  _.debounce(function (field, value) {
				this.updFormFieldFromZip({field: field, value: value})
			}, 1500),
			updateFormFieldToZip:  _.debounce(function (field, value) {
				this.updFormFieldToZip({field: field, value: value})
			}, 1500),
			clearForm(){
				this.CLEAR_FORM()
			},
			submit() {
				this.$emit('complete')
			}
		},
		created() {},
		mounted() {}
	}
</script>
