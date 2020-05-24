declare const Failure;
declare const Success;
declare const RequestNextExercise;

export type ExerciseState = 'active' | 'success' | 'failure';

/**
 * Tells the flutter app that the user failed the exercise.
 */
export function failure(): ExerciseState {
  try {
    Failure.postMessage('');
  } catch (e) {
    console.log('failure');
  }
  return 'failure';
}

/**
 * Tells the flutter app that the user successfully finished the exercise.
 */
export function success(): ExerciseState {
  try {
    Success.postMessage('');
  } catch (e) {
    console.log('success');
  }
  return 'success';
}

/**
 * Tells the flutter app that the user is finished with this exercise and wants to see the next one.
 */
export function requestNextExercise() {
  try {
    RequestNextExercise.postMessage('');
  } catch (e) {
    console.log('next exercise requested');
  }
}
