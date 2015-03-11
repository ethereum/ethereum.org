Router.route("/",{
  name: "home"
});

Router.route("/signin",{
  name: "signIn"
});

Router.route("/team");

Router.route("/press");

Router.route("/partnership");

Router.route("/mining");

Router.route("/foundation");

Router.route("/ether");

Router.route("/company-structure");

Router.route("/licensing");

Router.route("/pdfs/EthereumWhitePaper.pdf", function(){
  window.location = "https://github.com/ethereum/wiki/wiki/White-Paper";
});

Router.route("/pdfs/EthereumYellowPaper.pdf", function(){
  window.location = "http://gavwood.com/Paper.pdf";
});
