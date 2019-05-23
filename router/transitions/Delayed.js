/**
 * This transition used for test cases.  This probably shouldn't be used in production apps.
 */
export default class Delayed {
  getAnimationStyles() {
    return [null, null];
  }

  animate(callback) {
    setTimeout(callback, 1000);
  }
}
