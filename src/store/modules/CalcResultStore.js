const state = {
	info: {
		full_time: null,
		travel_time: null,
		full_distance: null,
		travel_distance: null,
		price: null,
		job_time: null,
		count_movers: null,
		movers_price_per_hour: null,
		job_distance: null,
		
		from_coordinates: null,
		to_coordinates: null,
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
