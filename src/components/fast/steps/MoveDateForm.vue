<template>
		<l-screen>
			<template slot="body">
				<b-row class="wkn-my-2">
					<b-col v-if="!isMovingDateRange">
						<!-- Moving Date -->
						<form-group
												:fw="true"
												:errors="form_errors.move_date"
						            :is_disabled="isDisabledFormField('move_date')">
							<input-date
								:value="formatDate(form.move_date)"
								@input="(value) => updateFormFieldDate('move_date', value)"
								@clear="CLEAR_FIELD('move_date')"
								:is_loading="is_loading_field('move_date')"
							/>
						</form-group>
					</b-col>
				</b-row>
				<b-row class="wkn-my-2">
					<b-col>
						<!-- From Zip -->
						<form-group
												:fw="true"
												:errors="form_errors.from_zip"
						            :is_disabled="isDisabledFormField('from_zip')">
							<input-text
								placeholder="Your from zip"
								:maxlength="5"
								:is_loading="is_loading_field('from_zip')"
								:value="form.from_zip"
								@input="UPDATE_FORM_FIELD({field: 'from_zip', value: $event.target.value})"
								:throttled="true"
							/>
						</form-group>
					</b-col>
					<b-col>
						<!-- Zip To -->
						<form-group
												:fw="true"
												:errors="form_errors.to_zip"
						            :is_disabled="isDisabledFormField('to_zip')">
							<input-text
								placeholder="Your to zip"
								:maxlength="5"
								:is_loading="is_loading_field('to_zip')"
								:value="form.to_zip"
								@input="UPDATE_FORM_FIELD({field: 'to_zip', value: $event.target.value})"
								:throttled="true"
							/>
						</form-group>
					</b-col>
				</b-row>
				<b-row class="wkn-my-2">
					<b-col>
						<!-- Type of Moving Service -->
						<form-group
												:fw="true"
												:errors="form_errors.service_type_id"
						            :is_disabled="isDisabledFormField('service_type_id')">
							<vselect
								placeholder="Choose service ..."
								:value="form.service_type_id"
								:options="$gdata.services"
								@input="value => updateFormField('service_type_id', parseInt(value))"
								:errors="form_errors.service_type_id"
								:is_loading="is_loading_field('service_type_id')"
							/>
						</form-group>
					</b-col>
				</b-row>
			</template>

			<template slot="footer">
				<button class="wkn-btn-action" v-on:click.prevent="submitForm()">Continue</button>
			</template>
		</l-screen>
</template>


<script>
	/* eslint-disable */
	import moment from "@/packages/Moment";
	import _ from "lodash";
	import {mapState, mapGetters, mapActions, mapMutations} from "vuex";

	import LScreen from "../layouts/Screen"

	import InputText from "@/components/common/modules/form/InputText"
	import FormGroup from "@/components/common/modules/form/FormGroup"
	import InputDate from "@/components/common/modules/form/InputDate"
	import Vselect from "@/components/common/modules/form/Select"

	export default {
		components: {
			LScreen,
			FormGroup, InputText, InputDate, Vselect
		},
		data() {
			return {

			};
		},
		computed: {
			...mapState("MoveDateFormStore", {
				form: state => state.form,
				info: state => state.info,
				service_types: state => state.service_types,
				move_sizes: state => state.move_sizes,
				entrance_types: state => state.entrance_types,
				address: state => state.address,
				form_errors: state => state.form_errors
			}),
			...mapGetters("MoveDateFormStore", [
				"selected_move_date_pretty",
				"selected_destination_date_pretty",
				"selected_service_type",
				"storage_date_value",
				"getServiceTypeById",
				"isDisabledFormField",
				"is_loading_field"
			]),
			move_size_extra: {
				get: function () {
					return this.$store.state.CalcFormStore.form.extra_rooms_ids;
				},
				// сеттер:
				set: function (newValue) {
					this.ADD_MOVE_SIZE_EXTRA_VALUE(newValue);
				}
			},
			isMovingDateRange() {
				return this.selected_service_type && this.selected_service_type.name === 'storage'
			},
		},
		watch: {
			"form.from_zip"(newVal) {
				this.updateFormFieldZip("from_zip", newVal, 'from', 'to_zip');
			},
			"form.to_zip"(newVal) {
				this.updateFormFieldZip("to_zip", newVal, 'to', "from_zip");
			},
			"form.service_type_id"(newVal) {
				this.CLEAR_DISABLED_FORM_FIELDS()
				//this.CLEAR_DISABLED_CUSTOMER_FORM_FIELDS()
				//this.CLEAR_HIDDEN_INFO_PROPERTIES()
				let service_name = this.getServiceTypeById(newVal)
				if (service_name === 'loading' || service_name === 'packing') {
					this.ADD_DISABLED_FORM_FIELD('to_zip')
					this.ADD_DISABLED_FORM_FIELD('to_entrance_type_id')
					//this.ADD_DISABLED_CUSTOMER_FORM_FIELD('to_address')
					//this.ADD_HIDDEN_INFO_PROPERTY('to_formatted_address')
				} else if (service_name === 'unloading') {
					this.ADD_DISABLED_FORM_FIELD('from_zip')
					this.ADD_DISABLED_FORM_FIELD('from_entrance_type_id')
					//this.ADD_DISABLED_CUSTOMER_FORM_FIELD('from_address')
					//this.ADD_HIDDEN_INFO_PROPERTY('from_formatted_address')
				}
			}
		},
		methods: {
			...mapMutations("AppStore", {
				START_LOADING: "START_LOADING",
				END_LOADING: "END_LOADING",
			}),
			...mapMutations("MoveDateFormStore", {
				CLEAR_FORM: "CLEAR_FORM",
				CLEAR_FIELD: "CLEAR_FIELD",
				ADD_MOVE_SIZE_EXTRA_VALUE: "ADD_MOVE_SIZE_EXTRA_VALUE",
				UPDATE_FORM_FIELD: "UPDATE_FORM_FIELD",
				ADD_DISABLED_FORM_FIELD: "ADD_DISABLED_FORM_FIELD",
				CLEAR_DISABLED_FORM_FIELDS: "CLEAR_DISABLED_FORM_FIELDS",
			}),
			...mapActions("MoveDateFormStore", {
				actionUpdateFormField: "updateFormField",
				actionUpdateFormFieldZip: "updateFormFieldZip",
				actionUpdateFormFieldStorageDates: "updateFormFieldStorageDates",
				actionSubmitForm: "submitForm",
				actionChangeServiceType: "changeServiceType"
			}),
			formatDate(date) {
				return moment(date).isValid() ? moment(date).format("MM.DD.YYYY") : null;
			},
			updateFormFieldDate: function (field, value) {
				let formatValue = moment(value).isValid() ? moment(value).format("YYYY-MM-DD") : null;
				this.updateFormField(field, formatValue);
			},
			updateFormFieldStorageDate: function (value) {
				let movingDate = moment(value[0]).isValid() ?  moment(value[0]).format("YYYY-MM-DD") : null;
				let destinationDate = moment(value[1]).isValid() ?  moment(value[1]).format("YYYY-MM-DD") : null;
				return this.actionUpdateFormFieldStorageDates({moving: movingDate, destination: destinationDate});
			},
			updateFormFieldDebounce: _.debounce(function (field, value) {
				this.actionUpdateFormField({field: field, value: value});
			}, 1000),
			updateFormField: function (field, value) {
				return this.actionUpdateFormField({field: field, value: value});
			},
			updateFormFieldSize: function (field, value) {
				this.updateFormField(field, value).then(() =>
					this.actionUpdateActualSizeExtra()
				);
			},
			updateFormFieldZip: function (field, value, direction, check_field) {
				this.actionUpdateFormFieldZip({field: field, value: value, direction: direction}).then(
					() => {
						if (
							value &&
							value.length &&
							this.form[check_field] &&
							this.form[check_field].length &&
							(!this.form_errors[check_field] || !this.form_errors[check_field].length)
						) {
							this.actionChangeServiceType();
						}
					}
				);
			},
			isShowInfoProperty(name) {
				return !this.isHiddenInfoProperty(name) && this.info[name]
			},
			clearForm() {
				this.CLEAR_FORM();
			},
			submitForm() {
				this.START_LOADING()
				this.actionSubmitForm()
					.then(() => {
						this.actionChangeServiceType();
						this.$emit("complete");
					})
					.finally(() => {
						this.END_LOADING()
					})
			}
		},
	};
</script>
