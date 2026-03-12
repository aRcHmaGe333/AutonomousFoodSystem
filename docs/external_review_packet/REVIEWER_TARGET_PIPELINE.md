# Reviewer Target Pipeline

## Purpose

This document turns the external-review requirement into a concrete target pipeline.

It is an internal operating surface.
It is not part of the packet sent to reviewers.

## Outcome Required

The first outreach wave should produce named, discipline-relevant reviewers who can do one of two things:

- return written findings against the packet
- take a short call that can be captured into the review response structure

## Qualification Floor

Prioritize targets who meet at least one of these bars:

- direct engineering or operations experience in dairy automation, milking systems, herd handling, dairy hygiene, manure systems, or farm economics
- academic or extension work directly tied to the same domains
- prior commercial responsibility for systems, compliance, or economics in those domains

Reject targets who only offer:

- generic innovation commentary
- startup mentoring without domain depth
- broad agriculture interest without dairy-system relevance
- media, marketing, or investor opinion without operating expertise

## Contact Waves

### Wave 1

Highest-value targets:

- dairy systems engineers
- dairy welfare or animal-behavior specialists

Reason:

- these are the fastest paths to invalidating or tightening the core corridor, cradle, and handling assumptions

### Wave 2

Next targets:

- dairy hygiene, food-safety, and biosecurity specialists
- manure and anaerobic digestion engineers

Reason:

- these pressure-test whether sanitation and resource-loop claims are materially understated

### Wave 3

Final targets:

- farm economics or dairy operations experts

Reason:

- economics should evaluate a version of the concept that has already survived the first physical plausibility pass

## Sourcing Channels

Use these channels in descending order of likely signal quality:

1. university dairy engineering, veterinary, agricultural systems, or extension programs
2. named operators, engineers, or former leads from automated milking or dairy process equipment companies
3. dairy hygiene, food-safety, manure, digestion, or farm-economics consultants
4. industry associations or conference speaker lists where the person clearly matches the required discipline

## Outreach Volume Rule

Do not wait for the perfect single reviewer.

Start with a short, high-fit batch:

- 3 to 5 targets for dairy engineering
- 3 to 5 targets for welfare
- 2 to 4 targets for biosecurity
- 2 to 4 targets for digestion and waste
- 2 to 4 targets for economics

If no meaningful response arrives after one follow-up cycle, replace the low-response targets rather than broadening the brief.

## Status Rules

Use these statuses in the send log:

- target_identified
- message_ready
- sent
- follow_up_sent
- declined
- no_response
- call_scheduled
- written_review_received
- call_notes_captured
- intake_normalized

## Target Table

| Discipline | Target name | Organization | Role or relevance | Why this person fits | Contact channel | Status | Notes |
|---|---|---|---|---|---|---|---|
| Dairy engineering | Douglas Reinemann | UW-Madison Division of Extension / College of Agricultural and Life Sciences | Professor and Extension specialist in machine milking, milk quality, and farm energy | Direct fit for milking-system mechanics, AMS traffic assumptions, and milk-quality constraints | people.extension.wisc.edu contact page for Douglas Reinemann; dairy@extension.wisc.edu fallback | message_ready | Source basis: official UW Extension AMS facility-design article and author profile |
| Dairy engineering | John Tyson | Penn State Extension | Agricultural Engineer, Educator | Listed expertise includes dairy systems design and layout, animal housing design, farm animal welfare, and agricultural ventilation | extension.psu.edu/john-tyson | message_ready | Strong second Wave 1 engineering target because the concept depends on corridor geometry and housing layout |
| Dairy engineering | Daniela Bruno | University of California Cooperative Extension | Dairy advisor for Fresno, Madera, and Kings counties | Active on large-dairy AMS transition work and field-day learning around robotic milking adoption | UC ANR faculty directory entry for faculty id 41031 | target_identified | Use as California AMS operations reality-check target |
| Welfare and behavior | Ricardo C. Chebel | University of Florida College of Veterinary Medicine | Professor of Cattle Health and Welfare; leads UF Dairy Veterinary Extension | Direct welfare and management fit with explicit extension role in dairy health, welfare, management, and training | extension.vetmed.ufl.edu/dairy-extension/; rcchebel@ufl.edu | message_ready | Best lead for welfare-focused critique with explicit dairy extension mandate |
| Welfare and behavior | Jessica Mitchell | Penn State Extension | Extension Educator, Dairy | Listed expertise includes animal behavior, animal welfare, and cow comfort | extension.psu.edu/jessica-mitchell | message_ready | Good fit for refusal-rate, stress, and cow-comfort assumptions |
| Welfare and behavior | Daniela Roland | Penn State Extension | Extension Educator, Dairy | Listed expertise includes animal welfare, cow comfort, and milk quality | extension.psu.edu/daniela-roland | target_identified | Useful alternate if a more extension-heavy on-farm welfare view is preferred |
| Biosecurity and food safety | Ernest Hovingh | Penn State Extension | Extension Veterinarian | Listed expertise includes disease diagnostics and epidemiology, mastitis and milk quality, milking equipment performance, and bovine hoof health | extension.psu.edu/ernest-hovingh | message_ready | High-fit target for contamination paths, udder-health risk, and operational disease critique |
| Biosecurity and food safety | Ginger D. Fenton | Penn State Extension | Extension Educator, Dairy | Listed expertise includes milk quality, dairy food safety, and FSMA preventive controls for dairy | extension.psu.edu/ginger-fenton | message_ready | Best fit for sanitation verification, food-safety framing, and clean-zone claims |
| Biosecurity and food safety | Carolina Pinzon-Sanchez | UW-Madison Division of Extension | Bilingual Dairy Outreach Specialist | Official author of dairy-farm biosecurity guidance; strong outreach and on-farm biosecurity fit | people.extension.wisc.edu contact page for Carolina Pinzon-Sanchez; dairy@extension.wisc.edu fallback | target_identified | Good alternate or referral source if a more biosecurity-specific reviewer is needed |
| Digestion and waste | Neslihan Akdeniz | UW-Madison Department of Biological Systems Engineering / Dairy Innovation Hub | Assistant professor and extension specialist; PI on anaerobic digester microaeration project | Research explicitly covers manure management, nutrient utilization, and digester performance on dairy systems | nesli@wisc.edu | message_ready | Strongest publicly verified digestion lead in the current batch |
| Digestion and waste | Troy Runge | UW-Madison / Dairy Innovation Hub | PI on anaerobic digester performance project | Publicly listed as co-PI on dairy digester performance work | trunge@wisc.edu | message_ready | Good second digestion lead for process and equipment realism |
| Digestion and waste | Robert Meinen | Penn State Extension | Director, Pennsylvania Nutrient Management Education Program | Listed expertise includes nutrient and manure management, manure hauler certification, and agricultural air quality | extension.psu.edu/robert-meinen | target_identified | Good alternate if the review needs more manure-management than digester-design emphasis |
| Economics and operations | Leonard Polzin | UW-Madison Division of Extension | Dairy Markets and Policy Outreach Specialist | Publicly focused on dairy markets, risk management, policy analysis, farm financial decisions, and business sustainability | lpolzin@wisc.edu | message_ready | Best fit for economics thresholding and outward claims about viability |
| Economics and operations | Samantha Gehrett | Penn State Extension | Senior Extension Educator, Dairy | Listed expertise includes dairy business management and dairy processing | extension.psu.edu/samantha-gehrett | message_ready | Good operations-economics target for staffing, opex, and pilot-envelope realism |
| Economics and operations | J. Craig Williams | Penn State Extension | Extension Educator, Dairy | Listed expertise includes dairy management and risk management | extension.psu.edu/j-craig-williams | target_identified | Useful alternate for risk-management and farm-operating-envelope critique |

## Current First-Wave Recommendation

Start with these five sends first:

- Douglas Reinemann for dairy engineering
- Ricardo C. Chebel for welfare and behavior
- Ginger D. Fenton for biosecurity and food safety
- Neslihan Akdeniz for digestion and waste
- Leonard Polzin for economics and operations

Reason:

- each has a directly relevant public extension or program role
- each has either a public email or a direct profile contact path
- together they cover the five review disciplines without relying on anonymous referrals first

## Decision Rule

The outreach goal is not a large list.

The outreach goal is a short pipeline of high-fit people who can give decisive objections or constraints fast.