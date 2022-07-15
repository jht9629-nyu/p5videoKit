// const fs = require('fs-extra');
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

import { get_build_vers, build_ver_run, set_updateBuild } from './build_ver.js';

for (let index = 0; index < process.argv.length; index++) {
  // console.log(index, process.argv[index]);
  let val = process.argv[index];
  if (val == '--prod') {
    set_updateBuild(1);
  }
}

// const build_index = require('./build_index');
import build_webdb from './build_webdb.js';
import build_settings from './build_settings.js';
import build_effectMetas from './build_effectMetas.js';

// source files that will have ?v=<buildnumber> updated
const buildnum_files = ['./index.html', './videoKit/'];

const root_path = join(__dirname, '..');
const src_path = join(root_path, 'src');
const buildnum_path = join(src_path, 'build_ver.txt');
let build_ver = get_build_vers(buildnum_path);

const webdbPath = join(src_path, 'external/media/webdb');
const imagesOutPath = join(src_path, 'videoKit/let/a_images.js');
// build_webdb(webdbPath, imagesOutPath);

const settingMetasPath = join(src_path, 'videoKit/let/a_settingMetas.js');
const settingIndexPath = join(src_path, 'settings.html');
build_settings(src_path, 'settings', 'baked', settingMetasPath, settingIndexPath);

build_ver_run(buildnum_path, build_ver, src_path, buildnum_files);

// build_index(src_path, 'index.html', build_ver.next);

const effectMetasPath = join(src_path, 'videoKit/let/a_effectMetas.js');
build_effectMetas(effectMetasPath, src_path, 'videoKit');
