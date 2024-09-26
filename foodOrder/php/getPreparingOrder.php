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

    $sql = "SELECT number, restaurant, content, orderTime, price, status FROM orderlist WHERE account='{$_SESSION['loginAccount']}' AND status='preparing'";
    $result = $conn->query($sql);

    $rows = array();
    while($r = mysqli_fetch_assoc($result)) {
        $rows[] = $r;
    }
    echo json_encode($rows);
   

?> 