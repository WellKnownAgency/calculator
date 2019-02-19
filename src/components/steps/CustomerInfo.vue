<template>
	<l-screen>
		<template slot="body">
			<form>
				<b-row>
					<b-col>
						<div class="wkn-label-group">Customer Info:</div>
						<!-- First Name -->
						<form-group label="First Name" label_for="first-name" :errors="form_errors.first_name">
							<input-text
								placeholder="First Name"
								:value="form.first_name"
								@input="updateFormFieldDebounce('first_name', $event.target.value)"
							/>
						</form-group>

						<!-- Last Name -->
						<form-group label="Last Name" label_for="last-name" :errors="form_errors.last_name">
							<input-text
								placeholder="Last Name"
								:value="form.last_name"
								@input="updateFormFieldDebounce('last_name', $event.target.value)"
							/>
						</form-group>

						<!-- Primary Phone -->
						<form-group label="Phone" label_for="phone" :errors="form_errors.phone">
							<input-phone
								placeholder="Primary Phone"
								:value="form.phone"
								@input="updateFormFieldDebounce('phone', $event)"
							/>
						</form-group>

						<!-- Additional Phone -->
						<form-group label="Additional Phone" label_for="additional-phone" :errors="form_errors.additional_phone">
							<input-phone
								placeholder="Additional Phone (Optional)"
								:value="form.additional_phone"
								@input="updateFormFieldDebounce('additional_phone', $event)"
							/>
						</form-group>

						<!-- E-mail -->
						<form-group label="Email" label_for="email" :errors="form_errors.email">
							<input-text
								placeholder="Email"
								:value="form.email"
								@input="updateFormFieldDebounce('email', $event.target.value)"
							/>
						</form-group>

						<!-- E-mail Confirm -->
						<form-group label="Confirm Email" label_for="email-confirmation" :errors="form_errors.email_confirmation">
							<input-text
								placeholder="Confirm Email"
								:value="form.email_confirmation"
								@input="updateFormFieldDebounce('email_confirmation', $event.target.value)"
							/>
						</form-group>
					</b-col>
					<b-col>
						<div class="wkn-label-group">Moving From:</div>
						<!-- From Address -->
						<form-group label="From Address" label_for="from-address" :errors="form_errors.from_address" :is_disabled="isDisabledFormField('from_address')">
							<input-text
								placeholder="From Address"
								:value="form.from_address"
								@input="updateFormFieldDebounce('from_address', $event.target.value)"
							/>
						</form-group>

						<!-- From City -->
						<form-group label="From City" label_for="from-city" :errors="form_errors.from_city" :is_disabled="true">
							<input-text
								placeholder="From City"
								:value="form.from_city"
								@input="updateFormFieldDebounce('from_city', $event.target.value)"
							/>
						</form-group>

						<!-- From State -->
						<form-group label="From State" label_for="from-state" :errors="form_errors.from_state" :is_disabled="true">
							<input-text
								placeholder="From State"
								:value="form.from_state"
								@input="updateFormFieldDebounce('from_state', $event.target.value)"
							/>
						</form-group>

						<!-- From Zip -->
						<form-group label="From Zip" label_for="from-zip" :errors="form_errors.from_zip" :is_disabled="true">
							<input-text
								placeholder="From Zip"
								:value="calcform.from_zip"
								@input="updateCalcFormFieldDebounce('from_zip', $event.target.value)"
							/>
						</form-group>

						<div class="wkn-label-group wkn-pt-3 wkn-mt-5">Preferred Start Time:</div>

						<!-- Starting Time -->
						<form-group :errors="form_errors.preferred_time_id">
							<vselect
								placeholder="Choose Starting Time"
								:value="form.preferred_time_id"
								:options="preferred_times"
								@input="value => updateFormField('preferred_time_id', parseInt(value))"
							/>
						</form-group>
					</b-col>
					<b-col>
						<div class="wkn-label-group">Moving To:</div>

						<!-- To Address -->
						<form-group label="To Address" label_for="to-address" :errors="form_errors.to_address" :is_disabled="isDisabledFormField('to_address')">
							<input-text
								placeholder="To Address"
								:value="form.to_address"
								@input="updateFormFieldDebounce('to_address', $event.target.value)"
							/>
						</form-group>

						<!-- To City -->
						<form-group label="To City" label_for="to-city" :errors="form_errors.to_city" :is_disabled="true">
							<input-text
								placeholder="To City"
								:value="form.to_city"
								@input="updateFormFieldDebounce('to_city', $event.target.value)"
							/>
						</form-group>

						<!-- To State -->
						<form-group label="To State" label_for="to-state" :errors="form_errors.to_state" :is_disabled="true">
							<input-text
								placeholder="To State"
								:value="form.to_state"
								@input="updateFormFieldDebounce('to_state', $event.target.value)"
							/>
						</form-group>

						<!-- To Zip -->
						<form-group label="To Zip" label_for="to-zip" :errors="form_errors.to_zip" :is_disabled="true">
							<input-text
								placeholder="To Zip"
								:value="calcform.to_zip"
								@input="updateCalcFormFieldDebounce('to_zip', $event.target.value)"
							/>
						</form-group>

						<div class="wkn-label-group wkn-pt-3 wkn-mt-5">How did you here about us?</div>

						<!-- Info Source -->
						<form-group :errors="form_errors.info_source_id">
							<vselect
								placeholder="Choose From List"
								:value="form.info_source_id"
								:options="info_sources"
								@input="value => updateFormField('info_source_id', parseInt(value))"
							/>
						</form-group>
					</b-col>
				</b-row>
			</form>
		</template>

		<template slot="btn-prev">
			<button type="button" class="wkn-btn-action" v-on:click.prevent="toBack()">Back</button>
		</template>
		<template slot="btn-next">
			<button type="button" class="wkn-btn-action" v-on:click.prevent="submit()">Next</button>
		</template>
	</l-screen>
</template>


<script>
	import LScreen from "@/components/layouts/Screen"
	import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

	import InputText from "@/components/modules/form/InputText"
	import InputPhone from "@/components/modules/form/InputPhone"
	import FormGroup from "@/components/modules/form/FormGroup"
	import Vselect from "@/components/modules/form/Select"

	export default {
		components: {
			LScreen,
			Vselect, FormGroup, InputText, InputPhone
		},
		data() {
			return {}
		},
		computed: {
			...mapState('CustomerInfoStore', {
					form: state => state.form,
					preferred_times: state => state.preferred_times,
					info_sources: state => state.info_sources,
					form_errors: state => state.form_errors,
				}
			),
			...mapState('CalcFormStore', {
					calcform: state => state.form,
				}
			),
			...mapGetters('CustomerInfoStore', [
				'isDisabledFormField'
			]),
			...mapGetters('AppStore', [
				'next_step',
				'prev_step',
			])
		},
		methods: {
			...mapMutations('CustomerInfoStore', {}),
			...mapActions('CustomerInfoStore', {
				actionUpdateFormField: 'updateFormField',
				actionSubmitForm: 'submitForm',
			}),
			...mapActions('CalcFormStore', {
				actionUpdateCalcFormField: 'updateFormField',
			}),
			updateFormFieldDebounce: _.debounce(function (field, value) {
				this.actionUpdateFormField({field: field, value: value});
			}, 1000),
			updateCalcFormFieldDebounce: _.debounce(function (field, value) {
				this.actionUpdateCalcFormField({field: field, value: value});
			}, 1000),
			updateFormField: function (field, value) {
				this.actionUpdateFormField({field: field, value: value})
			},
			toBack() {
				this.$emit('back')
			},
			submit() {
				this.actionSubmitForm().then(() => {
					this.$emit('complete')
				})
			}
		},
		created() {

		}
	}
</script>
