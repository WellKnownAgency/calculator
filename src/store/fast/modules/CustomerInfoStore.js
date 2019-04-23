import axios from '@/packages/Axios'
import Vue from "vue";

const state = {
	form: {
		first_name: null,
		last_name: null,
		phone: null,
		email: null,
		info_source_id: null
	},
	form_disabled_fields: [],
	form_errors: {},
	preferred_times: [],
	info_sources: [],
	loadings: []
}

const getters = {
	isDisabledFormField: (state) => (name) => {
		return state.form_disabled_fields.includes(name)
	},
	is_loading_field: (state) => (name) => {
		return state.loadings.includes(name)
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
		commit('ADD_LOADING_FIELD', field)
		let data = {}
		data[field] = value
		return axios.post('/fast/customer/validate-field', data)
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
	submitForm ({ commit, state, rootState }) {
		console.log(rootState)
		let MoveDateForm = rootState.MoveDateFormStore.form
		let MoveSizeForm = rootState.MoveSizeFormStore.form
		let customerForm = state.form
		let form = Object.assign({}, MoveDateForm, MoveSizeForm, customerForm)
		
		return axios.post('/fast/form', form)
		.then((response) => {
			commit('CLEAR_FORM_FIELDS_ERRORS')
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
