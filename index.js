module.exports = (function(DEBUG){
/*----------------------------------------------------------------------------*/

  var toArray = require('dsb-to-array');

/*----------------------------------------------------------------------------*/

  var ns = 'each()';
  var NO_METHOD = ns+' requires a method',
      NO_ARGS = ns+' requires a valid object and a method',
      WRONG_SIGNATURE = 'at least one method was iterated with '
        + ns + ', but something is off in the signature:'
        + ' reference the docs for signatures and uses.';


/******************************************************************************/

  /*
   * @method each
   * works on objects || arrays.
   * passes thru the function (1st arg) supplying (value, key, index).
   * values becomes output of the function
   *   (or the original value, if nothing is returned from the method)
   * additional methods may be supplied for chaining
   * you can change valueOnly by passing a boolean directly before the method(s)
   * @param [valueOnly] {boolean} if true, only the value will be sent to method
   * @param [target] {object|array} will default to 'this'
   * @param method {function} each requires at least 1 method
   * @param [map] {boolean} if true, maps directly to the object being iterated
   * @return result {same as target} object with modified values
   */

/*----------------------------------------------------------------------------*/

  var each = function(){

    //setup
    var vo = false, //feed value only?
        mp = 0,     //# methods provided
         n = false, //native signature?
         m = false, //map directly to target?
         i = 0,     //index uid
         a = toArray(arguments),
         l = a.length,
         f, o, x;

    if( !l ) throw new Error(NO_ARGS);

    if( DEBUG > 3 ) console.log( 'each received', arguments );

    //check for map (modify directly)
    if( typeof( a[l-1] ) === 'boolean' ) m = a.pop();

    //check for valueOnly
    if( typeof a[0] === 'boolean' )  vo = a.shift();

    if( ( m || vo ) && DEBUG ) console.log(
      'resolved booleans', { valueOnly:vo, map:m }
    );

    //check for native signature
    if( typeof( a[0] ) === 'function' ){
      n = true;
      o = this;
      f = a.shift();
    //attempt for classic signature
    } else {
      o = a.shift();
      f = a.shift();
    }

    if( n && DEBUG ) console.log( 'native signature?', n );

    //create object to dump iterated data into
    if( !m ) x = ( o instanceof Array ) ? [] : {};

/******************************************************************************/

    var feed = function( fn, v, n ){

      var r;

      //handle value only
      if( vo ){
        //look ahead for args array
        if( a[0] instanceof Array ){
          var args = a.shift(),
              //check for context
              cset = (typeof a[0] === 'object'),
              self = cset ? a.shift() : null;
          if( DEBUG > 2 ) console.log(
            'found arguments'
              + ( (self!==null)
                ? ' and context'
                  : ', applying with null context' )
          );
          //apply with value, arg1, ..argN
          r = fn.apply( self, [ v ].concat( args ) );
        //or feed value only
        } else r = fn( v );
      }
      else {
        if( DEBUG > 2 ) console.log('feeding classic signature');
        //force true number if numerical key
        if( parseInt(n) === i ) n = i;
        //feed classic signature
        r = fn( v, n, i );
      }

      return r;

    };

/******************************************************************************/

    var it = function(fn){

      var nam = (typeof fn !== 'function');

      if( mp ){
        if( nam ) throw new Error(WRONG_SIGNATURE);
        //reset index if multiple methods provided
        i = 0;
      } else {
        if( nam ) throw new Error(NO_METHOD);
      }

      if( DEBUG > 2 ) console.log( 'iterating with', fn );

      //declare target object
      var to = x || o;

      //declare iteration object (original 1st time around)
      var io = !mp ? o : to;

      //iterate the target object
      for(var n in io){

        var v = io[n],
            r = feed( fn, v, n );

        //replace value if something returned
         if( typeof r !== 'undefined' ) v = r;

        if( DEBUG ) {
          console.log( 'each adding', n+':', v );
        }

        //re-assign value to key
        to[n] = v;

        //increase the index
        i++;

      }//end for loop

      //up the method count
      mp++;

      l = a.length;

      //make recursive with optional feed change
      if( l ){
        if( DEBUG ) console.log( 'found', l, 'more arguments', a );
        if( l > 1 && (typeof a[0] === 'boolean') ){
          if( DEBUG ) console.log('found VO change');
          vo = a.shift();
        }
        if( typeof a[0] === 'function' ){
          if( DEBUG ) console.log('running another method');
          var _f = a.shift();
          it( _f );
        }
        else throw new Error(WRONG_SIGNATURE);
      }

      return to;

    };

/******************************************************************************/

    var r = it( f );

    if( DEBUG > 2 ) console.log( 'returning', r );

    return r;

/*----------------------------------------------------------------------------*/

  };

/******************************************************************************/

  return each;

/*----------------------------------------------------------------------------*/
}(0));
