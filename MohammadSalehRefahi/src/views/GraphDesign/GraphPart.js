import Graph from 'react-graph-vis';
import React from 'react';
import gs from '../../components/ant/generalStyle.less';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import normalizeCss from 'normalize.css';
import s from './NationalCodeBehaviorAnalysis.css';
import ft from '@fortawesome/fontawesome-free/css/brands.min.css';
import jt from '@fortawesome/fontawesome-free/css/solid.min.css';
import vt from 'vis/dist/vis.css';
import nt from 'vis/dist/vis-network.min.css';

const fs = require('fs');

const FormItem = Form.Item;

class GraphPart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rendernull: false,
      network: 'test',
    };
    this.setNetworkInstance = this.setNetworkInstance.bind(this);
  }

  render() {
    const {
      intl,
      dir,
      data,
      height,
      nodeTypes,
      edgeTypes,
      selectNode,
      bankMap,
      aggregation,
    } = this.props;
    let nodesV = data.nodes;
    let edgesV = data.edges;
    let nodeNational = [];
    if (data.nodes) {
      // nodesV.map(node => delete node.label);
      nodesV = nodesV.map(node => ({ ...node, label: node.name }));
      nodesV = nodesV.map(node => ({
        ...node,
        shape: node.nodeType === 'BIC' ? 'circularImage' : 'icon',
      }));
      nodesV = nodesV.map(node => ({
        ...node,
        ...(node.nodeType !== 'BIC' && {
          icon: {
            face: '"Font Awesome 5 Free"',
            code:
              node.nodeType === 'IBAN'
                ? '\uf09d'
                : node.nodeType === 'NATIONALCODE'
                  ? '\uf007'
                  : '\uf1ad',
            size: 40,
            // color: node.nodeType === 'BIC' ? '#FFFF59' : '#12FF1F',
          },
        }),
      }));
      nodesV = nodesV.map(node=>{
        let image = null;
        if(node.nodeType === 'BIC')  {
            try {
              image= require(`../../../public/image/bank-logos/${node.id}.png`)
            } catch {
              image= require(`../../../public/image/bank-logos/BMJIIRTHXXX.png`)
            }
          }
        return {...node ,image: image ,title:  node.nodeType === 'BIC' ?bankMap[node.id] : node.title }


      });
      // console.log(nodesV,"nnnnnn")
      nodesV = nodesV.map(node => ({
        ...node,
        group: node.nodeType === 'NATIONALCODE' ? node.id : '',
      }));
      nodeNational = nodesV
        .filter(node => node.nodeType === 'NATIONALCODE')
        .map(nd => nd.id);
    }
    if (data.edges) {
      edgesV = edgesV.map(edge => ({ ...edge, id: edgesV.indexOf(edge) }));
      edgesV = edgesV.map(edge => ({
        ...edge,
        ...(edge.details === null && {
          details: {
            ...(edge.systemType === 'ACH' && {
              ACH: { count: edge.count, amount: edge.amount },
            }),
            ...(edge.systemType === 'RTGS' && {
              RTGS: { count: edge.count, amount: edge.amount },
            }),
          },
        }),
      }));
      if (edgeTypes === 'AGGREGATED_TR' || edgeTypes === 'TURNOVER') {
        edgesV = edgesV.map(edge => ({ ...edge, value: aggregation === "COUNT" ?edge.count: edge.amount }));
        edgesV = edgesV.map(edge => ({
          ...edge,
          title: `<div  style="width:100%; direction: rtl; text-align: center">
           <table border="1">
           <tbody>
           <tr>
           <td/>
           <td>${intl.formatMessage({ id: `keywords.COUNT` })}</td>
           <td>${intl.formatMessage({
             id: `page.nationalCodeBehaviourAnalysis.turnOver.sum`,
           })}</td>
                </tr>`.concat(
            `<tr>
                         <td>${intl.formatMessage({
                           id: `keywords.total`,
                         })}</td>
                           <td>${edge.count ? edge.count : 0}</td>
                        <td>${
                          edge.amount
                            ? edge.amount
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                            : 0
                        }</td>
              </tr>`,
            edge.details.ACH !== undefined
              ? `<tr>
                         <td>${intl.formatMessage({
                           id: `keywords.ACH`,
                         })}</td>
                           <td>${edge.details ? edge.details.ACH.count : 0}</td>
                        <td>${
                          edge.details
                            ? edge.details.ACH.amount
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                            : 0
                        }</td>
              </tr>`
              : `<br/>`,
            edge.details.RTGS !== undefined
              ? `<tr>
                <td>
                  ${intl.formatMessage({
                    id: `keywords.RTGS`,
                  })}
                </td>
                <td>${edge.details ? edge.details.RTGS.count : 0}</td>
                <td>
                  ${
                    edge.details
                      ? edge.details.RTGS.amount
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                      : 0
                  }
                </td>
              </tr>`
              : `<br/>`,
            `</tbody>
          </div>`,
          ),
        }));
      }
      if (edgeTypes === 'TRANSACTION') {
        edgesV = edgesV.map(edge => ({
          ...edge,
          title: `<div  style="width:100%; direction: rtl; text-align: center">
 <table border="1">
 <tbody>
 <tr>
         <td>${intl.formatMessage({ id: `keywords.date` })}</td>
                 <td>${
                   edge.date
                     ? intl.formatDate(edge.date, {
                         year: 'numeric',
                         month: '2-digit',
                         day: '2-digit',
                       })
                     : 0
                 }</td>
    </tr>
    <tr>
         <td>${intl.formatMessage({
           id: `keywords.${edge.systemType}`,
         })}</td>
              <td>${
                edge.amount
                  ? edge.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  : 0
              }</td>
    </tr>

    </tbody>
</div>`,
        }));
      }
      // edgesV.map(edge => delete edge.label);
      // edgesV.map(edge => ({ ...edge, smooth: true }));
      edgesV.forEach(edge => {
        if (edgeTypes === 'TURNOVER') {
          edgesV[edgesV.indexOf(edge)].arrows = {
            to: { enabled: false },
            from: { enabled: false },
            middle: { enabled: false },
          };
        }
      });
      edgesV.forEach(edge => {
        edge.edgeType === "HAS"
          ? delete edgesV[edgesV.indexOf(edge)].title
          : null;
        edge.edgeType === "HAS"
          ? (edgesV[edgesV.indexOf(edge)].arrows = {
            to: { enabled: false },
            from: { enabled: false },
            middle: { enabled: false },
          })
          : null;
      });
      edgesV.forEach(edge => {
        if (nodeNational.includes(edge.from)) {
          nodesV.forEach(node => {
            if (node.id === edge.to) {
              !(nodeTypes.includes('NATIONALCODE')&& nodeTypes.length===1)
                ? (nodesV[nodesV.indexOf(node)].group = edge.from)
                : null;
            }
          });
        }
      });
    }

    const graph = {
      nodes: data.nodes ? nodesV : [],
      edges: data.edges ? edgesV : [],
    };
    const groups = {};
    nodeNational.map(
      node =>
        (groups[node] = {
          icon: { color: `#${node.substr(node.length - 6, node.length)}` },
          color: `#${node.substr(node.length - 6, node.length)}`,
        }),
    );


    const options = {
      nodes: {
        font: {
          size: 12,
          face: 'Tahoma',
        },
        size: 25,
        color: {
          background: '#e6e6e6'
        }
      },
      layout: {
        hierarchical: false,
      },
      edges: {
        color: { inherit: true },
        width: 0.4,
        smooth: {
          roundness: 0.2,
          type: 'dynamic',
        },
        scaling: {
          max: 8,
        },
      },
      groups: { ...groups },
      // physics: {
      //   stabilization:{
      //     enabled : true,
      //     iterations:500,
      //   }
      //   barnesHut: {
      //     // gravitationalConstant: -2000,
      //     centralGravity: 0.4,
      //     springLength: 125,
      //     avoidOverlap: 0.3,
      //   },
      //   minVelocity: 0.75,
      // },
      interaction: {
        hover: true,
        tooltipDelay: 200,
      },
    };

    // console.log(graph, 'ggggggggggg');
    const events = {
      selectNode: event => {
        const { nodes, edges } = event;
        selectNode(nodes);
        // console.log(nodes, 'eeeeeeeeeeeee');
      },
      // deselectNode: event => {
      //   const { nodes, edges } = event;
      //   console.log(nodes, 'nnnndddddeoooeee');
      //   // DeselectNode(nodes);
      //   // console.log(event, 'eeeeeeeeeeeee');
      // },
    };
    if (this.state.rendernull === true) {
      this.setState({ rendernull: false });
      return <div />;
    }

    return (
      <div>
        <Graph
          getNetwork={this.setNetworkInstance}
          graph={graph}
          options={options}
          events={events}
          style={{ height }}
        />
        <Button  type="primary"   style={{float: dir === "rtl"? "left" : "right" , marginBottom: 5}} onClick={this.stopSimulation}>
          {}
          {intl.formatMessage({
          id: 'page.nationalCodeBehaviourAnalysis.stopSimulation',
        })}
        </Button>
      </div>
    );
  }
  setNetworkInstance = nw => {
    this.setState({ network: nw });
  };
  stopSimulation = () => {
    // this.state.network.setData(data);
    this.state.network.stopSimulation();
  };
  // clusterByColor = () => {
  //   // this.state.network.setData(data);
  //   const colors = ['orange', 'lime', 'DarkViolet'];
  //   let clusterOptionsByData;
  //   for (let i = 0; i < colors.length; i++) {
  //     var color = colors[i];
  //     clusterOptionsByData = {
  //       joinCondition(childOptions) {
  //         return childOptions.color.background == color; // the color is fully defined in the node.
  //       },
  //       processProperties(clusterOptions, childNodes, childEdges) {
  //         let totalMass = 0;
  //         for (let i = 0; i < childNodes.length; i++) {
  //           totalMass += childNodes[i].mass;
  //         }
  //         clusterOptions.mass = totalMass;
  //         return clusterOptions;
  //       },
  //       clusterNodeProperties: {
  //         id: `cluster:${color}`,
  //         borderWidth: 3,
  //         shape: 'database',
  //         color,
  //         label: `color:${color}`,
  //       },
  //     };
  //     network.cluster(clusterOptionsByData);
  //   }
  // };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.height !== prevProps.height) {
      this.setState({ rendernull: true });
    }
  }

  componentWillUnmount() {
    this.stopSimulation();
  }
}
export default withStyles(normalizeCss, s, gs, vt, nt, ft, jt)(GraphPart);
