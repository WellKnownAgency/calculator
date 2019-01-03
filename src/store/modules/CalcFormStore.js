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
		move_size_extra: [],
		from_entrance_type_id: null,
		to_entrance_type_id: null
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
	selected_move_date_pretty: (state) => {
		return state.form.move_date ? moment(state.form.move_date).format("MMMM D, YYYY") : null
	},
	selected_service_type: (state) => {
		let service_type = _.find(state.service_types, ['id', state.form.service_type_id])
		return service_type ? service_type : null
	},
	selected_move_size: (state) => {
		let move_size = _.find(state.move_sizes, ['id', state.form.move_size_id])
		return move_size ? move_size : null
	},
	size_rooms: (state, getters) => {
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
		.catch(() => {
			if (!value)
				commit('UPDATE_FORM_FIELD', {field: field, value: null})
		})
	},
	updateActualSizeExtra ({ state, getters }) {
		let selected_rooms = getters.selected_rooms
		state.form.move_size_extra = _.map(selected_rooms, 'id');
	}
}


export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}
