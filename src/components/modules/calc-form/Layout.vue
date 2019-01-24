<template>
	<div class="wkn-calc-form-layout">
		<div style="margin:10px 50px 0 50px; width: 100%">
			<div class="wkn-cal-main">
				<div class="wkn-cal-grid-container-top">
					<slot name="top"></slot>
				</div>
				<slot name="btn-next"></slot>
				<div class="wkn-cal-grid-container-bottom">
					<slot name="bottom"></slot>
				</div>
			</div>
		</div>
	</div>
</template>
