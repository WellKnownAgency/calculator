<template>
	<l-screen>
		<template slot="body">
			<div class="wkn-confirmation">
				<p style="color: #ef3232;">Thank You Booking with {{$gdata.company_settings.company_name}}! Your request has been succefully submitted!</p>
				<p>Our manager will get in touch with you as soon as possible! Please, give us an extra day if you completed the quote on the weekend.</p>
				<p style="color: #ef9514;">Be sure that you have checked junk and spam folders of your mailbox, so you are not missing an e-mails from us.</p>
				<p>To follow for your request status or make any changes regarding your move, please, use your request page.</p>
				<div>
					<a :href="cabinetUrl" target="_blank" class="wkn-btn-success" style="text-decoration: none">View account page</a>
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
