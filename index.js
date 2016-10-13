(function(){
  
  
  /* @method each
   * @param [target] {object|array} will default to 'this'
   * @param method {function}
   * @rest arguments
   * works on objects || arrays. passes thru the function (1st arg) supplying (value, key, index). returns output of function or original value if no function output.
   */
  
  var toArray = require('dsb-to-array');   
   
  var each = function(){
    var index = 0, 
            a = toArray(arguments),
            l = a.length,
            f,
            o;
    //check for classic signature    
    if( l > 1 ){
      o = a.shift();
      f = a.shift();
    //go native if not
    } else {
      o = this;
      f = a.shift();
    }
    //check for fn
    if (typeof f !== 'function') throw new Error('each() requires a method');
    for(var i in o){
      o[ i ] = f( o[ i ], i, index++, a ) || o[ i ]; 
    }
    return o;     
  };
  
  module.exports = each;
  return each;

}());