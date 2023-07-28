<template>
  <div id="app" class="main-container">
    <PageHeader class="header" />
    <router-view class="router-view" />
    <PageFooter />
  </div>
</template>

<script>

import PageFooter from './components/PageFooter.vue'
import PageHeader from './components/PageHeader.vue'

export default {
  name: 'App',
  mounted() {
    document.title = "tarot-bot-2";
  },
  data: () => ({
    //
  }),
  components: {
    PageHeader,
    PageFooter
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 100px;
  background-color: #161623;
  height: 100%;
  width: 100%;
}

.main-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
}

.router-view {
  flex-grow: 1;
  flex-shrink: 0; 
}

.text-white {
  color: #d2cfd2 !important;
}

.header {
  margin-bottom: 2%;
}

@import url('https://fonts.googleapis.com/css2?family=EB+Garamond&display=swap');

</style>
