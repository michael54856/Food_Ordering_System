<?php
    session_start();
    if (isset($_SESSION['loginAccount'])) 
    {
        if($_SESSION['loginAccount'] == 'restaurant_1' || $_SESSION['loginAccount'] == 'restaurant_2' || $_SESSION['loginAccount'] == 'restaurant_3')
        {
            echo 'true';
        }
        else
        {
            echo 'false';
        }
    }
    else
    {
        echo "false";
    }
?> 