<template>
  <div class="c-network">
    <div class="filter-bar">
      filter
    </div>
    <div class="data-grid network-log-grid" v-el:grid>
      <div class="header-container">
        <table class="header">
          <colgroup></colgroup>
          <tbody>
            <tr>
              <th class="{{it.id}}-column" v-for="it in columns">
                <div class="">
                  {{it.title}}
                  <div v-if="it.sub" class="header-subtitle">{{it.sub}}</div>  
                </div>
              </th>
              <th class="corner"></th>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="data-container">
        <table class="data">
          <tbody>
            <tr v-for="connection in connections" track-by="$index">
              <td>{{$index}}</td> 
              <td class="{{ct.id}}-column" v-for="ct in connection">
                <div class="">
                  {{ct.title}}
                  <div v-if="ct.sub" class="network-cell-subtitle">{{ct.sub}}</div>  
                </div>
              </td>
              <td class="corner"></td>
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
  store: networkStore,
  vuex: {
    getters:{
      columns: state => state.columns,
      connections: state => state.connections,
      columnsVisibility: state => state.columnsVisibility,
    }
  },
  ready () {
    console.log(this.$els.grid)
    console.log(this.headerTableColumns, this.tableWith)
    console.log(this.columnsVisibility, this.columns)
  },
  computed:{
    headerTableColumns () {
      return this.columns.length
    },
    tableWith () {
      return this.$els.grid.offsetWidth
    }
  },
  methods: {
  }
}
</script>

<style lang="stylus">
.c-network
  .filter-bar
    display none

.network-log-grid
  &.data-grid
    border none
    flex auto
    table
      &.data
        background transparent
    td
      line-height 17px
      height 41px
      border-left 1px solid #e1e1e1
      vertical-align middle
    &.small
      td
        height 21px
      .header-container
        height 27px
      .data-container
        top 27px
      .network-graph-side
        height 19px
      .n-icon
        content url(../assets/images/resourcePlainIconSmall.png)
        width 16px
        height 16px
        &.script
          content url(../assets/images/resourceDocumentIconSmall.png)
        &.document
          content url(../assets/images/resourceDocumentIconSmall.png)
        &.stylesheet
          content url(../assets/images/resourceDocumentIconSmall.png)
        &.media
          content url(../assets/images/resourcePlainIconSmall.png)
        &.texttrack
          content url(../assets/images/resourcePlainIconSmall.png)
        &.image
          background-image url(../assets/images/resourcePlainIconSmall.png)
          content ""
      .image-network-icon-preview
        top 2px
        bottom 1px
        left 3px
        right 3px
        max-width 8px
        max-height 11px
    th
      border-bottom 1px solid rgb(205, 205, 205)
      border-left 1px solid rgb(205, 205, 205)
      background white
      &.sortable
        &:active
          background-image none !important
    .header-container
      height 31px
    .data-container
      top 31px
      tr
        &:not(.data-grid-filler-row):not(.selected):hover
          background-color rgba(56, 121, 217, 0.1)
    select
      -webkit-appearance none
      background-color transparent
      border none
      width 100%
      color inherit
    .name-column
      cursor pointer
    .timeline-column
      padding 1px 0
      .sort-order-icon-container
        right 15px
        pointer-events none
    .n-icon
      content url(../assets/images/resourcePlainIcon.png)
      float left
      width 32px
      height 32px
      margin-top 1px
      margin-right 3px
      &.script
        content url(../assets/images/resourceJSIcon.png)
      &.document
        content url(../assets/images/resourceDocumentIcon.png)
      &.stylesheet
        content url(../assets/images/resourceCSSIcon.png)
      &.media
        content url(../assets/images/resourcePlainIcon.png)
      &.texttrack
        content url(../assets/images/resourcePlainIcon.png)
      &.image
        position relative
        background-image url(../assets/images/resourcePlainIcon.png)
        background-repeat no-repeat
        content ""
    .image-network-icon-preview
      position absolute
      margin auto
      top 3px
      bottom 4px
      left 5px
      right 5px
      max-width 18px
      max-height 21px
      min-width 1px
      min-height 1px
    .resources-dividers
      z-index 0
    .resources-dividers-label-bar
      background-color transparent
      border none
      height 30px
      pointer-events none
  .odd
    background #f5f5f5
  tr
    &.highlighted-row
      -webkit-animation network-row-highlight-fadeout 2s 0s
  .network-node-on-initiator-path
    background-color hsla(120, 68%, 54%, 0.2) !important
  .network-node-on-initiated-path
    background-color hsla(0, 68%, 54%, 0.2) !important

.network-summary-bar
  flex 0 0 19px
  padding-left 5px
  line-height 18px
  background-color #eee
  border-top 1px solid #ccc
  white-space nowrap
  text-overflow ellipsis
  overflow hidden
  label[is=dt-icon-label]
    margin-right 6px
  .summary-red
    color red
  .summary-blue
    color blue

.network-log-grid .network-navigation-row,
.network-log-grid .network-navigation-row.odd
  background #def


.network-log-grid.data-grid tr.selected,
.network-log-grid.data-grid tr.selected .network-cell-subtitle,
.network-log-grid.data-grid tr.selected .network-dim-cell
  color inherit !important

.network-log-grid.data-grid:focus tr.selected,
.network-log-grid.data-grid:focus tr.selected .network-cell-subtitle,
.network-log-grid.data-grid:focus tr.selected .network-dim-cell
  color white !important
  .network-header-subtitle
    color gray

.network-log-grid.data-grid.small .network-cell-subtitle,
.network-log-grid.data-grid.small .network-header-subtitle
  display none

.network-graph-side
  position relative
  height 39px
  padding 0
  white-space nowrap
  overflow hidden
  &:hover
    .network-graph-label
      visibility visible

.network-graph-bar-area
  position absolute
  top 0
  bottom 0

.network-graph-bar-area,
.network-timeline-grid .resources-dividers,
.network-timeline-grid .resources-event-dividers,
.network-timeline-grid .resources-dividers-label-bar
  right 12px
  left 12px

.network-timeline-grid
  position absolute
  top 0
  bottom 0
  left 0
  right 14px
  pointer-events none
  .resources-event-dividers
    margin-left 1px
  &.small
    .network-event-divider
      top 23px
    .resources-dividers-label-bar
      height 23px
      .resources-divider
        top 15px
  .resources-divider-label
    top 0
    margin-top -5px
  .resources-dividers-label-bar
    .resources-divider
      top 23px
      &:first-child
        background-color transparent
  .resources-divider
    &:first-child
      .resources-divider-label
        display none

.network-graph-label
  position absolute
  top 0
  bottom 0
  height 13px
  line-height 13px
  margin auto
  font-size 90%
  color rgba(0, 0, 0, 0.75)
  text-shadow rgba(255, 255, 255, 0.25) 1px 0 0, rgba(255, 255, 255, 0.25) -1px 0 0, rgba(255, 255, 255, 0.333) 0 1px 0, rgba(255, 255, 255, 0.25) 0 -1px 0
  z-index 150
  overflow hidden
  text-align center
  visibility hidden
  &:empty
    display none
  &.waiting
    margin-right 5px
  &.before
    color rgba(0, 0, 0, 0.7)
    text-shadow none
    text-align right
    margin-right -1px
    &::after
      padding-left 2px
      height 6px
      content url(../assets/images/graphLabelCalloutLeft.png)
  &.after
    color rgba(0, 0, 0, 0.7)
    text-shadow none
    text-align left
    margin-left -1px
    &::before
      padding-right 2px
      height 6px
      content url(../assets/images/graphLabelCalloutRight.png)

.small
  .network-graph-bar
    top 3px
    bottom 3px

.network-graph-bar
  position absolute
  top 13px
  bottom 13px
  min-width 3px
  &:not(.request-timing)
    border-width 1px
    border-style solid
    border-color hsl(0, 0%, 75%)
    background linear-gradient(0deg, hsl(0, 0%, 85%), hsl(0, 0%, 95%))
  &.waiting
    &:not(.request-timing)
      opacity 0.5
  &.request-timing
    &.receiving
      background-color #03A9F4
    &.waiting
      background-color #00C853
    &.connecting
      background-color #FF9800
    &.ssl
      background-color #9C27B0
    &.dns
      background-color #009688
    &.proxy
      background-color #A1887F
    &.blocking
      background-color #AAAAAA
  &.cached
    background hsl(0, 0%, 90%)
    &.document
      background hsl(215, 99%, 80%)
    &.stylesheet
      background hsl(99, 100%, 80%)
    &.image
      background hsl(272, 65%, 80%)
    &.media
      background hsl(272, 65%, 80%)
    &.font
      background hsl(8, 100%, 80%)
    &.texttrack
      background hsl(8, 100%, 80%)
    &.script
      background hsl(31, 100%, 80%)
    &.xhr
      background hsl(53, 100%, 80%)
    &.websocket
      background hsl(0, 0%, 80%)
  &.document
    border-color hsl(215, 49%, 60%)
    background linear-gradient(0deg, hsl(215, 72%, 65%), hsl(215, 100%, 80%))
  &.stylesheet
    border-color hsl(99, 34%, 60%)
    background linear-gradient(0deg, hsl(100, 50%, 65%), hsl(90, 50%, 80%))
  &.image
    border-color hsl(272, 31%, 60%)
    background linear-gradient(0deg, hsl(272, 46%, 65%), hsl(272, 64%, 80%))
  &.media
    border-color hsl(272, 31%, 60%)
    background linear-gradient(0deg, hsl(272, 46%, 65%), hsl(272, 64%, 80%))
  &.font
    border-color hsl(8, 49%, 60%)
    background linear-gradient(0deg, hsl(8, 72%, 65%), hsl(8, 100%, 80%))
  &.texttrack
    border-color hsl(8, 49%, 60%)
    background linear-gradient(0deg, hsl(8, 72%, 65%), hsl(8, 100%, 80%))
  &.script
    border-color hsl(31, 49%, 60%)
    background linear-gradient(0deg, hsl(31, 72%, 65%), hsl(31, 100%, 80%))
  &.xhr
    border-color hsl(53, 49%, 60%)
    background linear-gradient(0deg, hsl(53, 72%, 65%), hsl(53, 100%, 80%))
  &.websocket
    border-color hsl(0, 0%, 60%)
    background linear-gradient(0deg, hsl(0, 0%, 65%), hsl(0, 0%, 80%))

.network-graph-bar.request-timing.queueing,
.network-graph-bar.request-timing.total,
.network-graph-bar.request-timing.proxy,
.network-graph-bar.request-timing.dns,
.network-graph-bar.request-timing.ssl,
.network-graph-bar.request-timing.connecting,
.network-graph-bar.request-timing.blocking
  margin 3px 0

.network-graph-bar.request-timing.queueing,
.network-graph-bar.request-timing.total
  border solid 1px #AAAAAA

.network-dim-cell
  color grey

.network-event-divider
  position absolute
  width 1px
  margin-left -1px
  top 31px
  bottom 0
  z-index 300
  &.invisible
    visibility hidden

.network-red-divider
  background-color rgba(255, 0, 0, 0.5)

.network-blue-divider
  background-color rgba(0, 0, 255, 0.5)

.network-frame-divider
  width 2px
  background-color #FCCC49
  z-index 10
  visibility hidden

.network-frame-divider-selected
  visibility visible

.network-status-pane
  color #777
  background-color white
  z-index 500
  display flex
  justify-content center
  align-items center
  text-align center
  padding 0 20px
  overflow auto
  & > .recording-hint
    font-size 14px
    text-align center
    line-height 28px
</style>
