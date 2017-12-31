
function configuration( user_settings ) {
  return $.extend( {
    time_in_seconds: 3600,
    tick: function( timer, time_in_seconds, formatted_time, dir ) {
      updateProgress( time_in_seconds, dir );
    },
    buzz: function( timer, dir ) {
      desktopAlert();
      updateProgress( '_', dir );
    },
    autostart: false
  }, user_settings );
}

function timeRemainFormat( seconds ) {
  var min = Math.floor( seconds / 60 );
  var secs = seconds - ( min * 60 );
  
  return ( '0' + min ).slice( -2 ) + ':' + ( '0' + secs ).slice( -2 );
}

function updateProgress( seconds, dir ) {
  if ( seconds > 59 ) {
    if ( 59 == ( seconds % 60 ) ) {
      var min = Math.floor( seconds / 60 );
      $( '#indicator' ).prop( 'href', '/img/'+ dir +'/'+ min +'.png' );
    }
  }
  else {
    if ( '_' == seconds ) {
      $( '#indicator' ).prop( 'href', '/img/'+ dir +'/_.png' );
    }
    else {
      $( '#indicator' ).prop( 'href', '/img/'+ dir +'/'+ seconds +'.png' );
    }
  }
}

$.fn.extend( {

  createTimer: function( user_settings ) {
    var settings = configuration( user_settings );
    var timers = this;

    timers.text( timeRemainFormat( settings.time_in_seconds ) ).
      data( 'countdown.duration', settings.time_in_seconds * 1000 ).
      data( 'countdown.state', 'ready' ).
      data( 'countdown.timer_id', new Date().getTime() );
      
    if ( settings.autostart ) {
      this.startTimer( settings );
    }

    return this;
  },

  startTimer: function( user_settings ) {
    var settings = configuration( user_settings );
    var my_state = this.data( 'countdown.state' );
    
    return this.each( function() {
      
      if ( 'running' == my_state ) return;
      
      var timer = $( this ).data( 'countdown.state', 'running' );
      var timerId = timer.data( 'countdown.timer_id' );
      
      var end_time = new Date().getTime() + timer.data( 'countdown.duration' );
      
      var interval = setInterval( function() {
        if ( timer.data( 'countdown.timer_id' ) == timerId && 'running' == timer.data( 'countdown.state' ) ) {
          var current_time = Math.round( ( end_time - new Date().getTime() ) / 1000 );
          
          if ( current_time <= 0 ) {
            clearInterval( interval );
            current_time = 0;
          }
          
          timer.data( 'countdown.duration', current_time * 1000 );
          var formatted_time = timeRemainFormat( current_time );
          
          timer.text( formatted_time );
          settings.tick( timer, current_time, formatted_time, settings.dir );
          
          0 == current_time && settings.buzz( timer, settings.dir );
        } 
        else {
          clearInterval( interval );
        }
      }, 1000 );
    } );
  },
  
  resetTimer: function( user_settings ) {
    var settings = configuration( user_settings );
    var timers = this;
    
    timers.text( timeRemainFormat( settings.time_in_seconds ) ).
      data( 'countdown.duration', settings.time_in_seconds * 1000 ).
      data( 'countdown.state', 'ready' ).
      data( 'countdown.timer_id', new Date().getTime() );
      
    return this;
  },

  pauseTimer: function() {
    return this.data( 'countdown.state', 'paused' );
  }
  
} );
