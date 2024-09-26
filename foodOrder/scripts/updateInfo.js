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

function updateAccountInfo() 
{
    var myUpdateName;
    var myUpdatePhone;
    var myUpdatePassword;

    var accountInfoDiv_password1 = document.getElementById('accountInfoDiv_password1');
    var accountInfoDiv_password2 = document.getElementById('accountInfoDiv_password2');

    if(accountInfoDiv_password1.value != accountInfoDiv_password2.value)
    {
        window.alert("確認密碼不一樣!");
        return;
    }

    var accountInfoDiv_phone = document.getElementById('accountInfoDiv_phone');
    if(accountInfoDiv_phone.value == "")
    {
        myUpdatePhone = accountInfoDiv_phone.placeholder;
    }
    else
    {
        if(validPhone(accountInfoDiv_phone.value) == false)
        {
            window.alert("手機格式錯誤，請輸入10個數字!");
            return;
        }
        myUpdatePhone = accountInfoDiv_phone.value;
    }

    myUpdatePassword = accountInfoDiv_password1.value;
    

    var accountInfoDiv_name = document.getElementById('accountInfoDiv_name');
    if(accountInfoDiv_name.value == "")
    {
        myUpdateName = accountInfoDiv_name.placeholder;
    }
    else
    {
        myUpdateName = accountInfoDiv_name.value;
    }


    $.ajax({
        url:"./php/updateAccount.php",    
        type: "post", 
        data: 
        {
            updateName : myUpdateName,
            updatePhone : myUpdatePhone,
            updatePassword: myUpdatePassword,
        },
        success:function(result)
        {
            window.alert('更新成功！');
            window.location.reload();
        },
        error: function(xhr, status, error) 
        {
            window.alert("發生錯誤！");
        }
    });


}