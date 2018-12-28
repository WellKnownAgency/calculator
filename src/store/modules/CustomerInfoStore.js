const state = {
	preferred_times: [],
	info_sources: [],
}

const getters = {
	preferred_times: state => state.prefered_times,
	info_sources: state => state.info_sources,
}

const mutations = {
	SET_PREFERRED_TIMES (state, times) {
		state.prefered_times = times
	},
	SET_INFO_SOURCES (state, sources) {
		state.info_sources = sources
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
