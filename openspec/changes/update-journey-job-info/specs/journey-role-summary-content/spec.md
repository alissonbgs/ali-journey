## ADDED Requirements

### Requirement: Journey role summaries reflect provided role highlights
The Journey data source SHALL provide meaningful `summary` text for the roles `find-my-profession`, `smarkio`, `embraer`, and `black-bee-drones`, and each summary MUST be derived from the provided highlight content for that role.

#### Scenario: Updated summary for Find My Profession
- **WHEN** the Journey entry with id `find-my-profession` is rendered
- **THEN** its `summary` communicates API implementation/maintenance, legacy data migration, UI/UX implementation, React UI maintenance, and direct client communication.

#### Scenario: Updated summary for Smarkio
- **WHEN** the Journey entry with id `smarkio` is rendered
- **THEN** its `summary` communicates faster chatbot delivery, dashboard/data-visualization improvements, API maintenance, internal Node.js library development, and unit test implementation.

#### Scenario: Updated summary for Embraer
- **WHEN** the Journey entry with id `embraer` is rendered
- **THEN** its `summary` communicates automation gains for aircraft 3D model workflows, Excel I/O automation tooling, and backend support for storing/manipulating 3D software data.

#### Scenario: Updated summary for Black Bee Drones
- **WHEN** the Journey entry with id `black-bee-drones` is rendered
- **THEN** its `summary` communicates C++/Python development, OpenCV-based computer vision work for drone competition, and TensorFlow research for CV algorithms.

### Requirement: Protected Journey fields remain unchanged
For the targeted roles, the system SHALL NOT change `dateRange`, `company`, `stackSummary`, or `technologies` during this update.

#### Scenario: Protected fields are preserved
- **WHEN** the Journey data update is applied
- **THEN** only `summary` content changes for targeted entries and protected fields remain exactly as before.

### Requirement: Globant entry remains untouched
The Journey entry with id `globant1` SHALL remain unchanged across all fields in this change.

#### Scenario: Globant data is preserved
- **WHEN** the Journey data update is applied
- **THEN** the `globant1` entry content is identical to its pre-change state.
