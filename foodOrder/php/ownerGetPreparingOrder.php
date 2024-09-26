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

    $restaurantName = "";

    if($_SESSION['loginAccount'] == "restaurant_1")
    {
        $restaurantName = "摩斯漢堡";
    }
    else if($_SESSION['loginAccount'] == "restaurant_2")
    {
        $restaurantName = "麥味登";
    }
    else if($_SESSION['loginAccount'] == "restaurant_3")
    {
        $restaurantName = "路易莎咖啡";
    }

    $sql = "SELECT number, account,content, orderTime, price, status FROM orderlist WHERE restaurant='{$restaurantName}' AND status='preparing'";
    $result = $conn->query($sql);

    $rows = array();

    while($row = mysqli_fetch_assoc($result)) 
    {
        $sql2 = "SELECT name, phone FROM account WHERE account='{$row['account']}';";
        $result2 = $conn->query($sql2);
        $accountInfo = $result2->fetch_assoc();

        
        $obj['number'] = $row['number'];
        $obj['account'] = $row['account'];
        $obj['name'] = $accountInfo['name'];
        $obj['phone'] = $accountInfo['phone'];
        $obj['content'] = $row['content'];
        $obj['price'] = $row['price'];
        $obj['orderTime'] = $row['orderTime'];
        $obj['status'] = $row['status'];

        $rows[] = $obj;
    }
    


    echo json_encode($rows);
   

?> 