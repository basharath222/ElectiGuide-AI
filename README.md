# ElectiGuide-AI
An autonomous agent that doesn't just "talk" about elections but acts for the user. It creates personalized election roadmaps, syncs deadlines to Google Calendar, and finds polling stations via Google Maps.

## Chosen Vertical: Civic Engagement & Education
Approach: I used an "Agentic Workflow" where the assistant doesn't just provide static info but acts as a personal consultant.
Logic:

Validation Layer: Checks user age and location before providing specific process steps.

Dynamic Fetching: Uses Gemini to parse official election websites for current timelines.
Assumptions:

Users have a Google Account for Calendar syncing.

The assistant assumes the user is a first-time or general voter.
