//
//
import { p5videoKit } from '../a/a_p5videoKit.js?v=413';

// import { a_ } from '../let/a_state.js?v=413';
// import { create_mediaDiv, remove_mediaDiv } from '../core/create_mediaDiv.js?v=413';
// import { ui_refresh } from '../core-ui/ui_patch_bar.js?v=413';
// import { ui_chat_receive } from '../core-ui/ui_chat.js?v=413';

// let a_livem;

p5videoKit.prototype.liveMedia_attach = function (mediaDiv) {
  // console.log('liveMedia_attach mediaDiv=', mediaDiv);
  let type;
  let stream;
  let mediaDevice = mediaDiv.mediaDevice;
  if (mediaDevice) {
    stream = mediaDevice.stream;
    if (!stream) {
      console.log('liveMedia_attach NO stream mediaDiv=', mediaDiv);
      return;
    }
    type = 'CAPTURE';
  } else if (!this.a_.ui.canvas_data_chk) {
    // no mediaDevice --> canvas
    stream = this.my_canvas;
    type = 'CANVAS';
  } else {
    // Data only - don't stream out our canvas
    stream = null;
    type = 'DATA';
  }
  let livem = mediaDiv.livem;
  if (livem) {
    console.log('liveMedia_attach livem', livem);
    return;
  }
  // console.log('liveMedia_attach this=', this);
  // console.log('liveMedia_attach type=' + type + ' this.a_.ui.room_name=' + this.a_.ui.room_name);
  // this is nulll in modules
  let nthis = this || window;
  console.log('liveMedia_attach this', this, 'nthis', nthis);
  let room_name = this.a_.videoKit.room_name_prefix + this.a_.ui.room_name;
  console.log('liveMedia_attach room_name', room_name);
  livem = new p5LiveMedia(nthis, type, stream, room_name);
  if (!this.a_.livem) {
    livem.on('stream', () => {
      gotStream();
    });
    livem.on('data', () => {
      gotData;
    });
    livem.on('disconnect', () => {
      gotDisconnect;
    });
    livem.on('connect', () => {
      gotConnect;
    });
    this.a_.livem = livem;
    // console.log('liveMedia_attach SET this.a_.livem', this.a_.livem);
  }
  mediaDiv.livem = livem;
};

p5videoKit.prototype.liveMedia_detach = function (mediaDiv) {
  console.log('liveMedia_detach mediaDiv=', mediaDiv);
  if (!mediaDiv) return;
  mediaDiv.livem = null;
};

// For debugging
let otherVideo;

// We got a new stream!
p5videoKit.prototype.gotStream = function (capture, id) {
  console.log('gotStream id', id);
  console.log('gotStream width', capture.width, 'height', capture.height);
  // This is just like a video/stream from createCapture(VIDEO)
  otherVideo = capture;
  //otherVideo.id and id are the same and unique identifiers
  capture.elt.muted = true;
  let stream = capture.elt.srcObject;
  let deviceId = id;
  let mediaDevice = { deviceId, capture, stream };
  this.create_mediaDiv(mediaDevice, { live: 1 });
  this.ui_refresh();
  // livem_send('Hello');
};

// loadedmetadata

p5videoKit.prototype.gotData = function (theData, id) {
  console.log('gotData theData', theData, 'id', id);
  this.ui_chat_receive(theData, id);
};

p5videoKit.prototype.gotDisconnect = function (id) {
  console.log('gotDisconnect id', id);
  this.ui_chat_receive('', id);
  this.remove_mediaDiv(id);
};

p5videoKit.prototype.gotConnect = function (id) {
  console.log('gotConnect id', id);
};

p5videoKit.prototype.livem_send = function (text) {
  console.log('livem_send text', text);
  if (!this.a_.livem) return;
  let name = this.a_.ui.chat_name;
  let obj = { name, text };
  this.a_.livem.send(JSON.stringify(obj));
};

// https://github.com/vanevery/p5LiveMedia
