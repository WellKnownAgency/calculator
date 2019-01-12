const state = {
	info: {
		full_time: null,
		travel_time: null,
		full_distance: null,
		travel_distance: null,
		price: null,
		price_new: null,
		job_time: null,
		job_time_new: null,
		count_movers: null,
	}
}

const getters = {

}

const mutations = {
	UPDATE_INFO_PROPERTY (state, {property, value}) {
		state.info[property] = value
	},
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
