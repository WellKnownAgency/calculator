<template>
	<div class="wkn-l-screen">
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
