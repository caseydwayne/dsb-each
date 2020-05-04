module.exports = (function(DEBUG){
/*----------------------------------------------------------------------------*/

  //import vitals
  var each = require('./index'),
     debug = require('dsb-debug-mini').create('each'),
      type = require('dsb-typecheck');

  //setup
  var obj = { 'my': 'wo', 'test': 'rks' },
      exp = 'works',
      arr = exp.split();

/******************************************************************************/

  debug.method( 'each', function( fn, test, name ){

/******************************************************************************/

    var t = function(x,c){
      var s = '',
          f = function(v,k,i){
            s += v;
          },
          t = type(x),
          n = t+' iterated'+(c?'*call':'');
      c ? fn.call( x, f ) : fn( x, f );
      test( n, s===exp );
    };

/*----------------------------------------------------------------------------*/

    //test classic
    t(obj);
    t(arr);

/*----------------------------------------------------------------------------*/

    //test native support
    t( obj, true );
    t( arr, true );

/******************************************************************************/

    var k = 'key',
        v = 'same',
        d = 'different',
        n, r, x;

/*----------------------------------------------------------------------------*/

    var o = {};
    o[k] = v;

    n = 'map object';
    x = fn( o, function(){ return d; }, true );
    //key should be 'blue' in both
    r = ( o[k] === d ) && ( x[k] === d );

    test( n, r );

/*----------------------------------------------------------------------------*/

    var a = [ v ],
        i = 0,
       kn = false,
        t = function(v,k,i){
         kn = (k===i);
         return d;
        };

    n = 'map array';
    x = fn( a, t, true );

    //0 should be different in both
    r = ( a[i] === d ) && ( x[i] === d );

    test( n, r );

    debug.test( 'array key and index are numbers?', kn );

/******************************************************************************/

    var t = function(v,k){
      return (typeof k === 'undefined');
    };

    n = 'value only';
    o = {};
    o[k] = v;
    r = fn( true, o, t );

    test( n, r[k] );

/*----------------------------------------------------------------------------*/

    var j = function( q, z ){ return z; };

    n = 'value + args array';
    a = [v];
    o = {};
    o[k] = d;
    //should convert different back to same
    x = fn( true, o, j, a );

    test( n, x[k] === v );

/*----------------------------------------------------------------------------*/

    var c = {}; //context object
    var r = this;
    var j = function(){ return r !== this; };

    n += ' + context';
    a = [v];
    o = {};
    o[k] = d;
    //should convert different back to same
    x = fn( true, o, j, a, c );

    test( n, x[k] );

/*----------------------------------------------------------------------------*/

  }, each );

/******************************************************************************/

  return debug.complete();

/*----------------------------------------------------------------------------*/
}(0));
