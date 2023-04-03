<?php
  // Moves uploaded video file to a uploads folder
  $target_path = "./" . basename($_FILES["file"]["name"]);
  move_uploaded_file($_FILES["file"]["tmp_name"], $target_path );
  echo '{ "success": true }';
?>