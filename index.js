module.exports = (function(DEBUG){
/*---------------------------------------------------------------------*/
  
  var toArray = require('dsb-to-array');   
  
/***********************************************************************/  
  
  /* @method each
   * @param [target] {object|array} will default to 'this'
   * @param method {function}
   * @rest arguments
   * @param [map] {boolean} if true, maps directly to the object being iterated
   * works on objects || arrays. passes thru the function (1st arg) supplying (value, key, index). returns output of function or original value if no function output.
   * @changed 11-8-16 to force array keys as true numbers for K (instead of 'K')
   */
  
/*---------------------------------------------------------------------*/
   
  var each = function(){
    
    //setup
    var a = toArray(arguments),        
        i = 0,
        m = false,
        f,
        o;
      
    //check for native signature
    if( typeof( a[0] ) === 'function' ){      
      o = this;
      f = a.shift();
    //attempt for classic signature
    } else {      
      o = a.shift();
      f = a.shift();
    }
    
    //check for fn
    if (typeof f !== 'function') throw new Error('each() requires a method');
    
    //check for map
    if( a.length && ( a[0] === true ) ) m = true;
    
    //create object to dump iterated data into
    if( !m ){
      var x = ( o instanceof Array ) ? [] : {};
    } 
    
    for(var n in o){
      //force true number if numerical key
      if( parseInt(n) === i ) n = i;            
      //result from fn
      var r = f( o[n], n, i );
      //value (result || original)
      var v = ( typeof r !== 'undefined' ) ? r : o[n];
      //map (overwrite) to original or add to dump object
      m ? o[n] = v : x[n] = v;
      //increase the index
      i++;
    }
    
    return m ? o : x; //y     
  
  };

/***********************************************************************/

  return each;
  
/*---------------------------------------------------------------------*/
}(0));