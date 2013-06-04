var exec = require('child_process').exec;

var vboxmanager = function(uid){
  var self = this;

  this.uid = uid;

  this.success = function(callback){

  };
  this.simpleMeth = function(){

  }
}

vboxmanager.prefix = 'VBoxManage ';

vboxmanager.getVMS = function(callback){
  exec(vboxmanager.prefix + 'list vms', function(error, stdout, stderr) {
    var vmsArray = [];
    var vms = stdout.split('\n');
    for(var k in vms){
      var data = vms[k].match(/"(.*)" {(.*)}/);
      if(data !== null){
        var name = data[1];
        var uid  = data[2]
        vmsArray.push(new vboxmanager(uid));
      }
    }
    callback(vmsArray);
  });
}

exports.vboxmanager = vboxmanager;