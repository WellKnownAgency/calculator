<template>
	<div class="wkn-calc-form-layout">
		<div class="wkn-calc-form-layout__fast-info">
			<div class="wkn-calc-form-fast-info">
				<div class="wkn-calc-form-fast-info-properties">
					<div class="wkn-calc-form-fast-info-properties__list">
						<div class="wkn-calc-form-fast-info-properties__item" v-if="move_date_pretty">Move Date: {{move_date_pretty}}</div>
						<div class="wkn-calc-form-fast-info-properties__item" v-if="service_type">Type Of Service: {{service_type}}</div>
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
						<input type="number" class="wkn-form-input" id="from-zip" :value="form.from_zip" @input="updateFormFieldDebounce('from_zip', $event.target.value)">
					</div>
					<div class="wkn-form-field">
						<label for="to-zip" class="wkn-form-label">To Zip:</label>
						<input type="number" class="wkn-form-input" id="to-zip" :value="form.to_zip" @input="updateFormFieldDebounce('to_zip', $event.target.value)">
					</div>
				</div>
			</div>

			<div class="wkn-form-row">
				<div class="wkn-form-group">
					<div class="wkn-form-field">
						<label for="move_size" class="wkn-form-label">Size of Move:</label>
						<select id="move_size" class="wkn-form-input" :value="form.move_size_id" @input="updateFormField('move_size_id', $event.target.value)">
							<option :value="null">– Choose select ... –</option>
							<option v-for="size in move_sizes" :key="size.id" :value="size.id">{{size.display_name}}</option>
						</select>
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
				}
			),
			...mapGetters('CalcFormStore', {
				move_date_pretty: 'move_date_pretty',
				service_type: 'service_type',
			})
		},
		methods: {
			...mapMutations('CalcFormStore', {
				CLEAR_FORM: 'CLEAR_FORM',
				CLEAR_FIELD: 'CLEAR_FIELD',
			}),
			...mapActions('CalcFormStore', {
				updFormField: 'updateFormField',
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
				console.log(value)
				this.updFormField({field: field, value: value})
			},
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
