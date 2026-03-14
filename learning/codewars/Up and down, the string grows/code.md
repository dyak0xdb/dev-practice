# Description

Many programming languages provide the functionality of converting a string to uppercase or lowercase. For example:

- `upcase` / `downcase` in **Ruby**  
- `upper` / `lower` in **Python**  
- `toUpperCase` / `toLowerCase` in **Java/JavaScript**  
- `uppercase` / `lowercase` in **Kotlin**  

Typically, these methods **won't change the size of the string**.

For example, in Ruby:

```ruby
str.upcase.downcase.size == str.size
````

is true for most cases.

---

However, in some special cases, the **length of the transformed string may be longer than the original**. Can you find a string that satisfies this criteria?

For example, in Ruby, that means:

```ruby
str.upcase.downcase.size > str.size
```

You should just set the value of `STRANGE_STRING` to meet the previous criteria.

**Note:** Meta programming is not allowed in this kata. So, the size of your solution is limited.

**Challenge URL:** [Codewars - Strange String](https://www.codewars.com/kata/644b17b56ed5527b09057987)

---

# Solution

```ruby
STRANGE_STRING = "ßooßs"
```

* In this case, converting `"ß"` to uppercase expands it to `"SS"`, which increases the string length.
* Thus, `STRANGE_STRING.upcase.downcase.size > STRANGE_STRING.size`.

---

# Example: Finding Array Elements That Expand When Uppercased

In some cases, converting a string to uppercase may **increase its length**, such as `"ß"` becoming `"SS"`.
Here's an example using JavaScript to detect such cases in an array:

```javascript
let d = [
  'A','B','ß','D','E','F','G','H','I','J','K','L','M','N','O','P',
  'Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f',
  'g','h','i','j','k','l','m','n','o','p','q','s','t','u','v','w',
  'x','y','z','§','ab','bb','Ä','Ö','Ü','dc','ß','ä','ö','ü'
];

d.forEach((item, idx) => {
    let upper = item.toLocaleUpperCase();
    let upper_ = item.toUpperCase();

    if (upper.length !== item.length) {
        console.log(`${item} index ${idx}`);
    } else if (upper_.length !== item.length) {
        console.log("oops");
    }
});
```

* This loop goes through each item in the array `d`.
* It converts each string to uppercase using both `toLocaleUpperCase()` and `toUpperCase()`.
* If the **length of the uppercase string is different** from the original, it prints the item and its **index**.
* Otherwise, it prints `"oops"`.

> Example output for `"ß"`:
>
> ```
> ß index 2
> ```
Do you want me to do that?
```
