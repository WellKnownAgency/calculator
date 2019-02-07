<template>
	<div class="wkn-l-app">
		<div class="wkn-l-app__title">
			<slot name="title"></slot>
		</div>
		<div class="wkn-l-app__bar">
			<slot name="bar"></slot>
		</div>
		<div class="wkn-l-app__body">
			<slot name="body"></slot>
		</div>
	</div>
</template>
