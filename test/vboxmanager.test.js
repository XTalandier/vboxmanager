var vbox     = require('../').vboxmanager
  , request = require('supertest')
  , should  = require('should');

var myVMS = [];

describe('VBoxManager',function(){
  describe('#getVMS',function(){
    it('should return an array', function(done){
      vbox.getVMS(function(vms){
        myVMS = vms;
        (vms instanceof Array).should.equal(true);
        done();
      });
    });
  });
  describe('#getStatus',function(){
    it('should return a string', function(done){
      vbox.getVMS(function(vms){
        myVMS = vms;
        (vms instanceof Array).should.equal(true);
        done();
      });
    });
  });
});
