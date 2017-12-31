<?php

// create 16x16 PNGs with numbers in them

// default

$im = imagecreate( 16, 16 );
$b = imagecolorallocate( $im, 51, 51, 51 );
imagepng( $im, 'default.png' );

// pomodoro

// blue RGB: 44, 73, 133

$im = imagecreate( 16, 16 );
$b = imagecolorallocate( $im, 44, 73, 133 );
imagepng( $im, 'p/_.png' );

for ( $i = 0; $i < 60; $i++ ) {
  $im = imagecreate( 16, 16 );
  
  $b = imagecolorallocate( $im, 44, 73, 133 );
  $t = imagecolorallocate( $im, 255, 255, 255 );
  
  // minutes and seconds
  imagettftext( $im, 8, 0, 2, 12, $t, __dir__ .'/gulim.ttc', sprintf( '% 2d', $i ) );
  imagepng( $im, sprintf( 'p/%d.png', $i ) );
}

// break 

// green RGB: 81, 146, 81

$im = imagecreate( 16, 16 );
$b = imagecolorallocate( $im, 81, 146, 81 );
imagepng( $im, 'b/_.png' );

for ( $i = 0; $i < 60; $i++ ) {
  $im = imagecreate( 16, 16 );
  
  $b = imagecolorallocate( $im, 81, 146, 81 );
  $t = imagecolorallocate( $im, 255, 255, 255 );
  
  // minutes and seconds
  imagettftext( $im, 8, 0, 2, 12, $t, __dir__ .'/gulim.ttc', sprintf( '% 2d', $i ) );
  imagepng( $im, sprintf( 'b/%d.png', $i ) );
}
