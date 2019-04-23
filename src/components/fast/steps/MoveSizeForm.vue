<template>
	<l-screen>
		<template slot="body">
			<b-row class="wkn-my-2">
				<b-col>
					<!-- Moving Size -->
					<form-group :fw="true"
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
			<b-row>
				<b-col>
					<!-- Extra Rooms -->
					<form-group :fw="true"
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
			<b-row>
				<b-col>
					<!-- Entrance From -->
					<form-group
					            :errors="form_errors.from_entrance_type_id"
					            :is_disabled="isDisabledFormField('from_entrance_type_id')">
						<vselect
							placeholder="entrance from ..."
							:value="form.from_entrance_type_id"
							:options="$gdata.entrances"
							@input="value => updateFormField('from_entrance_type_id', parseInt(value))"
							:is_loading="is_loading_field('from_entrance_type_id')"
						/>
					</form-group>
				</b-col>
				<b-col>
					<!-- Entrance To -->
					<form-group
					            :errors="form_errors.to_entrance_type_id"
					            :is_disabled="isDisabledFormField('to_entrance_type_id')">
						<vselect
							placeholder="entrance to ..."
							:value="form.to_entrance_type_id"
							:options="$gdata.entrances"
							@input="value => updateFormField('to_entrance_type_id', parseInt(value))"
							:is_loading="is_loading_field('to_entrance_type_id')"
						/>
					</form-group>
				</b-col>
			</b-row>
		</template>

		<template slot="footer">
			<button class="wkn-btn-action" v-on:click.prevent="submitForm()">Continue with contract info</button>
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

	import InputText from "@/components/common/modules/form/InputText"
	import FormGroup from "@/components/common/modules/form/FormGroup"
	import InputDate from "@/components/common/modules/form/InputDate"
	import Vselect from "@/components/common/modules/form/Select"
	import CheckboxGroup from "@/components/common/modules/form/CheckboxGroup"
	import Checkbox from "@/components/common/modules/form/Checkbox"

	export default {
		components: {
			PrettyCheck,
			LScreen,
			FormGroup, InputText, InputDate, Vselect, CheckboxGroup, Checkbox,
		},
		data() {
			return {

			};
		},
		computed: {
			...mapState("MoveSizeFormStore", {
				form: state => state.form,
				address: state => state.address,
				form_errors: state => state.form_errors
			}),
			...mapGetters("MoveSizeFormStore", [
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
					return this.$store.state.MoveSizeFormStore.form.extra_rooms_ids;
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
		methods: {
			...mapMutations("AppStore", {
				START_LOADING: "START_LOADING",
				END_LOADING: "END_LOADING",
			}),
			...mapMutations("MoveSizeFormStore", {
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
			...mapActions("MoveSizeFormStore", {
				actionUpdateFormField: "updateFormField",
				actionUpdateActualSizeExtra: "updateActualSizeExtra",
				actionUpdateFormFieldZip: "updateFormFieldZip",
				actionUpdateFormFieldStorageDates: "updateFormFieldStorageDates",
				actionSubmitForm: "submitForm",
				actionChangeServiceType: "changeServiceType"
			}),
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
					this.$emit("complete");
				})
				.finally(() => {
					this.END_LOADING()
				})
			}
		},
	};
</script>
