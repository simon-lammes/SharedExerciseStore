import {Component, ComponentInterface, h, Host, State} from '@stencil/core';

@Component({
  tag: 'exercise-picker',
  styleUrl: 'exercise-picker.scss',
  shadow: true,
})
export class ExercisePicker implements ComponentInterface {
  @State()
  exercise: string;

  render() {
    // Determine which exercise is currently selected.
    let exercise;
    if (this.exercise === 'breadth-first-search') {
      exercise = (
        <exercise-breadth-first-search>
        </exercise-breadth-first-search>
      );
    } else if (this.exercise === 'minimum-number-of-edges-of-connected-graph') {
      exercise = (
        <exercise-minimum-number-of-edges-of-connected-graph>
        </exercise-minimum-number-of-edges-of-connected-graph>
      );
    } else if (this.exercise === 'test') {
      exercise = (
        <exercise-test>
        </exercise-test>
      );
    }
    // Render the select element and the currently selected exercise.
    return (
      <Host>
        <select onInput={e => this.onChange(e)}>
          <option disabled selected> -- select an exercise -- </option>
          <option value="breadth-first-search">Breadth First Search</option>
          <option value="minimum-number-of-edges-of-connected-graph">Minimum Number of Edges of Connected Graph</option>
          <option value="test">Test</option>
        </select>
        {exercise}
      </Host>
    );
  }

  private onChange(e: any) {
    this.exercise = e.target.value;
  }
}
