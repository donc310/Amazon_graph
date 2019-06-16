<template>
  <b-container>
    <b-row>
      <b-col md="8">
        <vivagraph :data="graphData" :isTesting="testMode" @nodeClick="info($event)"></vivagraph>
      </b-col>
      <b-col md="4">
        <div></div>
      </b-col>
    </b-row>
    <b-modal
      ref="graphmodal"
      header-bg-variant="info"
      header-text-variant="dark"
      body-bg-variant="light"
      body-text-variant="dark"
      footer-bg-variant="light"
      footer-text-variant="dark"
      :id="infoModal.id"
      :title="infoModal.title"
      @hide="resetInfoModal"
      ok-only
      centered
      scrollable
    >
      <pre>{{ infoModal.content }}</pre>
    </b-modal>
  </b-container>
</template>
<script>
import GraphComponent from "./vivagraph";
import Vue from "vue";
const vueVivaGraph = GraphComponent();
Vue.component("vivagraph", vueVivaGraph);
export default {
  props: {},
  data() {
    return {
      graphData: [],
      testMode: true,
      infoModal: {
        id: "graph-info-modal",
        title: "",
        content: ""
      }
    };
  },
  created() {
    fetch("/data.json")
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.graphData = data;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    handleClick(event) {
      alert(JSON.stringify(event));
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },
    info(event) {
      this.infoModal.type = 0;
      let view = this.graphData[event.id];
      this.infoModal.title = view.title;
      this.infoModal.content = JSON.stringify(view, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal.id, event.el.target);
    }
  }
};
</script>
<style>
svg {
  height: 100%;
  width: 100%;
}
</style>


