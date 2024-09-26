function fetchPreparingOrder() 
{
    $.ajax({
        url:"./php/getPreparingOrder.php",    
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
                finalString += "<td>" + result[i]['restaurant'] + "</td>";
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


function fetchCompletedOrder() 
{
    $.ajax({
        url:"./php/getCompletedOrder.php",    
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
                finalString += "<td>" + result[i]['restaurant'] + "</td>";
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

                if(result[i]['status'] == 'canceled')
                {
                    finalString += "<td style=\"color: red\">" + result[i]['status'] + "</td>";
                }
                else
                {
                    finalString += "<td style=\"color: green\">" + result[i]['status'] + "</td>";
                }
                

                finalString += "<td>";

                if(result[i]['status'] != 'canceled')
                {
                    if(result[i]['feedback'] == 0)
                    {
                        finalString += "<div style=\"display: flex; padding-left: 50px;\">";
                        finalString += "<button class=\"minusAmountRate\" onclick=\"minusRate(this)\">-</button>";
                        finalString += "<div class=\"itemAmountRate\">1</div>";
                        finalString += "<button class=\"addAmountRate\" onclick=\"addRate(this)\">+</button>";
                        finalString += "<button class=\"sendRate\" onclick=\"updateRate(this)\">評分</button>";
                        finalString += "</div>";
                    }
                    else
                    {
                        finalString += result[i]['feedback'];
                    }
                }
                else
                {
                    finalString += "0";
                }


                finalString += "</td>";

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

function addRate(element)
{
    var parent = element.parentElement;
    if(parseInt(parent.getElementsByClassName("itemAmountRate")[0].innerHTML) < 5)
    {
        parent.getElementsByClassName("itemAmountRate")[0].innerHTML = parseInt(parent.getElementsByClassName("itemAmountRate")[0].innerHTML)+1;
    }
}

function minusRate(element)
{
    var parent = element.parentElement;
    if(parseInt(parent.getElementsByClassName("itemAmountRate")[0].innerHTML) > 1)
    {
        parent.getElementsByClassName("itemAmountRate")[0].innerHTML = parseInt(parent.getElementsByClassName("itemAmountRate")[0].innerHTML)-1;
    }
}

function updateRate(element)
{
    var parent = element.parentElement;
    var grandPatent = parent.parentElement.parentElement;


    $.ajax({
        url:"./php/updateFeedback.php",    
        type: "post", 
        data: 
        {
            rate: parent.getElementsByClassName('itemAmountRate')[0].innerHTML,
            number: grandPatent.getElementsByClassName('orderNumber')[0].innerHTML
        },
        success:function(result)
        {
            window.alert("評論成功");
            location.reload();
        },
        error: function(xhr, status, error) 
        {
            window.alert("發生錯誤！");
        }
    });
    
}