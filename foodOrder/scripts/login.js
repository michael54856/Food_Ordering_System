function loginAndCheck() 
{
    var loginAccount = document.getElementById('loginAccount');
    if(loginAccount.value == "")
    {
        window.alert("請輸入帳號!");
        return;
    }

    var loginPassword = document.getElementById('loginPassword');
    if(loginPassword.value == "")
    {
        window.alert("請輸入密碼!");
        return;
    }

   
     //fetch the database to see rather 
     $.ajax({
        url:"./php/loginAccount.php",    
        type: "post",   
        data: 
        {
            loginAccount : loginAccount.value,
            loginPassword : loginPassword.value,
        },
        success:function(result)
        {
            console.log(result);
            if(result.includes("true"))
            {
                $.ajax({
                    url:"./php/createSession.php",    
                    type: "post",   
                    data: 
                    {
                        loginAccount : loginAccount.value,
                    },
                    success:function(result)
                    {
                        sessionStorage.removeItem("shoppingCart");
                        window.location.href = "index.html";
                    },
                    error: function(xhr, status, error) 
                    {
                        window.alert("發生錯誤！");
                    }
                });
            }
            else
            {
                window.alert('帳號或密碼錯誤！');
            }
        },
        error: function(xhr, status, error) 
        {
            window.alert("發生錯誤！");
        }
    });
}