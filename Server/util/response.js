 function ApiResponse (status, message, result)  {
     this.status = status;
     this.message = message;
     this.result = result;
 }

 module.exports = ApiResponse;