<?php
    session_start();
    $servername = "localhost";
    $username = "superUser";
    $password = "123";
    $dbname = "foodorder";
    
    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    
    // Check connection
    if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
    }

    $sql = "UPDATE orderlist SET status = 'completed' WHERE number = '{$_POST['number']}';";
    $result = $conn->query($sql);

    echo 'true';

   

?> 