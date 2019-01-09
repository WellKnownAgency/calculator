<template>
	<div class="wkn-calc-form-layout">
		<div style="margin:10px 50px 0 50px;">
		  <div class="wkn-cal-main">
		    <div class="wkn-cal-grid-container-top">
		      <div class="wkn-cal-grid-item-top">
		        <label class="wkn-cal-label">Moving Date</label>
		        <span class="wkn-cal-span-abs">
							<date-picker id="move-date"
			                     width="100%"
			                     :value="form.move_date"
			                     @input="(value) => updateFormFieldDate('move_date', value)"
			                     format="MM.DD.YYYY"
			                     :not-before="new Date()"
			                     lang="en"
			                     :input-class="[form_errors.move_date ? 'wkn-cal-input wkn-cal-error' : 'wkn-cal-input']"
			                     @clear="CLEAR_FIELD('move_date')"
			        ></date-picker>
		          <span :class="[form_errors.move_date ? 'wkn-cal-left-input wkn-cal-left-error' : 'wkn-cal-left-input']"></span>
		          <!--<span class="cal-right-input"></span>-->
		        </span>
						<div class="wkn-cal-errors" v-if="form_errors.move_date">
							<div class="wkn-cal-errors-item" v-for="(error, index) in form_errors.move_date" :key="index">{{error}}</div>
						</div>
		      </div>
		      <div class="wkn-cal-grid-item-top">
		        <label class="wkn-cal-label">Zip From</label>
		        <span class="wkn-cal-span-abs">
		          <input class="wkn-cal-input"  placeholder="Your from zip" v-bind:class="{'wkn-cal-error': form_errors.from_zip}" id="from-zip" :value="form.from_zip" @input="updateFormFieldFromZip('from_zip', $event.target.value)">
		          <span class="wkn-cal-left-input" v-bind:class="{'wkn-cal-left-error': form_errors.from_zip}"></span>
		          <!--<span class="cal-right-input"></span>-->
		        </span>
						<div class="wkn-cal-errors" v-if="form_errors.from_zip">
		          <div class="wkn-cal-errors-item" v-for="(error, index) in form_errors.from_zip" :key="index">{{error}}</div>
		        </div>
		      </div>
		      <div class="wkn-cal-grid-item-top">
		        <label class="wkn-cal-label">Entrance From</label>
		        <span class="wkn-cal-span-abs">
		          <select class="wkn-cal-select-input" v-bind:class="{'wkn-cal-error': form_errors.from_entrance_type_id}" :value="form.from_entrance_type_id" @input="updateFormField('from_entrance_type_id', $event.target.value)">
		            <option :value="null">Choose entrance ...</option>
			          <option v-for="type in entrance_types" :key="type.id" :value="type.id">{{type.display_name}}</option>
		          </select>
		          <span class="wkn-cal-left-input" v-bind:class="{'wkn-cal-left-error': form_errors.from_entrance_type_id}"></span>
		          <!--<span class="cal-right-input"></span>-->
		        </span>
						<div class="wkn-cal-errors" v-if="form_errors.from_entrance_type_id">
		          <div class="wkn-cal-errors-item" v-for="(error, index) in form_errors.from_entrance_type_id" :key="index">{{error}}</div>
		        </div>
		      </div>
		      <div class="wkn-cal-grid-item-top">
		        <label class="wkn-cal-label">Moving Size</label>
		        <span class="wkn-cal-span-abs">
		          <select class="wkn-cal-select-input" v-bind:class="{'wkn-cal-error': form_errors.move_size_id}" :value="form.move_size_id" @input="updateFormFieldSize('move_size_id', parseInt($event.target.value))">
								<option :value="null">Choose select ...</option>
			          <option v-for="size in move_sizes" :key="size.id" :value="size.id">{{size.display_name}}</option>
		          </select>
		          <span class="wkn-cal-left-input" v-bind:class="{'wkn-cal-left- error': form_errors.move_size_id}"></span>
		          <!--<span class="cal-right-input"></span>-->
		        </span>
						<div class="wkn-cal-errors" v-if="form_errors.move_size_id">
		          <div class="wkn-cal-errors-item" v-for="(error, index) in form_errors.move_size_id" :key="index">{{error}}</div>
		        </div>
		      </div>
		      <div class="wkn-cal-grid-item-top">
		        <label class="wkn-cal-label">Type of Moving Service</label>
		        <span class="wkn-cal-span-abs">
		          <select class="wkn-cal-select-input" v-bind:class="{'wkn-cal-error': form_errors.service_type_id}" :value="form.service_type_id" @input="updateFormField('service_type_id', parseInt($event.target.value))">
								<option :value="null">Choose service ...</option>
			          <option v-for="type in service_types" :key="type.id" :value="type.id">{{type.display_name}}</option>
		          </select>
		          <span class="wkn-cal-left-input "  v-bind:class="{'wkn-cal-left-error': form_errors.service_type_id}"></span>
		          <!--<span class="cal-right-input"></span>-->
		        </span>
						<div class="wkn-cal-errors" v-if="form_errors.service_type_id">
							<div class="wkn-cal-errors-item" v-for="(error, index) in form_errors.service_type_id" :key="index">{{error}}</div>
						</div>
		      </div>
		      <div class="wkn-cal-grid-item-top">
		        <label class="wkn-cal-label">Zip To</label>
		        <span class="wkn-cal-span-abs">
		          <input class="wkn-cal-input" placeholder="Your to zip" v-bind:class="{'wkn-cal-error': form_errors.to_zip}" id="to-zip" :value="form.to_zip" @input="updateFormFieldToZip('to_zip', $event.target.value)">
		          <span class="wkn-cal-left-input" v-bind:class="{'wkn-cal-left-error': form_errors.to_zip}"></span>
		          <!--<span class="cal-right-input"></span>-->
		        </span>
						<div class="wkn-cal-errors" v-if="form_errors.to_zip">
		          <div class="wkn-cal-errors-item" v-for="(error, index) in form_errors.to_zip" :key="index">{{error}}</div>
		        </div>
		      </div>
		      <div class="wkn-cal-grid-item-top">
		        <label class="wkn-cal-label">Entrance To</label>
		        <span class="wkn-cal-span-abs">
		          <select class="wkn-cal-select-input" v-bind:class="{'wkn-cal-error': form_errors.to_entrance_type_id}" :value="form.to_entrance_type_id" @input="updateFormField('to_entrance_type_id', $event.target.value)">
								<option :value="null">Choose select ...</option>
			          <option v-for="type in entrance_types" :key="type.id" :value="type.id">{{type.display_name}}</option>
		          </select>
		          <span class="wkn-cal-left-input" v-bind:class="{'wkn-cal-left-error': form_errors.to_entrance_type_id}"></span>
		          <!--<span class="cal-right-input"></span>-->
		        </span>
						<div class="wkn-cal-errors" v-if="form_errors.to_entrance_type_id">
		          <div class="wkn-cal-errors-item" v-for="(error, index) in form_errors.to_entrance_type_id" :key="index">{{error}}</div>
		        </div>
		      </div>
		      <div class="wkn-cal-grid-item-top">
		        <label class="wkn-cal-label">Extra Rooms</label>
		        <span class="wkn-cal-grid-container-extra">
		          <span class="wkn-cal-grid-item-extra" v-for="room in size_rooms" :key="room.id">
		            <input type="checkbox" class="wkn-cal-checkbox" :id="'extra-room-label-' + room.id" :disabled="!!room.pivot.is_included" :value="room.id" v-model="move_size_extra">
		            <label :for="'extra-room-label-' + room.id">{{room.display_name}}</label>
		          </span>
		        </span>
		      </div>
		    </div>
		    <button class="wkn-cal-but-next" v-on:click.prevent="submitForm()">Calculate</button>
		    <div class="wkn-cal-grid-container-bottom">
		      <div class="wkn-cal-grid-item-bottom">
		        <div class="wkn-cal-grid-container-ul">
		          <ul style="list-style-type:none;">
		            <li style="margin-bottom:10px;" v-if="selected_move_date_pretty"><b>Moving Date:</b><span>{{selected_move_date_pretty}}</span></li>
		            <li style="margin-bottom:10px;" v-if="selected_service_type"><b>Service:</b> <span>{{selected_service_type.display_name}}</span></li>
		            <li style="margin-bottom:10px;" v-if="form.from_formatted_address"><b>Zip From:</b> <span>{{form.from_formatted_address}}</span></li>
		            <li style="margin-bottom:10px;" v-if="form.to_formatted_address"><b>Zip To:</b> <span>{{form.to_formatted_address}}</span></li>
								<li style="margin-bottom:10px;" v-if="selected_move_size"><b>Moving Size:</b><span>{{selected_move_size.display_name}}</span></li>
		          </ul>
		        </div>
		      </div>
		      <div class="wkn-cal-grid-item-bottom">
		        <img src="/webapp/Calculator_Design/images/1.jpg" width="180px" height="auto"/>
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
		    </div>
		  </div>
		</div>

	</div>
</template>


<script>
	/* eslint-disable */
	import DatePicker from 'vue2-datepicker'
	import moment from '@/packages/Moment'
	import _ from 'lodash'
	import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

	export default {
		components: {DatePicker},
		data() {
			return {}
		},
		computed: {
			...mapState('CalcFormStore', {
					form: state => state.form,
					info: state => state.info,
					service_types: state => state.service_types,
					move_sizes: state => state.move_sizes,
					entrance_types: state => state.entrance_types,
					address: state => state.address,
					form_errors: state => state.form_errors,
				}
			),
			...mapGetters('CalcFormStore', {
				selected_move_date_pretty: 'selected_move_date_pretty',
				selected_service_type: 'selected_service_type',
				selected_move_size: 'selected_move_size',
				size_rooms: 'size_rooms',
				selected_rooms_pretty: 'selected_rooms_pretty',
			}),
			move_size_extra: {
				get: function () {
					return this.$store.state.CalcFormStore.form.move_size_extra
				},
				// сеттер:
				set: function (newValue) {
					this.ADD_MOVE_SIZE_EXTRA_VALUE(newValue)
				}
			}
		},
		methods: {
			...mapMutations('CalcFormStore', {
				CLEAR_FORM: 'CLEAR_FORM',
				CLEAR_FIELD: 'CLEAR_FIELD',
				ADD_MOVE_SIZE_EXTRA_VALUE: 'ADD_MOVE_SIZE_EXTRA_VALUE',
				UPD_ACTUAL_SIZE_EXTRA: 'UPD_ACTUAL_SIZE_EXTRA',
			}),
			...mapActions('CalcFormStore', {
				actionUpdateFormField: 'updateFormField',
				actionUpdateActualSizeExtra: 'updateActualSizeExtra',
				actionUpdateFormFieldFromZip: 'updateFormFieldFromZip',
				actionUpdateFormFieldToZip: 'updateFormFieldToZip',
				actionSubmitForm: 'submitForm',
			}),
			updateFormFieldDate: function(field, value)
			{
				let formatValue = moment(value).format("MM.DD.YYYY")
				this.updateFormField(field, formatValue)
			},
			updateFormFieldDebounce: _.debounce(function (field, value) {
				this.actionUpdateFormField({field: field, value: value})
			}, 1000),
			updateFormField: function (field, value) {
				return this.actionUpdateFormField({field: field, value: value})
			},
			updateFormFieldSize: function (field, value) {
				this.updateFormField(field, value).then(() => this.actionUpdateActualSizeExtra())
			},
			updateFormFieldFromZip:  _.debounce(function (field, value) {
				this.actionUpdateFormFieldFromZip({field: field, value: value})
			}, 1000),
			updateFormFieldToZip:  _.debounce(function (field, value) {
				this.actionUpdateFormFieldToZip({field: field, value: value})
			}, 1000),
			clearForm(){
				this.CLEAR_FORM()
			},
			submitForm() {
				this.actionSubmitForm().then(() => {
					this.$emit('complete')
				})
			}
		},
		created() {},
		mounted() {}
	}
</script>
