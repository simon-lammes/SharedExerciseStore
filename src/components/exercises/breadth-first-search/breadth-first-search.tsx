import {Component, ComponentInterface, h, State} from '@stencil/core';
import cytoscape, {NodeDataDefinition} from 'cytoscape';
import {standardGraphStyling} from '../../../utils/graph-configuration/standard-graph-styling';
import {standardGraphLayout} from '../../../utils/graph-configuration/standard-graph-layout';
import {i18n} from 'i18next';
import 'i18next-wc';
import {ExerciseState} from '../../shared/exercise-frame/exercise-frame';
import {loadTranslations} from '../../../utils/translations';

/**
 * @tags graph_theory, mathematics
 * @languages english, german
 */
@Component({
  tag: 'exercise-breadth-first-search',
  styleUrl: 'breadth-first-search.scss',
  shadow: true,
  assetsDirs: ['locales/breadth-first-search']
})
export class BreadthFirstSearch implements ComponentInterface {
  i18n: i18n;
  networkContainer!: HTMLElement;
  solution = [1, 2, 5, 3, 6, 4];
  currentIndex = 0;
  @State() state: ExerciseState = 'active';

  async componentWillLoad(): Promise<void> {
    this.i18n = await loadTranslations('breadth-first-search');
  }

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
      const node = evt.target as NodeDataDefinition;
      // Ignore tap, if exercise is not active any more or the user has already visited node.
      if (this.state !== 'active' || node.hasClass('visited')) {
        return;
      }
      const expectedId = this.solution[this.currentIndex++];
      // @ts-ignore
      const clickedId = node.id();
      const isAnswerRight = clickedId == expectedId.toString();
      if (isAnswerRight) {
        node.addClass('visited');
      } else {
        this.state = 'failure';
        node.addClass('wrong');
      }
      if (this.currentIndex === this.solution.length && isAnswerRight) {
        this.state = 'success';
      }
    });
  }

  render() {
    return (
      <exercise-frame class="exercise-frame" state={this.state}>
        <p slot="job-description">
          <intl-message i18next={this.i18n} label="job.description">
          </intl-message>
        </p>
        <p slot="explanation">
          <intl-message i18next={this.i18n} label="job.explanation" value={this.solution.join(', ')}>
          </intl-message>
        </p>
        <div slot="exercise" class="network-container" ref={(el) => this.networkContainer = el as HTMLElement}>
        </div>
      </exercise-frame>
    );
  }
}
