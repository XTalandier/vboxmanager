var exec = require('child_process').exec
  , events = require('events');

var vboxmanager = function(uid){
  var self   = this;
  this.uid   = uid;
  this.state = 'off';
  //this.on('next'    , function(value){});
  //this.on('success' , function(value){});
  //this.on('error'   , function(value){});
}

// Inherit from evenemiter
//vboxmanager.prototype.__proto__ = events.EventEmitter.prototype;

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


vboxmanager.prototype.getInfos = function(callback) {
  var self = this;
  exec(vboxmanager.prefix + 'showvminfo ' + this.uid , function(error, stdout, stderr) {
    var infos = {};
    var lines = stdout.split('\n');
    for(var k in lines){
      var items = lines[k].split(':');
      if(items[1]){
        infos[items[0]] = items[1].replace(/^\s+/g,'').replace(/\s+$/g,'');
      }
    }
    callback(infos);
  });
  return this;
};

vboxmanager.prototype.getState = function(infos , callback) {
  var self = this;
  var returnState = function(data){
    var state = 'unknow';
    if(data.State.indexOf('running') > -1){
      state = 'started';
    }else if(data.State.indexOf('paused') > -1){
      state = 'paused';
    }else if(data.State.indexOf('powered off') > -1){
      state = 'stopped';
    }
    !callback ? infos(state) : callback(state);
  };
  if(infos && !callback || !infos && callback){
    this.getInfos(function(infos){
      returnState(infos);
    });
  }else{
    returnState(infos);
  }
  return this;
};

vboxmanager.prototype.start = function(callback) {
  var self = this;
  this.getState(function(state){
    if(state == 'paused'){
      exec(vboxmanager.prefix + 'controlvm ' + self.uid + ' resume' , function(error, stdout, stderr) {
        callback(!!error);
      });
    }else{
      exec(vboxmanager.prefix + 'startvm ' + self.uid + ' --type headless' , function(error, stdout, stderr) {
        callback(!!error);
      });
    }
  })
  return this;
};

vboxmanager.prototype.stop = function(callback) {
  exec(vboxmanager.prefix + 'controlvm ' + this.uid + ' poweroff' , function(error, stdout, stderr) {
    callback(!!error);
  });
  return this;
};

vboxmanager.prototype.pause = function(callback) {
  exec(vboxmanager.prefix + 'controlvm ' + this.uid + ' pause' , function(error, stdout, stderr) {
    callback(!!error);
  });
  return this;
};






exports.vboxmanager = vboxmanager;