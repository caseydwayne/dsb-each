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
    args = toArray(arguments),
    f = args.shift(), //assumes fn as 1st arg
    t = this; //defaults target to 'this'
    if (typeof f !== 'function'){
      var t = f;
      f = args.shift();
      if( typeof f !== 'function' ) throw new Error('each() requires a method');
    }  
    for(var i in t){
      t[ i ] = f( t[ i ], i, index++, args ) || t[ i ]; 
    }
    return t;     
  };
  
  module.exports = each;
  return each;

}());