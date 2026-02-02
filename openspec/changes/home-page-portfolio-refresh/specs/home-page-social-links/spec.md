## ADDED Requirements

### Requirement: Home page provides GitHub and LinkedIn profile links
The home page SHALL present direct links for GitHub and LinkedIn in an intentional, high-visibility placement.

#### Scenario: GitHub link is present and correct
- **WHEN** the visitor views the social/profile actions on the home page
- **THEN** a GitHub link is available and points to `https://github.com/alissonbgs`.

#### Scenario: LinkedIn link is present and correct
- **WHEN** the visitor views the social/profile actions on the home page
- **THEN** a LinkedIn link is available and points to `https://www.linkedin.com/in/alissonsabino`.

### Requirement: Social links use recognizable icons with labels
The home page SHALL render GitHub and LinkedIn links with recognizable icons and readable text labels.

#### Scenario: Social icons and labels are both visible
- **WHEN** the visitor views the social link actions
- **THEN** each action includes an icon and text label identifying the platform.

### Requirement: Social links are accessible
The social link controls SHALL provide accessible names suitable for assistive technologies.

#### Scenario: Link actions expose accessible names
- **WHEN** assistive technology reads the social links
- **THEN** each link exposes a platform-specific accessible name.
