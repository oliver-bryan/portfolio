# Project card copy

Short-form copy for the `/projects` index. PackPals links out to the full case study. The other two live entirely on the card.

---

## 1. PackPals

**Crowd-support travel logistics for out-of-state students**
Flutter · Dart · Firebase · Google ML Kit

A mobile platform matching students relocating between states with verified local hosts for transport, short-term accommodation and storage. Rule-based matching filters listings for feasibility before ranking them on location, budget and preference fit, with the resulting score shown to the student as a match quality percentage. Host identity is confirmed through an on-device liveness check and admin review. Tested with eight users across both roles, scoring 86.25 on the System Usability Scale.

*Read the full case study →*

---

## 2. Soil-Crop Matching for Sustainable Agriculture

**An interactive dashboard for data-driven crop planning**
Python · pandas · Plotly · Jupyter

Two agricultural datasets covering 31 crop categories and 11 soil, climate, nutrient and fertilizer attributes, merged into a single queryable source. The hard part was reconciliation: the two schemas disagreed on structure and naming, so standardising them and verifying zero missing or duplicate records came before any analysis was trustworthy.

The result is an interactive dashboard where selecting any of 11 crops updates three Plotly visualisations live, backed by five exploratory charts on soil type, pH, climate, N-P-K requirements and fertilizer usage. Built for a planner who needs an answer about one crop, not a researcher reading a report end to end.

---

## 3. Healthcare Equipment Management System

**An MVC enterprise web application for hospital asset tracking**
Java · Jakarta EE · JDBC · Apache Derby · GlassFish

A server-rendered system for managing medical equipment across three modules: inventory, maintenance scheduling and reservations. Twelve JSP views and twelve servlet controllers sit over four JavaBean models and four DAO components, keeping presentation, business logic and data access cleanly separated rather than letting database calls leak into the view layer.

Staff authenticate through session-based login, with full CRUD and status filtering on every module. The dashboard aggregates totals, status distribution and recent activity so the state of the equipment pool is legible at a glance. Built on the older Jakarta EE stack deliberately, which meant handling the wiring that modern frameworks abstract away.
