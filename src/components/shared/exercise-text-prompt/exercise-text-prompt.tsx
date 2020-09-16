import {Component, ComponentInterface, h, Prop, State} from '@stencil/core';
import {ExerciseState} from '../exercise-frame/exercise-frame';
import {loadTranslations} from '../../../utils/translations';
import 'i18next-wc';
import {i18n} from 'i18next';

@Component({
  tag: 'exercise-text-prompt',
  styleUrl: 'exercise-text-prompt.scss',
  shadow: true,
  assetsDirs: ['locales/text-prompt']
})
export class ExerciseTextPrompt implements ComponentInterface {
  readonly matchWhitespaceAndHyphenCharacters = /\s|-/g
  i18n: i18n;
  @Prop() possibleAnswers: string[];
  @State() state: ExerciseState = 'active';
  userInputValue: string = '';

  async componentWillLoad(): Promise<void> {
    this.i18n = await loadTranslations('text-prompt');
  }

  render() {
    return (
      <exercise-frame state={this.state}>
        <slot name="job-description" slot="job-description">
        </slot>
        <div slot="explanation" class="explanation">
          <slot name="explanation">
          </slot>
          <span>
              <intl-message i18next={this.i18n} label="possible-answers">
              </intl-message>:
            </span>
          {this.possibleAnswers.map(answer => (
            <span class="tag mx-1 my-1">
                {answer}
              </span>
          ))}
        </div>
        <div slot="exercise">
          <form onSubmit={(e) => this.onSubmit(e)} class="text-form">
            <div class="column">
              <slot name="prompt">
              </slot>
            </div>
            <label class="center mx-3 is-flex">
              <intl-message i18next={this.i18n} label="answer">
              </intl-message>
              <span class="pr-2">: </span>
              <input type="text" class="input is-primary" onInput={(event) => this.handleInput(event)}
                     disabled={this.state !== 'active'}/>
            </label>
            <button class="button center is-primary mx-3 my-3" disabled={this.state !== 'active'}>
              ▶
              <intl-message i18next={this.i18n} label="submit">
              </intl-message>
            </button>
          </form>
        </div>
      </exercise-frame>
    );
  }

  /**
   * Checks the correctness of the answer.
   */
  private onSubmit(e: Event) {
    e.preventDefault();
    // We ignore whitespaces and hyphenation for a simplicity. The user should not fail the exercise
    // because of wrong hyphenation or whitespaces.
    const cleanedUserInput = this.userInputValue.replace(this.matchWhitespaceAndHyphenCharacters, '').toLowerCase();
    console.log(cleanedUserInput);
    const isAnswerCorrect = this.possibleAnswers.some(possibleAnswer => possibleAnswer
      .replace(this.matchWhitespaceAndHyphenCharacters, '').toLowerCase() === cleanedUserInput);
    this.state = isAnswerCorrect ? 'success' : 'failure';
  }

  private handleInput(event) {
    this.userInputValue = event.target.value;
  }
}
