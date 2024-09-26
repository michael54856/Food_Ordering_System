<?php
    session_start();
    if (isset($_SESSION['loginAccount'])) 
    {
        echo "true";
    }
    else
    {
        echo "false";
    }
?> 