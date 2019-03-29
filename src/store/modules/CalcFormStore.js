import axios from '@/packages/Axios'
import moment from '@/packages/Moment'
import _ from 'lodash'
import Vue from 'vue'

const state = {
	form: {
		move_date: null,
		destination_date: null,
		service_type_id: null,
		from_zip: null,
		to_zip: null,
		move_size_id: null,
		extra_rooms_ids: [],
		//move_size_extra: [],
		from_entrance_type_id:  null,
		to_entrance_type_id: null,
	},
	form_disabled_fields: [],
	form_errors: {},
	info: {
		from_formatted_address: null,
		to_formatted_address: null,
	},
	info_hidden_properties: [],
	geocode: {
		from_coordinates: null,
		to_coordinates: null,
	},
	service_types: [],
	move_sizes: [],
	entrance_types: []
}

const getters = {
	// FORM
	selected_move_date_pretty: (state) => {
		return (state.form.move_date && moment(state.form.move_date).isValid()) ? moment(state.form.move_date).format("MMMM D, YYYY") : null
	},
	selected_destination_date_pretty: (state) => {
		return (state.form.destination_date && moment(state.form.destination_date).isValid()) ? moment(state.form.destination_date).format("MMMM D, YYYY") : null
	},
	selected_from_entrance_type: (state) => {
		let entrance_type = _.find(state.entrance_types, ['id', state.form.from_entrance_type_id])
		return entrance_type ? entrance_type : null
	},
	selected_to_entrance_type: (state) => {
		let entrance_type = _.find(state.entrance_types, ['id', state.form.to_entrance_type_id])
		return entrance_type ? entrance_type : null
	},
	selected_service_type: (state) => {
		let service_type = _.find(state.service_types, ['id', state.form.service_type_id])
		return service_type ? service_type : null
	},
	getServiceTypeById: (state) => (id) => {
		let service_type = _.find(state.service_types, ['id', id])
		return service_type ? service_type.name : null
	},
	selected_move_size: (state) => {
		let move_size = _.find(state.move_sizes, ['id', state.form.move_size_id])
		return move_size ? move_size : null
	},
	size_rooms: (state, getters) => {
		return  (getters.selected_move_size) ? getters.selected_move_size.rooms : []
	},
	selected_rooms: (state, getters) => {
		let selectedIds = state.form.extra_rooms_ids
		return _.filter(getters.size_rooms, function(item) {
			return _.includes(selectedIds, item['id'])
		})
	},
	selected_rooms_pretty: (state, getters) => {
		let selectedRoomsNames = _.map(getters.selected_rooms, 'display_name');
		let lengthRooms = selectedRoomsNames.length;
		if (lengthRooms > 1) {
			let lastRoom = selectedRoomsNames.pop();
			let stringRooms = selectedRoomsNames.join(', ')
			return stringRooms + ' and ' + lastRoom
		}
		return selectedRoomsNames.join(', ')
	},
	/*storage_date_value: (state) => {
		return [state.form.move_date, state.form.destination_date]
	},*/
	isDisabledFormField: (state) => (name) => {
		return state.form_disabled_fields.includes(name)
	},
	
	// INFO
	isHiddenInfoProperty: (state) => (name) => {
		return state.info_hidden_properties.includes(name)
	},
}

const mutations = {
	// FORM
	SET_SERVICE_TYPES (state, {types}) {
		state.service_types = types
	},
	SET_MOVE_SIZES (state, {sizes}) {
		state.move_sizes = sizes
	},
	SET_ENTRANCE_TYPES (state, {types}) {
		state.entrance_types = types
	},
	UPDATE_FORM_FIELD (state, {field, value}) {
		state.form[field] = value
	},
	CLEAR_FIELD (state, field) {
		state.form[field] = null
	},
	ADD_MOVE_SIZE_EXTRA_VALUE (state, value) {
		state.form.extra_rooms_ids = value
	},
	UPDATE_ACTUAL_SIZE_EXTRA (state, {size_rooms}) {
		state.form.extra_rooms_ids = [];
		for (let i in size_rooms) {
			if (size_rooms[i].pivot.is_included) {
				if (!state.form.extra_rooms_ids.includes(size_rooms[i].id))
					state.form.extra_rooms_ids.push(size_rooms[i].id)
			}
		}
	},
	
	// FORM FIELDS ERRORS
	SET_FORM_FIELD_ERRORS (state, {field, errors}) {
		Vue.set(state.form_errors, field, errors)
	},
	CLEAR_FORM_ERRORS (state) {
		for (let i in state.form_errors) {
			state.form_errors[i] = []
		}
	},
	
	// DISABLED FORM FIELDS
	ADD_DISABLED_FORM_FIELD (state, field) {
		state.form_disabled_fields.push(field)
	},
	CLEAR_DISABLED_FORM_FIELDS (state) {
		state.form_disabled_fields = []
	},
	
	// INFO
	UPDATE_INFO_FIELD (state, {field, value}) {
		if (field in state.info)
			state.info[field] = value
	},
	
	// HIDDEN INFO PROPERTIES
	ADD_HIDDEN_INFO_PROPERTY (state, field) {
		state.form_disabled_fields.push(field)
	},
	CLEAR_HIDDEN_INFO_PROPERTIES (state) {
		state.form_disabled_fields = []
	},
	
	// FORM & INFO
	CLEAR_FORM (state) {
		for (let i in state.form) {
			state.form[i] = null
		}
		for (let i in state.form_errors) {
			state.form_errors[i] = null
		}
		for (let i in state.info) {
			state.info[i] = null
		}
	},
	
	// GEOCODE
	UPDATE_GEOCODE_FIELD (state, {field, value}) {
		state.geocode[field] = value
	},
	/*TRANSFER_COORDINATES ({state, commit}) {
		commit('CalcResultStore/UPDATE_INFO_PROPERTY', {property: 'from_coordinates', value: state.geocode.from_coordinates}, { root: true })
		commit('CalcResultStore/UPDATE_INFO_PROPERTY', {property: 'to_coordinates', value: state.geocode.to_coordinates}, { root: true })
	}*/
}

const actions = {
	setCalcForm ({ commit }) {
		axios.get('/')
			.then(response => {
				commit('SET_SERVICE_TYPES', {types: response.data.service_types})
				commit('SET_MOVE_SIZES', {sizes: response.data.move_sizes})
				commit('SET_ENTRANCE_TYPES', {types: response.data.entrance_types})
			})
	},
	updateFormField ({ commit }, {field, value}) {
		commit('UPDATE_FORM_FIELD', {field: field, value: value})
		let data = {}
		data[field] = value
		return axios.post('/calculator/validate-field', data)
		.then(() => {
			commit('SET_FORM_FIELD_ERRORS', {field: field, errors: null})
		})
		.catch((error) => {
			/*(!value)
				? commit('UPDATE_FORM_FIELD', {field: field, value: null})
				: commit('UPDATE_FORM_FIELD', {field: field, value: value})*/
			if (error.response.status === 422) {
				commit('SET_FORM_FIELD_ERRORS', {field: field, errors: error.response.data.errors[field]})
			}
		})
	},
	updateFormFieldZip ({ commit }, {field, value, direction}) {
		let data = {}
		data[field] = value
		return axios.post('/calculator/validate-field', data)
		.then((response) => {
			commit('SET_FORM_FIELD_ERRORS', {field: field, errors: null})
			
			commit('UPDATE_GEOCODE_FIELD', {field: direction + '_coordinates', value: response.data.geocode.coordinates})
			commit('CalcResultStore/UPDATE_INFO_PROPERTY', {property: direction + '_coordinates', value: response.data.geocode.coordinates}, { root: true })
			commit('CustomerInfoStore/UPDATE_FORM_FIELD', {field: direction + '_state', value: response.data.geocode.state}, { root: true })
			commit('CustomerInfoStore/UPDATE_FORM_FIELD', {field: direction + '_state_code', value: response.data.geocode.state_code}, { root: true })
			commit('CustomerInfoStore/UPDATE_FORM_FIELD', {field: direction + '_city', value: response.data.geocode.city}, { root: true })
			commit('UPDATE_INFO_FIELD', {field: direction + '_formatted_address', value: response.data.geocode.string})
			return Promise.resolve(response)
		})
		.catch((error) => {
			if (error.response.status === 422) {
				commit('SET_FORM_FIELD_ERRORS', {field: field, errors: error.response.data.errors[field]})
				
				commit('UPDATE_FORM_FIELD', {field: direction + '_coordinates', value: null})
				commit('CalcResultStore/UPDATE_INFO_PROPERTY', {property: direction + '_coordinates', value: null}, { root: true })
				commit('CustomerInfoStore/UPDATE_FORM_FIELD', {field: direction + '_state', value: null}, { root: true })
				commit('CustomerInfoStore/UPDATE_FORM_FIELD', {field: direction + '_state_code', value: null}, { root: true })
				commit('CustomerInfoStore/UPDATE_FORM_FIELD', {field: direction + '_city', value: null}, { root: true })
				commit('UPDATE_INFO_FIELD', {field: direction + '_formatted_address', value: null})
			}
			return Promise.reject(error)
		})
	},
	updateFormFieldStorageDates ({ commit }, {moving, destination}) {
		commit('UPDATE_FORM_FIELD', {field: 'move_date', value: moving})
		commit('UPDATE_FORM_FIELD', {field: 'destination_date', value: destination})
		return axios.post('/calculator/validate-field/storage-dates', {move_date: moving, destination_date: destination})
		.then((response) => {
			commit('SET_FORM_FIELD_ERRORS', {field: 'move_date', errors: null})
			commit('SET_FORM_FIELD_ERRORS', {field: 'destination_date', errors: null})
		})
		.catch((error) => {
			if (error.response.status === 422) {
				commit('SET_FORM_FIELD_ERRORS', {field: 'move_date', errors: error.response.data.errors['move_date']})
				commit('SET_FORM_FIELD_ERRORS', {field: 'destination_date', errors: error.response.data.errors['move_date'].concat(error.response.data.errors['destination_date'])})
			}
		})
	},
	updateActualSizeExtra ({ commit, getters }) {
		commit('UPDATE_ACTUAL_SIZE_EXTRA', {size_rooms: getters.size_rooms})
	},
	changeServiceType ({ commit, rootState }) {
		axios.post('/calculator/change-service-type',
			{
				from_coordinates: rootState.CalcResultStore.info.from_coordinates,
				to_coordinates: rootState.CalcResultStore.info.to_coordinates,
				service_type_id: state.form.service_type_id
			})
		.then((response) => {
			if ('service_type_id' in response.data) {
				commit('UPDATE_FORM_FIELD', {field: 'service_type_id', value: response.data.service_type_id})
			}
		})
		.catch((error) => {
		
		})
	},
	submitForm ({ commit, state }) {
		return axios.post('/calculator/form', state.form)
		.then((response) => {
			//commit('TRANSFER_COORDINATES')
			let from = state.geocode.from_coordinates !== null ? Object.assign({},state.geocode.from_coordinates) : null
			let to = state.geocode.to_coordinates !== null ? Object.assign({},state.geocode.to_coordinates) : null
			commit('CustomerInfoStore/UPDATE_FORM_FIELD', {field: 'from_coordinates', value: from}, { root: true })
			commit('CustomerInfoStore/UPDATE_FORM_FIELD', {field: 'to_coordinates', value: to}, { root: true })
			//commit('CalcResultStore/UPDATE_INFO_PROPERTY', {property: 'from_coordinates', value: state.geocode.from_coordinates},
			return Promise.resolve(response)
		})
		.catch((error) => {
			if (error.response.status === 422) {
				commit('CLEAR_FORM_ERRORS')
				for (let field in error.response.data.errors) {
					commit('SET_FORM_FIELD_ERRORS', {field: field.replace('.value', ''), errors: error.response.data.errors[field]})
				}
			}
			return Promise.reject(error);
		})
	}
}


export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}
