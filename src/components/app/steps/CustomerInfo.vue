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
									@input="updateFormField('first_name', $event.target.value)"
									:is_loading="is_loading_field('first_name')"
									:throttled="true"
								/>
							</form-group>

							<!-- Last Name -->
							<form-group label="Last Name" label_for="last-name" :errors="form_errors.last_name">
								<input-text
									placeholder="Last Name"
									:value="form.last_name"
									@input="updateFormField('last_name', $event.target.value)"
									:is_loading="is_loading_field('last_name')"
									:throttled="true"
								/>
							</form-group>

							<!-- Primary Phone -->
							<form-group label="Phone" label_for="phone" :errors="form_errors.phone">
								<input-phone
									placeholder="Primary Phone"
									:value="form.phone"
									@input="updateFormField('phone', $event)"
									:is_loading="is_loading_field('phone')"
									:throttled="true"
								/>
							</form-group>

							<!-- Additional Phone -->
							<form-group label="Additional Phone" label_for="additional-phone" :errors="form_errors.additional_phone">
								<input-phone
									placeholder="Additional Phone (Optional)"
									:value="form.additional_phone"
									@input="updateFormField('additional_phone', $event)"
									:throttled="true"
								/>
							</form-group>

							<!-- E-mail -->
							<form-group label="Email" label_for="email" :errors="form_errors.email">
								<input-text
									placeholder="Email"
									:value="form.email"
									@input="updateFormField('email', $event.target.value)"
									:is_loading="is_loading_field('email')"
									:throttled="true"
								/>
							</form-group>

							<!-- E-mail Confirm -->
							<form-group label="Confirm Email" label_for="email-confirmation" :errors="form_errors.email_confirmation">
								<input-text
									placeholder="Confirm Email"
									:value="form.email_confirmation"
									@input="updateFormField('email_confirmation', $event.target.value)"
									:is_loading="is_loading_field('email_confirmation')"
									:throttled="true"
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
									@input="updateFormField('from_address', $event.target.value)"
									:is_loading="is_loading_field('from_address')"
									:throttled="true"
								/>
							</form-group>

							<!-- From City -->
							<form-group label="From City" label_for="from-city" :errors="form_errors.from_city" :is_disabled="true">
								<input-text
									placeholder="From City"
									:value="form.from_city"
									@input="updateFormField('from_city', $event.target.value)"
									:throttled="true"
								/>
							</form-group>

							<!-- From State -->
							<form-group label="From State" label_for="from-state" :errors="form_errors.from_state" :is_disabled="true">
								<input-text
									placeholder="From State"
									:value="form.from_state"
									@input="updateFormField('from_state', $event.target.value)"
									:throttled="true"
								/>
							</form-group>

							<!-- From Zip -->
							<form-group label="From Zip" label_for="from-zip" :errors="form_errors.from_zip" :is_disabled="true">
								<input-text
									placeholder="From Zip"
									:value="calcform.from_zip"
									@input="updateCalcFormField('from_zip', $event.target.value)"
									:throttled="true"
								/>
							</form-group>

							<div class="wkn-label-group wkn-pt-3 wkn-mt-5">Preferred Start Time:</div>

							<!-- Starting Time -->
							<form-group :errors="form_errors.preferred_time_id">
								<vselect
									placeholder="Choose Starting Time"
									:value="form.preferred_time_id"
									:options="$gdata.preferred_start_times"
									@input="value => updateFormField('preferred_time_id', parseInt(value))"
									:is_loading="is_loading_field('preferred_time_id')"
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
									@input="updateFormField('to_address', $event.target.value)"
									:is_loading="is_loading_field('to_address')"
									:throttled="true"
								/>
							</form-group>

							<!-- To City -->
							<form-group label="To City" label_for="to-city" :errors="form_errors.to_city" :is_disabled="true">
								<input-text
									placeholder="To City"
									:value="form.to_city"
									@input="updateFormField('to_city', $event.target.value)"
									:throttled="true"
								/>
							</form-group>

							<!-- To State -->
							<form-group label="To State" label_for="to-state" :errors="form_errors.to_state" :is_disabled="true">
								<input-text
									placeholder="To State"
									:value="form.to_state"
									@input="updateFormField('to_state', $event.target.value)"
									:throttled="true"
								/>
							</form-group>

							<!-- To Zip -->
							<form-group label="To Zip" label_for="to-zip" :errors="form_errors.to_zip" :is_disabled="true">
								<input-text
									placeholder="To Zip"
									:value="calcform.to_zip"
									@input="updateCalcFormField('to_zip', $event.target.value)"
									:throttled="true"
								/>
							</form-group>

							<div class="wkn-label-group wkn-pt-3 wkn-mt-5">How did you here about us?</div>

							<!-- Info Source -->
							<form-group :errors="form_errors.info_source_id">
								<vselect
									placeholder="Choose From List"
									:value="form.info_source_id"
									:options="$gdata.info_sources"
									@input="value => updateFormField('info_source_id', parseInt(value))"
									:is_loading="is_loading_field('info_source_id')"
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
	import LScreen from "../layouts/Screen"
	import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

	import InputText from "@/components/common/modules/form/InputText"
	import InputPhone from "@/components/common/modules/form/InputPhone"
	import FormGroup from "@/components/common/modules/form/FormGroup"
	import Vselect from "@/components/common/modules/form/Select"

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
				'isDisabledFormField',
				"is_loading_field"
			]),
			...mapGetters('AppStore', [
				'next_step',
				'prev_step',
			])
		},
		methods: {
			...mapMutations("AppStore", {
				START_LOADING: "START_LOADING",
				END_LOADING: "END_LOADING",
			}),
			...mapMutations('CustomerInfoStore', {}),
			...mapActions('CustomerInfoStore', {
				actionUpdateFormField: 'updateFormField',
				actionSubmitForm: 'submitForm',
			}),
			...mapActions('CalcFormStore', {
				actionUpdateCalcFormField: 'updateFormField',
			}),
			/*updateFormFieldDebounce: _.debounce(function (field, value) {
				this.actionUpdateFormField({field: field, value: value});
			}, 1000),
			updateCalcFormFieldDebounce: _.debounce(function (field, value) {
				this.actionUpdateCalcFormField({field: field, value: value});
			}, 1000),*/
			updateFormField: function (field, value) {
				this.actionUpdateFormField({field: field, value: value})
			},
			updateCalcFormField: function (field, value) {
				this.actionUpdateCalcFormField({field: field, value: value})
			},
			toBack() {
				this.$emit('back')
			},
			submit() {
				this.START_LOADING()
				this.actionSubmitForm()
					.then(() => {
						this.$emit('complete')
					})
					.finally(() => {
						this.END_LOADING()
					})
			}
		},
		created() {

		}
	}
</script>
