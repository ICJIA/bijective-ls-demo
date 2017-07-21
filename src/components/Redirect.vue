<template>
  <div class="redirect">
    <div class="container top">
      <div class="row">
        <div class="col-md-12 text-center">
          <h2>Redirect page</h2>
            <ul>
              <li>Decode <span class="code">{{slug}}</span> from encoding alphabet.<br>(If alphabet changed from default, be sure to save it in a config.)</li>
              <li>Lookup decoded ID and full URL in database</li>
              <li>Redirect to full URL</li>
            </ul>
            <router-link to="/">&laquo;&nbsp;&nbsp;Try again</router-link>

        </div>

      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'redirect',
  props: {
       slug: {
           type: String,
           default: ''
       }
   },
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.top {margin-top: 30px;}
.code {background: #ccc; font-weight: 900; padding: 3px 10px}
ul li {margin-top: 20px;}
</style>
