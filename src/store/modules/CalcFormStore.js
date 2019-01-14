//import Vue from "vue";
import axios from '@/packages/Axios'
import moment from '@/packages/Moment'
import _ from 'lodash'
import Vue from 'vue'

const state = {
	form: {
		move_date: null,
		service_type_id: null,
		from_zip: null,
		to_zip: null,
		from_formatted_address: null,
		to_formatted_address: null,
		move_size_id: null,
		move_size_extra: [],
		from_entrance_type_id: null,
		to_entrance_type_id: null
	},
	form_errors: {},
	service_types: [],
	move_sizes: [],
	entrance_types: []
}

const getters = {
	selected_move_date_pretty: (state) => {
		return state.form.move_date ? moment(state.form.move_date).format("MMMM D, YYYY") : null
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
	selected_move_size: (state) => {
		let move_size = _.find(state.move_sizes, ['id', state.form.move_size_id])
		//console.log(move_size ? move_size.rooms : [])
		return move_size ? move_size : null
	},
	size_rooms: (state, getters) => {
		//console.log(getters.selected_move_size ? getters.selected_move_size.rooms : [])
		return  (getters.selected_move_size) ? getters.selected_move_size.rooms : []
	},
	selected_rooms: (state, getters) => {
		let selectedIds = state.form.move_size_extra
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
}

const mutations = {
	SET_SERVICE_TYPES (state, {types}) {
		state.service_types = types
	},
	SET_MOVE_SIZES (state, {sizes}) {
		state.move_sizes = sizes
	},
	SET_ENTRANCE_TYPES (state, {types}) {
		state.entrance_types = types
	},
	SET_ADDRESS_FROM (state, {string, staff, city}) {
		state.address.from.string = string
		state.address.from.staff = staff
		state.address.from.city = city
	},
	SET_ADDRESS_TO (state, {string, staff, city}) {
		state.address.to.string = string
		state.address.to.staff = staff
		state.address.to.city = city
	},
	UPDATE_FORM_FIELD (state, {field, value}) {
		Object.assign(state.form, { [field]: value })
	},
	/*UPDATE_INFO_FIELD (state, {field, value}) {
		if (field in state.info)
			state.info[field].value = value
	},*/
	CLEAR_FORM (state) {
		for (let i in state.form) {
			state.form[i] = null
		}
		for (let i in state.form_errors) {
			state.form_errors[i] = null
		}
		for (let i in state.address_pretty) {
			state.address_pretty[i] = null
		}
	},
	CLEAR_FIELD (state, field) {
		for (let i in state.form) {
			if (field in state.form) {
				state.form[i] = null
				break
			}
		}
	},
	ADD_MOVE_SIZE_EXTRA_VALUE (state, value) {
		state.form.move_size_extra = value
	},
	UPD_ACTUAL_SIZE_EXTRA (state) {
		let selectedIds = state.form.move_size_extra
		
		let selected_rooms = _.filter(getters.size_rooms, function(item) {
			return _.includes(selectedIds, item['id'])
		})
		state.form.move_size_extra = _.map(selected_rooms, 'id')
	},
	UPDATE_ACTUAL_SIZE_EXTRA (state, {size_rooms}) {
		state.form.move_size_extra = [];
		for (let i in size_rooms) {
			if (size_rooms[i].pivot.is_included) {
				if (!state.form.move_size_extra.includes(size_rooms[i].id))
					state.form.move_size_extra.push(size_rooms[i].id)
			}
		}
	},
	SET_FORM_FIELD_ERRORS (state, {field, errors}) {
		//console.log(field, errors)
		Vue.set(state.form_errors, field, errors)
	}
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
		let data = {}
		data[field] = value
		return axios.post('/calculator/validate-field', data)
		.then(() => {
			commit('SET_FORM_FIELD_ERRORS', {field: field, errors: null})
			commit('UPDATE_FORM_FIELD', {field: field, value: value})
			//commit('UPDATE_INFO_FIELD', {field: field, value: value})
		})
		.catch((error) => {
			(!value)
				? commit('UPDATE_FORM_FIELD', {field: field, value: null})
				: commit('UPDATE_FORM_FIELD', {field: field, value: value})
			if (error.response.status === 422) {
				commit('SET_FORM_FIELD_ERRORS', {field: field, errors: error.response.data.errors[field]})
			}
		})
	},
	updateFormFieldFromZip ({ commit }, {field, value}) {
		//commit('UPDATE_FORM_FIELD', {field: field, value: value})
		let data = {}
		data[field] = value
		return axios.post('/calculator/validate-field', data)
		.then((response) => {
			commit('SET_FORM_FIELD_ERRORS', {field: field, errors: null})
			//commit('UPDATE_FORM_FIELD', {field: field, value: value})
			
			commit('CalcResultStore/UPDATE_INFO_PROPERTY', {property: 'from_coordinates', value: response.data.geocode.coordinates}, { root: true })
			commit('CustomerInfoStore/UPDATE_FORM_FIELD', {field: 'from_state', value: response.data.geocode.state}, { root: true })
			commit('CustomerInfoStore/UPDATE_FORM_FIELD', {field: 'from_city', value: response.data.geocode.city}, { root: true })
			commit('UPDATE_FORM_FIELD', {field: 'from_formatted_address', value: response.data.geocode.string})
			return Promise.resolve(response)
		})
		.catch((error) => {
			/*(!value)
				? commit('UPDATE_FORM_FIELD', {field: field, value: null})
				: commit('UPDATE_FORM_FIELD', {field: field, value: value})*/
			if (error.response.status === 422) {
				commit('SET_FORM_FIELD_ERRORS', {field: field, errors: error.response.data.errors[field]})
				commit('CalcResultStore/UPDATE_INFO_PROPERTY', {property: 'from_coordinates', value: null}, { root: true })
				commit('CustomerInfoStore/UPDATE_FORM_FIELD', {field: 'from_state', value: null}, { root: true })
				commit('CustomerInfoStore/UPDATE_FORM_FIELD', {field: 'from_city', value: null}, { root: true })
				commit('UPDATE_FORM_FIELD', {field: 'from_formatted_address', value: null})
			}
			return Promise.reject(error)
		})
	},
	updateFormFieldToZip ({ commit }, {field, value}) {
		let data = {}
		data[field] = value
		return axios.post('/calculator/validate-field', data)
		.then((response) => {
			commit('SET_FORM_FIELD_ERRORS', {field: field, errors: null})
			//commit('UPDATE_FORM_FIELD', {field: field, value: value})
			
			commit('CalcResultStore/UPDATE_INFO_PROPERTY', {property: 'to_coordinates', value: response.data.geocode.coordinates}, { root: true })
			commit('CustomerInfoStore/UPDATE_FORM_FIELD', {field: 'to_state', value: response.data.geocode.state}, { root: true })
			commit('CustomerInfoStore/UPDATE_FORM_FIELD', {field: 'to_city', value: response.data.geocode.city}, { root: true })
			commit('UPDATE_FORM_FIELD', {field: 'to_formatted_address', value: response.data.geocode.string})
			return Promise.resolve(response)
		})
		.catch((error) => {
			/*(!value)
				? commit('UPDATE_FORM_FIELD', {field: field, value: null})
				: commit('UPDATE_FORM_FIELD', {field: field, value: value})*/
			if (error.response.status === 422) {
				commit('SET_FORM_FIELD_ERRORS', {field: field, errors: error.response.data.errors[field]})
				commit('CalcResultStore/UPDATE_INFO_PROPERTY', {property: 'to_coordinates', value: null}, { root: true })
				commit('CustomerInfoStore/UPDATE_FORM_FIELD', {field: 'to_state', value: null}, { root: true })
				commit('CustomerInfoStore/UPDATE_FORM_FIELD', {field: 'to_city', value: null}, { root: true })
				commit('UPDATE_FORM_FIELD', {field: 'to_formatted_address', value: null})
			}
			return Promise.reject(error)
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
				commit('UPDATE_FORM_FIELD', {field: 'service_type_id', value: response.data.service_type_id})
		})
		.catch((error) => {
		
		})
	},
	submitForm ({ commit }) {
		return axios.post('/calculator/form', state.form)
		.then((response) => {
			return Promise.resolve(response)
		})
		.catch((error) => {
			if (error.response.status === 422) {
				for (let field in error.response.data.errors) {
					commit('SET_FORM_FIELD_ERRORS', {field: field, errors: error.response.data.errors[field]})
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
