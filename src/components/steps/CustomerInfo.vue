<template>
	<div class="wkn-calc-form-layout">
		<div style="margin:10px 50px 0 50px; width:100%;">
			  <div class="wkn-cal-main">
					<div class="wkn-cal-grid-container">
						<div class="wkn-cal-but-wrap">
							<button class="wkn-cal-but-next-2" v-on:click.prevent="toBack()">Back</button>
						</div>
						<div class="wkn-cal-grid-column">
							<div class="wkn-cal-main-label">
								<strong>Customer Info:</strong>
							</div>
							<input-text
			          name="first-name"
			          placeholder="First Name"
			          :value="form.first_name"
			          :errors="form_errors.first_name"
			          @input="updateFormField('first_name', $event.target.value)"
			        ></input-text>
							<input-text
			          name="last-name"
			          placeholder="Last Name"
			          :value="form.last_name"
			          :errors="form_errors.last_name"
			          @input="updateFormField('last_name', $event.target.value)"
			        ></input-text>
							<div class="wkn-cal-grid-item">
								<label class="wkn-cal-label">Primary Phone</label>
								<span class="wkn-cal-span-abs">
									<the-mask
									v-bind:class="{'wkn-cal-errors-item wkn-cal-error': form_errors.phone}"
					          class="wkn-cal-input"
					          mask="(###) ###-####"
					          :value="form.phone"
					          type="text"
					          :masked="false"
					          placeholder="Primary Phone"
					          @input="updateFormField('phone', $event)"
					        ></the-mask>
									<span class="wkn-cal-left-input wkn-tooltip" v-bind:class="{'wkn-cal-left-error': form_errors.phone}">
										<span class="wkn-tooltiptext">
											<div class="wkn-cal-errors" v-if="form_errors.phone">
												<div class="wkn-cal-errors-item" v-for="(error, index) in form_errors.phone" :key="index">{{error}}</div>
											</div>
										</span>
									</span>
								</span>
							</div>
							<div class="wkn-cal-grid-item">
								<label class="wkn-cal-label">Additional Phone</label>
								<span class="wkn-cal-span-abs">
									<the-mask
									v-bind:class="{'wkn-cal-errors-item wkn-cal-error': form_errors.phone}"
					          class="wkn-cal-input"
					          mask="(###) ###-####"
					          :value="form.additional_phone"
					          type="text"
					          :masked="false"
					          placeholder="Additional Phone (Optional)"
					          @input="updateFormField('additional_phone', $event)"
					        ></the-mask>
									<span class="wkn-cal-left-input wkn-tooltip" v-bind:class="{'wkn-cal-left-error': form_errors.phone}">
										<span class="wkn-tooltiptext">
											<div class="wkn-cal-errors" v-if="form_errors.phone">
												<div class="wkn-cal-errors-item" v-for="(error, index) in form_errors.phone" :key="index">{{error}}</div>
											</div>
										</span>
									</span>
								</span>
							</div>
							<input-text
			          name="email"
			          placeholder="Email"
			          :value="form.email"
			          :errors="form_errors.email"
			          @input="updateFormField('email', $event.target.value)"
			        ></input-text>
							<input-text
			          name="email-confirmation"
			          placeholder="Confirm Email"
			          :value="form.email_confirmation"
			          :errors="form_errors.email_confirmation"
			          @input="updateFormField('email_confirmation', $event.target.value)"
			        ></input-text>
						</div>
						<div class="wkn-cal-grid-column">
							<div class="wkn-cal-main-label">
								<strong>Moving From:</strong>
							</div>
							<input-text
			          name="from-address"
			          placeholder="From Address"
			          :value="form.from_address"
			          :errors="form_errors.from_address"
			          @input="updateFormField('from_address', $event.target.value)"
			        ></input-text>
							<input-text
			          name="from-city"
			          placeholder="From City"
			          :value="form.from_city"
			          disabled="disabled"
			        ></input-text>
							<input-text
			          name="from-state"
			          placeholder="From State"
			          :value="form.from_state"
			          disabled="disabled"
			        ></input-text>
							<input-text
			          name="from-zip"
			          placeholder="From Zip"
			          :value="calcform.from_zip"
			          disabled="disabled"
			        ></input-text>
							<div class="wkn-cal-main-label-2">
								<strong>Preferred Start Time:</strong>
							</div>
							<div class="wkn-cal-grid-item">
								<label class="wkn-cal-label"></label>
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
						<div class="wkn-cal-grid-column">
							<div class="wkn-cal-main-label">
								<strong>Moving To:</strong>
							</div>
							<input-text
			          name="to-address"
			          placeholder="To Address"
			          :value="form.to_address"
			          :errors="form_errors.to_address"
			          @input="updateFormField('to_address', $event.target.value)"
			        ></input-text>
							<input-text
			          name="to-city"
			          placeholder="To City"
			          :value="form.to_city"
			          disabled="disabled"
			        ></input-text>
							<input-text
			          name="to-state"
			          placeholder="To State"
			          :value="form.to_state"
			          disabled="disabled"
			        ></input-text>
							<input-text
			          name="to-zip"
			          placeholder="To Zip"
			          :value="calcform.to_zip"
			          disabled="disabled"
			        ></input-text>
							<div class="wkn-cal-main-label-2">
								<strong>How did you here about us?</strong>
							</div>
							<div class="wkn-cal-grid-item">
								<label class="wkn-cal-label"></label>
								<v-select
									name="info-source"
									placeholder="Choose From List"
									:options="info_sources"
									:errors="form_errors.info_source_id"
									:value="form.info_source_id"
									@input="updateFormField('info_source_id', $event.target.value)"
								></v-select>
				      </div>
						</div>
						<div class="wkn-cal-but-wrap">
							<button class="wkn-cal-but-next-2" v-on:click.prevent="submit()">Next</button>
						</div>
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
