function addItem(restaurantName, foodName,price) 
{
    if(sessionStorage.getItem("shoppingCart") == null) //ok
    {
        var cartList = {
            restaurant : restaurantName,
            orderList : []
        };

        var newFood = {
            foodName : foodName,
            price : price,
            amount : 1
        };

        cartList['orderList'].push(newFood);

        sessionStorage.setItem("shoppingCart", JSON.stringify(cartList));

        document.getElementById("cartAmount").style.display = "block";
        document.getElementById("cartAmount").innerHTML =  cartList['orderList'].length;

        var sum = 0;
        for(var i = 0; i < cartList['orderList'].length; i++)
        {
            sum += cartList['orderList'][i]['price'] * cartList['orderList'][i]['amount'];
        }
        document.getElementById("totalPrice").innerHTML = "<img src=\"assest/cartIconRed.png\">" + "$ " + sum;


    }
    else
    {
        var cartList = JSON.parse(sessionStorage.getItem("shoppingCart"));
        if(cartList['restaurant'] != restaurantName)
        {
            window.alert("餐廳不同，請先清空購物車！");
            return;
        }

        var haveItem = false;
        var index;
        for(var i = 0; i < cartList['orderList'].length; i++)
        {
            if(cartList['orderList'][i]['foodName'] == foodName)
            {
                index = i;
                haveItem = true;
                break;
            }
        }

        if(haveItem == true)
        {
            cartList['orderList'][index]['amount'] += 1;
        }
        else
        {
            var newFood = {
                foodName : foodName,
                price : price,
                amount : 1
            };

            cartList['orderList'].push(newFood);
        }

        sessionStorage.setItem("shoppingCart", JSON.stringify(cartList));
        document.getElementById("cartAmount").style.display = "block";
        document.getElementById("cartAmount").innerHTML =  cartList['orderList'].length;

        var sum = 0;
        for(var i = 0; i < cartList['orderList'].length; i++)
        {
            sum += cartList['orderList'][i]['price'] * cartList['orderList'][i]['amount'];
        }
        document.getElementById("totalPrice").innerHTML = "<img src=\"assest/cartIconRed.png\">" + "$ " + sum;
    }
}