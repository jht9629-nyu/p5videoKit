import { ui_message } from '../core/create_ui.js?v=118';
import { location_noquery } from '../core/store_url_parse.js?v=118';

// On first use in browser sometimes camera permissions
// are not requested and no video is displayed.
// This simple use of createCapture appears to trigger permissions
let myVideo;
export function check_reset_video() {
  ui_message('Resetting Configuration');
  localStorage.clear();
  let vconstraints = {
    video: true,
  };
  myVideo = createCapture(vconstraints, function (stream) {
    console.log('create_video stream', stream);
  });
  console.log('create_video myVideo', myVideo);
  myVideo.muted = true;
  function wait_reload() {
    // let delay = 2000;
    let delay = 1000;
    function func() {
      let nref = (random() + '').substring(2);
      nref = location_noquery() + '?v=' + nref;
      window.location = nref;
      // console.log('nref', nref);
    }
    setTimeout(func, delay);
  }
  function alert_reload() {
    window.alert('reloading page');
    let nref = document.location.href + '?v=' + random();
    window.location.href = nref;
  }
  wait_reload();
}
