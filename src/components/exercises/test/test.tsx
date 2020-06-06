import {Component, ComponentInterface, h, State} from '@stencil/core';
import {ExerciseState, failure, success} from '../../../utils/flutter_interface';

@Component({
  tag: 'exercise-test',
  styleUrl: 'test.scss',
  shadow: true
})
export class Test implements ComponentInterface {
  @State() state: ExerciseState = 'active';

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
            This is a test exercise. When you click on success, this exercise simulates that the user answered correctly.
          </p>
        </div>
        <div slot="explanation">
          <p>
            The result of this test should be logged in the console.
          </p>
        </div>
        <div slot="exercise" class="buttons are-large">
          <button class="button is-success is-fullwidth" onClick={this.successButtonClicked.bind(this)}>Success</button>
          <button class="button is-danger is-fullwidth" onClick={this.failureButtonClicked.bind(this)}>Failure</button>
        </div>
      </exercise-frame>
    </div>;
  }
}
