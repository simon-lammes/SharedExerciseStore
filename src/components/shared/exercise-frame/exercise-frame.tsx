import {Component, ComponentInterface, Event, EventEmitter, getAssetPath, h, Host, Prop, Watch} from '@stencil/core';

/**
 * The states in which the exercise can be.
 *
 * active: The user is currently working on the exercise.
 *
 * success: The user has successfully finished the exercise.
 *
 * failure: The user has made an error while doing the exercise.
 */
export type ExerciseState = 'active' | 'success' | 'failure';

/**
 * Event that is fired when the state of an exercise changes.
 */
export interface StateChangedEvent {
  newState: ExerciseState;
}

/**
 * Event that is fired when the user is finished with an exercise and requests the next one.
 */
export interface NextExerciseRequestedEvent {
  /**
   * How much time the user has spent on this exercise. The time for reading the explanation is included.
   */
  elapsedTime: number;
}

@Component({
  tag: 'exercise-frame',
  styleUrl: 'exercise-frame.scss',
  assetsDirs: ['assets'],
  shadow: true,
})
export class ExerciseFrame implements ComponentInterface {
  @Prop() state: ExerciseState;
  @Event() stateChanged: EventEmitter<StateChangedEvent>;
  @Event() nextExerciseRequested: EventEmitter<NextExerciseRequestedEvent>;
  /**
   * The time when the user started the exercise.
   */
  startTime: number;

  @Watch('state')
  onStateChanged(newState: ExerciseState) {
    this.stateChanged.emit({
      newState,
    });
  }

  componentDidRender() {
    this.startTime = Date.now();
  }

  requestNextExercise() {
    this.nextExerciseRequested.emit({
      elapsedTime: Date.now() - this.startTime
    })
  }

  render() {
    return (
      <Host>
        <slot name="job-description"/>
        <slot name="exercise"/>
        {this.state === 'active' ? null : [
          <img class="feedback-image" src={getAssetPath(`./assets/${this.state}.svg`)} alt=""/>,
          <slot name="explanation"/>,
          <button class="button is-link margin-auto" onClick={() => this.requestNextExercise()}>Next exercise</button>
        ]}
      </Host>
    );
  }
}
