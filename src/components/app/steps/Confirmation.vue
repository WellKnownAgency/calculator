<template>
	<l-screen>
		<template slot="body">
			<div class="wkn-confirmation">
				<p style="color: #ef3232;">Thank You for Booking with {{$gdata.company_settings.company_name}}! Your request has been succefully submitted!</p>
				<p  class="wkn-text-black">Our manager will get in touch with you as soon as possible! Please, give us an extra day if you completed the quote on the weekend.</p>
				<p style="color: #ef9514;">Be sure that you have checked junk and spam folders of your mailbox, so you are not missing an e-mails from us.</p>
				<div>
					<a class="wkn-btn-action" target="_blank" :href="cabinetUrl" style="text-decoration: none"><b>View Request</b></a>
				</div>
			</div>
		</template>
	</l-screen>
</template>

<script>
	import LScreen from "../layouts/Screen"

	export default {
		components: {LScreen},
		data() {
			return {
				cabinetUrl: null
			}
		},
		computed: {

		},
		methods: {},
		created() {
			this.cabinetUrl = process.env.VUE_APP_CUSTOMER_CABINET_URL
		}
	}
</script>
