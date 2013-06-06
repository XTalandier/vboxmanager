# VBoxmanager

## Overview
_VBoxmanager_ is a VirtualBox manager library for [node](http://nodejs.org).
With it, you can:

 * List virtuals machines
 * get informations about a VM
 * Start/Stop/Pause/Resume a VM
 * Modifty memory
 * Modify number of CPUs
 * Clone/Delete
 
## Installation
    $ npm install vboxmanager

## Example
```javascript
var vbox = require('vboxmanager').vboxmanager;
vbox.getVMS(function(
  // Get the first VM 
  var box = myVMS[0];
  console.log('VM Name: ' , box.name);
  console.log('VM UID: '  , uid);
  // Clone the VM
  box.cloneMe('MyNewVM' , function(error , new_box){
    if(error){
      return;
    }
    // set memory to 2048M
    new_box.setMemory(2048 , function(){
      // set 4 cpus
      new_box.setCPUS(4 , function(){
        // Start the VM
        box.start(function(){
          console.log('Gogogo !');
        });
      });
    });
  });
});

```


## Running tests

To run the tests for _vboxmanager_ simply run:

    $ make test


##License
(The MIT License)

Copyright (c) 2013 Xavier TALANDIER <xavier@talandier.fr> 

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
