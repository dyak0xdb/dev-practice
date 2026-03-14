# ATM PIN Validation

ATM machines allow **4 or 6 digit PIN codes**.  
PIN codes **cannot contain anything but exactly 4 digits or exactly 6 digits**.

---

## Task

Write a function that:

- Returns `true` if the given PIN string is valid.  
- Returns `false` if the PIN string is invalid.

---

## Examples

| Input      | Output |
|------------|--------|
| `"1234"`   | `true` |
| `"12345"`  | `false`|
| `"a234"`   | `false`|
| `"123456"` | `true` |

---

## Solution:

```javascript
function validatePIN(pin) {
  return (pin.length === 4 || pin.length === 6) && /^\d+$/.test(pin);
}

// Test cases
console.log(validatePIN("1234"));    // true
console.log(validatePIN("12345"));   // false
console.log(validatePIN("a234"));    // false
console.log(validatePIN("123456"));  // true
````
## Challenge Link

[Regex validate PIN code — Codewars](https://www.codewars.com/kata/55f8a9c06c018a0d6e000132)
