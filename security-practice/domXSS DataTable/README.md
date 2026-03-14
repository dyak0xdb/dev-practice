DOM XSS – DataTables
Library DataTables (jQuery plugin)
DataTables renders table content using `innerHTML` by default.
If attacker-controlled input is passed to the table, it may lead to DOM-based XSS Sink `DataTable()` Payload Example`<img src=x onerror=alert(1)>`
