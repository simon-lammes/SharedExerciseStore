import {Component, ComponentInterface, h, State} from '@stencil/core';
import 'i18next-wc';
import {ExerciseState} from '../../shared/exercise-frame/exercise-frame';
import {loadTranslations} from '../../../utils/translations';
import {i18n} from 'i18next';

/**
 * @tags test
 * @titles {"english": "Test", "german": "Test"}
 */
@Component({
  tag: 'exercise-test',
  styleUrl: 'test.scss',
  shadow: true,
  assetsDirs: ['locales/test']
})
export class Test implements ComponentInterface {
  i18n: i18n;
  @State() state: ExerciseState = 'active';

  async componentWillLoad(): Promise<void> {
    this.i18n = await loadTranslations('test');
  }

  render() {
    return <div>
      <exercise-frame state={this.state}>
        <div slot="job-description">
          <p>
            <intl-message i18next={this.i18n} label="job.description">
            </intl-message>
          </p>
        </div>
        <div slot="explanation">
          <p>
            <intl-message i18next={this.i18n} label="job.explanation">
            </intl-message>
          </p>
        </div>
        <div slot="exercise" class="buttons are-large">
          <button class="button is-success is-fullwidth" disabled={this.state !== 'active'}
                  onClick={() => this.state = 'success'}>
            <intl-message i18next={this.i18n} label="shared.success">
            </intl-message>
          </button>
          <button class="button is-danger is-fullwidth" disabled={this.state !== 'active'}
                  onClick={() => this.state = 'failure'}>
            <intl-message i18next={this.i18n} label="shared.failure">
            </intl-message>
          </button>
        </div>
      </exercise-frame>
    </div>;
  }
}
