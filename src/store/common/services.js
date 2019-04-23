const state = () => ({
	data: []
})


const mutations = {
	SET (state, data) {
		state.data = data
	},
}


const actions = {
	async get ({ commit }) {
		const data = await this.$axios.$get('service-types')
		commit('SET', data)
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
