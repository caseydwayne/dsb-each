(function(){
  
  /*
   * template test
   */
  
  var source = require('./index'),
       debug = require('dsb-debug-lite');
  
  debug( 'name', source, 'arguments', 'expected' );
  
  
 
  /*
   * each
   */
  
  method( 'each', function( fn, test, name ){
    var s = '',
        f = function(v,k,i){
          s += v;          
        },
        o = { 'my': 'wo', 'test': 'rks' },
        a = 'works',
        arr = a.split(),
        as = '',
        af = function(v,k,i){
          as += v;          
        };
    fn(o,f);
    fn(arr,af);
    test( 'object iterated', s===a, true);
    test( 'array iterated', as===a, true);
  });    
        
}());