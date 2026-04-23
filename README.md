# Roofing Company CRM

A React-based CRM built for a roofing company that handles storm-damaged roofs and insurance claims. This app helps track leads from first contact through claim progress, job completion, and follow-up.

## Overview

This project is designed to manage the workflow of roofing leads and customers, including:

- New lead intake
- Inspection and claim tracking
- Insurance company information
- Assigned sales rep tracking
- Lead detail pages
- Creating new leads
- Persistent local data with `json-server`

## Features

- View all leads in a clean dashboard-style list
- View individual lead details
- Add new leads through a form
- Save leads to a local `database.json`
- Display newest leads first
- Navigate through the app with React Router
- Styled with Tailwind CSS

## Tech Stack

- React
- Vite
- React Router
- Tailwind CSS
- JSON Server

## Project Structure

```bash
roofing-crm/
  api/
    database.json
  src/
    components/
    pages/
    services/
    data/
    App.jsx
    main.jsx
    index.css
  package.json

Future Improvements
Edit existing leads
Update lead stage from the detail page
Delete leads
Add notes and task tracking
Add insurance check tracking
Add production/job scheduling
Add dashboard metrics and reporting
Add authentication and user roles
Purpose

This project was built as a practical CRM prototype for a roofing company workflow, with a focus on storm damage claims and customer pipeline tracking.

Author

Kris Cagle
GitHub: KrisCagle
