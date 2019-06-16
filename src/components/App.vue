<template>
    <GraphComponent></GraphComponent>
</template>

<script>
import GraphComponent from "./graph/graph"
export default {
  name: 'app',
  components: {
    GraphComponent
  }
}
</script>

<style >
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
