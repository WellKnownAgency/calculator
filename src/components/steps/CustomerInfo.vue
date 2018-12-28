<template>
	<div class="wkn-customer-info-form">
		<div class="wkn-customer-info-form__list">
			<div class="wkn-customer-info-form__col">
				<label for="first-name" class="wkn-form-label">Customer Info:</label>
				<div class="wkn-form-row">
					<input type="text" class="wkn-form-input" id="first-name" placeholder="First Name">
				</div>
				<div class="wkn-form-row">
					<input type="text" class="wkn-form-input" id="last-name" placeholder="Last Name">
				</div>
				<div class="wkn-form-row">
					<input type="text" class="wkn-form-input" id="phone" placeholder="Primary Phone">
				</div>
				<div class="wkn-form-row">
					<input type="text" class="wkn-form-input" id="additional-phone" placeholder="Additional Phone (Optional)">
				</div>
				<div class="wkn-form-row">
					<input type="text" class="wkn-form-input" id="email" placeholder="Email">
				</div>
				<div class="wkn-form-row">
					<input type="text" class="wkn-form-input" id="confirmation-email" placeholder="Confirm Email">
				</div>
			</div>

			<div class="wkn-customer-info-form__col">
				<label for="from-address" class="wkn-form-label">Moving From:</label>
				<div class="wkn-form-row">
					<input type="text" class="wkn-form-input" id="from-address" placeholder="From Address">
				</div>
				<div class="wkn-form-row">
					<input type="text" class="wkn-form-input" id="from-city" placeholder="From City">
				</div>
				<div class="wkn-form-row">
					<input type="text" class="wkn-form-input" id="from-state" placeholder="From State">
				</div>
				<div class="wkn-form-row">
					<input type="text" class="wkn-form-input" id="from-zip" placeholder="From Zip">
				</div>
				<div class="wkn-form-row">
					<label for="prefered-time" class="wkn-form-label">Preferred Start Time:</label>
				</div>
				<div class="wkn-form-row">
					<div class="wkn-form-group">
						<div class="wkn-form-field">
							<select id="prefered-time" class="wkn-form-input">
								<option v-for="time in preferred_times" :key="time" :value="time">{{time}}</option>
							</select>
						</div>
					</div>
				</div>
			</div>

			<div class="wkn-customer-info-form__col">
				<label for="to-address" class="wkn-form-label">Moving To:</label>
				<div class="wkn-form-row">
					<input type="text" class="wkn-form-input" id="to-address" placeholder="To Address">
				</div>
				<div class="wkn-form-row">
					<input type="text" class="wkn-form-input" id="to-city" placeholder="To City">
				</div>
				<div class="wkn-form-row">
					<input type="text" class="wkn-form-input" id="to-state" placeholder="To State">
				</div>
				<div class="wkn-form-row">
					<input type="text" class="wkn-form-input" id="to-zip" placeholder="To Zip">
				</div>
				<div class="wkn-form-row">
					<label for="info-source" class="wkn-form-label">How did you hear about us?</label>
				</div>
				<div class="wkn-form-row">
					<div class="wkn-form-group">
						<div class="wkn-form-field">
							<select id="info-source" class="wkn-form-input">
								<option v-for="source in info_sources" :key="source" :value="source">{{source}}</option>
							</select>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="wkn-form-row">
			<div class="wkn-calc-form-buttons">
				<div class="wkn-calc-form-buttons__item">
					<button type="button" class="wkn-btn-default" v-on:click.prevent="toBack()"><< Back to {{prev_step.display_name}}</button>
				</div>
				<div class="wkn-calc-form-buttons__item">
					<button type="button" class="wkn-btn-success" v-on:click.prevent="submit()">Go To {{next_step.display_name}}</button>
				</div>
			</div>
		</div>
	</div>
</template>


<script>
	import { mapGetters } from 'vuex'

	export default {
		data() {
			return {}
		},
		computed: {
			...mapGetters('CustomerInfoStore', [
				'preferred_times',
				'info_sources',
			]),
			...mapGetters('AppStore', [
				'next_step',
				'prev_step',
			])
		},
		methods: {
			toBack() {
				this.$emit('back')
			},
			submit() {
				this.$emit('complete')
			}
		},
		created() {

		}
	}
</script>
