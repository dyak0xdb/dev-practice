# 0xdbMapper

A fast network recon pipeline: Subdomain → IP → ASN → CIDR

---

## Description

**0xdbMapper** is a lightweight Node.js tool designed for reconnaissance workflows.
It automates mapping a target domain into infrastructure layers:

* Subdomains
* IP Addresses
* Autonomous System Numbers (ASN)
* CIDR ranges

---

## Features

* Subdomain enumeration (via `subfinder`)
* Resolve IPs (via `cut-cdn`)
* ASN extraction using RIPE API
* CIDR discovery from ASN
* Concurrent processing (async pool)
* Structured output files

---

## Requirements

### System tools

* https://github.com/projectdiscovery/subfinder
* https://github.com/ImAyrix/cut-cdn

```bash
go install -v github.com/projectdiscovery/subfinder/v2/cmd/subfinder@latest
go install github.com/ImAyrix/cut-cdn@latest
```

---

### Node.js modules

* `fs`
* `readline`
* `util`
* `child_process`

External:

```bash
npm init -y
npm install node-fetch
```

---

## Usage

```bash
echo example.com | node main.js
```

---

## Output Files

* `subdomains.txt` → discovered subdomains
* `ip.txt` → resolved IP addresses
* `asn.txt` → unique ASNs
* `cidr.txt` → CIDR ranges

---

## Workflow

```
Domain
  ↓
Subdomains
  ↓
IP Addresses
  ↓
ASN
  ↓
CIDR
```
