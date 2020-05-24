import {Component, ComponentInterface, getAssetPath, h, Host, Prop} from '@stencil/core';
import {ExerciseState, requestNextExercise} from '../../../utils/flutter_interface';

@Component({
  tag: 'exercise-frame',
  styleUrl: 'exercise-frame.css',
  assetsDirs: ['assets'],
  shadow: true,
})
export class ExerciseFrame implements ComponentInterface {
  @Prop() state: ExerciseState;

  componentDidLoad(): void {
    console.log(this.state);
  }

  requestNextExercise() {
    requestNextExercise();
  }

  render() {
    return (
      <Host>
        <slot name="job-description"/>
        {this.state === 'active' ? null : [
          <div class={'feedback-row ' + this.state}>
            <img class="feedback-image" src={getAssetPath(`./assets/${this.state}.svg`)} alt=""/>
            <slot name="explanation"/>
            <button onClick={this.requestNextExercise.bind(this)}>Next exercise</button>
          </div>
        ]}
        <slot name="exercise"/>
      </Host>
    );
  }

}
