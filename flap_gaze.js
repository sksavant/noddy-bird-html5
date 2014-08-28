  //<script type="text/javascript">
  var min_pitch = 3.14;
  var max_pitch = -3.14;
  var thresh = 7/180*3.14;
  var throttle = 0;
  var p = 40;
  var diff_pitch=0;
  var sdkDemo = {
    documentOffsetX : 0, // offset of HTML document origin from screen origin
    documentOffsetY : 0,

    setup : function() {
      window.addEventListener( "mousemove", function(e) {
        sdkDemo.documentOffsetX = e.screenX - e.clientX - window.screenX;
        sdkDemo.documentOffsetY = e.screenY - e.clientY - window.screenY;
      } );
    },

    onApiState : function( state ) {
      var x0 = -( sdkDemo.documentOfrfsetX + window.screenX );
      var y0 = -( sdkDemo.documentOffsetY + window.screenY ); // this is correct formula for when window is not maximized
      var xt = x0 +state.kvTrackingScreenX;
      var yt = y0 +state.kvTrackingScreenY;

      //window.alert(state.kvHeadPitch);
      p = 0.8*state.kvHeadRoll+0.2*p;
      //p = state.kvHeadPitch;
      if (p < min_pitch)
      {
        min_pitch = p;
      }
      if (p > max_pitch)
      {
        max_pitch = p;
      }
      if (diff_pitch <= thresh)
      {
      diff_pitch = max_pitch - min_pitch;
      }
      var e = document.createEvent('HTMLEvents');
      if (diff_pitch > thresh)
      {
        throttle = throttle+1;
        //if (throttle > 3){
        onCanvasMouseDown(e);
        diff_pitch = 0;
        max_pitch = -3.14;
        min_pitch = 3.14; 
        throttle = 0;
      //}
      }
      document.getElementById("pitchhead").innerHTML = String(p*180/3.14)+" "+String(min_pitch*180/3.14)+" "+String(diff_pitch*180/3.14)+" "+String(max_pitch*180/3.14);

      //var targetElement = document.getElementById( "target" );
      //targetElement.style.left = xt;
      //targetElement.style.top  = yt;
    },

    onApiReady : function() {
      window.postMessage( {target:"xLabs", payload:{overlayEnabled:1}}, "*" );
      window.postMessage( {target:"xLabs", payload:{overlayMode:0}}, "*" );
      window.postMessage( {target:"xLabs", payload:{clicksEnabled:1}}, "*" );
      window.postMessage( {target:"xLabs", payload:{trackingEnabled:1}}, "*" );
      window.postMessage( {target:"xLabs", payload:{realtimeEnabled:1}}, "*" );
      window.postMessage( {target:"xLabs", payload:{trackMouse:0}}, "*" );
    }
  };

  document.addEventListener( "xLabsApiReady", function() {
    sdkDemo.onApiReady();
  } );

  document.addEventListener( "xLabsApiState", function( event ) {
    sdkDemo.onApiState( event.detail );
  } );
 
  sdkDemo.setup();

  //window.

  //</script>
