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

    $sql = "SELECT account, password FROM account WHERE account='{$_POST['loginAccount']}'";
    $result = $conn->query($sql);


    if ($result->num_rows > 0) 
    {
        $row = $result->fetch_assoc();

        if($row["account"] == $_POST['loginAccount'] && password_verify($_POST['loginPassword'], $row["password"]))
        {
            echo "true";
        }
        else
        {
            echo "false";
        }
    } 
    else 
    {
        echo "false";
    }
   

    $conn->close();
?> 