<template>
	<layout>

		<template slot="top">

			<!-- Moving Date -->
			<item-input label="Moving Date" :errors="form_errors.move_date">
				<date-picker
						id="move-date"
						width="100%"
						:value="form.move_date.value"
						@input="(value) => updateFormFieldDate('move_date', value)"
						format="MM.DD.YYYY"
						:not-before="new Date()"
						lang="en"
						:input-class="[form_errors.move_date ? 'wkn-cal-input wkn-cal-error' : 'wkn-cal-input']"
						@clear="CLEAR_FIELD('move_date')"
				/>
			</item-input>

			<!-- Zip From -->
			<item-input label="Zip From" :errors="form_errors.from_zip" :is_disabled="form.from_zip.is_disabled">
				<input-text
					placeholder="Your from zip"
					:value="form.from_zip.value"
					@input="UPDATE_FORM_FIELD({field: 'from_zip', value: $event.target.value})"
					:is_disabled="form.from_zip.is_disabled"
					:errors="form_errors.from_zip"
				/>
			</item-input>

			<!-- Entrance From -->
			<item-input label="Entrance From" :errors="form_errors.from_entrance_type_id" :is_disabled="form.from_entrance_type_id.is_disabled">
				<vselect
					placeholder="Choose entrance ..."
					:value="form.from_entrance_type_id.value"
					:options="entrance_types"
					@input="updateFormField('from_entrance_type_id', parseInt($event.target.value))"
					:is_disabled="form.from_entrance_type_id.is_disabled"
					:errors="form_errors.from_entrance_type_id"
				/>
			</item-input>

			<!-- Moving Size -->
			<item-input label="Moving Size" :errors="form_errors.move_size_id" :is_disabled="form.move_size_id.is_disabled">
				<vselect
					placeholder="Choose entrance ..."
					:value="form.move_size_id.value"
					:options="move_sizes"
					@input="updateFormFieldSize('move_size_id', parseInt($event.target.value))"
					:is_disabled="form.move_size_id.is_disabled"
					:errors="form_errors.move_size_id"
				/>
			</item-input>

			<!-- Type of Moving Service -->
			<item-input label="Type of Moving Service" :errors="form_errors.service_type_id" :is_disabled="form.service_type_id.is_disabled">
				<vselect
					placeholder="Choose service ..."
					:value="form.service_type_id.value"
					:options="service_types"
					@input="updateFormField('service_type_id', parseInt($event.target.value))"
					:is_disabled="form.service_type_id.is_disabled"
					:errors="form_errors.service_type_id"
				/>
			</item-input>

			<!-- Zip To -->
			<item-input label="Zip To" :errors="form_errors.to_zip" :is_disabled="form.to_zip.is_disabled">
				<input-text
					placeholder="Your to zip"
					:value="form.to_zip.value"
					@input="UPDATE_FORM_FIELD({field: 'to_zip', value: $event.target.value})"
					:is_disabled="form.to_zip.is_disabled"
					:errors="form_errors.to_zip"
				/>
			</item-input>

			<!-- Entrance To -->
			<item-input label="Entrance To" :errors="form_errors.to_entrance_type_id" :is_disabled="form.to_entrance_type_id.is_disabled">
				<vselect
					placeholder="Choose entrance ..."
					:value="form.to_entrance_type_id.value"
					:options="entrance_types"
					@input="updateFormField('to_entrance_type_id', parseInt($event.target.value))"
					:is_disabled="form.to_entrance_type_id.is_disabled"
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
						<li style="margin-bottom:10px;" v-if="selected_service_type">
							<b>Service:</b>
							<span>{{selected_service_type.display_name}}</span>
						</li>
						<li style="margin-bottom:10px;" v-if="!info.from_formatted_address.is_hidden && info.from_formatted_address.value">
							<b>Zip From:</b>
							<span>{{info.from_formatted_address.value}}</span>
						</li>
						<li style="margin-bottom:10px;" v-if="!info.to_formatted_address.is_hidden && info.to_formatted_address.value">
							<b>Zip To:</b>
							<span>{{info.to_formatted_address.value}}</span>
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
			...mapGetters("CalcFormStore", {
				selected_move_date_pretty: "selected_move_date_pretty",
				selected_service_type: "selected_service_type",
				selected_move_size: "selected_move_size",
				size_rooms: "size_rooms",
				selected_rooms_pretty: "selected_rooms_pretty"
			}),
			move_size_extra: {
				get: function() {
					return this.$store.state.CalcFormStore.form.move_size_extra;
				},
				// сеттер:
				set: function(newValue) {
					this.ADD_MOVE_SIZE_EXTRA_VALUE(newValue);
				}
			}
		},
		watch: {
			"form.from_zip.value"(newVal) {
				this.updateFormFieldZip("from_zip", newVal, 'from', 'to_zip');
			},
			"form.to_zip.value"(newVal) {
				this.updateFormFieldZip("to_zip", newVal, 'to', "from_zip");
			},
			"form.service_type_id.value"(newVal) {
				this.UNLOCK_FORM_FIELDS()
				this.UNLOCK_INFO_FIELDS()
				if (newVal === 3 || newVal === 5) {
					this.SET_FORM_FIELD_TO_DISABLED('to_zip')
					this.SET_FORM_FIELD_TO_DISABLED('to_entrance_type_id')

					this.SET_INFO_FIELD_TO_HIDDEN('to_formatted_address')
				} else if (newVal === 4) {
					this.SET_FORM_FIELD_TO_DISABLED('from_zip')
					this.SET_FORM_FIELD_TO_DISABLED('from_entrance_type_id')

					this.SET_INFO_FIELD_TO_HIDDEN('from_formatted_address')
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
				SET_FORM_FIELD_TO_DISABLED: "SET_FORM_FIELD_TO_DISABLED",
				SET_FORM_FIELD_TO_ACTIVE: "SET_FORM_FIELD_TO_ACTIVE",
				UNLOCK_FORM_FIELDS: "UNLOCK_FORM_FIELDS",
				SET_INFO_FIELD_TO_HIDDEN: "SET_INFO_FIELD_TO_HIDDEN",
				SET_INFO_FIELD_TO_VISIBLE: "SET_INFO_FIELD_TO_VISIBLE",
				UNLOCK_INFO_FIELDS: "UNLOCK_INFO_FIELDS",
			}),
			...mapActions("CalcFormStore", {
				actionUpdateFormField: "updateFormField",
				actionUpdateActualSizeExtra: "updateActualSizeExtra",
				actionUpdateFormFieldZip: "updateFormFieldZip",
				actionSubmitForm: "submitForm",
				actionChangeServiceType: "changeServiceType"
			}),
			updateFormFieldDate: function(field, value) {
				let formatValue = moment(value).format("MM.DD.YYYY");
				this.updateFormField(field, formatValue);
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
							this.form[check_field].value &&
							this.form[check_field].value.length &&
							!this.form_errors[check_field]
						) {
							this.actionChangeServiceType();
						}
					}
				);
			}, 1000),
			setLockField($field) {
				this.$refs[$field].disabled = true

			},
			clearForm() {
				this.CLEAR_FORM();
			},
			submitForm() {
				this.actionSubmitForm().then(() => {
					this.$emit("complete");
				});
			}
		},
		created() {},
		mounted() {}
	};
</script>
