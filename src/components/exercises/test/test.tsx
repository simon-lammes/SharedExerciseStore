import {Component, ComponentInterface, h, State} from '@stencil/core';
import i18next from 'i18next';
import 'i18next-wc';
import {loadTranslations} from '../../../utils/translations';
import {ExerciseState} from '../../shared/exercise-frame/exercise-frame';

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
  @State() state: ExerciseState = 'active';

  componentWillLoad(): Promise<void> | void {
    return loadTranslations('test');
  }

  render() {
    return <div>
      <exercise-frame state={this.state}>
        <div slot="job-description">
          <p>
            <intl-message i18next={i18next} label="job.description">
            </intl-message>
          </p>
        </div>
        <div slot="explanation">
          <p>
            <intl-message i18next={i18next} label="job.explanation">
            </intl-message>
          </p>
        </div>
        <div slot="exercise" class="buttons are-large">
          <button class="button is-success is-fullwidth" disabled={this.state !== 'active'} onClick={() => this.state = 'success'}>
            <intl-message i18next={i18next} label="shared.success">
            </intl-message>
          </button>
          <button class="button is-danger is-fullwidth" disabled={this.state !== 'active'} onClick={() => this.state = 'failure'}>
            <intl-message i18next={i18next} label="shared.failure">
            </intl-message>
          </button>
        </div>
      </exercise-frame>
    </div>;
  }
}
