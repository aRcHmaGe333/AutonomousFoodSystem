Status: approved

# Vehicle modularity — adaptable trailers and extendable capacity

Purpose
-------
Explore practical, incremental ideas for vehicle modularity that can be compatible with this project's logistics: adaptable trailers, extendable plates/girders, rack interfaces, and constraints.

Principles
----------
- Compatibility: prefer designs that work with standard road clearances and existing vehicle classes to minimize regulatory friction.
- Modular interfaces: standard rack attachment points, bolted plate interfaces, and common electrical/data connectors.
- Safety and structural integrity: extensions must meet load and fatigue requirements; use proven engineering (girders, telescopic beams) with rated connectors.

Practical concepts
------------------
1. Interchangeable trailer modules
- Standard trailer chassis with quick-change modules (insulated box, open flatbed, refrigerated module, container-carrying module).
- Use ISO-style twist-lock or custom quick-release pins to secure modules.

2. Extendable capacity using plates/girders
- Telescoping frames or fold-out outriggers that increase floor area while remaining within legal width limits when folded.
- Deployable floor plates supported by folding girder arms; rated for dynamic loads.
- Requires clear operational rules (no high-speed extension on highways) and secure locking mechanisms.

3. Rack interface standardization
- Standardized internal racks that align with depot washing systems and pallet sizing.
- Racks with ISO-like dimensions to allow stacking and cross-loading across vehicles and depots.

4. Trailer-to-trailer coupling and convoy modularity
- Semi-autonomous convoys where trailers are dropped and picked up at micro-depots (trailer swapping to avoid wasting vehicle time returning).

Materials & structure
---------------------
- High-strength steel for main chassis; aluminum or composite panels for module bodies where weight matters.
- Reinforced mounting points and rated shear connectors for extendable plates.

Regulatory & operational constraints
-----------------------------------
- Local width and axle load limits; extensions must respect legal limits or only be used off-highway.
- Insurance and vehicle certification for modified trailers — pilot in controlled environments first.

Compatibility with project
--------------------------
- Define a standard trailer-module API (mechanical attachment, electrical power/data) in `docs/vehicle_modularity.md` and implement a small simulator that models swap times and capacity gains.
- Start with a depot-to-depot model where trailers are swapped at micro-depots to increase utilization.

Next steps
----------
- Draft a minimal mechanical spec for a quick-change trailer module (dimensions, attachment points, typical payload).
- Model capacity gains in a small simulator or spreadsheet to evaluate break-even for trailer swaps vs returns.
- Potential addition: a `tools/trailer_simulator.js` that models a simple swap+delivery flow.

Trailer anatomy & practical girder/plate notes
----------------------------------------------
Basic trailer elements (common terms):

- Chassis / frame: the primary structural steel beams that carry axle loads. Often composed of two long main rails and transverse crossmembers.
- Crossmembers: transverse beams that tie the two main rails together and support the floor. These can be solid beams, C-channels, or boxed sections.
- Floor / deck plates: the surface that carries cargo (timber, steel plate, or composite panels). Floors are often bolted or welded to crossmembers.
- Stanchions / side posts: vertical supports that create sides for a box or support a removable sidewall.
- Top rails / roof bows: transverse curved or straight members that support a removable roof or tarpaulin.
- Bulkheads / bulkhead frames: the front vertical frame that prevents forward cargo shift.

How to make them modular/adaptable (concepts):

- Telescoping crossmembers (girders): use nested box-section beams that slide within one another and lock at discrete positions. They spread load into the chassis via rated bearings and shear pins. Suitable for controlled deployments — must be engineered for bending and shear under dynamic load.

- Sliding side panels and clip-in decks: side panels that slide into rails on the chassis and lock with cam clamps or pins. Allows converting a flatbed to an enclosed box quickly.

- Fold-out floor plates: hinged or foldable plates that extend the deck area; supported by folding girder arms or telescopic outriggers that lock under load. Useful for temporary expansion in low-speed urban contexts.

- Removable modular floor inserts: standard floor panels that can be bolted or pinned to crossmembers to create different interior geometries for crates, racks, insulation, or refrigeration modules.

- Attachment methods: quick-release pins, twist-locks (ISO), bolted flanges, cam-locks. Design for fail-safe retention (redundant pins, interlocks) and clear visual/tactile indicators when locked.

Safety, engineering and operational cautions
-----------------------------------------
- Structural design: any extendable element must be treated as a primary structural member. Use certified engineering for load paths, fatigue, and dynamic stresses.
- Legal constraints: extensions that change width, overhang, or axle loading may require special permits or be illegal on public highways. Consider fold-out elements that are only deployed at low speed in controlled zones.
- Maintenance and inspection: telescoping beams and sliding rails require lubrication, corrosion control, and periodic inspection. Design for easy access to wear points.
- Controls & interlocks: add mechanical or electronic interlocks that prevent driving with unsupported deployed extensions. Use sensors to verify locked state before vehicle motion is allowed.
- Human factors: design clear procedures and jigs for operators to deploy and stow modules safely and quickly; include checklists and signaling.

Where this fits the project
---------------------------
- Start with depot-level swaps where vehicles remain standard on-road and module swapping happens off-road in controlled depots.
- Use fold-out or telescoping elements only for last-mile micro-distribution in low-speed zones, with strict operational rules.
- Prototype with simple bolt-on and pinned extensions before attempting complex telescoping girders; validate with load tests and a small field trial.

Vehicle-adapts-to-cargo approaches
----------------------------------
If changing cargo shapes to match vehicle modules is impractical, design the vehicle to adapt to diverse cargo by providing flexible, reconfigurable internal geometry. Practical approaches:

- Adjustable-height decks: multi-level decks on telescoping columns or scissor lifts allow vehicles to change internal volume distribution and carry tall or short items efficiently.

- Modular fixture rails: T-track or slotted rail systems throughout the floor and sides let workers or robots add/removing dividers, tie-downs, and padded inserts quickly.

- Active clamps and automated lashing: deployable clamps or inflatable friction pads that conform to irregular shapes and secure them without bespoke packaging.

- Inflatable/conformal supports: temporary airbags or inflatable bladders that fill voids around irregular cargo to prevent shifting; lightweight and fast to deploy.

- Robotic reconfigurers: small depot robots that rearrange modular inserts or load/unload items into standardized crates, allowing the vehicle interior to be quickly reconfigured between runs.

Tradeoffs and recommendations
-----------------------------
- Complexity vs flexibility: active systems (robotic reconfigurers, active clamps) provide high flexibility but increase cost, maintenance, and points of failure.
- Start simple: implement modular fixture rails and removable inserts first — low-cost, low-tech, and compatible with manual workflows.
- Human/robot hybrid: use humans for complex packing decisions in early pilots, with robots handling repetitive repositioning tasks as the system matures.
- Safety & certification: active clamps and lifting decks must include locks and interlocks to prevent accidental movement during transit.

Prototyping steps
-----------------
1. Define a small set of standard crate/inserts covering 80% of expected SKU shapes.
2. Add T-track rails to a prototype van/trailer and test manual insertion/removal and tie-down times.
3. Pilot inflatable supports for delicate/fragile items and measure damage rates vs padded inserts.
4. If needed, prototype a simple robotic reconfigurer at the depot that moves inserts between vehicles during swaps.

Where to place this in the repo
------------------------------
- Keep the conceptual notes here in `docs/vehicle_modularity.md` and add example part sketches and an operations checklist in `docs/vehicle_modularity_specs.md` for quick prototyping.


