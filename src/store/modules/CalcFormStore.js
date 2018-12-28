const state = {
	form: {
		move_date: null
	},
	service_types: [],
	move_sizes: [],
	entrance_types: []
}

const getters = {
	form: state => state.form,
	service_types: state => state.service_types,
	move_sizes: state => state.move_sizes,
	entrance_types: state => state.entrance_types,
}

const mutations = {
	SET_SERVICE_TYPES (state, types) {
		state.service_types = types
	},
	SET_MOVE_SIZES (state, sizes) {
		state.move_sizes = sizes
	},
	SET_ENTRANCE_TYPES (state, types) {
		state.entrance_types = types
	},
	UPDATE_FORM_FIELD (state, {field, value}) {
		Object.assign(state.form, { [field]: value });
	},
	CLEAR_FORM (state) {
		for (let i in state.form) {
			state.form[i] = null
		}
	}
}

const actions = {

}


export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}
