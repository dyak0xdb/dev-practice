# Alphabet Position

**Codewars Kata:**  
https://www.codewars.com/kata/546f922b54af40e1e90001da

## Description
Welcome.

In this kata, you are required to take a string and replace every letter with its position in the alphabet.

If any character in the text is not a letter, ignore it and do not return it.

- "a" = 1  
- "b" = 2  
- ...  
- "z" = 26

## Example
**Input:**  
`"The sunset sets at twelve o' clock."`

**Output:**  
`"20 8 5 19 21 14 19 5 20 19 5 20 19 1 20 20 23 5 12 22 5 15 3 12 15 3 11"`

---

## Solution (JavaScript)

```javascript
function alphabetPosition(text) {
    let result = [];

    for (const key of text) {
        if (/[a-zA-Z]/.test(key)) {
            result.push(key.toLowerCase().charCodeAt(0) - 96);
        }
    }

    return result.join(" ");
}

console.log(alphabetPosition("The sunset sets at twelve o' clock."));
````
