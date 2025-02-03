//
export class p5videoKit {
  //
  // let effects = [
  //   { label: 'example', import_path: 'module/eff_example', menu: 1 },

  constructor(config, p5_instance) {
    // console.log('p5videoKit p5_instance', p5_instance);
    // To work in p5 instance mode we need to use this.p5_instance on all p5 globals
    //
    this.room_name_prefix = '';
    // this.room_name_prefix = 'dev-';
    if (!p5_instance) {
      console.log('p5videoKit !!@ no p5_instance');
      return;
    }
    this.p5_instance = p5_instance;
    this.my_canvas = p5_instance._renderer;
    if (!this.my_canvas) {
      console.log('p5videoKit !!@ no my_canvas');
    }
  }

  async init(config) {
    //
    await this.setup(config);

    // Report startup lapse time
    let init_lapse = window.performance.now() - dice.startTime;
    dice.dapi('stats', { init_lapse });
  }

  // init_promise(options) {
  //   //
  //   let inpath = './core/a_main.js?v=403';
  //   return new Promise((resolve, reject) => {
  //     import(inpath)
  //       .then((module) => {
  //         // console.log('p5videoKit module', module);
  //         this.setup(options, resolve);
  //       })
  //       .catch((err) => {
  //         console.log('p5videoKit err', err, '\n inpath', inpath);
  //         reject();
  //       });
  //   });
  // }

  draw() {
    console.log('p5videoKit draw stub');
  }
}
// globalThis.p5videoKit = p5videoKit;

// --
