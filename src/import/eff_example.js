// Example of simple effect show parameter in dashboard
//
export default class eff_example {
  static meta_props = {
    num: [0, 1, 2, 3],
    text: {
      message: 'Hello',
    },
  };
  constructor(props) {
    Object.assign(this, props);
  }
  prepareOutput() {
    // console.log('eff_example render');
  }
}
