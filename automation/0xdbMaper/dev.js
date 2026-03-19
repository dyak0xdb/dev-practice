const fs = require("fs").promises;
const fsSync = require("fs");
const readline = require("readline");
const fetch = require("node-fetch");
const util = require("util");
const exec = util.promisify(require("child_process").exec);

const count = async (file) =>
  (await fs.readFile(file, "utf8")).split("\n").filter(Boolean).length;

const asyncPool = async (poolLimit, array, iteratorFn) => {
  const ret = [];
  const executing = [];
  for (const item of array) {
    const p = Promise.resolve().then(() => iteratorFn(item));
    ret.push(p);

    if (poolLimit <= array.length) {
      const e = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e);
      if (executing.length >= poolLimit) {
        await Promise.race(executing);
      }
    }
  }
  return Promise.all(ret);
};

async function runCommand(domain) {
  try {

console.log(`
\x1b[37m
  ██████╗ ██╗  ██╗██████╗ ██████╗ ███╗   ███╗ █████╗ ██████╗ ██████╗ ███████╗██████╗ 
 ██╔═══██╗╚██╗██╔╝██╔══██╗██╔══██╗████╗ ████║██╔══██╗██╔══██╗██╔══██╗██╔════╝██╔══██╗
 ██║   ██║ ╚███╔╝ ██║  ██║██████╔╝██╔████╔██║███████║██████╔╝██████╔╝█████╗  ██████╔╝
 ██║   ██║ ██╔██╗ ██║  ██║██╔══██╗██║╚██╔╝██║██╔══██║██╔═══╝ ██╔═══╝ ██╔══╝  ██╔══██╗
 ╚██████╔╝██╔╝ ██╗██████╔╝██████╔╝██║ ╚═╝ ██║██║  ██║██║     ██║     ███████╗██║  ██║
  ╚═════╝ ╚═╝  ╚═╝╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝     ╚══════╝╚═╝  ╚═╝
\x1b[0m
 \x1b[90m> Tool: 0xdbMapper v1.0 | Operator: dyak0xdb\x1b[0m
 \x1b[37m--------------------------------------------------------------------------\x1b[0m
    `);

    await fs.writeFile("subdomains.txt", "");
    await fs.writeFile("ip.txt", "");
    await fs.writeFile("asn2.txt", "");
    await fs.writeFile("asn.txt", "");
    await fs.writeFile("cidr.txt", "");

    console.log(`\x1b[32m[+]\x1b[0m Target: \x1b[37m${domain}\x1b[0m`);

    await exec(`subfinder -d ${domain} -silent > subdomains.txt`);
    console.log(`\x1b[32m[+]\x1b[0m Subdomains : \x1b[37m${await count("subdomains.txt")}\x1b[0m`);

    await exec('cat subdomains.txt | cut-cdn > ip.txt');
    console.log(`\x1b[32m[+]\x1b[0m Unique IPs : \x1b[37m${await count("ip.txt")}\x1b[0m`);

    const ips = (await fs.readFile("ip.txt", "utf8")).split("\n").filter(Boolean);

    await asyncPool(5, ips, async (ip) => {
      try {
        const res = await fetch(`https://stat.ripe.net/data/prefix-overview/data.json?resource=${ip}`);
        const data = await res.json();
        const asn = data?.data?.asns?.[0]?.asn;
        if (asn) await fs.appendFile("asn2.txt", `AS${asn}\n`);
      } catch (err) {
        // Error silent
      }
    });

    await exec('sort -u asn2.txt > asn.txt && rm asn2.txt');
    console.log(`\x1b[32m[+]\x1b[0m ASNs found : \x1b[37m${await count("asn.txt")}\x1b[0m`);

    const asns = (await fs.readFile("asn.txt", "utf8")).split("\n").filter(Boolean);

    await asyncPool(5, asns, async (asn) => {
      try {
        const res = await fetch(`https://stat.ripe.net/data/announced-prefixes/data.json?resource=${asn}`);
        const data = await res.json();
        const prefixes = data?.data?.prefixes || [];
        for (const p of prefixes) {
          await fs.appendFile("cidr.txt", `${p.prefix}\n`);
        }
      } catch (err) {
        // Error silent
      }
    });

    console.log(`\x1b[32m[+]\x1b[0m CIDRs total : \x1b[37m${await count("cidr.txt")}\x1b[0m`);
    console.log(`\x1b[32m==========================================================================\x1b[0m`);
    console.log(`\x1b[32m[SUCCESS]\x1b[0m Results saved in subdomains.txt, ip.txt, asn.txt, cidr.txt\x1b[0m\n`);

  } catch (error) {
    console.error(`\x1b[31m[!] Fatal Error: ${error.message}\x1b[0m`);
  }
}

const rlDomain = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rlDomain.on("line", (domain) => {
  domain = domain.trim();
  if (!domain) return;
  rlDomain.close();
  runCommand(domain);
});
