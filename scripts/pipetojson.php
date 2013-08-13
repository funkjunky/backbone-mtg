<?php

if(!isset($argv[1]))
	die("Usage: php pipetojson delimiter in.csv [out.csv]\n");

$delimiter = $argv[1];
$in = $argv[2];
//default is to replace $in extension with "json" extension.
$out = dirname($argv[2]) ."/". basename($argv[2], pathinfo($argv[2])['extension']) . "json";
if(isset($argv[3]))
	$out = $argv[3];

$contents = file_get_contents($in);
$piped_cards = explode("\r", $contents);
print "Found ".count($piped_cards)."! Processing into an Object...\n";
$cards = [];

//Get keys from first row
$keys = explode("||", $piped_cards[0]);
print count($keys) . " Keys: {$piped_cards[0]}\n";
$keys[0] = substr($keys[0], 3); //weird bug... \ufeff shows up and unpredictable with trim.
var_dump($keys);
array_shift($piped_cards);

$count = 0;
foreach($piped_cards as $piped_card)
	$cards[] = array_combine($keys, explode("||", $piped_card)); 
print "Finished processing into an Object. Converting " . count($cards) . " cards to JSON...\n";

$json = json_encode($cards);
print "Finished processing to JSON. Saving...\n";

file_put_contents($out, $json);
print "Finished Saving. " . count($cards) . " Cards read from CSV, then converted and saved to the JSON file @ " . $out . "\n";

?>
