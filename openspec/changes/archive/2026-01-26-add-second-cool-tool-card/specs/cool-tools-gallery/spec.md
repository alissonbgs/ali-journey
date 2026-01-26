## ADDED Requirements

### Requirement: Cool Tools page shows two tool cards
The Cool Tools page SHALL render at least two tool cards in the grid, with the second card representing the Video Suggestion tool.

#### Scenario: Tools grid includes Video Suggestion card
- **WHEN** a user visits `/tools`
- **THEN** the grid displays a second card titled "Video Suggestion" with the description "Find great videos about any subject."

### Requirement: Video Suggestion card is non-navigable
The Video Suggestion card SHALL not navigate when clicked until an external link is available.

#### Scenario: Clicking Video Suggestion card does nothing
- **WHEN** a user clicks the "Video Suggestion" card
- **THEN** no navigation occurs.
