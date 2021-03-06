import Vue from 'vue'
import Vuex from 'vuex'

import AppStore from './modules/AppStore'
import CalcFormStore from './modules/CalcFormStore'
import CustomerInfoStore from './modules/CustomerInfoStore'
import CalcResultStore from './modules/CalcResultStore'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
	modules: {
		AppStore,
		CalcFormStore,
		CustomerInfoStore,
		CalcResultStore,
	},
	strict: debug
})
