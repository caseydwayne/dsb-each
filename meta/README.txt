dsb-each is "the essential iterator"

signature:
	each( [target=this], method, [map=false] )

description:	
	works on objects and arrays ({target}).

	iterates on the target, passing target data thru the supplied method with the parameters ( value, key, index ). 

notes:
 
	if a value is returned by the method, it will replace the value in the output object.

	if a final boolean of {map} is true, the supplied {target} will receive these values directly.
	otherwise, a same-type object will be created and returned.
	

_________________________________________________

 ! see license.txt before using this software !
_________________________________________________