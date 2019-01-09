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
		preferred_time_id: null,
		to_coordinates: null,
		to_address: null,
		to_city: null,
		to_state: null,
		info_source_id: null
	},
	form_errors: {},
	preferred_times: [],
	info_sources: [],
}

const getters = {}

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
}

const actions = {
	submitForm ({ commit, state, rootState }) {
		let calcForm = rootState.CalcFormStore.form
		let customerForm = state.form
		let form = Object.assign(calcForm, customerForm)
		
		return axios.post('/customer/form', form)
		.then((response) => {
			commit('CLEAR_FORM_FIELDS_ERRORS')
			commit('CalcResultStore/UPDATE_INFO_PROPERTY', {property: 'full_time', value: response.data.full_time}, { root: true })
			commit('CalcResultStore/UPDATE_INFO_PROPERTY', {property: 'travel_time', value: response.data.travel_time}, { root: true })
			commit('CalcResultStore/UPDATE_INFO_PROPERTY', {property: 'full_distance', value: response.data.full_distance}, { root: true })
			commit('CalcResultStore/UPDATE_INFO_PROPERTY', {property: 'travel_distance', value: response.data.travel_distance}, { root: true })
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
