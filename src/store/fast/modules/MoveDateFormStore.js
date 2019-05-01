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
		
		from_state: null,
		from_state_code: null,
		from_city: null,
		from_coordinates: {},
		
		to_state: null,
		to_state_code: null,
		to_city: null,
		to_coordinates: {},
		
	},
	geocode: {
		from_coordinates: null,
		to_coordinates: null,
	},
	form_disabled_fields: [],
	form_errors: {},
	loadings: []
}

const getters = {
	// FORM
	selected_move_date_pretty: (state) => {
		return (state.form.move_date && moment(state.form.move_date).isValid()) ? moment(state.form.move_date).format("MMMM D, YYYY") : null
	},
	selected_destination_date_pretty: (state) => {
		return (state.form.destination_date && moment(state.form.destination_date).isValid()) ? moment(state.form.destination_date).format("MMMM D, YYYY") : null
	},
	selected_service_type: (state) => {
		let service_type = _.find(state.service_types, ['id', state.form.service_type_id])
		return service_type ? service_type : null
	},
	getServiceTypeById: (state) => (id) => {
		let service_type = _.find(state.service_types, ['id', id])
		return service_type ? service_type.name : null
	},
	is_loading_field: (state) => (name) => {
		return state.loadings.includes(name)
	},
	isDisabledFormField: (state) => (name) => {
		return state.form_disabled_fields.includes(name)
	},
}

const mutations = {
	// FORM
	UPDATE_FORM_FIELD (state, {field, value}) {
		//console.log('dddddd1')
		state.form[field] = value
	},
	CLEAR_FIELD (state, field) {
		state.form[field] = null
	},
	
	UPDATE_GEOCODE (state, {property, value}) {
		state.geocode[property] = value
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
}

const actions = {
	updateFormField ({ commit }, {field, value}) {
		commit('UPDATE_FORM_FIELD', {field: field, value: value})
		let data = {}
		data[field] = value
		commit('ADD_LOADING_FIELD', field)
		return axios.post('/fast/move-date/validate-field', data)
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
		.finally(() => {
			commit('REMOVE_LOADING_FIELD', field)
		})
	},
	updateFormFieldZip ({ commit }, {field, value, direction}) {
		let data = {}
		data[field] = value
		commit('ADD_LOADING_FIELD', field)
		return axios.post('/fast/move-date/validate-field', data)
		.then((response) => {
			commit('SET_FORM_FIELD_ERRORS', {field: field, errors: null})
			
			commit('UPDATE_GEOCODE_FIELD', {field: direction + '_coordinates', value: response.data.geocode.coordinates})
			commit('UPDATE_FORM_FIELD', {field: direction + '_coordinates', value: response.data.geocode.coordinates})
			commit('UPDATE_FORM_FIELD', {field: direction + '_state', value: response.data.geocode.state})
			commit('UPDATE_FORM_FIELD', {field: direction + '_state_code', value: response.data.geocode.state_code})
			commit('UPDATE_FORM_FIELD', {field: direction + '_city', value: response.data.geocode.city})
			
			//commit('UPDATE_GEOCODE_FIELD', {field: direction + '_coordinates', value: response.data.geocode.coordinates})
			/*commit('CalcResultStore/UPDATE_INFO_PROPERTY', {property: direction + '_coordinates', value: response.data.geocode.coordinates}, { root: true })
			commit('CustomerInfoStore/UPDATE_FORM_FIELD', {field: direction + '_state', value: response.data.geocode.state}, { root: true })
			commit('CustomerInfoStore/UPDATE_FORM_FIELD', {field: direction + '_state_code', value: response.data.geocode.state_code}, { root: true })
			commit('CustomerInfoStore/UPDATE_FORM_FIELD', {field: direction + '_city', value: response.data.geocode.city}, { root: true })
			commit('UPDATE_INFO_FIELD', {field: direction + '_formatted_address', value: response.data.geocode.string})*/
			return Promise.resolve(response)
		})
		.catch((error) => {
			if (error.response.status === 422) {
				commit('SET_FORM_FIELD_ERRORS', {field: field, errors: error.response.data.errors[field]})
				
				
				commit('UPDATE_FORM_FIELD', {field: direction + '_coordinates', value: {}})
				commit('UPDATE_FORM_FIELD', {field: direction + '_state', value: null})
				commit('UPDATE_FORM_FIELD', {field: direction + '_state_code', value: null})
				commit('UPDATE_FORM_FIELD', {field: direction + '_city', value: null})
				/*commit('UPDATE_FORM_FIELD', {field: direction + '_coordinates', value: null})
				commit('CalcResultStore/UPDATE_INFO_PROPERTY', {property: direction + '_coordinates', value: null}, { root: true })
				commit('CustomerInfoStore/UPDATE_FORM_FIELD', {field: direction + '_state', value: null}, { root: true })
				commit('CustomerInfoStore/UPDATE_FORM_FIELD', {field: direction + '_state_code', value: null}, { root: true })
				commit('CustomerInfoStore/UPDATE_FORM_FIELD', {field: direction + '_city', value: null}, { root: true })
				commit('UPDATE_INFO_FIELD', {field: direction + '_formatted_address', value: null})*/
			}
			return Promise.reject(error)
		})
		.finally(() => {
			commit('REMOVE_LOADING_FIELD', field)
		})
	},
	updateFormFieldStorageDates ({ commit }, {moving, destination}) {
		commit('UPDATE_FORM_FIELD', {field: 'move_date', value: moving})
		commit('UPDATE_FORM_FIELD', {field: 'destination_date', value: destination})
		commit('ADD_LOADING_FIELD', 'destination_date')
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
		.finally(() => {
			commit('REMOVE_LOADING_FIELD', 'destination_date')
		})
	},
	changeServiceType ({ commit, rootState }) {
		axios.post('/fast/move-date/change-service-type',
			{
				from_coordinates: state.geocode.from_coordinates,
				to_coordinates: state.geocode.to_coordinates,
				service_type_id: state.form.service_type_id
			})
		.then((response) => {
			if ('service_type_id' in response.data) {
				console.log(response.data)
				commit('UPDATE_FORM_FIELD', {field: 'service_type_id', value: response.data.service_type_id})
				commit('SET_FORM_FIELD_ERRORS', {field: 'service_type_id', errors: null})
			}
		})
		.catch((error) => {
		
		})
	},
	submitForm ({ commit, state }) {
		return axios.post('/fast/move-date/form', state.form)
		.then((response) => {
			//commit('TRANSFER_COORDINATES')
			/*let from = state.geocode.from_coordinates !== null ? Object.assign({},state.geocode.from_coordinates) : null
			let to = state.geocode.to_coordinates !== null ? Object.assign({},state.geocode.to_coordinates) : null
			commit('UPDATE_GEOCODE', {property: 'from_coordinates', value: from})
			commit('UPDATE_GEOCODE', {property: 'to_coordinates', value: to})*/

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
