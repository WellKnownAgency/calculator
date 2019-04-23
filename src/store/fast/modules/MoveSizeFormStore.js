import moment from '@/packages/Moment'
import axios from '@/packages/Axios'
import Vue from 'vue'
import _ from "lodash";

const state = {
	form: {
		move_size_id: null,
		extra_rooms_ids: [],
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
	loadings: []
}

const getters = {
	selected_move_size: (state) => {
		let move_size = _.find(Vue.prototype.$gdata.sizes, ['id', state.form.move_size_id])
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
	is_selected_extra_room: (state, getters) => (name) => {
		let room = _.find(getters.selected_rooms, { 'name': name})
		return !!room
	},
	is_loading_field: (state) => (name) => {
		return state.loadings.includes(name)
	},
	isDisabledFormField: (state) => (name) => {
		return state.form_disabled_fields.includes(name)
	},
}

const mutations = {
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
	
	// FORM FIELDS LOADINGS
	ADD_LOADING_FIELD (state, field) {
		state.loadings.push(field)
	},
	REMOVE_LOADING_FIELD (state, field) {
		let idx = state.loadings.indexOf(field);
		
		if (idx > -1) {
			state.loadings.splice(idx, 1);
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
}

const actions = {
	updateFormField ({ commit }, {field, value}) {
		commit('UPDATE_FORM_FIELD', {field: field, value: value})
		let data = {}
		data[field] = value
		commit('ADD_LOADING_FIELD', field)
		return axios.post('/fast/move-size/validate-field', data)
		.then(() => {
			commit('SET_FORM_FIELD_ERRORS', {field: field, errors: null})
		})
		.catch((error) => {
			if (error.response.status === 422) {
				commit('SET_FORM_FIELD_ERRORS', {field: field, errors: error.response.data.errors[field]})
			}
		})
		.finally(() => {
			commit('REMOVE_LOADING_FIELD', field)
		})
	},
	updateActualSizeExtra ({ commit, getters }) {
		commit('UPDATE_ACTUAL_SIZE_EXTRA', {size_rooms: getters.size_rooms})
	},
	submitForm ({ commit, state, rootState }) {
		let service_type_id = rootState.MoveDateFormStore.form.service_type_id
		let data = Object.assign({}, state.form, {service_type_id: service_type_id})
		
		return axios.post('/fast/move-size/form', data)
		.then((response) => {
			//commit('TRANSFER_COORDINATES')
			/*let from = state.geocode.from_coordinates !== null ? Object.assign({},state.geocode.from_coordinates) : null
			let to = state.geocode.to_coordinates !== null ? Object.assign({},state.geocode.to_coordinates) : null
			commit('CustomerInfoStore/UPDATE_FORM_FIELD', {field: 'from_coordinates', value: from}, { root: true })
			commit('CustomerInfoStore/UPDATE_FORM_FIELD', {field: 'to_coordinates', value: to}, { root: true })*/
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
