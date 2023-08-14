// p5LiveVideo example dashboard
// https://github.com/jht1493/p5VideoKit
//
let videoKit;

p5.disableFriendlyErrors = true; // disables FES to improve performance

function setup() {
  // Report startup time for debugging
  let lapse = window.performance.now() - a_start_now;
  console.log('setup lapse', lapse);

  // Lowest pixel density for performance
  pixelDensity(1);

  // Need some starting dimensions for canvas.
  // Will get adjusted by ui later in startup
  createCanvas(100, 100);

  // must call createCanvas before new p5VideoKit

  videoKit = new p5VideoKit(a_config);
}

function draw() {
  videoKit.draw();
}

let a_config = {
  // effects for import, will appear at top of the effect menu
  effects: [
    { label: 'a_example_props', import_path: 'effects/eff_a_example_props.js' },
    { label: 'a_my_example', import_path: 'effects/eff_a_my_example.js' },
    { label: 'a_slit_scan', import_path: 'effects/eff_a_slit_scan.js' },
    { label: 'live_gallery', import_path: 'effects/eff_live_gallery.js' },
    { label: 'live_tile_host', import_path: 'effects/eff_live_tile_host.js' },
    { label: 'maze_spin', import_path: 'effects/maze_spin/eff_maze_spin.js' },
    { label: 'movie_grid', import_path: 'effects/eff_movie_grid.js' },
    { label: 'ncell', import_path: 'effects/eff_ncell.js' },
    { label: 'shader_clamp', import_path: 'effects/eff_shader_clamp.js' },
    { label: 'shader_ripple', import_path: 'effects/eff_shader_ripple.js' },
    { label: 'skin_tone_main', import_path: 'effects/eff_skin_tone_main.js' },
  ],
  // settings for import, will appear in the settings menu
  settings: [
    { label: '2x2-maze-facemesh', import_path: 'settings/2x2-maze-facemesh.json' },
    { label: '2x2-maze-spin-alpha-2-line-truchet', import_path: 'settings/2x2-maze-spin-alpha-2-line-truchet.json' },
    { label: '2x2-maze-spin-cycle-0-1-2-alpha-30', import_path: 'settings/2x2-maze-spin-cycle-0-1-2-alpha-30.json' },
    { label: '2x2-maze-spin-cycle-0-1-2', import_path: 'settings/2x2-maze-spin-cycle-0-1-2.json' },
    { label: 'covid-ticker-2023', import_path: 'settings/covid-ticker-2023.json' },
    { label: 'delaunay-alpha-5', import_path: 'settings/delaunay-alpha-5.json' },
    { label: 'live-tile-3x6-face-mesh', import_path: 'settings/live-tile-3x6-face-mesh.json' },
    { label: 'maze-spin-QR', import_path: 'settings/maze-spin-QR.json' },
    { label: 'maze-spin-guest', import_path: 'settings/maze-spin-guest.json' },
    { label: 'maze-spin-truchet-hd-tight', import_path: 'settings/maze-spin-truchet-hd-tight.json' },
    { label: 'skin-tone-guest', import_path: 'settings/skin-tone-guest.json' },
    { label: 'skin-tone-main-qr', import_path: 'settings/skin-tone-main-qr.json' },
    { label: 'slit scan circle', import_path: 'settings/slit scan circle.json' },
    { label: 'test-pattern-maze_sping-truchet', import_path: 'settings/test-pattern-maze_sping-truchet.json' },
    { label: 'videoKit', import_path: 'settings/videoKit.json' },
  ],
};

// https://editor.p5js.org/shawn/sketches/jZQ64AMJc
// p5LiveMedia Test Video
// https://github.com/vanevery/p5LiveMedia
