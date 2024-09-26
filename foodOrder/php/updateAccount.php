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

    if($_POST['updatePassword'] == "")
    {
        $sql = "UPDATE account SET name = '{$_POST['updateName']}', phone = '{$_POST['updatePhone']}' WHERE account = '{$_SESSION['loginAccount']}';";
        $result = $conn->query($sql);
    }
    else
    {
        $hash = password_hash($_POST["updatePassword"], PASSWORD_DEFAULT);
        $sql = "UPDATE account SET name = '{$_POST['updateName']}', phone = '{$_POST['updatePhone']}', password = '{$hash}' WHERE account = '{$_SESSION['loginAccount']}';";
        $result = $conn->query($sql);
    }

    echo 'true';

   

?> 