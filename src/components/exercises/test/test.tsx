import {Component, ComponentInterface, h, State} from '@stencil/core';
import {ExerciseState, failure, success} from '../../../utils/flutter_interface';
import i18next from 'i18next';
import 'i18next-wc';
import {loadTranslations} from '../../../utils/translations';

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

  successButtonClicked() {
    this.state = success();
    console.log(this.state);
  }

  failureButtonClicked() {
    this.state = failure();
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
          <button class="button is-success is-fullwidth" onClick={this.successButtonClicked.bind(this)}>
            <intl-message i18next={i18next} label="shared.success">
            </intl-message>
          </button>
          <button class="button is-danger is-fullwidth" onClick={this.failureButtonClicked.bind(this)}>
            <intl-message i18next={i18next} label="shared.failure">
            </intl-message>
          </button>
        </div>
      </exercise-frame>
    </div>;
  }
}
