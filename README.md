# OKEvents

Web app for creating, managing, and tracking events and their attendees.

🔗 **Live demo:** https://ok-events-gold.vercel.app

## Overview

OKEvents is an internal event management tool for organizers. It lets you create and configure events, register guests (individually or via bulk upload), handle check-ins on the day, and export attendance reports — all in one place.

## Tech Stack

- **Framework:** Next.js 13
- **Language:** JavaScript
- **Styling:** Tailwind CSS + Material Tailwind
- **Backend/DB:** Firebase (Firestore + Auth)
- **Deployment:** Vercel

## Architecture

Layered architecture that separates responsibilities:

- **`DAO/`** — Data Access Objects: all Firestore reads/writes (events, members, users, reports)
- **`BAO/`** — Business Access Objects: auth context and business logic
- **`UI-Components/`** — reusable presentation components (cards, modals, layout)
- **`pages/`** — Next.js routes; each page composes BAO + UI-Components

## Features

- Create and edit events with full configuration
- Browse active events from the home dashboard
- Register attendees individually or via bulk CSV/Excel upload
- Check-in guests on event day
- Open/close registration table per event
- Export attendance reports to Excel (`.xlsx`)
- Firebase-authenticated user sessions

## Running locally

```bash
git clone https://github.com/KevinSequeiraG/OKEvents.git
cd OKEvents
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> Requires a Firebase project. Add your config to `pages/firebaseConfig.js` and a service account key for `firebase-admin`.
