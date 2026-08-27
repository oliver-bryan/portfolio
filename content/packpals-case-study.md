---
title: "PackPals"
subtitle: "A crowd-support platform for students moving between states"
role: "Sole designer and developer"
timeline: "Final Year Project, UiTM Shah Alam"
stack: ["Flutter", "Dart", "Firebase", "Cloud Functions", "ML Kit", "Google Places API"]
---

# PackPals

**A mobile platform that connects out-of-state university students with verified local hosts for transport, short-term accommodation and storage.**

Sole designer and developer · Final Year Project · Flutter, Dart, Firebase

---

## The problem

Every semester, thousands of Malaysian students move hundreds of kilometres for university. Students from Sabah and Sarawak are hit hardest: median household income in those states sits at RM4,890 and RM5,504 against a national median of RM7,017, while living costs in Selangor and Kuala Lumpur run RM1,500 to RM2,500 a month.

The cost is only half of it. The other half is that nobody coordinates any of this. Students arrange rides, temporary rooms and box storage through WhatsApp groups, Facebook posts and word of mouth, usually during registration week when they know the fewest people. The information is scattered, often out of date and impossible to compare. There is no way to tell whether the person offering you a ride is trustworthy.

I wanted to know whether a single app could replace that scramble with something structured and verifiable.

## What I built

PackPals is an Android app with two sides. Students post a relocation request specifying location, dates, budget, luggage size and preferences. Hosts, who are verified local students, alumni and small operators, list what they can offer. The app matches the two.

The core flows:

**Request and match.** A student submits a request for transport, accommodation or storage. The app runs it through a matching class specific to that service type, applies hard filters to drop listings that physically cannot serve the request, then scores what survives on location overlap, budget fit and preference alignment. Results are sorted best first with a match quality bar showing the computed score as a percentage, so the student can see *why* a host ranks where it does instead of trusting an opaque list.

**Trust.** Hosts submit identity card captures and complete an on-device liveness check that requires a blink and a smile before submission. An administrator reviews and approves. Verified hosts carry a badge, and ratings are aggregated server-side in a Cloud Function so nobody can inflate their own score.

**Coordination.** Real-time chat with text, photo sharing and live location, since most of the friction in a pickup is agreeing on where exactly to meet. Booking status moves through draft, matching, booked, confirmed, completed and cancelled. Push notifications via FCM keep both sides current when the app is closed.

## Decisions worth explaining

**Filter first, then rank.** Early on I ranked every listing by fit score alone. That surfaced hosts who scored well on price and location but had a car too small for the luggage. Splitting the pipeline into a feasibility gate followed by a preference ranking fixed it. Impossible matches never reach the student at all.

**Showing the score.** Match quality is displayed as a percentage with badges for Best Match, Best Value and Top Pick. In a trust-sensitive context, a number the user can interrogate beats a black box. Testers picked up on this immediately.

**Server-side aggregation.** Rating averages are computed in Cloud Functions rather than on the client. It is a small architectural choice with a large integrity payoff, and it was the right call the moment I thought about who has an incentive to lie.

**A race condition I had to chase.** Booking confirmation had a timing bug where names could resolve inconsistently under concurrent writes. I fixed it with a self-healing name pattern rather than papering over it, which meant understanding what Firestore was actually doing rather than guessing.

## Results

Eight participants from both user groups, students and hosts, ran through the full request and listing flow in person and completed a System Usability Scale questionnaire.

**Average SUS score: 86.25.** Individual scores ranged from 82.5 to 90. That lands in the A+ band, the top of the scale.

The number is encouraging but I would not oversell it. Eight participants at a single point in time measures perceived usability, not whether the platform actually reduces relocation cost or stress. That would need a longitudinal study across full academic cycles.

## What I would do differently

**Payments sit outside the app.** Students and hosts settle privately, which leaves no transaction record and no dispute protection. An FPX or Touch 'n Go integration was out of scope but is the most obvious gap.

**Verification does not scale.** A human approves every host. That works at prototype size and becomes a bottleneck immediately after. The document authenticity check needs to be automated.

**Two-sided cold start.** The platform is only as useful as its host supply, and I tested inside one university on Android only. Coverage across campuses and devices is unproven.

Naming these is not a formality. Each one is a design constraint I now understand better than I did when I started.

## Stack

| Layer | Technology |
|---|---|
| Frontend | Flutter, Dart |
| Auth | Firebase Authentication with mandatory email verification |
| Database | Cloud Firestore, real-time sync |
| Storage | Firebase Cloud Storage |
| Server logic | Cloud Functions (Node.js) |
| Push | Firebase Cloud Messaging |
| Face detection | Google ML Kit |
| Location | Google Places API, Geolocator |
| Design | Canva, Draw.io |

Built following the Mobile Application Development Life Cycle across identification, design, development and testing phases.
