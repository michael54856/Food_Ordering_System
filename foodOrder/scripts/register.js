function validPhone(number)
{
    if(number.length != 10)
    {
        return false;
    }

    for(var i = 0; i < number.length; i++)
    {
        if(!(number.charCodeAt(i) >= 48 && number.charCodeAt(i) <= 57))
        {
            return false;
        }
    }
    return true;
}

function registerToDatabase() 
{
    var registerAccount = document.getElementById('registerAccount');
    if(registerAccount.value == "")
    {
        window.alert("請輸入帳號!");
        return;
    }

    var registerPassword_1 = document.getElementById('registerPassword_1');
    if(registerPassword_1.value == "")
    {
        window.alert("請輸入密碼!");
        return;
    }

    var registerPassword_2 = document.getElementById('registerPassword_2');
    if(registerPassword_2.value == "")
    {
        window.alert("請確認密碼!");
        return;
    }

    if(registerPassword_1.value != registerPassword_2.value)
    {
        window.alert("確認密碼不一樣!");
        return;
    }

    var registerName = document.getElementById('registerName');
    if(registerName.value == "")
    {
        window.alert("請輸入姓名!");
        return;
    }

    var registerPhone = document.getElementById('registerPhone');
    if(registerPhone.value == "")
    {
        window.alert("請輸入手機!");
        return;
    }

    if(validPhone(registerPhone.value) == false)
    {
        window.alert("手機格式錯誤，請輸入10個數字!");
        return;
    }

    
    //fetch the database to see rather 
    $.ajax({
        url:"./php/registerAccount.php",    
        type: "post",   
        data: 
        {
            registerAccount : registerAccount.value,
            registerPassword : registerPassword_1.value,
            registerName: registerName.value,
            registerPhone: String(registerPhone.value)
        },
        success:function(result)
        {
            if(result.includes("true"))
            {
                window.alert('註冊成功，跳轉到登入頁面！');
                window.location.href = "login.html";
            }
            else
            {
                window.alert('註冊失敗，帳號已被使用！');
            }
        },
        error: function(xhr, status, error) 
        {
            window.alert("發生錯誤！");
        }
    });

}