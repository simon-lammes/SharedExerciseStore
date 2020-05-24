import {Component, ComponentInterface, h, State} from '@stencil/core';
import cytoscape, {NodeDataDefinition} from 'cytoscape';
import {standardGraphStyling} from '../../../utils/graph-configuration/standard-graph-styling';
import {standardGraphLayout} from '../../../utils/graph-configuration/standard-graph-layout';
import {ExerciseState, failure, success} from '../../../utils/flutter_interface';

@Component({
  tag: 'exercise-breadth-first-search',
  styleUrl: 'breadth-first-search.css',
  shadow: true,
})
export class BreadthFirstSearch implements ComponentInterface {
  networkContainer!: HTMLElement;
  solution = [1, 2, 5, 3, 6, 4];
  currentIndex = 0;
  @State() state: ExerciseState = 'active';

  componentDidLoad(): void {
    const cy = cytoscape({
      container: this.networkContainer,
      elements: [
        {
          data: {id: '1'}
        },
        {
          data: {id: '2'}
        },
        {
          data: {id: '3'}
        },
        {
          data: {id: '4'}
        },
        {
          data: {id: '5'}
        },
        {
          data: {id: '6'}
        },
        {
          data: {source: '1', target: '2'}
        },
        {
          data: {source: '1', target: '5'}
        },
        {
          data: {source: '3', target: '5'}
        },
        {
          data: {source: '2', target: '3'}
        },
        {
          data: {source: '2', target: '6'}
        },
        {
          data: {source: '5', target: '4'}
        }
      ],
      userZoomingEnabled: false,
      userPanningEnabled: false,
      zoomingEnabled: false,
      panningEnabled: false,
      style: standardGraphStyling,
      layout: standardGraphLayout
    });

    cy.on('tap', 'node', (evt) => {
      if (this.state !== 'active') {
        return;
      }
      const node = evt.target as NodeDataDefinition;
      const expectedId = this.solution[this.currentIndex++];
      // @ts-ignore
      const clickedId = node.id();
      const isAnswerRight = clickedId == expectedId.toString();
      if (isAnswerRight) {
        node.addClass('visited');
      } else {
        this.state = failure();
        node.addClass('wrong');
      }
      if (this.currentIndex === this.solution.length && isAnswerRight) {
        this.state = success();
      }
    });
  }

  render() {
    return (
      <exercise-frame class="exercise-frame" state={this.state}>
        <p slot="job-description">
          Your job is to traverse the following graph using the breadth-first-search algorithm.
          Click on the node that is traversed next until every node has been visited. Start with node 1. When there are
          multiple possible nodes to visit next, choose the node with the lowest number.
        </p>
        <p slot="explanation">
          As stated in the job description, the algorithm starts at node 1. Then it visits the direct neighbors of node
          1, namely
          2 and 5. It visits 2 first because as we said the node with the lowest number is visited first. After visiting
          all neighbors of
          node 1, it visits all neighbors of node 2 because this was the second node visited. We end up with the
          order: {this.solution.toLocaleString()}.
        </p>
        <div slot="exercise" class="container" ref={(el) => this.networkContainer = el as HTMLElement}>
        </div>
      </exercise-frame>
    );
  }
}
