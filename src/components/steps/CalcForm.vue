<template>
	<div class="wkn-calc-form">
		<form action="">
			<div class="wkn-form-row">
				<div class="wkn-form-group">
					<div class="wkn-form-field">
						<label for="move-date" class="wkn-form-label">Desired Move Date:</label>
						<date-picker class="wkn-form-input" id="move-date"  :value="form.move_date" @input="(value) => updateFormField('move_date', value)" :not-before="new Date()" lang="en"></date-picker>
					</div>
					<div class="wkn-form-field">
						<label for="service-type" class="wkn-form-label">Service Type:</label>
						<select id="service-type" class="wkn-form-input">
							<option v-for="type in service_types" :key="type" :value="type">{{type}}</option>
						</select>
					</div>
				</div>
			</div>

			<div class="wkn-form-row">
				<div class="wkn-form-group">
					<div class="wkn-form-field">
						<label for="from-zip" class="wkn-form-label">From Zip:</label>
						<input type="number" class="wkn-form-input" id="from-zip" value="">
					</div>
					<div class="wkn-form-field">
						<label for="to-zip" class="wkn-form-label">To Zip:</label>
						<input type="number" class="wkn-form-input" id="to-zip" value="">
					</div>
				</div>
			</div>

			<div class="wkn-form-row">
				<div class="wkn-form-group">
					<div class="wkn-form-field">
						<label for="move_size" class="wkn-form-label">Size of Move:</label>
						<select id="move_size" class="wkn-form-input">
							<option v-for="size in move_sizes" :key="size" :value="size">{{size}}</option>
						</select>
					</div>
				</div>
			</div>

			<div class="wkn-form-row">
				<div class="wkn-form-group">
					<div class="wkn-form-field">
						<label for="entrance_type_from" class="wkn-form-label">Type of entrance (From):</label>
						<select id="entrance_type_from" class="wkn-form-input">
							<option v-for="type in entrance_types" :key="type" :value="type">{{type}}</option>
						</select>
					</div>
				</div>
			</div>

			<div class="wkn-form-row">
				<div class="wkn-form-group">
					<div class="wkn-form-field">
						<label for="entrance_type_to" class="wkn-form-label">Type of entrance (To):</label>
						<select id="entrance_type_to" class="wkn-form-input">
							<option v-for="type in entrance_types" :key="type" :value="type">{{type}}</option>
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
</template>


<script>
	/* eslint-disable */
	import DatePicker from 'vue2-datepicker'
	import { mapGetters, mapMutations } from 'vuex'

	export default {
		components: {DatePicker},
		data() {
			return {}
		},
		computed: {
			...mapGetters('CalcFormStore', [
				'form',
				'service_types',
				'move_sizes',
				'entrance_types',
			])
		},
		methods: {
			...mapMutations('CalcFormStore', {
				UPDATE_FORM_FIELD: 'UPDATE_FORM_FIELD',
				CLEAR_FORM: 'CLEAR_FORM',
			}),
			updateFormField(field, value) {
				this.UPDATE_FORM_FIELD({field, value})
			},
			clearForm() {
				this.CLEAR_FORM()
			},
			submit() {
				this.$emit('complete')
			}
		},
		created() {
			//console.log(this.$root.title)
		},
		mounted() {

		}
	}
</script>
