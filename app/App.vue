<template>
	<div>
		<c-header></c-header>
		<c-menu></c-menu>
		<section class="container">
			<c-panel :width="panel.left">
				<ul class="req-list">
					<li>
						<c-item :req="reqHead" index="#"></c-item>
					</li>
					<li v-for="it in reqList">
						<c-item :req="it"></c-item>
					</li>
				</ul>
			</c-panel>
			<c-split></c-split>
			<c-panel :width="panel.right">
				<span>Content: <br>{{resContent}}</span>
			</c-panel>
		</section>
		<c-footer></c-footer>
		<mdl-checkbox :checked.sync="checked">Checkbox</mdl-checkbox>
		<mdl-button v-mdl-ripple-effect colored raised>Ripple Effect</mdl-button>
	</div>
</template>

<script>
import electron from 'electron'
import config from './config.js'
import Header from './components/Header.vue'
import Menu from './components/Menu.vue'
import Panel from './components/Panel.vue'
import Split from './components/Split.vue'
import Footer from './components/Footer.vue'
import Item from './components/Item.vue'

const ipcRenderer = electron.ipcRenderer
export default {
	name: 'App',
	components: {
		'c-header': Header,
		'c-menu': Menu,
		'c-split': Split,
		'c-panel': Panel,
		'c-footer': Footer,
		'c-item': Item,
	},
	props: {
	},
	computed: {
	},
	created () {
	},
	data () {
		return {
			reqHead: config.reqHead,
			reqList: [],
			panel: {
				left: 50,
				right: 50
			},
			resContent: '',
			checked: false
		}
	},
	ready () {
		ipcRenderer.on('connect', (event, req) => {
			this.reqList.push({
				host: req.host,
				path: req.path,
				server: req.server
			})
		})
		ipcRenderer.on('responseEnd', (event, req, res) => {
			this.resContent = res.data.toString()
		})
	},
	methods: {

	}
}
</script>

<style lang="stylus">
.req-list
	margin 0
	padding 0
	li
		list-style none
.container
	height 200px
	display flex
	border 1px solid #eee
</style>
