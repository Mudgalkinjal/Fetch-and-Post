var fetch = require('node-fetch');
var XMLHttpRequest = require('xhr2');

var getUrl = "https://interview.adpeai.com/api/v1/get-task";
var postUrl = "https://interview.adpeai.com/api/v1/submit-task";
var postRequest = new XMLHttpRequest();
let result, ob;

const getReq = async()=>{
  
   const response = await fetch(getUrl);
   
   if(response.ok){
    return response.json();
  }
  
  
}

const resp = getReq().then((response)=>{
   response = JSON.stringify(response);
   return JSON.parse(response);
}).catch(error => console.log(error));

const getResp = async () => { 
   ob = await resp;  //waiting till promise returns a response
   result = calculate(ob); //sending object data to calculate math operations
};
 
function calculate(obj) {
   id = obj.id;
   operation = obj.operation;
   num1 = obj.left;
   num2 = obj.right;

    switch (operation) {
        case 'multiplication': result = num1 * num2;
            break;
        case 'subtraction': result = num1 - num2;
            break;
        case 'division': result = num1 / num2;
            break;
        case 'addition': result = num1 + num2;
            break;
        case 'remainder': result = num1 % num2;
            break;
    }
    data = {
        id:obj.id,
        result:result
    }
   postData(data);
}

function postData(data) { // Function to post the data to the url given
   postData = JSON.stringify(data);

   postRequest.open("POST", postUrl);

   postRequest.setRequestHeader("Accept", "application/json");
   postRequest.setRequestHeader("Content-Type", "application/json");

   postRequest.onreadystatechange = function () {
      if (postRequest.readyState === 4) {
         switch (postRequest.status) {
            case 200: postRequest.responseText = "Success";
               break;
            case 400: postRequest.responseText = "Incorrect value in result; no ID specified; value is invalid";
               break;
            case 500: postRequest.responseText = "ID cannot be found";
               break;
         }
         console.log(postRequest.status);
         console.log(postRequest.responseText); 
     }
     
       
   };
   postRequest.send(postData);
}

 getResp(); // Initial function call - line-25