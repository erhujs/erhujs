<template>
  <div class="c-request">
    <div>
      filter
    </div>
    <table class="req-table table-striped">
      <thead>
        <tr>
          <th class="req-th" v-for="it in reqHead">
            {{it.name}}
            <span class="icon icon-down-open-mini to-right"></span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="r in lists">
          <td>{{$index}}</td>
          <td>{{r.result}}</td>
          <td>{{r.protocol}}</td>
          <td>{{r.host}}</td>
          <td>{{r.url}}</td>
          <td>{{r.body}}</td>
          <td>{{r.caching}}</td>
          <td>{{r.contentType}}</td>
          <td>{{r.process}}</td>
          <td>{{r.comments}}</td>
          <td>{{r.custom}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import config from '../store/config.js'
import reqStore from '../store/req/store.js'

export default {
  name: 'c-request',
  props: {
  },
  data () {
    return {
      reqHead: config.reqHead
    }
  },
  store: reqStore,
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
.req-table
  .req-th
    position relative
    padding 2px 15px 2px 15px
  .to-right
    position absolute
    right 6px
</style>