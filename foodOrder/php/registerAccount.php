<?php
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

   

    $sql = "SELECT account FROM account WHERE account='{$_POST["registerAccount"]}';";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) 
    {
        echo "false";
    } 
    else 
    {
        $hash = password_hash($_POST["registerPassword"], PASSWORD_DEFAULT);
        $insertsql = "INSERT INTO account VALUES ('{$_POST["registerAccount"]}', '{$hash}', '{$_POST["registerName"]}', '{$_POST["registerPhone"]}')";
        if ($conn->query($insertsql) === TRUE) 
        {
            echo "true";
        } 
        else 
        {
            echo "false";
        }
    }

    $conn->close();
?> 