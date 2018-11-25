<?php
require dirname(__FILE__) . '/utils.php';

$url = 'https://coworkit.de/wp-json/tribe/events/v1/events/'; 
$data = file_get_contents($url); 
$rawData = json_decode($data, true);
$events = $rawData['events'];
$newEvent = array();
$timezone = null;

foreach ($events as $event) {

    $newEvent = ['title' => $event['title'], 
                'start' => $event['start_date'],
                'end' => $event['end_date']];
                
    $event = new Event($newEvent, $timezone);
    $output_arrays[] = $event->toArray();
}

echo json_encode($output_arrays);

?>
