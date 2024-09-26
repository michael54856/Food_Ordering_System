function ownerFetchPreparingOrder()
{
    $.ajax({
        url:"./php/ownerGetPreparingOrder.php",    
        type: "post", 
        dataType: "json",
        data: 
        {
            login : 1
        },
        success:function(result)
        {
            for(var i = 0; i < result.length; i++)
            {
                var dateString = result[i]['orderTime'].split(' ');
                var dateConstructor = "";
                dateConstructor += dateString[0];
                dateConstructor += "T";
                dateConstructor += dateString[1];
                result[i]['dateObject'] = new Date(dateConstructor);
            }

            result.sort(function(x, y) {
                if (x['dateObject'].getTime() < y['dateObject'].getTime()) {
                  return -1;
                }
                if (x['dateObject'].getTime() > y['dateObject'].getTime()) {
                  return 1;
                }
                return 0;
            });

            var finalString = "";

            for(var i = 0; i < result.length; i++)
            {
                finalString += "<tr>";
                finalString += "<td class=\"orderNumber\">" + result[i]['number'] + "</td>";
                finalString += "<td>" + result[i]['account'] + "</td>";
                finalString += "<td>" + result[i]['name'] + "</td>";
                finalString += "<td>" + result[i]['phone'] + "</td>";
                finalString += "<td>"

                var contentList = result[i]['content'].split(',');
                for(var j  = 0; j < contentList.length; j++)
                {
                    var temp = contentList[j].split(':')
                    finalString += "<div>" + temp[0] + " $" + temp[1] + "</div>";
                }

                finalString += "</td>"
                finalString += "<td>" + result[i]['price'] + "</td>";
                finalString += "<td>" + result[i]['orderTime'] + "</td>";
                finalString += "<td>" + result[i]['status'] + "</td>";

                finalString += "<td>";
                finalString += "<button class=\"cancelOrder\" onclick=\"cancelOrder(this)\">X</button>";
                finalString += "<button class=\"completeOrder\" onclick=\"completeOrder(this)\">O</button>";
                finalString += "</td>";
                 

                finalString += "</tr>";

            }

            document.getElementById("preparingTable").getElementsByTagName("tbody")[0].innerHTML = finalString;


        },
        error: function(xhr, status, error) 
        {
            window.alert("發生錯誤！");
        }
    });
}

function ownerFetchCompletedOrder()
{
    $.ajax({
        url:"./php/ownerGetCompletedOrder.php",    
        type: "post", 
        dataType: "json",
        data: 
        {
            login : 1
        },
        success:function(result)
        {
            for(var i = 0; i < result.length; i++)
            {
                var dateString = result[i]['orderTime'].split(' ');
                var dateConstructor = "";
                dateConstructor += dateString[0];
                dateConstructor += "T";
                dateConstructor += dateString[1];
                result[i]['dateObject'] = new Date(dateConstructor);
            }

            result.sort(function(x, y) {
                if (x['dateObject'].getTime() < y['dateObject'].getTime()) {
                  return -1;
                }
                if (x['dateObject'].getTime() > y['dateObject'].getTime()) {
                  return 1;
                }
                return 0;
            });

            var finalString = "";

            for(var i = 0; i < result.length; i++)
            {
                finalString += "<tr>";
                finalString += "<td>" + result[i]['number'] + "</td>";
                finalString += "<td>" + result[i]['account'] + "</td>";
                finalString += "<td>" + result[i]['name'] + "</td>";
                finalString += "<td>" + result[i]['phone'] + "</td>";
                finalString += "<td>"

                var contentList = result[i]['content'].split(',');
                for(var j  = 0; j < contentList.length; j++)
                {
                    var temp = contentList[j].split(':')
                    finalString += "<div>" + temp[0] + " $" + temp[1] + "</div>";
                }

                finalString += "</td>"
                finalString += "<td>" + result[i]['price'] + "</td>";
                finalString += "<td>" + result[i]['orderTime'] + "</td>";

                if(result[i]['status'] == "completed")
                {
                    finalString += "<td style=\"color: green\">" + result[i]['status'] + "</td>";
                }
                else
                {
                    finalString += "<td style=\"color: red\">" + result[i]['status'] + "</td>";
                }
                
                finalString += "<td>" + result[i]['feedback'] + "</td>";

                 

                finalString += "</tr>";

            }

            document.getElementById("completedTable").getElementsByTagName("tbody")[0].innerHTML = finalString;


        },
        error: function(xhr, status, error) 
        {
            window.alert("發生錯誤！");
        }
    });
}

function completeOrder(element)
{
    var parent = element.parentElement.parentElement;
    var num = parent.getElementsByClassName('orderNumber')[0].innerHTML;
    $.ajax({
        url:"./php/completeOrder.php",    
        type: "post", 
        data: 
        {
            number: num
        },
        success:function(result)
        {
            window.alert("完成訂單！");
            location.reload();
        },
        error: function(xhr, status, error) 
        {
            window.alert("發生錯誤！");
        }
    });
    
}

function cancelOrder(element)
{

    var parent = element.parentElement.parentElement;

    var num = parent.getElementsByClassName('orderNumber')[0].innerHTML;

    
    $.ajax({
        url:"./php/cancelOrder.php",    
        type: "post", 
        data: 
        {
            number: num
        },
        success:function(result)
        {
            window.alert("取消訂單！");
            location.reload();
        },
        error: function(xhr, status, error) 
        {
            window.alert("發生錯誤！");
        }
    });

    
}