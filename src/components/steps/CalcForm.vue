<template>
	<layout>

		<template slot="top">

			<!-- Moving Date -->
			<item-input label="Moving Date" :errors="form_errors.move_date" v-if="!isMovingDateRange">
				<date-picker
					id="move-date"
					width="100%"
					:value="form.move_date"
					@input="(value) => updateFormFieldDate('move_date', value)"
					format="MM.DD.YYYY"
					:not-before="new Date()"
					lang="en"
					:input-class="[form_errors.move_date ? 'wkn-cal-input wkn-cal-error' : 'wkn-cal-input']"
					@clear="CLEAR_FIELD('move_date')"
				/>
			</item-input>

			<!-- Moving ~ Destination Date -->
			<item-input label="Moving ~ Destination Date" :errors="form_errors.destination_date" v-if="isMovingDateRange">
				<date-picker
					id="destination-date"
					width="100%"
					:value="storage_date_value"
					@input="(value) => updateFormFieldStorageDate(value)"
					format="MM.DD.YYYY"
					:range="true"
					:not-before="new Date()"
					lang="en"
					:input-class="[form_errors.destination_date ? 'wkn-cal-input wkn-cal-error' : 'wkn-cal-input']"
					@clear="CLEAR_FIELD('move_date');CLEAR_FIELD('destination_date');"
				/>
			</item-input>

			<!-- Zip From -->
			<item-input label="Zip From" :errors="form_errors.from_zip" :is_disabled="isDisabledFormField('from_zip')">
				<input-text
					placeholder="Your from zip"
					:value="form.from_zip"
					@input="UPDATE_FORM_FIELD({field: 'from_zip', value: $event.target.value})"
					:is_disabled="isDisabledFormField('from_zip')"
					:errors="form_errors.from_zip"
				/>
			</item-input>

			<!-- Entrance From -->
			<item-input label="Entrance From" :errors="form_errors.from_entrance_type_id" :is_disabled="isDisabledFormField('from_entrance_type_id')">
				<vselect
					placeholder="Choose entrance ..."
					:value="form.from_entrance_type_id"
					:options="entrance_types"
					@input="updateFormField('from_entrance_type_id', parseInt($event.target.value))"
					:is_disabled="isDisabledFormField('from_entrance_type_id')"
					:errors="form_errors.from_entrance_type_id"
				/>
			</item-input>

			<!-- Moving Size -->
			<item-input label="Moving Size" :errors="form_errors.move_size_id" :is_disabled="isDisabledFormField('move_size_id')">
				<vselect
					placeholder="Choose entrance ..."
					:value="form.move_size_id"
					:options="move_sizes"
					@input="updateFormFieldSize('move_size_id', parseInt($event.target.value))"
					:is_disabled="isDisabledFormField('move_size_id')"
					:errors="form_errors.move_size_id"
				/>
			</item-input>

			<!-- Type of Moving Service -->
			<item-input label="Type of Moving Service" :errors="form_errors.service_type_id" :is_disabled="isDisabledFormField('service_type_id')">
				<vselect
					placeholder="Choose service ..."
					:value="form.service_type_id"
					:options="service_types"
					@input="updateFormField('service_type_id', parseInt($event.target.value))"
					:is_disabled="isDisabledFormField('service_type_id')"
					:errors="form_errors.service_type_id"
				/>
			</item-input>

			<!-- Zip To -->
			<item-input label="Zip To" :errors="form_errors.to_zip" :is_disabled="isDisabledFormField('to_zip')">
				<input-text
					placeholder="Your to zip"
					:value="form.to_zip"
					@input="UPDATE_FORM_FIELD({field: 'to_zip', value: $event.target.value})"
					:is_disabled="isDisabledFormField('to_zip')"
					:errors="form_errors.to_zip"
				/>
			</item-input>

			<!-- Entrance To -->
			<item-input label="Entrance To" :errors="form_errors.to_entrance_type_id" :is_disabled="isDisabledFormField('to_entrance_type_id')">
				<vselect
					placeholder="Choose entrance ..."
					:value="form.to_entrance_type_id"
					:options="entrance_types"
					@input="updateFormField('to_entrance_type_id', parseInt($event.target.value))"
					:is_disabled="isDisabledFormField('to_entrance_type_id')"
					:errors="form_errors.to_entrance_type_id"
				/>
			</item-input>

			<!-- Extra Rooms -->
			<div class="wkn-cal-grid-item-top">
				<label class="wkn-cal-label">Extra Rooms</label>
				<span class="wkn-cal-grid-container-extra">
							<span class="wkn-cal-grid-item-extra" v-for="room in size_rooms" :key="room.id">
								<input type="checkbox" class="wkn-cal-checkbox" :id="'extra-room-label-' + room.id" :disabled="!!room.pivot.is_included" :value="room.id" v-model="move_size_extra">
								<label :for="'extra-room-label-' + room.id">{{room.display_name}}</label>
							</span>
						</span>
			</div>

		</template>

		<template slot="btn-next">
			<button class="wkn-cal-but-next" v-on:click.prevent="submitForm()">Calculate</button>
		</template>

		<template slot="bottom">
			<div class="wkn-cal-grid-item-bottom">
				<div class="wkn-cal-grid-container-ul">
					<ul style="list-style-type:none;">
						<li style="margin-bottom:10px;" v-if="selected_move_date_pretty">
							<b>Moving Date:</b>
							<span>{{selected_move_date_pretty}}</span>
						</li>
						<li style="margin-bottom:10px;" v-if="selected_destination_date_pretty && selected_service_type.name === 'storage'">
							<b>Destination Date:</b>
							<span>{{selected_destination_date_pretty}}</span>
						</li>
						<li style="margin-bottom:10px;" v-if="selected_service_type">
							<b>Service:</b>
							<span>{{selected_service_type.display_name}}</span>
						</li>
						<li style="margin-bottom:10px;" v-if="isShowInfoProperty('from_formatted_address')">
							<b>Zip From:</b>
							<span>{{info.from_formatted_address}}</span>
						</li>
						<li style="margin-bottom:10px;" v-if="isShowInfoProperty('to_formatted_address')">
							<b>Zip To:</b>
							<span>{{info.to_formatted_address}}</span>
						</li>
						<li style="margin-bottom:10px;" v-if="selected_move_size">
							<b>Moving Size:</b>
							<span>{{selected_move_size.display_name}}</span>
						</li>
					</ul>
				</div>
			</div>
			<div class="wkn-cal-grid-item-bottom">
				<img src="@/assets/img/sm4house.png" width="350px" height="auto"/>
			</div>
			<div class="wkn-cal-grid-item-bottom">
				<p class="wkn-cal-infotext">
					<b style="font-size:16px;">Moving Size</b><br>
					Please don't underestimate the size of your move!
					Make your choice wisely!
					<br>
					<br>
					<b>Entrance</b><br>
					Make sure you mention stairs. It's important for counting moving estimate time.
					<br>
					<br>
					<b>Call for if you have Questions</b><br>
					Once you will submit complete move request, you can also provide a precise inventory of all items,
					that you planning to move.
				</p>
			</div>
		</template>

	</layout>
</template>


<script>
	/* eslint-disable */
	//import InputText from "@/components/formel/InpitText"
	import Layout from "@/components/modules/calc-form/Layout"
	import ItemInput from "@/components/modules/calc-form/ItemInput"
	import InputText from "@/components/modules/calc-form/InputText"
	import Vselect from "@/components/modules/calc-form/Select"
	import DatePicker from "vue2-datepicker";
	import moment from "@/packages/Moment";
	import _ from "lodash";
	import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

	export default {
		components: { DatePicker, InputText, Layout, ItemInput, Vselect },
		data() {
			return {};
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
				get: function() {
					return this.$store.state.CalcFormStore.form.move_size_extra;
				},
				// сеттер:
				set: function(newValue) {
					this.ADD_MOVE_SIZE_EXTRA_VALUE(newValue);
				}
			},
			movingDateLabel() {
				return (this.selected_service_type && this.selected_service_type.name === 'storage') ? 'Moving ~ Destination Dates' : 'Moving Date'
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
			updateFormFieldDate: function(field, value) {
				let formatValue = moment(value).isValid() ? moment(value).format("MM.DD.YYYY") : null;
				this.updateFormField(field, formatValue);
			},
			updateFormFieldStorageDate: function(value) {
				let movingDate = moment(value[0]).isValid() ? moment(value[0]).format("MM.DD.YYYY") : null;
				let destinationDate = moment(value[1]).isValid() ? moment(value[1]).format("MM.DD.YYYY") : null;
				return this.actionUpdateFormFieldStorageDates({ moving: movingDate, destination: destinationDate });
			},
			updateFormFieldDebounce: _.debounce(function(field, value) {
				this.actionUpdateFormField({ field: field, value: value });
			}, 1000),
			updateFormField: function(field, value) {
				return this.actionUpdateFormField({ field: field, value: value });
			},
			updateFormFieldSize: function(field, value) {
				this.updateFormField(field, value).then(() =>
					this.actionUpdateActualSizeExtra()
				);
			},
			updateFormFieldZip: _.debounce(function(field, value, direction, check_field) {
				this.actionUpdateFormFieldZip({ field: field, value: value, direction: direction }).then(
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
			setLockField($field) {
				this.$refs[$field].disabled = true

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
