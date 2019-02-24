import moment from '@/packages/Moment'

const state = {
	info: {
		full_time: null,
		travel_time: null,
		full_distance: null,
		travel_distance: null,
		price: null,
		estimated_quote: null,
		job_time: null,
		job_duration_from: null,
		job_duration_to: null,
		count_movers: null,
		movers_price_per_hour: null,
		job_distance: null,
		
		from_coordinates: null,
		to_coordinates: null,
	}
}

const getters = {
	estimated_quote (state) {
		if (state.info.estimated_quote && typeof state.info.estimated_quote == "object") {
			return state.info.estimated_quote[0] + '-' + state.info.estimated_quote[1]
		} else
			return state.info.estimated_quote
	},
	estimated_job_duration (state) {
		return moment.duration(state.info.job_duration_from, "seconds").format("h[H] m[m]", {trim: "small"}) +
							' - ' +
							moment.duration(state.info.job_duration_to, "seconds").format("h[H] m[m]", {trim: "small"})
	}
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
