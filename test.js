module.exports = (function(){
  
  /*
   * template test
   */
  
  var each = require('./index'),
     debug = require('dsb-debugger').create('each'),
      type = require('dsb-typecheck');
    
  var obj = { 'my': 'wo', 'test': 'rks' },
      exp = 'works',
      arr = exp.split();
       

 
  /*
   * each
   */
  
  debug.method( 'each', function( fn, test, name ){
 
    
    var t = function(x,c){
      var s = '',
          f = function(v,k,i){
            s += v;          
          },
          t = type(x),
          n = t+' iterated'+(c?'*call':'');
      c ? fn.call( x, f ) : fn( x, f );          
      test( n, s===exp, true);
    };
    
    //test classic
    t(obj);
    t(arr);
    
    //test native
    t(obj,true);
    t(arr,true);
    
    
  }, each );    
  
  debug.complete();
  
  return debug;
        
}());