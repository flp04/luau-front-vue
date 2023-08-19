<?php
$code = 'PL';
$uri = 'http://api.football-data.org/v4/competitions/' . $code . '/matches';
$reqPrefs['http']['method'] = 'GET';
$reqPrefs['http']['header'] = 'X-Auth-Token: bef4843a927541c5b894ff0c1d3c78ae';
$stream_context = stream_context_create($reqPrefs);
$response = file_get_contents($uri, false, $stream_context);
$matches = json_decode($response);

$uri = 'http://api.football-data.org/v4/competitions/' . $code . '/standings';
$reqPrefs['http']['method'] = 'GET';
$reqPrefs['http']['header'] = 'X-Auth-Token: bef4843a927541c5b894ff0c1d3c78ae';
$stream_context = stream_context_create($reqPrefs);
$response = file_get_contents($uri, false, $stream_context);
$competition = json_decode($response);

$competition->matches = $matches->matches;
$competition = json_encode($competition);

echo $competition;
?>