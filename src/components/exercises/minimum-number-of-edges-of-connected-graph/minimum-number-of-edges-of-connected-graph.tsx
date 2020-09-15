import {Component, ComponentInterface, h} from '@stencil/core';
import {i18n} from 'i18next';
import 'i18next-wc';
import {loadTranslations} from '../../../utils/translations';
import '@navsnpm/katex-expression/dist';

/**
 * @tags graph_theory, mathematics
 * @titles {"english": "Minimum Number of Edges of Connected Graph", "german": "Minimale Anzahl Kanten von einem Zusammenhängendem Graphen"}
 */
@Component({
  tag: 'exercise-minimum-number-of-edges-of-connected-graph',
  styleUrl: 'minimum-number-of-edges-of-connected-graph.scss',
  shadow: true,
  assetsDirs: ['locales/minimum-number-of-edges-of-connected-graph']
})
export class MinimumNumberOfEdgesOfConnectedGraph implements ComponentInterface {
  i18n: i18n;

  async componentWillLoad(): Promise<void> {
    this.i18n = await loadTranslations('minimum-number-of-edges-of-connected-graph');
  }

  render() {
    return (
      <exercise-number-prompt expectedNumber={8}>
        <p slot="job-description">
          <katex-expression
            expression={this.i18n.t('job.description')}
            katex-options='{ "displayMode": true , "throwOnError": true }'>
          </katex-expression>
        </p>
        <p slot="explanation">
          <katex-expression
            expression={this.i18n.t('job.explanation')}
            katex-options='{ "displayMode": true , "throwOnError": true }'>
          </katex-expression>
        </p>
        <p slot="prompt">
          <intl-message i18next={this.i18n} label="job.prompt">
          </intl-message>
        </p>
      </exercise-number-prompt>
    );
  }

}
