<template>

	<l-screen>
		<template slot="body">
			<b-row class="wkn-my-2">
				<b-col>
					<!-- First Name -->
					<form-group :fw="true" :errors="form_errors.first_name">
						<input-text
							placeholder="First Name"
							:value="form.first_name"
							@input="updateFormFieldDebounce('first_name', $event.target.value)"
							:is_loading="is_loading_field('first_name')"
						/>
					</form-group>
				</b-col>
				<b-col>
					<!-- Last Name -->
					<form-group :fw="true" :errors="form_errors.last_name">
						<input-text
							placeholder="Last Name"
							:value="form.last_name"
							@input="updateFormFieldDebounce('last_name', $event.target.value)"
							:is_loading="is_loading_field('last_name')"
						/>
					</form-group>
				</b-col>
			</b-row>
			<b-row>
				<b-col>
					<!-- Phone -->
					<form-group :fw="true" :errors="form_errors.phone">
						<input-phone
							placeholder="Primary Phone"
							:value="form.phone"
							@input="updateFormFieldDebounce('phone', $event)"
							:is_loading="is_loading_field('phone')"
						/>
					</form-group>
				</b-col>
			</b-row>
			<b-row>
				<b-col>
					<!-- E-mail -->
					<form-group :fw="true" :errors="form_errors.email">
						<input-text
							placeholder="Email"
							:value="form.email"
							@input="updateFormFieldDebounce('email', $event.target.value)"
							:is_loading="is_loading_field('email')"
						/>
					</form-group>
				</b-col>
			</b-row>
			<b-row>
				<b-col>
					<!-- Info Source -->
					<form-group :fw="true" :errors="form_errors.info_source_id">
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
		</template>
		<template slot="footer">
			<button class="wkn-btn-action" v-on:click.prevent="submit()">Submit And View Quote</button>
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
