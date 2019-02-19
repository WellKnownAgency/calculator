<template>
	<div class="wkn-l-screen">
		<div class="wkn-l-screen__spinner" v-if="is_loading">
			<spinner />
		</div>
		<div class="fulfilling-bouncing-circle-spinner">
			<div class="circle"></div>
			<div class="orbit"></div>
		</div>
		<div class="wkn-l-screen__body">
			<slot name="body"></slot>
		</div>
		<div class="wkn-l-screen__btn wkn-l-screen__btn--left">
			<slot name="btn-prev"></slot>
		</div>
		<div class="wkn-l-screen__btn wkn-l-screen__btn--right">
			<slot name="btn-next"></slot>
		</div>
	</div>
</template>


<script>
	import {mapState} from "vuex";
	import Spinner from '@/components/modules/common/bouncingCircleSpinner'

	export default {
		components: {Spinner},
		data() {
			return {}
		},
		computed: {
			...mapState("AppStore", {
				is_loading: state => state.is_loading,
			}),
		}
	}
</script>
