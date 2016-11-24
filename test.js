module.exports = (function(){ 
/*---------------------------------------------------------------------*/  
  
  //import vitals  
  var each = require('./index'),
     debug = require('dsb-debugger').create('each'),
      type = require('dsb-typecheck');
  
  //setup
  var obj = { 'my': 'wo', 'test': 'rks' },
      exp = 'works',
      arr = exp.split();
       
/***********************************************************************/
  
  debug.method( 'each', function( fn, test, name ){

/***********************************************************************/
    
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

/*---------------------------------------------------------------------*/
    
    //test classic
    t(obj);
    t(arr);

/*---------------------------------------------------------------------*/
    
    //test native
    t(obj,true);
    t(arr,true);

/***********************************************************************/
    
    var c = 'color',
        r = 'red',
        b = 'blue';
    
/*---------------------------------------------------------------------*/
    
    var o = {};
    o[c] = r;
    
    var x = fn( o, function(v,k){ return b; }, true );
    var t = ( o[c] === b ) && ( x[c] === b );    
    test( 'map object', t, true );
        
/*---------------------------------------------------------------------*/

    var a = [ r ];
    var c = 0;
    var x = fn( a, function(v){ return b; }, true );
    
    var t = ( a[c] === b ) && ( x[c] === b );
    
    test( 'map array', t, true );
    
    //test direct mapping
    
/*---------------------------------------------------------------------*/
    
  }, each );    

/***********************************************************************/

  debug.complete();

/*---------------------------------------------------------------------*/

  return debug;

/*---------------------------------------------------------------------*/
}());