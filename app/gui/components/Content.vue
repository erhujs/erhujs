<template>
  <div class="c-content">
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
    <div>
      <span>Content: <br>{{content}}</span>  
    </div>
  </div>
</template>

<script>

export default {
  name: 'c-content',
  props: {
    content: String
  },
  computed: {
  },
  data () {
    return {
      
    }
  },
  methods: {
    
  }
}
</script>

<style lang="stylus">

</style>