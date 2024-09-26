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

    $sql = "INSERT INTO orderlist (account, restaurant, content, orderTime, price, status, feedback) VALUES ('{$_SESSION['loginAccount']}', '{$_POST['orderRestaurant']}', '{$_POST['orderContent']}', '{$_POST['orderTime']}', {$_POST['totalPrice']}, 'preparing', 0);";
    $result = $conn->query($sql);

    
?> 