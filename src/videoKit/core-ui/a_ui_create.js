//
//
import { p5videoKit } from '../a/a_p5videoKit.js?v=413';

//
// import { a_ } from '../let/a_state.js?v=413';
// import { ui_canvas_div, toggleFullScreen } from '../core-ui/ui_canvas.js?v=413';
// import { ui_capture_size } from '../core-ui/ui_capture.js?v=413';
// import { ui_patch_bar, pad_layout_update } from '../core-ui/ui_patch_bar.js?v=413';
// import { ui_patch_eff_panes } from '../core-ui/ui_patch_eff.js?v=413';
// import { ui_patch_buttons } from '../core-ui/ui_patch_bar.js?v=413';
// import { ui_live_selection } from '../core-ui/ui_live.js?v=413';
// import { ui_chat_pane } from '../core-ui/ui_chat.js?v=413';
// import { store_restore_from } from '../core/store_url_parse.js?v=413';
// import { reset_video_clear_locals } from '../core/reset_video_clear_locals.js?v=413';
// import { patch_instances_clear_all } from '../a/patch_inst.js?v=413';
// import { ui_prop_set } from '../core-ui/ui_prop.js?v=413';
// import { ui_div_append, ui_createElement, ui_div_empty } from '../core-ui/ui_tools.js?v=413';

p5videoKit.prototype.ui_create = function () {
  console.log('ui_create this.a_.hide_ui_option', this.a_.hide_ui_option);
  this.a_.top_dash_div = this.ui_div_empty('id_top_dash');
  if (this.a_.hide_ui_option) {
    this.a_.top_dash_div.style('display:none');
  }
  this.ui_top_pane();
  this.ui_size_pane();
  this.ui_patch_bar();
  this.ui_create_comment_field();
  this.ui_createElement('br');

  this.ui_patch_eff_panes();
  this.ui_patch_buttons();
  this.ui_createElement('br');

  this.ui_live_selection();
  this.ui_chat_pane();
  this.ui_createElement('br');

  this.a_.top_dash_div = null;
};

p5videoKit.prototype.ui_top_pane = function () {
  let div = this.ui_div_empty('itop_bar');
  let html = `
  <button id="ipresent">Present</button>
  <button id="ihideui">HideUI</button>
  <button id="ireset">Reset</button>
  <button id="isave">Save</button>
  <button id="ireload">Reload</button>
  <span id="iu"></span>
  <span id="ifps"></span>
  <span id="imsg" style="font-size: 5vw; display: none; float: right"></span>
  <span>
    <span style="float: right; margin-right: 5px">
      <a href="https://github.com/jht9629-nyu/p5videoKit/" target="github" >
        GitHub
      </a>
    </span>
    <span style="float: right; margin-right: 5px">
      [ videoKit
        <a href="./videoKit/settings.html" target="_blank"> Settings </a> 
      ]
    </span>
    <span style="float: right; margin-right: 5px">
      <a href="./gen/settings.html" target="_blank" > Settings </a>
    </span>
  </span>
  `;
  this.ui_div_append(div, html);

  {
    //   <div style="display: inline">
    //   <input type="checkbox" id="imo_dbase" />
    //   <label for="imo_dbase">mo_dbase</label>
    // </div>
    // let imo_dbase = window.imo_dbase;
    // imo_dbase.checked = this.a_.mo_dbase_flag;
    // imo_dbase.addEventListener('change', mo_dbase_change);
    // if (this.a_.mo_dbase_flag) {
    //   mo_store_prepare();
    // }
    // function mo_dbase_change() {
    //   console.log('mo_dbase_change change this', this);
    //   let state = this.checked;
    //   this.a_.mo_dbase_flag = state ? 1 : 0;
    //   store_set('this.a_.mo_dbase_flag', this.a_.mo_dbase_flag + '');
    //   // store_set('this.a_.canvas_size_lock', this.a_.canvas_size_lock + '');
    // }
    // store_restore_mo_dbase_flag
    // window.isave
  }

  window.ipresent.addEventListener('mousedown', () => {
    this.present_action();
  });

  window.ihideui.addEventListener('mousedown', () => {
    this.ui_hide();
  });

  window.ireset.addEventListener('mousedown', () => {
    this.reset_video_clear_locals(this.a_.store_name);
  });

  window.isave.addEventListener('mousedown', () => {
    // if (this.a_.mo_dbase_flag) {
    //   mo_store_add_photo();
    // } else {
    if (videoKit.save_canvas_handler) {
      console.log('videoKit.save_canvas_handler');
      videoKit.save_canvas_handler();
    } else {
      let fn = this.ui_save_fn();
      saveCanvas(fn, 'png');
    }
    // }
    // save_others(fn);
  });

  window.ireload.addEventListener('mousedown', () => {
    reload_action();
  });

  // init iu element with store_prefix
  {
    let u = this.a_.store_prefix;
    if (u) u = '(' + u + ')';
    // !!@ ?? textContent vs. innerText
    window.iu.textContent = u;
  }
};

p5videoKit.prototype.ui_size_pane = function () {
  let div = this.ui_div_empty('isize_bar');
  this.ui_canvas_div(div);
  this.ui_capture_size(div);
  // ui_render_size(div);
};

p5videoKit.prototype.ui_create_comment_field = function () {
  let div = this.ui_div_empty('icomment_bar');
  let html = `
  <input id="icomment_input" value="" type="text" style="width: 80%;">
  `;
  this.ui_div_append(div, html);

  let val = this.a_.ui.comment || this.a_.ui.setting;

  window.icomment_input.value = val;
  window.icomment_input.addEventListener('input', () => {
    let val = this.value;
    // console.log('ui_create_comment_field val', val);
    this.ui_prop_set('comment', val);
  });
};

function reload_action() {
  let ent = this.a_.settings.find((ent) => ent.setting === this.a_.ui.setting);
  console.log('reload_action ent', ent);
  if (!ent) {
    ent = this.a_.ui;
  }
  this.store_restore_from(ent);
}

p5videoKit.prototype.ui_present_window = function () {
  resizeCanvas(windowWidth, windowHeight);
  this.ui_hide();
  this.ui_window_refresh();
};

p5videoKit.prototype.present_action = function () {
  this.toggleFullScreen();
  let delay = 3000;
  setTimeout(() => {
    this.ui_present_window();
  }, delay);
};

p5videoKit.prototype.ui_window_refresh = function () {
  console.log('ui_window_refresh');
  this.pad_layout_update();
  this.patch_instances_clear_all();
};

let a_ifps;

p5videoKit.prototype.update_ui = function () {
  if (!a_ifps) {
    a_ifps = select('#ifps');
  }
  if (a_ifps) {
    a_ifps.html(' [fps=' + round(frameRate(), 2) + '] ');
  }
};

// Can't move window across monitors
// let myWindow;
// function openWin() {
//   myWindow = window.open('', 'myWindow', 'width=200, height=100');
//   // myWindow.document.write("<p>This is 'myWindow'</p>");
// }
// function moveWin(xpos) {
//   // myWindow.moveTo(xpos, 0);
//   myWindow.moveBy(xpos, 0);
//   myWindow.focus();
// }

// Return date stamped file name based on first patch name
p5videoKit.prototype.ui_save_fn = function () {
  // "2021-04-25T14:44:31.227Z"
  let saveName = this.a_.ui.comment || this.a_.ui.setting || 'videoKit';
  saveName = saveName.substring(0, 32);
  let dt = new Date().toISOString().substring(0, 10);
  let fn = saveName + '_' + dt;
  return fn;
};
