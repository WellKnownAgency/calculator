import Vue from 'vue'
import Vuex from 'vuex'

import AppStore from './modules/AppStore'
import CalcFormStore from './modules/CalcFormStore'
import CustomerInfoStore from './modules/CustomerInfoStore'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
	modules: {
		AppStore,
		CalcFormStore,
		CustomerInfoStore
	},
	strict: debug
})
