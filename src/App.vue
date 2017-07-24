<template>
  <div id="app">
    <router-view></router-view>
    <footer>
      <div class="footer-text text-center">
        <i class="fa fa-github" aria-hidden="true"></i>&nbsp;&nbsp;<a href="https://github.com/ICJIA/bijective-ls-demo">View on GitHub</a>
      </div>
    </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
.footer-text {font-size: 14px; margin-bottom: 30px}
</style>
