import {Stylesheet} from 'cytoscape';

export const standardGraphStyling: Stylesheet[] = [
  {
    selector: 'node',
    style: {
      'background-color': '#666',
      'label': 'data(id)',
    },
  },
  {
    selector: 'node.visited',
    style: {
      'background-color': '#0600ba',
      'label': 'data(id)',
    },
  },
  {
    selector: 'node.wrong',
    style: {
      'background-color': '#ff0000',
      'label': 'data(id)',
    },
  },
  {
    selector: 'edge',
    style: {
      'width': 7,
      'line-color': '#ccc',
      'target-arrow-color': '#ccc',
      'target-arrow-shape': 'triangle',
      'curve-style': 'bezier'
    }
  }
];
