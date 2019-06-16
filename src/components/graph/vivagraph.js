
import * as Viva from '../../lib/vivagraph'
export default () => {
  return {
    name: 'Vivagraph',
    template: '<div></div>',
    render: function (h) {
      this.containerID = 'vivagraph-' + this._uid
      return h('div', {
        attrs: {
          id: this.containerID

        }
      })
    },
    props: {
      isTesting: { type: Boolean, default: true },
      data: { type: Array, default: [] },
    },
    data() {
      return {
        nodeSize: 24
      }
    },
    methods: {
      renderGraph() {
        var vm = this
        var graph = Viva.Graph.graph();
        var nodeSize = this.nodeSize
        var nodes = this.data.map((item) => { return { nodes: item.browseNodes, data: item.icon } }, 0)
        var highlightRelatedNodes = function (nodeId, isOn) {
          graph.forEachLinkedNode(nodeId, function (node, link) {
            var linkUI = graphics.getLinkUI(link.id);
            if (linkUI) {
              linkUI.attr('stroke', isOn ? 'red' : 'gray');
            }
          });
        };
        nodes.forEach((x, index) => {
          graph.addNode(index, x.data)
          if (x.nodes.length > 0) {
            let nodes = x.nodes.length > 6 ? x.nodes.slice(0, 5) : x.nodes
            nodes.forEach((node) => {
              graph.addLink(index, node);

            })
          }
        }, this)
        var graphics = Viva.Graph.View.svgGraphics();
        graphics.node(function (node) {
          var ui = Viva.Graph.svg('image')
            .attr('width', nodeSize)
            .attr('height', nodeSize)
            .link(node.data.URL)
          ui.addEventListener("mouseover", function () {
            highlightRelatedNodes(node.id, true);
          }, false);
          ui.addEventListener("mouseout", function () {
            highlightRelatedNodes(node.id, false);
          }, false)
          ui.addEventListener("click", function (event) {
            vm.$emit('nodeClick', { id: node.id, el: event })
          }, true)

          return ui
        }).placeNode(function (nodeUI, pos) {
          nodeUI.attr('x', pos.x - nodeSize / 2).attr('y', pos.y + 200 - nodeSize / 2)
        });
        var createMarker = function (id) {
          return Viva.Graph.svg('marker')
            .attr('id', id)
            .attr('viewBox', '0 0 10 10')
            .attr('refX', '10')
            .attr('refY', '5')
            .attr('markerUnits', 'strokeWidth')
            .attr('markerWidth', '10')
            .attr('markerHeight', '5')
            .attr('orient', 'auto')
        }
        var marker = createMarker('Triangle')
        marker.append('path').attr('d', 'M 0 0 L 10 5 L 0 10 z')
        var defs = graphics.getSvgRoot().append('defs')
        defs.append(marker)
        var geom = Viva.Graph.geom()
        graphics.link(function (link) {
          return Viva.Graph.svg('path')
            .attr('stroke', 'gray')
            .attr('marker-end', 'url(#Triangle)')
        }).placeLink(function (linkUI, fromPos, toPos) {
          var toNodeSize = nodeSize
          var fromNodeSize = nodeSize
          var from = geom.intersectRect(
            fromPos.x - fromNodeSize / 2, // left
            fromPos.y - fromNodeSize / 2, // top
            fromPos.x + fromNodeSize / 2, // right
            fromPos.y + fromNodeSize / 2, // bottom
            fromPos.x, fromPos.y, toPos.x, toPos.y) ||
            fromPos // if no intersection found - return center of the node
          var to = geom.intersectRect(
            toPos.x - toNodeSize / 2, // left
            toPos.y - toNodeSize / 2, // top
            toPos.x + toNodeSize / 2, // right
            toPos.y + toNodeSize / 2, // bottom
            toPos.x, toPos.y, fromPos.x, fromPos.y) ||
            toPos // if no intersection found - return center of the node
          var y1 = from.y + 200; var y2 = to.y + 200
          var data = 'M' + from.x + ',' + y1 +
            'L' + to.x + ',' + y2

          linkUI.attr('d', data)
        })
        var renderer = Viva.Graph.View.renderer(
          graph, {
            interactive: 'scroll drag ',
            graphics: graphics,
            container: document.getElementById(this.containerID)
          })
        renderer.run()
        this.graph = graph;
        this.renderer = renderer;


        this.re

      }
    },
    computed: {

    },
    created() {
    },
    mounted() {
      var vm = this;
      setTimeout(() => {
        vm.renderGraph()

      }, 3000)
    },
    deactivated() {

    },
    beforeDestroy() {

    },


  }

}
