const  = require("../utils/js/")
var sm2 = "";
var method = "SM2"

var ec = new KJUR.crypto.ECDSA({"curve": method});
var keypair = ec.generateKeyPairHex();
