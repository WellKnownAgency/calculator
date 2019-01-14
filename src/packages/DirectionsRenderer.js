import {MapElementFactory} from 'vue2-google-maps'

export default MapElementFactory({
	name: 'directionsRenderer',
	ctr: () => google.maps.DirectionsRenderer,
	//// The following is optional, but necessary if the constructor takes multiple arguments
	//// e.g. for GroundOverlay
	// ctrArgs: (options, otherProps) => [options],
	events: ['directions_changed'],
	
	// Mapped Props will automatically set up
	//   this.$watch('propertyName', (v) => instance.setPropertyName(v))
	//
	// If you specify `twoWay`, then it also sets up:
	//   google.maps.event.addListener(instance, 'propertyName_changed', () => {
	//     this.$emit('propertyName_changed', instance.getPropertyName())
	//   })
	//
	// If you specify `noBind`, then neither will be set up. You should manually
	// create your watchers in `afterCreate()`.
	mappedProps: {
		routeIndex: { type: Number },
		options: { type: Object },
		panel: { },
		directions: { type: Object },
		//// If you have a property that comes with a `_changed` event,
		//// you can specify `twoWay` to automatically bind the event, e.g. Map's `zoom`:
		// zoom: {type: Number, twoWay: true}
	},
	// Any other properties you want to bind. Note: Must be in Object notation
	props: {},
	beforeCreate (options) {},
	afterCreate (directionsRendererInstance) {
		var directionsService = new google.maps.DirectionsService;
		directionsService.route({
			origin: this.$attrs.from,
			destination: this.$attrs.to,
			travelMode: 'DRIVING'
		}, function(response, status) {
			if (status === 'OK') {
				directionsRendererInstance.setDirections(response);
			} else {
				//window.alert('Directions request failed due to ' + status);
			}
		});
		//console.log(directionsRendererInstance)
	},
})
