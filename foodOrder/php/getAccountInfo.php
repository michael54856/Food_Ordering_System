<?php
    session_start();

    if (isset($_SESSION['loginAccount'])) 
    {
        $return = array();
        $return['haveLoggedIn']= "true";

        $servername = "localhost";
        $username = "superUser";
        $password = "123";
        $dbname = "foodorder";
        
        // Create connection
        $conn = new mysqli($servername, $username, $password, $dbname);
        
        // Check connection
        if ($conn->connect_error) 
        {
            die("Connection failed: " . $conn->connect_error);
        }

        $sql = "SELECT account,name,phone FROM account WHERE account='{$_SESSION['loginAccount']}'";
        $result = $conn->query($sql);

        $row = $result->fetch_assoc();
        $return['account']= $row["account"];
        $return['name']= $row["name"];
        $return['phone']= $row["phone"];

        

        echo json_encode($return);
    }
    else
    {
        $return = array();
        $return['haveLoggedIn']= "false";
        echo json_encode($return);
    }
?> 