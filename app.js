var fetch = require('node-fetch'); //Used fetch for GET instead of from XMLHTTPRequest to show 2 ways of doing that
var XMLHttpRequest = require('xhr2'); //This is for post request

const base_url = "https://interview.adpeai.com/api/v1"; //common url section for both

var postRequest = new XMLHttpRequest(); //to exchange data between the program and a server.
let result, ob;

const getReq = async()=>{ //Async await function to get the data from server
   const response = await fetch(base_url+"/get-task");
   
   if(response.ok){
    return response.json(); //parsing the body text as JSON
  }
  
}

const resp = getReq().then((response)=>{ //Taking care of resolve
   response = JSON.stringify(response);
   return JSON.parse(response);
}).catch(error => console.log(error)); //Taking care of reject

const getResp = async () => {
   try {
      ob = await resp;  //waiting till promise returns a response
   }
   catch (error) {
      console.log(error);
  }
   result = calculate(ob); //sending object data to calculate math operations
};
 
function calculate(obj) { //Function to calculate the result of the operations
   id = obj.id; //Pushing object elements to new variable to use in the calculation
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
    data = { //data is the object to be sent for post request
        id:obj.id,
        result:result
    }
   postData(data);
}

function postData(data) { // Function to post the data to the url given
   postData = JSON.stringify(data); //concerts JSON object to string

   postRequest.open("POST", base_url+"/submit-task");

   postRequest.setRequestHeader("Accept", "application/json"); //setting headers
   postRequest.setRequestHeader("Content-Type", "application/json");

   postRequest.onreadystatechange = function () {
      if (postRequest.readyState === 4) { //There are total 5 states starting from 0, 4 being done state
         switch (postRequest.status) { //Handling message on different states as per the question
            case 200: postRequest.responseText = "Success";
               break;
            case 400: postRequest.responseText = "Incorrect value in result; no ID specified; value is invalid";
               break;
            case 500: postRequest.responseText = "ID cannot be found";
               break;
         }
         console.log(postRequest.status); //Consoling out the final result stating the success of post request
         console.log(postRequest.responseText); 
     }
     
       
   };
   postRequest.send(postData);
}

 getResp(); // Initial function call - function on line-23