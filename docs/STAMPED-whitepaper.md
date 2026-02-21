# STAMPED

### Public Authorship Infrastructure for the Post-Patent Era

**v1.1 — February 2026**

---

## The Problem Is Not Complicated

You made something. You need the world to know you made it, when you made it, and that nobody made it before you. And you need that proof to cover the whole thing — not one file at a time, but the entire body of work as a unit.

That is the entire problem.

The current system's answer: pay thousands, wait years, submit to a single government employee's subjective opinion, pay recurring fees to keep a piece of paper alive, and then — if someone steals your work — pay hundreds of thousands more to argue about it in a room full of people who don't understand it, while janitors, bailiffs, court reporters, and jurors all eat lunch on the clock, every one of them a priority over the actual priority.

The actual answer: **publish it, hash it, timestamp it, done.**

---

## What Stamped Does

You submit your work. You get back proof that it's yours.

The proof is a **cryptographically signed, independently verifiable, publicly accessible, permanently timestamped record** that your work — as a complete, indivisible bundle — existed in your possession at a specific moment in time, and that no prior record of it exists.

### The Process

**1. Submit.**
Upload your files. Code, schematics, formulas, documentation, CAD drawings, white papers, datasets, images, audio, video — anything digital. **The act of submission is your consent.** By clicking Submit, you authorize Stamped to hash, timestamp, and license your content. No further paperwork. No forms. No approvals.

**2. Hash the bundle.**
Stamped computes a SHA-512 hash of every file, then builds a **Merkle tree** — pairing and rehashing until a single **root hash** remains. This root hash is a unique fingerprint of every file in your submission, collectively. Change one byte in one file and the root changes. Add a file, remove a file — the root changes. The root proves the bundle as a whole, not just individual pieces.

**3. Timestamp.**
The Merkle root is submitted to multiple independent RFC 3161-compliant Time Stamping Authorities. The TSA signs the hash with a verified UTC clock and returns a `.tsr` token: a portable, cryptographic receipt that says "this exact data existed at this exact second."

For redundancy, the root is also submitted to OpenTimestamps, which anchors it to the Bitcoin blockchain — a second, decentralized proof layer independent of any single authority.

This is not experimental technology. RFC 3161 has been in production since 2001. It is used by banks, governments, and forensics labs. It is legally admissible under EU eIDAS and US Federal Rules of Evidence. It is boring, robust, and incontrovertible.

**4. License.**
The submission is wrapped in the **APC License** (All Rights Reserved — Authorship & Patent Claim, v1.1). This license explicitly asserts:

- You are the Author.
- You reserve all rights — to the expression and to the underlying ideas.
- The Merkle root hash is your proof of integrity.
- The timestamp is your patent claim.
- The public record is your evidence.
- No permission is granted to anyone for anything without your explicit consent.

The license also establishes irrevocable prior art: if anyone ever tries to patent what you published, your record destroys their claim.

**5. Package and return.**
You receive a Stamped bundle containing:

| Item | What It Proves |
|------|---------------|
| Your original files | The work itself |
| SHA-512 hash manifest | Individual file integrity |
| Merkle root hash | Bundle-level integrity (the whole, not just parts) |
| RFC 3161 timestamp token(s) | Date and time of existence, signed by independent authority |
| OpenTimestamps proof | Redundant blockchain-anchored timestamp |
| APC License (populated) | Legal declaration with your hashes, dates, and authorship embedded |
| VERIFY.md | Instructions for anyone to independently confirm everything above |

**That is your Stamped package.** It is self-contained. It is verifiable by anyone with OpenSSL. If Stamped disappears tomorrow, your proof still works — because the proof is in the math, not in the service.

---

## For Git Repositories (The Closed Loop)

If your work lives in a Git repository, Stamped operates on the **Git tree hash** (`HEAD^{tree}`) — not the commit hash. The tree hash represents the exact content of all tracked files, stripped of manipulable metadata like author dates and commit messages. It cannot be backdated.

The workflow:

```
Commit → Extract tree hash → Send to TSA → Receive timestamp token
→ Store token in .timestamps/ → Commit the token → Push
```

This creates a closed, self-referencing chain of evidence: the timestamped content and its proof live in the same repository, each reinforcing the other.

### Automated via GitHub Actions

Drop a workflow file into your repo and every push to `main` is automatically timestamped, verified, and committed. No manual steps. The `.timestamps/` folder accumulates a permanent history of cryptographic proofs, one per push. (See VERIFY.md for the complete workflow file.)

This means **a GitHub repository with APC + automated timestamping is a continuously self-proving record of authorship** — stronger than a patent filing, because it is updated with every commit, not frozen at a single application date.

---

## Why This Works (And Why the Old System Doesn't)

Consider what any court, anywhere, needs to resolve an authorship dispute:

| Question | Stamped's Answer | The Patent System's Answer |
|---|---|---|
| Who had it first? | The timestamp. | A filing date, years after the work was done. |
| Can they prove the content existed at that time? | Yes. The hash is bound to the timestamp by the TSA's cryptographic signature. | They can prove they filled out a form. |
| Is the proof independently verifiable? | Yes. By anyone. With free tools. Right now. | Only by the patent office that issued it. |
| Could the proof be fabricated? | No. Altering the content breaks the hash; altering the timestamp breaks the signature. | The system itself is the fabrication — a single examiner's subjective opinion, rubber-stamped or rejected based on quotas, mood, and the luck of the draw. |
| What does it cost to maintain? | Nothing. The internet maintains it. | Thousands in recurring fees, or the "protection" lapses. |
| What does it cost to enforce? | The proof enforces itself — it exists, it's public, it's verifiable. | Hundreds of thousands to millions in litigation, decided by juries who don't understand the technology. |

One of these systems is based on evidence. The other is based on permission.

---

## What Stamped Does Not Do

Stamped does not grant you a government patent. It does not interface with the USPTO, WIPO, EPO, or any patent office. It does not send lawyers. It does not monitor markets. It does not pretend that a centralized enforcement apparatus is necessary, desirable, or competent.

Stamped makes your authorship a **fact of public record**, proven by cryptography and time.

What you do with that fact is yours.

---

## The Obvious Update

Every system of proof in history has moved from authority-based to evidence-based. Medicine moved from "the doctor says so" to peer-reviewed trials. Cartography moved from the king's mapmaker to satellite imaging. Financial accounting moved from "trust the ledger keeper" to cryptographic audit trails.

Intellectual property is the last holdout. It still runs on "the examiner says so." It still charges rent on proof. It still requires you to ask permission to own what you created.

The evidence-based alternative has been operational for 25 years. The cryptography is mature. The standards are ratified. The tools are free. The timestamps are legally admissible across the EU and increasingly in the US.

The only reason this hasn't replaced the patent system is that the patent system is an industry — with employees, budgets, law firms, and revenue streams that depend on the friction staying exactly where it is. Every calorie burned in that system is a calorie not spent on actual progress.

Stamped does not disrupt that system. It ignores it. The infrastructure was already here. Someone just needed to assemble it and say it out loud.

---

## Technical Stack

| Component | Standard / Tool | Status |
|-----------|----------------|--------|
| File hashing | SHA-512 (NIST FIPS 180-4) | Universal standard |
| Bundle integrity | Merkle tree (SHA-512 leaf hashes) | Used in Git, Bitcoin, IPFS |
| Trusted timestamping | RFC 3161 (IETF, 2001) | 25 years in production |
| Redundant timestamping | OpenTimestamps (Bitcoin anchoring) | Decentralized, operational |
| Timestamp verification | OpenSSL (open source) | Ships with every server OS |
| Legal admissibility (EU) | eIDAS Regulation, Art. 41–42 | Binding EU law since 2016 |
| Legal admissibility (US) | Federal Rules of Evidence 901(b)(9) | Electronic evidence authentication |
| Repository integrity | Git tree hash (`HEAD^{tree}`, SHA-1/SHA-256) | Industry standard since 2005 |
| Automation | GitHub Actions | Free tier covers most usage |
| Free TSA services | FreeTSA.org, DigiCert, others | Operational, RFC 3161 compliant |
| License framework | APC License v1.1 | Included in every Stamped package |

No tokens. No wallets. No browser extensions. No "Web3." No purple-and-green code boxes from companies that exist to be acquired. Standard internet infrastructure, assembled into the configuration that should have existed from the start.

---

## Pricing

Near zero. The infrastructure costs are trivial: TSA calls are free, hashing is local, Git is free, GitHub Actions are free. A Stamped registration should cost less than a cup of coffee. If it ever costs more than that, someone has inserted a toll booth where there shouldn't be one.

---

## Getting Started Without Stamped

You do not need this service. That is the point. Here is the full manual process:

```bash
# 1. Initialize a Git repo with your work and the APC License.
git init my-work
cd my-work
cp /path/to/your/files .
cp /path/to/LICENSE-APC.md ./LICENSE
git add .
git commit -m "Initial publication — APC License v1.1"

# 2. Extract the tree hash (content fingerprint, not commit metadata).
TREE_HASH=$(git rev-parse HEAD^{tree})
echo "Tree hash: $TREE_HASH"

# 3. Timestamp the tree hash via FreeTSA (RFC 3161).
echo -n "$TREE_HASH" > /tmp/tree_hash.txt
openssl ts -query -data /tmp/tree_hash.txt -no_nonce -sha512 -cert -out /tmp/request.tsq
curl -H "Content-Type: application/timestamp-query" \
     --data-binary '@/tmp/request.tsq' \
     https://freetsa.org/tsr \
     -o .timestamps/${TREE_HASH}.tsr

# 4. Verify immediately.
wget https://freetsa.org/files/tsa.crt
wget https://freetsa.org/files/cacert.pem
openssl ts -verify -in .timestamps/${TREE_HASH}.tsr \
     -queryfile /tmp/request.tsq \
     -CAfile cacert.pem -untrusted tsa.crt
# → "Verification: OK"

# 5. Commit the proof and push.
mkdir -p .timestamps
git add .timestamps/
git commit -m "APC timestamp proof: tree $TREE_HASH"
git push -u origin main
```

Six steps. Free. Verifiable by anyone. Permanent.

---

## Deliverables Summary

This system produces four files that, together, constitute a complete authorship claim:

| File | Purpose |
|------|---------|
| `LICENSE` (APC v1.1) | Legal declaration of authorship, rights reservation, and patent claim |
| `VERIFY.md` | Independent verification instructions for anyone |
| `.timestamps/*.tsr` | RFC 3161 cryptographic timestamp tokens |
| `.github/workflows/timestamp.yml` | Automated timestamping on every push (optional) |

Drop these into any repository. The system runs itself from that point forward.

---

**Stamped is infrastructure, not authority. The proof is in the math. The ownership is in the record. The rest is noise.**
