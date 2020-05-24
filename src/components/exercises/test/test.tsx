import {Component, ComponentInterface, h} from '@stencil/core';
import {ExerciseState, failure, success} from '../../../utils/flutter_interface';

@Component({
  tag: 'exercise-test',
  styleUrl: 'test.css',
  shadow: true
})
export class Test implements ComponentInterface {
  state: ExerciseState = 'active';

  render() {
    return <div>
      <span>Hello, World!</span>
      <button onClick={this.state = success.bind(this)}>Success</button>
      <button onClick={this.state = failure.bind(this)}>Failure</button>
    </div>;
  }
}
