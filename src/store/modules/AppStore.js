import axios from '@/packages/Axios'

const state = {
	steps: [
		{
			name: 'CalcForm',
			display_name: 'Calculator',
			is_active: true,
			is_current: true
		},
		{
			name: 'CustomerInfo',
			display_name: 'Customer info',
			is_active: false,
			is_current: false
		},
		{
			name: 'CalcResult',
			display_name: 'Calculator results',
			is_active: false,
			is_current: false
		},
		{
			name: 'Confirmation',
			display_name: 'Confirmation',
			is_active: false,
			is_current: false
		}
	],
	styles: {
		borderRadius: '6px'
	}
}

const getters = {
	steps: state => state.steps,
	styles: state => state.styles,
	next_step: () => {
		for (let i in state.steps) {
			if (state.steps[i].is_current)
				return state.steps[parseInt(i) + 1]
		}
	},
	prev_step: () => {
		for (let i in state.steps) {
			if (state.steps[i].is_current)
				return state.steps[parseInt(i) - 1]
		}
	},
	host: () => {
		let protocol = location.protocol
		let slashes = protocol.concat("//")
		return slashes.concat(window.location.hostname);
	}
}

const mutations = {
	NEXT_STEP (state) {
		let next_idx = 0
		for (let i in state.steps) {
			if (state.steps[i].is_current) {
				next_idx = parseInt(i) + 1
				if (next_idx < state.steps.length) {
					state.steps[i].is_current = false
					break
				}
				return
			}
		}
		state.steps[next_idx].is_active = true
		state.steps[next_idx].is_current = true
	},
	PREV_STEP (state) {
		let prev_idx = 0
		for (let i in state.steps) {
			if (state.steps[i].is_current) {
				prev_idx = parseInt(i) - 1
				if (prev_idx >= 0) {
					state.steps[i].is_current = false
					state.steps[i].is_active = false
					break
				}
				return
			}
		}
		state.steps[prev_idx].is_current = true
	},
	SET_START_STEP (state) {
		for (let i in state.steps) {
			state.steps[i].is_current = false
			state.steps[i].is_active = false
		}
		state.steps[0].is_active = true
		state.steps[0].is_current = true
	},
}

const actions = {
	setApp ({ commit }) {
		axios.get('/')
		.then(response => {
			commit('CalcFormStore/SET_SERVICE_TYPES', {types: response.data.service_types}, { root: true })
			commit('CalcFormStore/SET_MOVE_SIZES', {sizes: response.data.move_sizes}, { root: true })
			commit('CalcFormStore/SET_ENTRANCE_TYPES', {types: response.data.entrance_types}, { root: true })
			
			commit('CustomerInfoStore/SET_PREFERRED_TIMES', {times: response.data.preferred_start_times}, { root: true })
			commit('CustomerInfoStore/SET_INFO_SOURCES', {sources: response.data.info_sources}, { root: true })
		})
	},
}


export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}
