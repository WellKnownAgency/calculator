<template>
	<div class="wkn-customer-info-form">
		<div class="wkn-customer-info-form__list">
			<div class="wkn-customer-info-form__col">
				<label for="first-name" class="wkn-form-label">Customer Info:</label>
				<div class="wkn-form-row">
					<input-text
						name="first-name"
						placeholder="First Name"
						:value="form.first_name"
						:errors="form_errors.first_name"
						@input="updateFormField('first_name', $event.target.value)"
					></input-text>
				</div>
				<div class="wkn-form-row">
					<input-text
						name="last-name"
						placeholder="Last Name"
						:value="form.last_name"
						:errors="form_errors.last_name"
						@input="updateFormField('last_name', $event.target.value)"
					></input-text>
				</div>
				<div class="wkn-form-row">
					<the-mask
						class="wkn-form-input"
						mask="(###) ###-####"
						:value="form.phone"
						type="text"
						:masked="false"
						placeholder="Primary Phone"
						@input="updateFormField('phone', $event)"
					></the-mask>
					<div class="wkn-form-errors" v-if="form_errors.phone">
						<div class="wkn-form-errors__item" v-for="(error, index) in form_errors.phone" :key="index">{{error}}</div>
					</div>
				</div>
				<div class="wkn-form-row">
					<the-mask
						class="wkn-form-input"
						mask="(###) ###-####"
						:value="form.additional_phone"
						type="text"
						:masked="false"
						placeholder="Additional Phone (Optional)"
						@input="updateFormField('additional_phone', $event)"
					></the-mask>
				</div>
				<div class="wkn-form-row">
					<input-text
						name="email"
						placeholder="Email"
						:value="form.email"
						:errors="form_errors.email"
						@input="updateFormField('email', $event.target.value)"
					></input-text>
				</div>
				<div class="wkn-form-row">
					<input-text
						name="email-confirmation"
						placeholder="Confirm Email"
						:value="form.email_confirmation"
						:errors="form_errors.email_confirmation"
						@input="updateFormField('email_confirmation', $event.target.value)"
					></input-text>
				</div>
			</div>

			<div class="wkn-customer-info-form__col">
				<label for="from-address" class="wkn-form-label">Moving From:</label>
				<div class="wkn-form-row">
					<input-text
						name="from-address"
						placeholder="From Address"
						:value="form.from_address"
						:errors="form_errors.from_address"
						@input="updateFormField('from_address', $event.target.value)"
					></input-text>
				</div>
				<div class="wkn-form-row">
					<input-text
						name="from-city"
						placeholder="From City"
						:value="form.from_city"
						disabled="disabled"
					></input-text>
				</div>
				<div class="wkn-form-row">
					<input-text
						name="from-state"
						placeholder="From State"
						:value="form.from_state"
						disabled="disabled"
					></input-text>
				</div>
				<div class="wkn-form-row">
					<input-text
						name="from-zip"
						placeholder="From Zip"
						:value="calcform.from_zip"
						disabled="disabled"
					></input-text>
				</div>
				<div class="wkn-form-row">
					<label for="preferred-time" class="wkn-form-label">Preferred Start Time:</label>
				</div>
				<div class="wkn-form-row">
					<div class="wkn-form-group">
						<div class="wkn-form-field">
							<v-select
								name="preferred-time"
								placeholder="Choose Starting Time"
								:options="preferred_times"
								:errors="form_errors.preferred_time_id"
								:value="form.preferred_time_id"
								@input="updateFormField('preferred_time_id', $event.target.value)"
							></v-select>
						</div>
					</div>
				</div>
			</div>

			<div class="wkn-customer-info-form__col">
				<label for="to-address" class="wkn-form-label">Moving To:</label>
				<div class="wkn-form-row">
					<input-text
						name="to-address"
						placeholder="To Address"
						:value="form.to_address"
						:errors="form_errors.to_address"
						@input="updateFormField('to_address', $event.target.value)"
					></input-text>
				</div>
				<div class="wkn-form-row">
					<input-text
						name="to-city"
						placeholder="To City"
						:value="form.to_city"
						disabled="disabled"
					></input-text>
				</div>
				<div class="wkn-form-row">
					<input-text
						name="to-state"
						placeholder="To State"
						:value="form.to_state"
						disabled="disabled"
					></input-text>
				</div>
				<div class="wkn-form-row">
					<input-text
						name="to-zip"
						placeholder="To Zip"
						:value="calcform.to_zip"
						disabled="disabled"
					></input-text>
				</div>
				<div class="wkn-form-row">
					<label for="info-source" class="wkn-form-label">How did you hear about us?</label>
				</div>
				<div class="wkn-form-row">
					<div class="wkn-form-group">
						<div class="wkn-form-field">
							<v-select
								name="info-source"
								placeholder="Choose From Select List"
								:options="info_sources"
								:errors="form_errors.info_source_id"
								:value="form.info_source_id"
								@input="updateFormField('info_source_id', $event.target.value)"
							></v-select>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="wkn-form-row">
			<div class="wkn-calc-form-buttons">
				<div class="wkn-calc-form-buttons__item">
					<button type="button" class="wkn-btn-default" v-on:click.prevent="toBack()"><< Back to {{prev_step.display_name}}</button>
				</div>
				<div class="wkn-calc-form-buttons__item">
					<button type="button" class="wkn-btn-success" v-on:click.prevent="submit()">Go To {{next_step.display_name}}</button>
				</div>
			</div>
		</div>
	</div>
</template>


<script>
	import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
	import InputText from "@/components/formel/InpitText"
	import VSelect from "@/components/formel/Select"
	import {TheMask} from 'vue-the-mask'

	export default {
		components: {InputText, VSelect, TheMask},
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
			...mapGetters('CustomerInfoStore', []),
			...mapGetters('AppStore', [
				'next_step',
				'prev_step',
			])
		},
		methods: {
			...mapMutations('CustomerInfoStore', {
				UPDATE_FORM_FIELD: 'UPDATE_FORM_FIELD',
			}),
			...mapActions('CustomerInfoStore', {
				actionSubmitForm: 'submitForm',
			}),
			updateFormField: function (field, value) {
				this.UPDATE_FORM_FIELD({field: field, value: value})
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
