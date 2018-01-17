// begin AltSheets changes
///////////////////////////////
// TODO: Put go into a config.js
// But how to include a file from local?

// var GETH_HOSTNAME	= "{GETH_HOSTNAME}";	// put your IP address!
// var GETH_RPCPORT	= {GETH_RPCPORT}; 	// for geth --rpcport GETH_RPCPORT
// var GETH_PROTOCOL       = "{GETH_PROTOCOL}";


var GETH_HOSTNAME	= "34.241.255.95";	// put your IP address!
var GETH_RPCPORT	= 8545; 	// for geth --rpcport GETH_RPCPORT
var GETH_PROTOCOL       = "http";


var APP_HOSTNAME 	= "See package.json --> scripts --> start: Change 'localhost'!!!";
var APP_PORT 		= "See package.json --> scripts --> start: Perhaps change '8000'";

// this is creating the corrected geth command
var WL=window.location;
var geth_command	= "geth --rpc --rpcaddr "+ GETH_HOSTNAME + " --rpcport " + GETH_RPCPORT +'\
 --rpcapi "web3,eth" ' + ' --rpccorsdomain "' + WL.protocol +"//" + WL.host + '"';


////////////////////////////////////////////////////
//end AltSheets changes


'use strict';

angular.module('ethExplorer', ['ngRoute','ui.bootstrap','filters','ngSanitize'])

.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'views/main.html',
                controller: 'mainCtrl'
            }).
            when('/block/:blockId', {
                templateUrl: 'views/blockInfos.html',
                controller: 'blockInfosCtrl'
            }).
            when('/tx/:transactionId', {
                templateUrl: 'views/transactionInfos.html',
                controller: 'transactionInfosCtrl'
            }).
            when('/address/:addressId', {
                templateUrl: 'views/addressInfos.html',
                controller: 'addressInfosCtrl'
            }).

            // info page with links:
            when('/chain/api', {
                templateUrl: 'views/api/api.html',
                controller: 'chainInfosCtrl'
            }).

            // getBlock (current) & getBlock (last)
            when('/chain/', {
                templateUrl: 'views/chainInfos.html',
                controller: 'chainInfosCtrl'
            }).
            when('/chain/gaslimit', {
                templateUrl: 'views/api/gaslimit.html',
                controller: 'chainInfosCtrl'
            }).
            when('/chain/difficulty', {
                templateUrl: 'views/api/difficulty.html',
                controller: 'chainInfosCtrl'
            }).
/*
            // fast = doesn't need to getBlock any block
            when('/chain/blocknumber', {
                templateUrl: 'views/api/blocknumber.html',
                controller: 'fastInfosCtrl'
            }).
            when('/chain/supply', {
                templateUrl: 'views/api/supply.html',
                controller: 'fastInfosCtrl'
            }).
            when('/chain/mined', {
                templateUrl: 'views/api/mined.html',
                controller: 'fastInfosCtrl'
            }).

            // begin of: not yet, see README.md
            when('/chain/supply/public', {
                templateUrl: 'views/api/supplypublic.html',
                controller: 'fastInfosCtrl'
            }).*/
            // end of: not yet, see README.md

            otherwise({
                redirectTo: '/'
            });

            //$locationProvider.html5Mode(true);
    }])
    .run(function($rootScope) {
	var Web3 = require('web3');
	var web3 = new Web3(new Web3.providers.HttpProvider(GETH_PROTOCOL + "://" + GETH_HOSTNAME + ":" + GETH_RPCPORT));	
        $rootScope.web3=web3;
        window.web3 = web3;
        
	function sleepFor( sleepDuration ){
            var now = new Date().getTime();
            while(new Date().getTime() < now + sleepDuration){ /* do nothing */ }
        }

        var connected = false;
        if(!web3.isConnected()) {
            $('#connectwarning').modal({keyboard:false,backdrop:'static'})
            $('#connectwarning').modal('show')
        }
    });
