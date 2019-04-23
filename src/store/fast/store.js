import Vue from 'vue'
import Vuex from 'vuex'

import AppStore from './modules/AppStore'
import MoveDateFormStore from './modules/MoveDateFormStore'
import CustomerInfoStore from './modules/CustomerInfoStore'
import MoveSizeFormStore from './modules/MoveSizeFormStore'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
	modules: {
		AppStore,
		MoveDateFormStore,
		CustomerInfoStore,
		MoveSizeFormStore,
	},
	strict: debug
})
