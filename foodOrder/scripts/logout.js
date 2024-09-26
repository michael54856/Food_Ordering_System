function logout() 
{
    $.ajax({
        url:"./php/deleteSession.php",    
        type: "post",   
        data: 
        {
            loginAccount : 1,
        },
        success:function(result)
        {
            window.location.href = "index.html";
        },
        error: function(xhr, status, error) 
        {
            window.alert("發生錯誤！");
        }
    });
}