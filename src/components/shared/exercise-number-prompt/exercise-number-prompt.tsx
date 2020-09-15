import {Component, ComponentInterface, h, Host, Prop, State} from '@stencil/core';
import {ExerciseState} from '../exercise-frame/exercise-frame';
import 'i18next-wc';
import {loadTranslations} from '../../../utils/translations';
import {i18n} from 'i18next';

@Component({
  tag: 'exercise-number-prompt',
  styleUrl: 'exercise-number-prompt.scss',
  shadow: true,
  assetsDirs: ['locales/number-prompt']
})
export class ExerciseNumberPrompt implements ComponentInterface {
  i18n: i18n;
  @Prop() expectedNumber: number;
  @State() state: ExerciseState = 'active';
  numberValue: number;

  async componentWillLoad(): Promise<void> {
    this.i18n = await loadTranslations('number-prompt');
  }

  render() {
    return (
      <Host>
        <exercise-frame state={this.state}>
          <slot name="job-description" slot="job-description">
          </slot>
          <slot name="explanation" slot="explanation">
          </slot>
          <div slot="exercise">
            <form onSubmit={(e) => this.onSubmit(e)} class="columns">
              <div class="column">
                <slot name="prompt">
                </slot>
              </div>
              <label class="column center mx-3 is-flex">
                <intl-message i18next={this.i18n} label="answer">
                </intl-message><span class="pr-2">: </span>
                <input type="number" class="input is-primary" onInput={(event) => this.handleInput(event)} disabled={this.state !== 'active'}/>
              </label>
              <button class="button center is-primary column mx-3" disabled={this.state !== 'active'}>
                ▶
                <intl-message i18next={this.i18n} label="submit">
                </intl-message>
              </button>
            </form>
          </div>
        </exercise-frame>
      </Host>
    )
      ;
  }

  /**
   * Checks the correctness of the answer.
   */
  private onSubmit(e: Event) {
    e.preventDefault();
    this.state = this.numberValue === this.expectedNumber ? 'success' : 'failure';
  }

  private handleInput(event) {
    this.numberValue = +event.target.value;
  }
}
