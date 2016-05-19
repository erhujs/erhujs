<template>
  <div class="window">
    <c-header></c-header>
    <section class="window-content">
      <div class="pane pane-sm sidebar">
        <nav class="nav-group">
          <h5 class="nav-group-title">Favorites</h5>
          <a class="nav-group-item active">
            <span class="icon icon-home"></span>
            connors
          </a>
          <span class="nav-group-item">
            <span class="icon icon-download"></span>
            Downloads
          </span>
          <span class="nav-group-item">
            <span class="icon icon-folder"></span>
            Documents
          </span>
          <span class="nav-group-item">
            <span class="icon icon-signal"></span>
            AirPlay
          </span>
          <span class="nav-group-item">
            <span class="icon icon-print"></span>
            Applications
          </span>
          <span class="nav-group-item">
            <span class="icon icon-cloud"></span>
            Desktop
          </span>
        </nav>
      </div>
      <div class="pane">
        <table class="table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Kind</th>
              <th>File Size</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>photon.css</td>
              <td>CSS</td>
              <td>28K</td>
            </tr>
            <tr>
              <td>photon.css</td>
              <td>CSS</td>
              <td>28K</td>
            </tr>
            <tr>
              <td>photon.css</td>
              <td>CSS</td>
              <td>28K</td>
            </tr>
            <tr>
              <td>photon.css</td>
              <td>CSS</td>
              <td>28K</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="pane pane-sm">
        <ul class="list-group">
          <li class="list-group-header">
            <input class="form-control" type="text" placeholder="Search for someone">
          </li>
          <li class="list-group-item">
            <img class="img-circle media-object pull-left" src="http://photonkit.com/assets/img/avatar.jpg" width="32" height="32">
            <div class="media-body">
              <strong>List item title</strong>
              <p>Lorem ipsum dolor sit amet.</p>
            </div>
          </li>
          <li class="list-group-item">
            <img class="img-circle media-object pull-left" src="http://photonkit.com/assets/img/avatar2.png" width="32" height="32">
            <div class="media-body">
              <strong>List item title</strong>
              <p>Lorem ipsum dolor sit amet.</p>
            </div>
          </li>
        </ul>
      </div>
    </section>
    <c-footer></c-footer>
  </div>
</template>

<script>
import electron from 'electron'
import config from './config.js'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

const ipcRenderer = electron.ipcRenderer

export default {
  name: 'App',
  components: {
    'c-header': Header,
    'c-footer': Footer
  },
  props: {
  },
  computed: {
  },
  data () {
    return {
      reqList: [],
      panel: {
        left: 50,
        right: 50,
        minSize: 100
      },
      resContent: '',
      checked: false
    }
  },
  ready () {
    ipcRenderer.on('beforeRequest', (event, request) => {
      console.log(event, request)
      this.reqList.push({
        host: request.host,
        path: request.path,
        server: request.server
      })
    })
    ipcRenderer.on('response', (event, response) => {
      console.log(event, response)
      this.resContent = response.data.toString()
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
