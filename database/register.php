<?php
    $db_connection = pg_connect("host=localhost dbname=agroadvisory user=postgres password=yourPassword");

	$EncodedData = file_get_contents('php://input');
	$DecodedData = json_decode($EncodedData, true);

	$location_id = $DecodedData['location_id'];
    $sel_lang = $DecodedData['sel_lang'];
    $user_name = $DecodedData['user_name'];
    $user_mobile = $DecodedData['user_mobile'];
    $mob_model = $DecodedData['mob_model'];
    $mob_os = $DecodedData['mob_os'];
    $os_version = $DecodedData['os_version'];

	$SQ = "SELECT * from users WHERE user_mobile = '$user_mobile' AND user_name = '$user_name' ";
	$check = pg_query($db_connection, $SQ);
	
	if ( pg_num_rows($check)>0 )
	{
		$Message = "An account with this phone number and name already exist!";
	}
	else
	{
		$IQ = "INSERT INTO users (location_id, sel_lang, user_name, user_mobile, mob_model, mob_os, os_version) VALUES ($location_id, '$sel_lang', '$user_name', '$user_mobile', '$mob_model', '$mob_os', '$os_version')";
		$result = pg_query($db_connection, $IQ);

		if($result)
		{
			$Message = "Successfully registered!";
		}
		else
		{
			$Message = "Server Error...Please try later";
		}
	}
	
	$Response[] = array("Message" => $Message);
	echo json_encode($Response);

	pg_close($db_connection);
?>