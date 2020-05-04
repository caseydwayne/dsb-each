# DSB Each
Node Module: `dsb-each`

> iterates through objects and arrays & 'maps' through a function

The each module is just a solid iterator with multiple signatures.

Dependencies:
- to-array

Dev Dependencies:
- debug-mini
- typecheck

---

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
