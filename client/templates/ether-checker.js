var blockchainUrl = "https://blockchain.info",
    blockchainApi = "5b846ae8-eb56-4c14-aae9-bd13056b6df7",
    fundraisingAddr = "36PrZ1KHYMpqSyAQXSG8VwbUiq2EogxLo2",
    satoshisInBtc = 100000000,
    maxEthForBtc = 2000,
    minEthForBtc = 1337.07714935,
    decreaseAfter = 14,
    decreaseAmountPerDay = 30;

Template.etherChecker.rendered = function(){

  //console.log("rendered etherCHecker");
  $(".popup-ether").popover();

};

Template.etherChecker.helpers({
  totalEther: function(){
    return numeral(60102215.5675).format("0,0");
  },
  modalText: function(){
    return Session.get("etherChecker_modalText") || {};
  }
});

Template.etherChecker.events({
  "submit form": function(e,tmpl){
    Session.set("etherChecker_modalText", {
      body: "Calculating..."
    });
    $("#ether-balance-modal").modal();
    
    var addr = tmpl.$("[name=address]").val(),
        btcaddr = base58checkEncode(addr, 0),
        getUnspentUrl = blockchainUrl + "/unspent?active=" + btcaddr + "&cors=true&api_code=" +
          blockchainApi;


    HTTP.get(getUnspentUrl, function(err, res){
      try{
        if(err) throw(err);
        
        var unspent = res.data.unspent_outputs,
            totalBtc = 0,
            totalEth = 0,
            counter = 0;

        _.each(unspent, function(tx){
          var txUrl = blockchainUrl + "/rawtx/" + tx.tx_index + "?cors=true&api_code=" +
                blockchainApi + "&format=json";
          
          if(tx.tx_index !== undefined){
            HTTP.get(txUrl, function(err, res){
              try{
                if(err) throw err;
                
                if(res.data.out[0].addr === fundraisingAddr){
                  var btc = (res.data.out[0].value + 30000) / satoshisInBtc,
                      eth = getBalanceByDate(btc, res.data.time);

                  totalBtc += btc;
                  totalEth += eth;
                  
                  tick();
                }else{
                  throw new Error(res.data.out[0].addr + " is not the fundraising address");
                }
              }catch(e){
                handleError(e);
              }
            });
          }else{
            tick();
          }
        });
      }catch(e){
        handleError(e);
      }

      function tick(){
        if(++counter === unspent.length){
          Session.set("etherChecker_modalText", {
            body: numeral(totalEth).format("0,0.00") + "ETH"
          });
        }
      }
    });

    return false;
  }
});

function handleError(err){
  Session.set("etherChecker_modalText", {
    body: "Something went wrong. Please check that you entered your Ether address correctly.",
    bodySecondary: err.message
  });
}

function base58checkEncode(x,vbyte) {
  vbyte = vbyte || 0;

  var front = [vbyte].concat(Bitcoin.convert.hexToBytes(x));
  var checksum = Bitcoin.Crypto.SHA256(Bitcoin.Crypto.SHA256(front, {asBytes: true}),
                                       {asBytes: true})
        .slice(0,4);
  return Bitcoin.base58.encode(front.concat(checksum));
};

function getBalanceByDate(value, date){
  var delta = dhms((date - 1406066400) * 1000);
  var price = maxEthForBtc;

  if(delta.days < 0)
    return 0;

  if(delta.days >= decreaseAfter){
    price = maxEthForBtc - (delta.days - decreaseAfter + 1) * decreaseAmountPerDay;
  }

  price = Math.max(price, minEthForBtc);

  var total = value * price;

  return total;
};


function dhms(t){
  var cd = 24 * 60 * 60 * 1000,
      ch = 60 * 60 * 1000,
      cm = 60 * 1000,

      d = Math.floor(t / cd),
      h = Math.floor( (t - d * cd) / ch),
      m = Math.floor( (t - d * cd - h * ch) / cm),
      s = Math.round( (t - d * cd - h * ch - m * cm) / 1000);

  return {
    days: d,
    hours: h,
    minutes: m,
    seconds: s
  };
};
