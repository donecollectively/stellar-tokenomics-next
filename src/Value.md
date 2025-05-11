Value

// documents the Value class in Helios 

The Value type represents monetary value as a token bundle (internally represented as a Map[MintingPolicyHash]Map[ByteArray]Int)

Note: 1 ADA is equal to 1 million Lovelace

Note: You might find yourself comparing the output of value.get() to a number in order to check if value contains something, but in that case it is usually better to use the value.contains() method instead.

Associated functions and constants
ZERO
An empty Value.

Value::ZERO -> Value
lovelace
Returns a Value containing only lovelace.

Value::lovelace(amount: Int) -> Value
new
Returns a Value containing an amount of a given AssetClass.

Value::new(asset_class: AssetClass, amount: Int) -> Value
from_data
Value::from_data(data: Data) -> Value
from_map
Instantiates a Value using a raw map.

Value::from_map(raw_value: Map[MintingPolicyHash]Map[ByteArray]Int) -> Value
sum
Sums any list with items that implement the Valuable type class.


Value::sum[V: Valuable](list: []V) -> Value
For example:

Value::sum(list: []Value) -> Value
Getters
value
Returns self. Allows Value to implement the Valuable type class, which in turn allows using Value::sum() associated method for a list of Value.

value.value -> Value
Operators
==
Returns true if two Values are the same.

Value == Value -> Bool
Note: the assets and tokens must also be in the same order for == to return true.

!=
Value != Value -> Bool
>=
Strict greater-equals comparison. If every lhs token has a greater-or-equals amount than the equivalent rhs token then >= returns true. If any rhs token has a greater amount than the equivalent lhs token then >= returns false.

Value >= Value -> Bool
>
Strict greater-than comparison. If every lhs token has a greater amount than the equivalent rhs token then > returns true. If any rhs token has a greater-or-equals amount than the equivalent lhs token then > returns false.

Value > Value -> Bool
<=
Strict less-equals comparison. If every lhs token has a smaller-or-equals amount than the equivalent rhs token then <= returns true. If any rhs token has a smaller amount than the equivalent lhs token, or doesn't exist in lhs, then <= returns false.

Value <= Value -> Bool
<
Strict less-than comparison. If every lhs token has a smaller amount than the equivalent rhs token then < returns true. If any rhs token has a smaller-or-equals amount than the equivalent lhs token, or doesn't exist in lhs, then < returns false.

Value < Value -> Bool
+
Value + Value -> Value
-
Subtracts two Value instances. Note that negative token amounts are possible.

Value - Value -> Value
*
Value * Int -> Value
/
Value / Int -> Value
Methods
contains
Alias for >= (where lhs is self).

value.contains(other_value: Value) -> Bool
contains_policy
Returns true if a given MintingPolicyHash is in a Value.

value.contains_policy(mph: MintingPolicyHash) -> Bool
get
Returns the amount of the given AssetClass in a Value. Throws error if the AssetClass isn't found.

value.get(asset_class: AssetClass) -> Int
get_assets
Returns a new Value with the lovelace removed.

value.get_assets() -> Value
get_lovelace
Returns the amount of lovelace in a Value. Returns 0 if there isn't any.

value.get_lovelace() -> Int
get_safe
Like get, but returns 0 instead of throwing an error if the given AssetClass isn't found.

value.get_safe(asset_class: AssetClass) -> Int
get_policy
Returns a map of tokens of the given MintingPolicyHash in a Value. Throws an error if the MintingPolicyHash isn't found.

value.get_policy(mph: MintingPolicyHash) -> Map[ByteArray]Int
is_zero
Checks if a Value is empty.

value.is_zero() -> Bool
serialize
value.serialize() -> ByteArray
show
Returns a formatted String showing all the assets contained in a Value.

value.show() -> String
to_map
Returning the underlying Map:

value.to_map() -> Map[MintingPolicyHash]Map[ByteArray]Int