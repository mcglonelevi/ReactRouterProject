export default class Immediate {
  getAnimationStyles() {
    return [null, null];
  }

  animate(callback) {
    callback();
  }
}
