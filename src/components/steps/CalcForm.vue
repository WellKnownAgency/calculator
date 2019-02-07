<template>
		<l-screen>
			<template slot="body">

				<l-calc>
					<template slot="top">
						<b-row class="wkn-my-4">
							<b-col v-if="!isMovingDateRange">
								<!-- Moving Date -->
								<form-group label="Moving Date"
											label_for="move-date"
											:errors="form_errors.move_date"
											:is_disabled="isDisabledFormField('move_date')">
													<input-date
														:value="form.move_date"
														@input="(value) => updateFormFieldDate('move_date', value)"
														@clear="CLEAR_FIELD('move_date')"
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
														:value="storage_date_value"
														@input="(value) => updateFormFieldStorageDate(value)"
														@clear="CLEAR_FIELD('move_date');CLEAR_FIELD('destination_date');"
													/>
								</form-group>
							</b-col>
							<b-col>
								<!-- Zip From -->
								<form-group label="Zip From"
														label_for="from-zip"
														:errors="form_errors.from_zip"
														:is_disabled="isDisabledFormField('from_zip')">
									<input-text
										placeholder="Your from zip"
										:value="form.from_zip"
										@input="UPDATE_FORM_FIELD({field: 'from_zip', value: $event.target.value})"
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
										:options="entrance_types"
										@input="value => updateFormField('from_entrance_type_id', parseInt(value))"
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
										:options="move_sizes"
										@input="value => updateFormFieldSize('move_size_id', parseInt(value))"
										:errors="form_errors.move_size_id"
									/>
								</form-group>
							</b-col>
						</b-row>

						<b-row class="wkn-my-4">
							<b-col>
								<!-- Type of Moving Service -->
								<form-group label="Type of Moving Service"
													label_for="service-type"
													:errors="form_errors.service_type_id"
													:is_disabled="isDisabledFormField('service_type_id')">
										<vselect
											placeholder="Choose service ..."
											:value="form.service_type_id"
											:options="service_types"
											@input="value => updateFormField('service_type_id', parseInt(value))"
											:errors="form_errors.service_type_id"
										/>
								</form-group>
							</b-col>
							<b-col>
								<!-- Zip To -->
								<form-group label="Zip To"
								            label_for="to-zip"
								            :errors="form_errors.to_zip"
								            :is_disabled="isDisabledFormField('to_zip')">
									<input-text
										placeholder="Your to zip"
										:value="form.to_zip"
										@input="UPDATE_FORM_FIELD({field: 'to_zip', value: $event.target.value})"
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
										:options="entrance_types"
										@input="value => updateFormField('to_entrance_type_id', parseInt(value))"
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
								<img src="@/assets/img/sm4house.png" width="350px" height="auto"/>
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

	import LScreen from "@/components/layouts/Screen"
	import LCalc from "@/components/layouts/Calc"
	import HelpList from "@/components/modules/calc/CalcHelp"
	import FastInfo from "@/components/modules/calc/CalcFastInfo"
	import FastInfoItem from "@/components/modules/calc/CalcFastInfoItem"

	import InputText from "@/components/modules/form/InputText"
	import FormGroup from "@/components/modules/form/FormGroup"
	import InputDate from "@/components/modules/form/InputDate"
	import Vselect from "@/components/modules/form/Select"
	import CheckboxGroup from "@/components/modules/form/CheckboxGroup"
	import Checkbox from "@/components/modules/form/Checkbox"

	export default {
		components: {
			PrettyCheck,
			LScreen, LCalc, HelpList, FastInfo, FastInfoItem,
			FormGroup, InputText, InputDate, Vselect, CheckboxGroup, Checkbox,
		},
		data() {
			return {
				helpList: [
					{
						title: 'Moving Size',
						description: "Please don't underestimate the size of your move! Make your choice wisely!"
					},
					{
						title: 'Entrance',
						description: "Make sure you mention stairs. It's important for counting moving estimate time."
					},
					{
						title: 'Moving Size',
						description: "Once you will submit complete move request, you can also provide a precise inventory of all items, that you planning to move."
					}
				]
			};
		},
		computed: {
			...mapState("CalcFormStore", {
				form: state => state.form,
				info: state => state.info,
				service_types: state => state.service_types,
				move_sizes: state => state.move_sizes,
				entrance_types: state => state.entrance_types,
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
			]),
			move_size_extra: {
				get: function () {
					return this.$store.state.CalcFormStore.form.move_size_extra;
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
			...mapMutations("CalcFormStore", {
				CLEAR_FORM: "CLEAR_FORM",
				CLEAR_FIELD: "CLEAR_FIELD",
				ADD_MOVE_SIZE_EXTRA_VALUE: "ADD_MOVE_SIZE_EXTRA_VALUE",
				UPD_ACTUAL_SIZE_EXTRA: "UPD_ACTUAL_SIZE_EXTRA",
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
			updateFormFieldDate: function (field, value) {
				let formatValue = moment(value).isValid() ? moment(value).format("MM.DD.YYYY") : null;
				this.updateFormField(field, formatValue);
			},
			updateFormFieldStorageDate: function (value) {
				let movingDate = moment(value[0]).isValid() ? moment(value[0]).format("MM.DD.YYYY") : null;
				let destinationDate = moment(value[1]).isValid() ? moment(value[1]).format("MM.DD.YYYY") : null;
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
				this.actionSubmitForm().then(() => {
					this.actionChangeServiceType();
					this.$emit("complete");
				});
			}
		},
		created() {},
		mounted() {}
	};
</script>
