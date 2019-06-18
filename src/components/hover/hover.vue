<template>
  <div class="item-tooltip" :style="styling">
    <img :src="icon">
    <div class="tooltip-details">
      <h4>{{desc}}</h4>
      <div class="footer"></div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    left: { type: Number, default: 0.0 },
    top: { type: Number, default: 0.0 },
    icon: {
      type: String,
      default:
        "https://images-na.ssl-images-amazon.com/images/I/51U8P3hb09L.jpg"
    },
    desc: {
      type: String,
      default:
        "Graph Paper Notebook: 0.5 inch squares (100 pages, thin solid and dashed lines)"
    }
  },
  computed: {
    styling: function() {
      return {
        left: `${parseFloat(this.left)}px`,
        top: `${parseFloat(this.top)}px`
      };
    }
  }
};
</script>
<style>

</style>

