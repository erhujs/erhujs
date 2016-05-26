<template>
  <div class="c-network vbox">
    <div class="filter-bar">
      filter
    </div>
    <div class="data-grid network-log-grid" v-el:grid>
      <div class="header-container">
        <table class="header">
          <colgroup>
            <col :style="{width: it.width + 'px'}" v-for="it in columns">
            <col class="corner">
          </colgroup>
          <tbody>
            <tr>
              <th class="{{it.id}}-column sortable" v-for="it in columns">
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
          <colgroup>
            <col :style="{width: it.width + 'px'}" v-for="it in columns">
            <col class="corner">
          </colgroup>
          <tbody>
            <tr class="revealed" v-for="connection in connections" track-by="$index"
              :class="{odd: ($index % 2) === 0}">
              <td class="index-column">{{$index}}</td> 
              <td class="{{ct.id}}-column" v-for="ct in connection">
                <div class="">
                  {{ct.title}}
                  <div v-if="ct.sub" class="network-cell-subtitle">{{ct.sub}}</div>  
                </div>
              </td>
              <td class="corner"></td>
            </tr>
            <tr class="revealed data-grid-filler-row">
              <td class="{{it.id}}-column bottom-filler-td" v-for="it in columns">
              </td>
              <td class="corner bottom-filler-td"></td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="data-grid-resizer"
        v-for="it in columns"
        data-id="{{it.id}}"
        data-index="{{$index}}"
        :style="{left: it.left + 'px'}"
        @mousedown="onResizerMousedown"
        ></div>

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
  computed:{
    columnsLen () {
      return this.columns.length
    },
    tableWidth () {
      return this.$els.grid.offsetWidth
    },
    sumOfWeights () {
      let val = 0
      this.columns.forEach((item) => {
        val += item.weight
      })
      return val
    }
  },
  filters: {
    removeResizer (columns) {
      var col = columns
      col.pop()
      col.shift()
      return col
    }
  },
  created () {
  },
  ready () {
    this.setColumnsVisiblity()
  },
  methods: {
    setColumnsVisiblity () {
      var tableWidth = this.tableWidth - 24
      var sum = 0
      var lastOffset = 24

      this.columns.forEach((item, index) => {
        if(item.id === 'index'){
          item.width = 24
          item.left = 24  
          return
        }
        sum += item.weight

        var offset = (sum * tableWidth / this.sumOfWeights) | 0
        var width = (offset - lastOffset)
        
        item.left = offset
        item.width = width
        item.offset = offset
        lastOffset = offset
      })
    },
    handlerResizerChange (event) {
      var item = this.columns[this._resizerIndex]
      var lastItem = this.columns[this.columnsLen - 1]
      var dragPoint = event.clientX - item.offset
      if(item.width <= 24){
        event.preventDefault()
        return        
      }
      console.log(dragPoint, item.offset)

      item.width = item.width + dragPoint
      lastItem.width = lastItem.width - dragPoint
      item.offset = event.clientX

      event.preventDefault()
      this._positionResizers()
    },
    handleResizerMouseUp (event) {
      this._resizerId = null
      this._resizerIndex = null
      this.targetDocument.removeEventListener('mousemove', this.handlerResizerChange)
      this.targetDocument.removeEventListener('mouseup', this.handleResizerMouseUp)
    },
    onResizerMousedown (event) {
      var id = event.target.dataset.id
      var index = event.target.dataset.index
      
      if(index == 0){
        return 
      }
      this._resizerId = id
      this._resizerIndex = index
      this.targetDocument = event.target.ownerDocument
      this.targetDocument.addEventListener('mousemove', this.handlerResizerChange)
      this.targetDocument.addEventListener('mouseup', this.handleResizerMouseUp)
    },
    _positionResizers () {

    }
  }
}
</script>

<style lang="stylus">
.c-network
  overflow hidden
  flex 1
  .filter-bar
    display none


.vbox
  display flex
  flex-direction column !important
  position relative


.data-grid
  position relative
  border 1px solid #aaa
  font-size 11px
  line-height 120%
  table
    table-layout fixed
    border-spacing 0
    border-collapse separate
    height 100%
    width 100%
    &.data
      position absolute
      left 0
      top 0
      right 0
      bottom 0
      border-top 0 none transparent
      background-image linear-gradient(to bottom, white, white 50%, rgb(234, 243, 255) 50%, rgb(234, 243, 255))
      background-size 128px 32px
      table-layout fixed
      tr
        display none
        &:active
          color none
          background-color none
        &.revealed
          display table-row
  .header-container
    top 0
    height 17px
  .data-container
    top 17px
    bottom 0
    overflow-y overlay
    transform translateZ(0)
  &.inline
    .corner
      display none
    table
      &.data
        position static
  .corner
    width 14px
    padding-right 0
    padding-left 0
    border-left 0 none transparent !important
  td
    height 16px
    vertical-align top
    padding 1px 4px
    -webkit-user-select text
    &.editing
      & > div
        text-overflow clip
    &.disclosure
      &::before
        -webkit-user-select none
        -webkit-mask-image url(../assets/images/toolbarButtonGlyphs.png)
        -webkit-mask-position -4px -96px
        -webkit-mask-size 352px 168px
        float left
        width 8px
        height 12px
        margin-right 2px
        content "a"
        color transparent
        position relative
        top 1px
        background-color rgb(110, 110, 110)
  th
    height auto
    text-align left
    background-color #eee
    border-bottom 1px solid #aaa
    font-weight normal
    vertical-align middle
    padding 0 4px
    &.sortable
      position relative
      &:active
        background-color rgba(0, 0, 0, 0.15)
    .sort-order-icon-container
      position absolute
      top 1px
      right 0
      bottom 1px
      display flex
      align-items center
    .sort-order-icon
      margin-right 4px
      background-image url(../assets/images/toolbarButtonGlyphs.png)
      background-size 352px 168px
      opacity 0.5
      width 8px
      height 7px
      display none
    &.sort-ascending
      .sort-order-icon
        display block
        background-position -4px -111px
    &.sort-descending
      .sort-order-icon
        display block
        background-position -20px -99px
    &:hover
      background-color hsla(0, 0%, 90%, 1)
  .center
    text-align center
  .right
    text-align right
  button
    line-height 18px
    color inherit
  tr
    &:not(.parent)
      td
        &.disclosure
          &::before
            background-color transparent
    &.expanded
      td
        &.disclosure
          &::before
            -webkit-mask-position -20px -96px
    &.selected
      background-color rgb(212, 212, 212)
      color inherit
  &:focus
    tr
      &.selected
        background-color rgb(56, 121, 217)
        color white
        a
          color white
      &.parent
        &.selected
          td
            &.disclosure
              &::before
                background-color white
                -webkit-mask-position -4px -96px
      &.expanded
        &.selected
          td
            &.disclosure
              &::before
                background-color white
                -webkit-mask-position -20px -96px

.data-grid .header-container,
.data-grid .data-container
  position absolute
  left 0
  right 0
  overflow-x hidden

.data-grid.inline .header-container,
.data-grid.inline .data-container
  position static

.platform-mac .data-grid .corner,
.data-grid.data-grid-fits-viewport .corner
  display none

.data-grid .top-filler-td,
.data-grid .bottom-filler-td
  height auto !important
  padding 0 !important

.data-grid td,
.data-grid th
  white-space nowrap
  text-overflow ellipsis
  overflow hidden
  line-height 14px
  border-left 1px solid #aaa

.data-grid th:first-child,
.data-grid td:first-child
  border-left none !important

.data-grid td > div,
.data-grid th > div
  white-space nowrap
  text-overflow ellipsis
  overflow hidden

@media (-webkit-min-device-pixel-ratio: 1.5)
  .data-grid
    th
      .sort-order-icon
        background-image url(../assets/images/toolbarButtonGlyphs_2x.png)

@media (-webkit-min-device-pixel-ratio: 1.5)
  .data-grid
    tr
      &.parent
        td
          &.disclosure
            &::before
              -webkit-mask-image url(../assets/images/toolbarButtonGlyphs_2x.png)

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
      border-right none
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
    .index-column
      width 28px
      text-align center
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
    
.data-grid-resizer
  cursor col-resize
  position absolute
  top 0
  bottom 0
  width 5px
  z-index 500
  
</style>
