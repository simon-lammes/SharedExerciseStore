declare const Failure;

/**
 * Tells the flutter app that the user failed the exercise.
 */
export function failure() {
  try {
    Failure.postMessage('');
  } catch (e) {
    console.log('failure');
  }
}

declare const Success;

/**
 * Tells the flutter app that the user successfully finished the exercise.
 */
export function success() {
  try {
    Success.postMessage('');
  } catch (e) {
    console.log('success');
  }
}
