<template>
		<l-screen>
			<template slot="body">
				<l-calc>
					<template slot="top">
						<b-row class="wkn-my-2">
							<b-col v-if="!isMovingDateRange">
								<!-- Moving Date -->
								<form-group label="Moving Date"
								            label_for="move-date"
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
							<b-col v-if="isMovingDateRange">
								<!-- Moving ~ Destination Date -->
								<form-group label="Moving ~ Destination Date"
								            label_for="destination-date"
								            :errors="form_errors.destination_date"
								            :is_disabled="isDisabledFormField('destination_date')">
									<input-date
										:range="true"
										:value="[formatDate(form.move_date), formatDate(form.destination_date)]"
										@input="(value) => updateFormFieldStorageDate(value)"
										@clear="CLEAR_FIELD('move_date');CLEAR_FIELD('destination_date');"
										:is_loading="is_loading_field('destination_date')"
									/>
								</form-group>
							</b-col>
							<b-col>
								<!-- Zip From -->
								<form-group label="Zip From"
								            label_for="calc-from-zip"
								            :errors="form_errors.from_zip"
								            :is_disabled="isDisabledFormField('from_zip')">
									<input-text
										placeholder="Your from zip"
										:is_loading="is_loading_field('from_zip')"
										:maxlength="5"
										:value="form.from_zip"
										@input="UPDATE_FORM_FIELD({field: 'from_zip', value: $event.target.value})"
										:throttled="true"
									/>
								</form-group>
							</b-col>
							<b-col>
								<!-- Entrance From -->
								<form-group label="Entrance From"
								            label_for="from-entrance"
								            :errors="form_errors.from_entrance_type_id"
								            :is_disabled="isDisabledFormField('from_entrance_type_id')">
									<vselect
										placeholder="Choose entrance ..."
										:value="form.from_entrance_type_id"
										:options="$gdata.entrances"
										@input="value => updateFormField('from_entrance_type_id', parseInt(value))"
										:is_loading="is_loading_field('from_entrance_type_id')"
									/>
								</form-group>
							</b-col>
							<b-col>
								<!-- Moving Size -->
								<form-group label="Moving Size"
								            label_for="move-sizes"
								            :errors="form_errors.move_size_id"
								            :is_disabled="isDisabledFormField('move_size_id')">
									<vselect
										placeholder="Choose size ..."
										:value="form.move_size_id"
										:options="$gdata.sizes"
										@input="value => updateFormFieldSize('move_size_id', parseInt(value))"
										:errors="form_errors.move_size_id"
										:is_loading="is_loading_field('move_size_id')"
									/>
								</form-group>
							</b-col>
						</b-row>

						<b-row class="wkn-my-2">
							<b-col>
								<!-- Type of Moving Service -->
								<form-group label="Type of Moving Service"
								            label_for="service-type"
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
							<b-col>
								<!-- Zip To -->
								<form-group label="Zip To"
								            label_for="calc-to-zip"
								            :errors="form_errors.to_zip"
								            :is_disabled="isDisabledFormField('to_zip')">
									<input-text
										placeholder="Your to zip"
										:is_loading="is_loading_field('to_zip')"
										:maxlength="5"
										:value="form.to_zip"
										@input="UPDATE_FORM_FIELD({field: 'to_zip', value: $event.target.value})"
										:throttled="true"
									/>
								</form-group>
							</b-col>
							<b-col>
								<!-- Entrance To -->
								<form-group label="Entrance To"
								            label_for="to-entrance"
								            :errors="form_errors.to_entrance_type_id"
								            :is_disabled="isDisabledFormField('to_entrance_type_id')">
									<vselect
										placeholder="Choose entrance ..."
										:value="form.to_entrance_type_id"
										:options="$gdata.entrances"
										@input="value => updateFormField('to_entrance_type_id', parseInt(value))"
										:is_loading="is_loading_field('to_entrance_type_id')"
									/>
								</form-group>
							</b-col>
							<b-col>
								<!-- Extra Rooms -->
								<form-group label="Extra Rooms"
								            label_for="extra-rooms"
								            v-if="selected_move_size"
								>
									<checkbox-group>
										<pretty-check class="p-default p-round p-smooth"
										              v-for="room in size_rooms"
										              :key="room.id"
										              :name="'extra-room-label-' + room.id"
										              :value="room.id"
										              :disabled="!!room.pivot.is_included"
										              color="success"
										              v-model="move_size_extra"
										>{{room.display_name}}</pretty-check>
									</checkbox-group>
								</form-group>
							</b-col>
						</b-row>
					</template>

					<template slot="bottom">
						<b-row class="wkn-my-4">
							<b-col>
								<fast-info>
									<fast-info-item
										label="Moving Date:" :value="selected_move_date_pretty"
										v-if="selected_move_date_pretty"
									/>
									<fast-info-item
										label="Destination Date:" :value="selected_destination_date_pretty"
										v-if="selected_destination_date_pretty && selected_service_type.name === 'storage'"
									/>
									<fast-info-item
										label="Service:" :value="selected_service_type.display_name"
										v-if="selected_service_type"
									/>
									<fast-info-item
										label="Zip From:" :value="info.from_formatted_address"
										v-if="isShowInfoProperty('from_formatted_address')"
									/>
									<fast-info-item
										label="Zip To:" :value="info.to_formatted_address"
										v-if="isShowInfoProperty('to_formatted_address')"
									/>
									<fast-info-item
										label="Moving Size:" :value="selected_move_size.display_name"
										v-if="selected_move_size"
									/>
								</fast-info>
							</b-col>
							<b-col>
								<visual-builder />
							</b-col>
							<b-col>
								<help-list :items="helpList"/>
							</b-col>
						</b-row>
					</template>
				</l-calc>

			</template>

			<template slot="btn-next">
				<button class="wkn-btn-action" v-on:click.prevent="submitForm()">Calculate</button>
			</template>
		</l-screen>
</template>


<script>
	/* eslint-disable */
	import moment from "@/packages/Moment";
	import _ from "lodash";
	import {mapState, mapGetters, mapActions, mapMutations} from "vuex";
	import PrettyCheck from 'pretty-checkbox-vue/check';

	import LScreen from "../layouts/Screen"
	import LCalc from "../layouts/Calc"
	import HelpList from "../modules/calc/CalcHelp"
	import FastInfo from "../modules/calc/CalcFastInfo"
	import FastInfoItem from "../modules/calc/CalcFastInfoItem"

	import VisualBuilder from "../VisualBuilder"

	import InputText from "@/components/common/modules/form/InputText"
	import FormGroup from "@/components/common/modules/form/FormGroup"
	import InputDate from "@/components/common/modules/form/InputDate"
	import Vselect from "@/components/common/modules/form/Select"
	import CheckboxGroup from "@/components/common/modules/form/CheckboxGroup"
	import Checkbox from "@/components/common/modules/form/Checkbox"

	export default {
		components: {
			PrettyCheck,
			LScreen, LCalc, HelpList, FastInfo, FastInfoItem,
			VisualBuilder,
			FormGroup, InputText, InputDate, Vselect, CheckboxGroup, Checkbox,
		},
		data() {
			return {
				helpList: [
					{
						title: 'Moving Size',
						description: "Please choose moving size properly, final price directly depends on Your choice!"
					},
					{
						title: 'Type of Entrance',
						description: "Make sure you have mentioned an apartment's level. Even if a house placed on a hill: 10-12 steps usually equal to one flight of stairs. It's important for counting work time."
					},
					{
						title: 'Not sure your ase fits proposed options?',
						description: "No Worries! Just fill out the form with the closest conditions, after You complete the move request our manager will contact you to discuss al lthe details."
					}
				]
			};
		},
		computed: {
			...mapState("CalcFormStore", {
				form: state => state.form,
				info: state => state.info,
				address: state => state.address,
				form_errors: state => state.form_errors
			}),
			...mapGetters("CalcFormStore", [
				"selected_move_date_pretty",
				"selected_destination_date_pretty",
				"selected_service_type",
				"selected_move_size",
				"size_rooms",
				"selected_rooms_pretty",
				"storage_date_value",
				"getServiceTypeById",
				"isDisabledFormField",
				"isHiddenInfoProperty",
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
				this.CLEAR_DISABLED_CUSTOMER_FORM_FIELDS()
				this.CLEAR_HIDDEN_INFO_PROPERTIES()
				let service_name = this.getServiceTypeById(newVal)
				if (service_name === 'loading' || service_name === 'packing') {
					this.ADD_DISABLED_FORM_FIELD('to_zip')
					this.ADD_DISABLED_FORM_FIELD('to_entrance_type_id')
					this.ADD_DISABLED_CUSTOMER_FORM_FIELD('to_address')
					this.ADD_HIDDEN_INFO_PROPERTY('to_formatted_address')
				} else if (service_name === 'unloading') {
					this.ADD_DISABLED_FORM_FIELD('from_zip')
					this.ADD_DISABLED_FORM_FIELD('from_entrance_type_id')
					this.ADD_DISABLED_CUSTOMER_FORM_FIELD('from_address')
					this.ADD_HIDDEN_INFO_PROPERTY('from_formatted_address')
				}
			}
		},
		methods: {
			...mapMutations("AppStore", {
				START_LOADING: "START_LOADING",
				END_LOADING: "END_LOADING",
			}),
			...mapMutations("CalcFormStore", {
				CLEAR_FORM: "CLEAR_FORM",
				CLEAR_FIELD: "CLEAR_FIELD",
				ADD_MOVE_SIZE_EXTRA_VALUE: "ADD_MOVE_SIZE_EXTRA_VALUE",
				/*UPDATE_ACTUAL_SIZE_EXTRA: "UPDATE_ACTUAL_SIZE_EXTRA",*/
				UPDATE_FORM_FIELD: "UPDATE_FORM_FIELD",
				ADD_DISABLED_FORM_FIELD: "ADD_DISABLED_FORM_FIELD",
				CLEAR_DISABLED_FORM_FIELDS: "CLEAR_DISABLED_FORM_FIELDS",
				ADD_HIDDEN_INFO_PROPERTY: "ADD_HIDDEN_INFO_PROPERTY",
				CLEAR_HIDDEN_INFO_PROPERTIES: "CLEAR_HIDDEN_INFO_PROPERTIES",
			}),
			...mapMutations("CustomerInfoStore", {
				ADD_DISABLED_CUSTOMER_FORM_FIELD: "ADD_DISABLED_FORM_FIELD",
				CLEAR_DISABLED_CUSTOMER_FORM_FIELDS: "CLEAR_DISABLED_FORM_FIELDS",
			}),
			...mapActions("CalcFormStore", {
				actionUpdateFormField: "updateFormField",
				actionUpdateActualSizeExtra: "updateActualSizeExtra",
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
			updateFormFieldZip: _.debounce(function (field, value, direction, check_field) {
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
			}, 1000),
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
