<template>
  <div class="contain">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>

<style lang="scss">
body {
  background: url("https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHw%3D&w=4000&q=80")
    no-repeat center top;
  float: left;
  width: 100%;
  height: 100%;
}
.contain {
  padding: 20px;
}
</style>
