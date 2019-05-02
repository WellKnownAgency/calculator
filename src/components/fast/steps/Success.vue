<template>

	<l-screen>
		<template slot="body">
			<b-row style="text-align: center; padding-bottom: 20px;">
				<b-col>
					<p class="wkn-text-black"><b>Thank You for Booking with {{$gdata.company_settings.company_name}}</b></p>
					<p class="wkn-text-black">Our manager will get in touch with you as soon as possible!</p>
					<p class="wkn-text-black">
						You always can reach our specialists at <br><a :href="'tel:' + $gdata.company_settings.company_phone" style="color: #b22525">{{formatPhone}}</a>
					</p>
					<a class="wkn-btn-action" target="_blank" :href="cabinetUrl" style="text-decoration: none">View account page</a>
				</b-col>
			</b-row>
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
			formatPhone() {
				return this.$gdata.company_settings.company_phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
			}
		},
		methods: {

		},
		created() {
			this.cabinetUrl = process.env.VUE_APP_CUSTOMER_CABINET_URL
		}
	}
</script>
