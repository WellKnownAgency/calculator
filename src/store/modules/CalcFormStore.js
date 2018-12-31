//import Vue from "vue";
import axios from '@/packages/Axios'
import moment from '@/packages/Moment'
import _ from 'lodash'

const state = {
	form: {
		move_date: null,
		service_type_id: null,
		from_zip: null,
		to_zip: null,
		move_size_id: null,
		from_entrance_type_id: null,
		to_entrance_type_id: null
		
	},
	info: {
		move_date: {
			label: 'Move Date',
			value: null
		},
		moving_from: {
			label: 'Moving From',
			value: null
		},
		moving_to: {
			label: 'Moving To',
			value: null
		},
		move_size: {
			label: 'Size Of Move',
			value: null,
			extra: []
		}
	},
	address: {
		from: {
			lat: null,
			lng: null,
			zip: null
		},
		to: {
			lat: null,
			lng: null,
			zip: null
		}
	},
	service_types: [],
	move_sizes: [],
	entrance_types: []
}

const getters = {
	move_date_pretty: (state) => {
		return state.form.move_date ? moment(state.form.move_date).format("MMMM D, YYYY") : null
	},
	service_type: (state) => {
		let service_type = _.find(state.service_types, ['id', state.form.service_type_id])
		console.log(service_type)
		if (service_type && 'display_name' in service_type)
			return service_type.display_name
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
	UPDATE_FORM_FIELD (state, {field, value}) {
		Object.assign(state.form, { [field]: value })
	},
	UPDATE_INFO_FIELD (state, {field, value}) {
		if (field in state.info)
			state.info[field].value = value
	},
	CLEAR_FORM (state) {
		for (let i in state.form) {
			state.form[i] = null
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
		axios.post('/calculator/validate-field', {field: field, value: value})
		.then(() => {
			commit('UPDATE_FORM_FIELD', {field: field, value: value})
			commit('UPDATE_INFO_FIELD', {field: field, value: value})
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
