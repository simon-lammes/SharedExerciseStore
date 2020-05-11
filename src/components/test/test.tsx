import {Component, h} from '@stencil/core';
import {failure, success} from '../../utils/flutter_interface';

@Component({
  tag: 'exercise-test',
  styleUrl: 'test.css',
  shadow: true
})
export class Test {

  render() {
    return <div>
      <span>Hello, World!</span>
      <button onClick={success.bind(this)}>Success</button>
      <button onClick={failure.bind(this)}>Failure</button>
    </div>;
  }
}
