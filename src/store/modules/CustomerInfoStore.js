import axios from '@/packages/Axios'
import Vue from "vue";

const state = {
	form: {
		first_name: null,
		last_name: null,
		phone: null,
		additional_phone: null,
		email: null,
		email_confirmation: null,
		from_coordinates: null,
		from_address: null,
		from_city: null,
		from_state: null,
		from_state_code: null,
		preferred_time_id: null,
		to_coordinates: null,
		to_address: null,
		to_city: null,
		to_state: null,
		to_state_code: null,
		info_source_id: null
	},
	form_disabled_fields: [],
	form_errors: {},
	preferred_times: [],
	info_sources: [],
}

const getters = {
	isDisabledFormField: (state) => (name) => {
		return state.form_disabled_fields.includes(name)
	},
}

const mutations = {
	SET_PREFERRED_TIMES (state, {times}) {
		state.preferred_times = times
	},
	SET_INFO_SOURCES (state, {sources}) {
		state.info_sources = sources
	},
	UPDATE_FORM_FIELD (state, {field, value}) {
		Object.assign(state.form, { [field]: value })
	},
	SET_FORM_FIELD_ERRORS (state, {field, errors}) {
		Vue.set(state.form_errors, field, errors)
	},
	CLEAR_FORM_FIELDS_ERRORS (state) {
		state.form_errors = {}
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
		return axios.post('/customer/validate-field', data)
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
	submitForm ({ commit, state, rootState }) {
		let calcForm = rootState.CalcFormStore.form
		let customerForm = state.form
		let additional = {
			from_coordinates: rootState.CalcFormStore.geocode.from_coordinates,
			to_coordinates: rootState.CalcFormStore.geocode.to_coordinates,
		}
		let form = Object.assign({}, calcForm, customerForm, additional)
		
		return axios.post('/customer/form', form)
		.then((response) => {
			commit('CLEAR_FORM_FIELDS_ERRORS')
			commit('CalcResultStore/UPDATE_INFO_PROPERTY', {property: 'full_time', value: response.data.full_time_format}, { root: true })
			commit('CalcResultStore/UPDATE_INFO_PROPERTY', {property: 'travel_time', value: response.data.travel_time}, { root: true })
			commit('CalcResultStore/UPDATE_INFO_PROPERTY', {property: 'full_distance', value: response.data.full_distance}, { root: true })
			commit('CalcResultStore/UPDATE_INFO_PROPERTY', {property: 'travel_distance', value: response.data.travel_distance}, { root: true })
			commit('CalcResultStore/UPDATE_INFO_PROPERTY', {property: 'price', value: response.data.price}, { root: true })
			commit('CalcResultStore/UPDATE_INFO_PROPERTY', {property: 'job_time', value: response.data.job_time}, { root: true })
			commit('CalcResultStore/UPDATE_INFO_PROPERTY', {property: 'count_movers', value: response.data.count_movers}, { root: true })
			commit('CalcResultStore/UPDATE_INFO_PROPERTY', {property: 'movers_price_per_hour', value: response.data.movers_price_per_hour}, { root: true })
			commit('CalcResultStore/UPDATE_INFO_PROPERTY', {property: 'job_distance', value: response.data.job_distance}, { root: true })
			
			commit('CalcResultStore/UPDATE_INFO_PROPERTY', {property: 'from_coordinates', value: response.data.from_coordinates}, { root: true })
			commit('CalcResultStore/UPDATE_INFO_PROPERTY', {property: 'to_coordinates', value: response.data.to_coordinates}, { root: true })
			
			//commit('CalcResultStore/UPDATE_INFO_PROPERTY', {property: 'price_new_v', value: response.data.price_new_v}, { root: true })
			//commit('CalcResultStore/UPDATE_INFO_PROPERTY', {property: 'job_time_new_v', value: response.data.job_time_new_v}, { root: true })
			return Promise.resolve(response)
		})
		.catch((error) => {
			if (error.response.status === 422) {
				commit('CLEAR_FORM_FIELDS_ERRORS')
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
