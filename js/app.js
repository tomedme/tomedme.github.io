
// window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;

var params = {}, current, track;

function desktopAlert() {
  if ( ! Notification ) {
    alert( 'Desktop notifications not available in this browser. Try Chrome, Firefox or Safari.' );
    return;
  }
  
  if ( 'granted' !== Notification.permission ) {
    Notification.requestPermission();
  }
  else {
    var notification = new Notification( 'Time up!', {
      icon: '/img/pomodoro.png',
      body: '',
    } );
    
    setTimeout( notification.close.bind( notification ), 30000 );
    notification.onclick = function () {
      window.focus();
    };
  }
}

$( document ).ready( function () {
  if ( 'granted' !== Notification.permission ) Notification.requestPermission();
  
  current = 'pomodoro';
  
  updateSettings();
  loadSettings();
  updateTimers();
  
  /* if ( track ) {
    ga( 'create', track, 'auto' );
  } */
  
  $( '#timer_default' ).createTimer( {
    time_in_seconds: parseInt( params.pomodoro )
  } );
  
  $( '#pomodoro' ).click( function () {
    current = 'pomodoro';
    toggleButtons( 'pomodoro' );
    // ga( 'send', 'event', 'pomodoro', 'start', parseInt( params.pomodoro ) );
    $( '#timer_default' ).createTimer( {
      time_in_seconds: parseInt( params.pomodoro ),
      dir: 'p',
      autostart: true
    } );
  } );
  
  $( '#shortbreak' ).click( function () {
    current = 'shortbreak';
    toggleButtons( 'shortbreak' );
    // ga( 'send', 'event', 'shortbreak', 'start', parseInt( params.shortbreak ) );
    $( '#timer_default' ).createTimer( {
      time_in_seconds: parseInt( params.shortbreak ),
      dir: 'b',
      autostart: true
    } );
  } );
  
  $( '#longbreak' ).click( function () {
    current = 'longbreak';
    toggleButtons('longbreak');
    // ga( 'send', 'event', 'longbreak', 'start', parseInt( params.longbreak ) );
    $( '#timer_default' ).createTimer( {
      time_in_seconds: parseInt( params.longbreak ),
      dir: 'b',
      autostart: true
    } );
  });
  
  $( '#interrupt' ).click( function () {
    if ( 'running' == $( '#timer_default' ).data('countdown.state') ) {
      // ga( 'send', 'event', current, 'interrupt' );
      $( '#timer_default' ).pauseTimer();
    }
  } );
  
  $( '#reset' ).click( function () {
    $( '#timer_default' ).resetTimer( {
      time_in_seconds: parseInt( params[ current ] )
    } );
  } );
} );

function urlParams() {
  var r = new RegExp('[\?&]([^]*)').exec( window.location.href );
  var params = [];
  
  if ( null !== r ) {
    var opts = r[ 1 ].split( '&' );
    for ( var i = 0; i < opts.length; i++ ) {
      var opt = opts[ i ].split( '=' );
      params[ opt[ 0 ] ] = opt[ 1 ];
    }
  }
  
  return params;
}

function isInteger( num ) {
  
  return num && Math.floor( num ) == num && $.isNumeric( num ) && num > 0;
}

function updateSettings() {
  var params = urlParams();
  
  var pomodoro = parseInt( params[ 'p' ] ) || 25;
  if ( isInteger( pomodoro ) && pomodoro > 0 && pomodoro <= 60 ) {
    localStorage.setItem( 'pomodoro', pomodoro );
  }
  
  var shortbreak = parseInt( params[ 's' ] ) || 5;
  if ( isInteger( shortbreak ) && shortbreak > 0 && shortbreak <= 30 ) {
    localStorage.setItem( 'shortbreak', shortbreak );
  }
  
  var longbreak = parseInt( params[ 'l' ] ) || 10;
  if ( isInteger( longbreak ) && longbreak > 0 && longbreak < 30 ) {
    localStorage.setItem( 'longbreak', longbreak );
  }
  
  localStorage.setItem( 'track', false );
  
  var track = params[ 't' ] || '';
  if ( track && track.match( /^UA-[0-9]*-[0-9]*$/ ) ) {
    localStorage.setItem( 'track', track );
  }
  
  updateTimers();
}

function loadSettings() {
  if ( 1 != localStorage[ 'pomflag' ] ) {
    localStorage.setItem( 'pomodoro', 25 );
    localStorage.setItem( 'shortbreak', 5 );
    localStorage.setItem( 'longbreak', 10 );
    localStorage.setItem( 'pomflag', 1 );
  }
  
  $( '#time_pomodoro').text( localStorage.getItem( 'pomodoro' ) );
  $( '#time_shortbreak' ).text( localStorage.getItem( 'shortbreak' ) );
  $( '#time_longbreak' ).text( localStorage.getItem( 'longbreak' ) );
  track = localStorage.getItem( 'track' );
}

function toggleButtons( active ) {
  $( '.timer' ).removeClass( 'active' );
  $( '#' + active ).addClass( 'active' );
}

function updateTimers() {
  params = {
    pomodoro: localStorage.getItem( 'pomodoro' ) * 60,
    shortbreak: localStorage.getItem( 'shortbreak' ) * 60,
    longbreak: localStorage.getItem( 'longbreak' ) * 60
  };

  $( '#timer_default' ).resetTimer( {
    time_in_seconds: parseInt( params.pom )
  } );
}

/* (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga'); */
