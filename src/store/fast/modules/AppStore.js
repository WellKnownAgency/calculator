import axios from '@/packages/Axios'
//import moment from '@/packages/Moment'
import _ from 'lodash'

const state = {
	steps: [
		{
			name: 'MoveDateForm',
			display_name: 'Move Date',
			is_active: true,
			is_current: true
		},
		{
			name: 'MoveSizeForm',
			display_name: 'Move Size',
			is_active: false,
			is_current: false
		},
		{
			name: 'CustomerInfo',
			display_name: 'Customer Info',
			is_active: false,
			is_current: false
		}
	],
	is_loading: false,
	slide_step_name: null,
	styles: null,
}
const getters = {
	steps: state => state.steps,
	style: (state) => (name) => {
		return (state.styles && name in state.styles) ? state.styles[name] : null
	},
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
	START_LOADING(state) {
		state.is_loading = true
	},
	END_LOADING(state) {
		state.is_loading = false
	},
	NEXT_STEP(state) {
		state.slide_step_name = 'wkn-slide-next'
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
		//state.slide_step_name = 'wkn-slide-next'
	},
	PREV_STEP(state) {
		state.slide_step_name = 'wkn-slide-prev'
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
		//state.slide_step_name = 'wkn-slide-next'
	},
	SET_START_STEP(state) {
		for (let i in state.steps) {
			state.steps[i].is_current = false
			state.steps[i].is_active = false
		}
		state.steps[0].is_active = true
		state.steps[0].is_current = true
	},
	SET_STYLES (state, data) {
		state.styles = data
	}
}
const actions = {
	setApp({commit}) {
		axios.get('/')
		.then(response => {
			commit('SET_STYLES', response.data.styles)
			commit('CalcFormStore/SET_SERVICE_TYPES', {types: response.data.service_types}, {root: true})
			commit('CalcFormStore/SET_MOVE_SIZES', {sizes: response.data.move_sizes}, {root: true})
			commit('CalcFormStore/SET_ENTRANCE_TYPES', {types: response.data.entrance_types}, {root: true})
			commit('CustomerInfoStore/SET_PREFERRED_TIMES', {times: response.data.preferred_start_times}, {root: true})
			commit('CustomerInfoStore/SET_INFO_SOURCES', {sources: response.data.info_sources}, {root: true})
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
