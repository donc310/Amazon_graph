<template>
  <div>
    <div class="graph-container"></div>
    <div>
      <graphsearch @showMenu="evt=>showMenu=evt" @categoryChange="evt=>searchCategory=evt"></graphsearch>
      <graphoverview
        :products="products"
        v-if="showOverview"
        @closeClick="handleCloseClick($event)"
        @productClicked="handleProductClick($event)"
        @closeDetail="closeDetails($event)"
      ></graphoverview>
      <graphdrawer v-if="showDrawer" @closeClick="handleCloseClick($event)"></graphdrawer>
      <graphdetail
        :product="selectedProduct"
        @closeDetail="closeDetails($event)"
        v-if="showDetails"
      ></graphdetail>
      <hover
        v-if="hover.showHover"
        :desc="hover.desc"
        :icon="hover.icon"
        :left="hover.left"
        :top="hover.top"
      ></hover>
      <graphmenu
        :showmenu="showMenu"
        @closeMenu="event=>showMenu=false"
        @countryChange="evt=>searchCountry=evt"
      ></graphmenu>
    </div>
  </div>
</template>
<script>
import * as Viva from "../../lib/vivagraph";
import HoverComponent from "../hover/hover";
import GraphOview from "./graph_overview";
import GraphDrawer from "./graph_drawer";
import GraphDetail from "./graph_detail";
import GraphSearch from "./graph_search";
import GraphMenu from "../menu/menu";
export default {
  components: {
    hover: HoverComponent,
    graphoverview: GraphOview,
    graphdrawer: GraphDrawer,
    graphdetail: GraphDetail,
    graphsearch: GraphSearch,
    graphmenu: GraphMenu
  },
  props: {},
  data() {
    return {
      graphData: [],
      testMode: true,
      nodeSize: 30,
      showDrawer: false,
      showOverview: false,
      showDetails: false,
      showMenu: false,
      searchCountry: "US",
      searchCategory: "All",
      selectedProduct: {},
      hover: {
        showHover: false,
        top: 0.0,
        left: 0.0,
        desc: "",
        icon: ""
      }
    };
  },
  created() {
    fetch("/data1.json")
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
      alert(JSON.stringify(event.el.clientY));
    },
    handleCloseClick(event) {
      if (event === "drawer") {
        this.showOverview = true;
        this.showDrawer = false;
      }
      if (event === "overview") {
        this.showDrawer = true;
        this.showOverview = false;
      }
    },
    Handlehover(event) {
      if (event.show) {
        this.hover.icon = event.node.data.URL;
        this.hover.desc = event.node.data.title;
        this.hover.top = event.el.clientY;
        this.hover.left = event.el.clientX;
        this.hover.showHover = true;
      } else {
        this.hover.showHover = false;
        this.hover.top = 0.0;
        this.hover.left = 0.0;
        this.hover.icon = "";
        this.hover.desc = "";
      }
    },
    handleProductClick(asin) {
      this.selectedProduct = this.graphData.find(data => {
        return data.asin === `${asin}`;
      });
      this.showOverview = false;
      this.showDetails = true;
    },
    closeDetails(event) {
      this.showDetails = false;
      this.showOverview = true;
    },
    renderGraph() {
      var vm = this;
      var graph = Viva.Graph.graph();
      var nodeSize = this.nodeSize;
      var highlightRelatedNodes = function(nodeId, isOn) {
        graph.forEachLinkedNode(nodeId, function(node, link) {
          var linkUI = graphics.getLinkUI(link.id);
          if (linkUI) {
            linkUI.attr("stroke", isOn ? "red" : "gray");
          }
        });
      };
      var nodes = this.nodes.map(node => {
        return node;
      }, 0);
      nodes.forEach((x, index) => {
        graph.addNode(index, x.data);
        if (x.nodes.length > 0) {
          let nodes = x.nodes.length > 3 ? x.nodes.slice(0, 2) : x.nodes;
          nodes.forEach(node => {
            graph.addLink(index, node);
          });
        }
      }, this);

      var graphics = Viva.Graph.View.svgGraphics();
      graphics
        .node(function(node) {
          var ui = Viva.Graph.svg("image")
            .attr("width", nodeSize)
            .attr("height", nodeSize)
            .link(node.data.URL);

          ui.addEventListener(
            "mouseover",
            function(event) {
              highlightRelatedNodes(node.id, true);
            },
            true
          );
          ui.addEventListener(
            "mouseout",
            function(event) {
              highlightRelatedNodes(node.id, false);
            },
            true
          );
          ui.addEventListener("mouseenter", event => {
            vm.Handlehover({ node: node, el: event, show: true });
          });
          ui.addEventListener("mouseleave", () => {
            vm.Handlehover({ show: false });
          });
          ui.addEventListener(
            "dblClick",
            function(event) {
              console.log("Double click on node: " + node.id);
            },
            false
          );
          ui.addEventListener(
            "click",
            function(event) {
              console.log(" click on node: " + node.id);
              vm.handleProductClick(node.data.asin);
            },
            true
          );

          return ui;
        })
        .placeNode(function(nodeUI, pos) {
          nodeUI
            .attr("x", pos.x - nodeSize / 2)
            .attr("y", pos.y + 200 - nodeSize / 2);
        });
      var createMarker = function(id) {
        return Viva.Graph.svg("marker")
          .attr("id", id)
          .attr("viewBox", "0 0 10 10")
          .attr("refX", "10")
          .attr("refY", "5")
          .attr("markerUnits", "strokeWidth")
          .attr("markerWidth", "10")
          .attr("markerHeight", "5")
          .attr("orient", "auto");
      };
      var marker = createMarker("Triangle");
      marker.append("path").attr("d", "M 0 0 L 10 5 L 0 10 z");
      var defs = graphics.getSvgRoot().append("defs");
      defs.append(marker);
      var geom = Viva.Graph.geom();
      graphics
        .link(function(link) {
          return Viva.Graph.svg("path")
            .attr("stroke", "gray")
            .attr("marker-end", "url(#Triangle)");
        })
        .placeLink(function(linkUI, fromPos, toPos) {
          var toNodeSize = nodeSize;
          var fromNodeSize = nodeSize;
          var from =
            geom.intersectRect(
              fromPos.x - fromNodeSize / 2, // left
              fromPos.y - fromNodeSize / 2, // top
              fromPos.x + fromNodeSize / 2, // right
              fromPos.y + fromNodeSize / 2, // bottom
              fromPos.x,
              fromPos.y,
              toPos.x,
              toPos.y
            ) || fromPos; // if no intersection found - return center of the node
          var to =
            geom.intersectRect(
              toPos.x - toNodeSize / 2, // left
              toPos.y - toNodeSize / 2, // top
              toPos.x + toNodeSize / 2, // right
              toPos.y + toNodeSize / 2, // bottom
              toPos.x,
              toPos.y,
              fromPos.x,
              fromPos.y
            ) || toPos; // if no intersection found - return center of the node
          var y1 = from.y + 200;
          var y2 = to.y + 200;
          var data = "M" + from.x + "," + y1 + "L" + to.x + "," + y2;

          linkUI.attr("d", data);
        });
      var renderer = Viva.Graph.View.renderer(graph, {
        interactive: "scroll drag ",
        graphics: graphics,
        container: document.getElementsByClassName("graph-container")[0]
      });
      renderer.run();
      this.graph = graph;
      this.renderer = renderer;
    }
  },
  computed: {
    dataArray() {
      return this.graphData;
    },
    products() {
      return this.dataArray;
    },
    nodes() {
      return this.dataArray.map(item => {
        let data = item.icon;
        data.asin = item.asin;
        data.title = item.title;
        return { nodes: item.browseNodes, data: data };
      }, 0);
    }
  },

  mounted() {
    var vm = this;
    setTimeout(() => {
      if (vm.dataArray.length > 0) vm.showOverview = true;
      vm.renderGraph();
    }, 2000);
  },
  ready: function() {
    if (vm.dataArray.length > 0) vm.showOverview = true;
    this.renderGraph();
  }
};
</script>
<style>
</style>


