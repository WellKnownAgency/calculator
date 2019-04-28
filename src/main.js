import Vue from 'vue'
import App from '@/App.vue'
import fastApp from '@/FastApp.vue'
import appStore from '@/store/app/store'
import fastStore from '@/store/fast/store'
import axios from '@/packages/Axios'

// app styles
import '@/assets/sass/app.scss'

// vueCustomElement
import 'document-register-element/build/document-register-element'
import vueCustomElement from 'vue-custom-element'

// google maps
import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
	load: {
		key: 'AIzaSyAVdu-gbERmXT6zn0f5Qh82pLNYulyDbuc',//'AIzaSyA-RjSZyHoV4rgFyBUGNsh-mnuFV5d7qu8',
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


Vue.config.productionTip = false
Vue.prototype.$prefix = 'wkn-app'

import { Layout } from 'bootstrap-vue/es/components';
import 'bootstrap/scss/bootstrap-grid.scss'
//import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(Layout);

import 'pretty-checkbox/src/pretty-checkbox.scss';

// Init Apps
Vue.use(vueCustomElement)
App.store = appStore
fastApp.store = fastStore

// Global Data
Vue.prototype.$gdata = {}
axios.get('/')
	.then(response => {
		Vue.prototype.$gdata.styles = response.data.styles
		Vue.prototype.$gdata.company_settings = response.data.company_settings
		Vue.prototype.$gdata.services = response.data.service_types
		Vue.prototype.$gdata.sizes = response.data.move_sizes
		Vue.prototype.$gdata.entrances = response.data.entrance_types
		Vue.prototype.$gdata.preferred_start_times = response.data.preferred_start_times
		Vue.prototype.$gdata.info_sources = response.data.info_sources
		
		Vue.customElement('widget-moving', App)
		Vue.customElement('fast-widget-moving', fastApp)
	})




