var blockchainUrl = "https://blockchain.info",
    blockchainApi = "5b846ae8-eb56-4c14-aae9-bd13056b6df7",
    fundraisingAddr = "36PrZ1KHYMpqSyAQXSG8VwbUiq2EogxLo2",
    satoshisInBtc = 100000000,
    maxEthForBtc = 2000,
    minEthForBtc = 1337.07714935,
    decreaseAfter = 30;

Template.etherChecker.rendered = function(){
  console.log("rendered etherCHecker");

  $(".thefuckisthis").popover();
};

Template.etherChecker.helpers({
  totalEther: function(){
    return numeral(60102215.5675).format("0,0");
  }
});

Template.etherChecker.events({
  "submit form": function(e,tmpl){
    try{
      var addr = tmpl.$("[name=address]").val(),
          btcaddr = base58checkEncode(addr, 0),
          getUnspentUrl = blockchainUrl + "/unspent?active=" + btcaddr + "&cors=true&api_code=" +
            blockchainApi;


      HTTP.get(getUnspentUrl, function(data){
        console.log(data);
      });
    }catch(e){
      console.log(e);
    }
    return false;
  }
});


function base58checkEncode(x,vbyte) {
  vbyte = vbyte || 0;

  var front = [vbyte].concat(Bitcoin.convert.hexToBytes(x));
  var checksum = Bitcoin.Crypto.SHA256(Bitcoin.Crypto.SHA256(front, {asBytes: true}),
                                       {asBytes: true})
        .slice(0,4);
  return Bitcoin.base58.encode(front.concat(checksum));
};
