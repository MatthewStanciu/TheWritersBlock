(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
//var Web3 = require('web3');
//var web3 = new Web3();
var web3 = window.web3;

urlp=[];u=location.search.replace("?","").split("&").forEach(function(d){e=d.split("=");urlp[e[0]]=e[1];});

if (typeof web3 != 'undefined') {
         console.log("Using web3 detected from external source like Metamask")
         this.web3 = new Web3(web3.currentProvider)
      } else {
         console.log("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
         this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
}

function payUser(addr, amt){
	var contract = new web3.eth.contract([[{"constant": false,"inputs": [{"name": "amount","type": "uint256"},{"name": "receiver","type": "address"}],"name": "payWriter","outputs": [{"name": "success","type": "bool"}],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [],"name": "kill","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "owner","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "balance","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"inputs": [],"payable": false,"stateMutability": "nonpayable","type": "constructor"}]]);

var contractInstance = contract.at("0x8ac6f809862eae42fefafcca212efb61607e13e0");

// when the form is submitted, call the payWriter function
//function payUser(addr, amt) {
//var getData = contractInstance.payWriter(addr, amt, {
//    gas: 300000,
//    from: web3.eth.accounts[0],
//    value: web3.toWei(amt, 'ether')
//  }, (err, result) => {
//    cb()
//  });
	//var getData = contractInstance.payWriter.getData(function params);
	//web3.eth.sendTransaction(to:0x8ac6f809862eae42fefafcca212efb61607e13e0, from:addr, data: getData);
//	console.log(contractInstance);	
//	contractInstance.payWriter(addr, amt,{from: web3.eth.accounts[0], value: 200, gas: 2000}, (err, res) => {
//		console.log(err, result);
//	});
	web3.eth.sendTransaction({to: addr, from: web3.eth.accounts[0], value: web3.toWei(amt, "ether")}, (err, hash) => {
		console.log(err, hash);
	});

}

var vuePay = new Vue({
  el: '#pay',
  data: {
    output: ''
  },
  methods: {
    pay () {
      payUser(urlp["author"], $('#amt').val()); // putting my address temporarily
    }
  }
});

},{}]},{},[1]);
