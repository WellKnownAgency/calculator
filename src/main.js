import Vue from 'vue'
import App from '@/App.vue'
import store from '@/store/store'

// app styles
import '@/assets/sass/app.scss'

// vueCustomElement
import 'document-register-element/build/document-register-element'
import vueCustomElement from 'vue-custom-element'

// google maps
import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
	load: {
		key: 'AIzaSyA-RjSZyHoV4rgFyBUGNsh-mnuFV5d7qu8',
		libraries: 'places', // This is required if you use the Autocomplete plugin
		// OR: libraries: 'places,drawing'
		// OR: libraries: 'places,drawing,visualization'
		// (as you require)
		
		//// If you want to set the version, you can do so:
		// v: '3.26',
	},
	
	//// If you intend to programmatically custom event listener code
	//// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
	//// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
	//// you might need to turn this on.
	// autobindAllEvents: false,
	
	//// If you want to manually install components, e.g.
	//// import {GmapMarker} from 'vue2-google-maps/src/components/marker'
	//// Vue.component('GmapMarker', GmapMarker)
	//// then disable the following:
	// installComponents: true,
})

// multiselect
import Multiselect from 'vue-multiselect'
Vue.component('multiselect', Multiselect)
import 'vue-multiselect/dist/vue-multiselect.min.css'

// http axios
//require('@/packages/Axios.js')
//import Axios from '@/packages/Axios'
//Vue.prototype.$http = Axios

Vue.config.productionTip = false
Vue.prototype.$prefix = 'wkn-app'

import { Layout } from 'bootstrap-vue/es/components';
import 'bootstrap/scss/bootstrap-grid.scss'
//import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(Layout);

import 'pretty-checkbox/src/pretty-checkbox.scss';

Vue.use(vueCustomElement)
App.store = store
Vue.customElement('widget-moving', App)
