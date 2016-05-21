<template>
  <div class="c-network">
    <div class="filter-bar">
      filter
    </div>
    <div class="data-grid network-log-grid">
      <div class="header-container">
        <table class="net-table table-striped">
          <colgroup></colgroup>
          <tbody>
            <tr>
              <th class="net-th" v-for="it in netHead">
                {{it.name}}
                <span class="icon icon-down-open-mini to-right"></span>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="data-container">
        <table class="net-table table-striped">
          <tbody>
            <tr v-for="r in lists">
              <td>{{$index}}</td>
              <td>{{r.result}}</td>
              <td>{{r.protocol}}</td>
              <td>{{r.host}}</td>
              <td>{{r.url}}</td>
              <td>{{r.body}}</td>
              <!-- <td>{{r.caching}}</td> -->
              <td>{{r.contentType}}</td>
              <!-- <td>{{r.process}}</td> -->
              <!-- <td>{{r.comments}}</td> -->
              <!-- <td>{{r.custom}}</td> -->
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import config from '../store/config.js'
import networkStore from '../store/network/store.js'

export default {
  name: 'c-network',
  props: {
  },
  data () {
    return {
      netHead: config.netHead
    }
  },
  store: networkStore,
  vuex: {
    getters:{
      lists: state => state.lists
    }
  },
  computed:{

  },
  methods: {
  }
}
</script>

<style lang="stylus">
.c-network
  .filter-bar
    display none
  .net-table
    .net-th
      position relative
      padding 2px 15px 2px 15px
    .to-right
      position absolute
      right 6px
</style>
