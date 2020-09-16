import {Component, ComponentInterface, h} from '@stencil/core';
import {loadTranslations} from '../../../utils/translations';
import 'i18next-wc';
import {i18n} from 'i18next';

/**
 * @tags statistics, mathematics
 * @languages english, german
 */
@Component({
  tag: 'exercise-modal-value',
  styleUrl: 'modal-value.scss',
  shadow: true,
  assetsDirs: ['locales/modal-value']
})
export class ModalValue implements ComponentInterface {
  i18n: i18n;

  async componentWillLoad(): Promise<void> {
    this.i18n = await loadTranslations('modal-value');
  }

  render() {
    return (
      <exercise-text-prompt possibleAnswers={this.i18n.t('job.possible-answers').split(',')}>
        <p slot="job-description">
          <intl-message i18next={this.i18n} label="job.description">
          </intl-message>
        </p>
        <p slot="prompt">
          <intl-message i18next={this.i18n} label="job.prompt">
          </intl-message>
        </p>
      </exercise-text-prompt>
    );
  }

}
