import Web3 from 'web3';
var express = require('express');
var app = express();
var http = require('http').Server('app');

app.use('/public', express.static('public'));

if(typeof web3 != 'undefined'){
         console.log("Using web3 detected from external source like Metamask")
         this.web3 = new Web3(web3.currentProvider)
      }else{
         console.log("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
         this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
}

app.get("/", function(request, response) {
  response.sendFile(__dirname + '/index.html');
});
