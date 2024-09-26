function addItem(element) 
{
    var parent = element.parentElement;
    var currentAmount = parseInt(parent.getElementsByClassName("itemAmount")[0].innerHTML);
    var foodName = parent.getElementsByClassName("shoppingCartFoodName")[0].innerHTML;

    var cartList = JSON.parse(sessionStorage.getItem("shoppingCart"));
    var index;
    for(var i = 0; i < cartList['orderList'].length; i++)
    {
        if(cartList['orderList'][i]['foodName'] == foodName)
        {
            index = i;
            break;
        }
    }
    cartList['orderList'][index]['amount'] += 1;
    parent.getElementsByClassName("itemAmount")[0].innerHTML = cartList['orderList'][index]['amount'];
    parent.getElementsByClassName("shoppingCartPrice")[0].innerHTML = "$ "+  ( cartList['orderList'][index]['amount'] *  cartList['orderList'][index]['price']);

    sessionStorage.setItem("shoppingCart", JSON.stringify(cartList));
    document.getElementById("cartAmount").style.display = "block";
    document.getElementById("cartAmount").innerHTML =  cartList['orderList'].length;

    var sum = 0;
    for(var i = 0; i < cartList['orderList'].length; i++)
    {
        sum += cartList['orderList'][i]['price'] * cartList['orderList'][i]['amount'];
    }
    document.getElementById("totalPrice").innerHTML = "<img src=\"assest/cartIconRed.png\">" + "$ " + sum;
    document.getElementById("shoppingCartTotalPrice").innerHTML = "總價： $" + sum;
}
function minusItem(element) 
{
    var parent = element.parentElement;
    var currentAmount = parseInt(parent.getElementsByClassName("itemAmount")[0].innerHTML);
    var foodName = parent.getElementsByClassName("shoppingCartFoodName")[0].innerHTML;
    if(currentAmount == 1)
    {
        return;
    }


    var cartList = JSON.parse(sessionStorage.getItem("shoppingCart"));
    var index;
    for(var i = 0; i < cartList['orderList'].length; i++)
    {
        if(cartList['orderList'][i]['foodName'] == foodName)
        {
            index = i;
            break;
        }
    }
    cartList['orderList'][index]['amount'] -= 1;
    parent.getElementsByClassName("itemAmount")[0].innerHTML = cartList['orderList'][index]['amount'];
    parent.getElementsByClassName("shoppingCartPrice")[0].innerHTML = "$ "+  (cartList['orderList'][index]['amount'] *  cartList['orderList'][index]['price']);

    sessionStorage.setItem("shoppingCart", JSON.stringify(cartList));
    document.getElementById("cartAmount").style.display = "block";
    document.getElementById("cartAmount").innerHTML =  cartList['orderList'].length;

    var sum = 0;
    for(var i = 0; i < cartList['orderList'].length; i++)
    {
        sum += cartList['orderList'][i]['price'] * cartList['orderList'][i]['amount'];
    }
    document.getElementById("totalPrice").innerHTML = "<img src=\"assest/cartIconRed.png\">" + "$ " + sum;
    document.getElementById("shoppingCartTotalPrice").innerHTML = "總價： $" + sum;
  
}

function removeItem(element) 
{
    var parent = element.parentElement;
    var foodName = parent.getElementsByClassName("shoppingCartFoodName")[0].innerHTML;
    var cartList = JSON.parse(sessionStorage.getItem("shoppingCart"));
    var index;
    for(var i = 0; i < cartList['orderList'].length; i++)
    {
        if(cartList['orderList'][i]['foodName'] == foodName)
        {
            index = i;
            break;
        }
    }
    cartList['orderList'].splice(index, 1);

    sessionStorage.setItem("shoppingCart", JSON.stringify(cartList));

    if(cartList['orderList'].length > 0)
    {
        document.getElementById("cartAmount").style.display = "block";
        document.getElementById("cartAmount").innerHTML =  cartList['orderList'].length;
    }
    else
    {
        sessionStorage.removeItem("shoppingCart");
        document.getElementById("cartAmount").style.display = "none";
        document.getElementById("totalPrice").innerHTML = "<img src=\"assest/cartIconRed.png\">" + "$ 0";
        document.getElementById("shoppingCartTotalPrice").innerHTML = "總價： $0";
        document.getElementById("orderTimeDiv").style.display = "none";
        document.getElementById("orderButton").style.display = "none";
        parent.remove();
        return;
    }

    var sum = 0;
    for(var i = 0; i < cartList['orderList'].length; i++)
    {
        sum += cartList['orderList'][i]['price'] * cartList['orderList'][i]['amount'];
    }
    document.getElementById("shoppingCartTotalPrice").innerHTML = "總價： $" + sum;
    document.getElementById("totalPrice").innerHTML = "<img src=\"assest/cartIconRed.png\">" + "$ " + sum;
    parent.remove();
}

function createList()
{
    if(sessionStorage.getItem("shoppingCart") != null) 
    {
        var cartList = JSON.parse(sessionStorage.getItem("shoppingCart"));

        var final = "";

        for(var i = 0; i < cartList['orderList'].length; i++)
        {
            var current = "";
            
            current += "<div class=\"shoppingCartRow\">";
            current += "<div class=\"shoppingCartFoodName\">";
            current += cartList['orderList'][i]['foodName'];
            current += "</div>";
            current += "<div class=\"shoppingCartPrice\">$ ";
            current += cartList['orderList'][i]['amount'] * cartList['orderList'][i]['price'];
            current += "</div>";
            current += "<button class=\"minusAmount\" onclick=\"minusItem(this)\">-</button>"
            current += "<div class=\"itemAmount\">";
            current += cartList['orderList'][i]['amount'];
            current += "</div>";
            current += "<button class=\"addAmount\" onclick=\"addItem(this)\">+</button>";
            current += "<button class=\"removeItem\" onclick=\"removeItem(this)\">x</button>";
            current += "</div>";
           
            final += current;
        }
        document.getElementById("shoppingCartList").innerHTML = final;

        var sum = 0;
        for(var i = 0; i < cartList['orderList'].length; i++)
        {
            sum += cartList['orderList'][i]['price'] * cartList['orderList'][i]['amount'];
        }
        document.getElementById("shoppingCartTotalPrice").innerHTML = "總價： $" + sum;

        var minTime = new Date();
        
        var maxTime = new Date();
        maxTime.setDate(maxTime.getDate() + 7);

        minTime.setMinutes(minTime.getMinutes() - minTime.getTimezoneOffset());
        maxTime.setMinutes(maxTime.getMinutes() - maxTime.getTimezoneOffset());

        minTime = minTime.toISOString().slice(0, 16);
        maxTime = maxTime.toISOString().slice(0, 16);

        document.getElementById("order-time").value = minTime;
        document.getElementById("order-time").min = minTime;
        document.getElementById("order-time").max = maxTime;

        

    }
    else
    {
        document.getElementById("orderTimeDiv").style.display = "none";
        document.getElementById("orderButton").style.display = "none";
    }
}

function parseYMDHM(s) {
    var b = s.split(/\D+/);
    return new Date(b[0], --b[1], b[2], b[3], b[4], b[5]||0, b[6]||0);
  }

function toMinutes(myDate)
{
    var sum = 0;
    sum += myDate.getHours() * 60;
    sum += myDate.getMinutes();
    return sum;
}

function sendOrder()
{
    var orderTime = document.getElementById("order-time").value;
    orderTime = parseYMDHM(orderTime);
    
    if(orderTime.getTime() < new Date().getTime())
    {
        window.alert("訂餐時間不正確！");
        return;
    }

    if(!(toMinutes(orderTime) >= 660 && toMinutes(orderTime) <= 1200))
    {
        window.alert("請在營業時間訂餐！");
        return;
    }

    var cartList = JSON.parse(sessionStorage.getItem("shoppingCart"));

    var datestring = orderTime.getFullYear() + "-" + ("0"+(orderTime.getMonth()+1)).slice(-2) + "-" + ("0" + orderTime.getDate()).slice(-2) + " "  + ("0" + orderTime.getHours()).slice(-2) + ":" + ("0" + orderTime.getMinutes()).slice(-2);


    var sum = 0;
    for(var i = 0; i < cartList['orderList'].length; i++)
    {
        sum += cartList['orderList'][i]['price'] * cartList['orderList'][i]['amount'];
    }
   
    var orderString = "";
    var first = true;
    for(var i = 0; i < cartList['orderList'].length; i++)
    {
        if(first == true)
        {
            first = false;
        }
        else
        {
            orderString += ",";
        }
        orderString += cartList['orderList'][i]['foodName'];
        orderString += " x";
        orderString += cartList['orderList'][i]['amount'];
        orderString += ":";
        orderString += cartList['orderList'][i]['price'] * cartList['orderList'][i]['amount'];
    }

    
    //ajax send to server
    //訂餐人帳號(server)，餐廳，餐點內容，取餐時間，總價格，狀態，評價
    $.ajax({
        url:"./php/order.php",    
        type: "post",   
        data: 
        {
            orderRestaurant : cartList['restaurant'],
            orderContent : orderString,
            orderTime: datestring,
            totalPrice: sum
        },
        success:function(result)
        {
            sessionStorage.removeItem("shoppingCart");
            location.reload();
            window.alert('訂餐成功！');
        },
        error: function(xhr, status, error) 
        {
            window.alert("發生錯誤！");
        }
    });
    

    
}