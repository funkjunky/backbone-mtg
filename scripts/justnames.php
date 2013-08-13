<?php
$json = json_decode(file_get_contents("magicsets/M14.json"));

$names = array();
foreach($json as $card)
	$names[] = $card->name;

file_put_contents("magicsets/M14Names.json", json_encode($names));
?>
