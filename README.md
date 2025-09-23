
# Road Rescue App

A full-stack roadside assistance platform where **drivers** request rescue services, **providers** respond in real time, and **admins** oversee operations. Features include real-time chat, live location tracking, interactive maps, provider approval, and **M-Pesa STK Push** payments.

---

## Table of Contents

1. [Features](#features)  
2. [Tech Stack](#tech-stack)  
3. [Architecture & User Roles](#architecture--user-roles)  
4. [Getting Started](#getting-started)  
5. [Environment Variables](#environment-variables)  
6. [Running Locally](#running-locally)  
7. [Key Workflows](#key-workflows)  
8. [API Endpoints](#api-endpoints)  
9. [Frontend Details](#frontend-details)  
10. [Real-Time Location & Maps](#real-time-location--maps)  
11. [Chat](#chat)  
12. [Payments (M-Pesa STK Push)](#payments-m-pesa-stk-push)  
13. [Testing](#testing)  
14. [Deployment](#deployment)  
15. [Future Improvements](#future-improvements)  
16. [License](#license)

---

## Features

- **Role-based Access**
  - **Driver:** Request roadside assistance, view provider ETA on map, and chat in real time.  
  - **Provider:** Accept/decline requests, update job status, broadcast live location, and chat with drivers.  
  - **Admin:** Approve/unapprove providers, monitor requests, manage users, and view analytics.  
- **Real-time Chat:** Built with Rails ActionCable/WebSockets for seamless communication.  
- **Live Location Tracking:** Real-time updates of provider and driver positions using **React Leaflet** maps.  
- **M-Pesa STK Push Payments:** In-app secure payments initiated when a provider accepts a request.  
- **Dynamic User Management:** Optimistic UI for approving/unapproving providers.  
- **Analytics Dashboard:** Admin access to KPIs and performance metrics.  

---

## Tech Stack

| Layer      | Tools/Frameworks                                  |
|-------------|-------------------------------------------------|
| **Frontend**| React, React Router v6+, React Leaflet, BootstrapCSS |
| **Backend** | Ruby on Rails (API mode), ActionCable/WebSockets  |
| **Database**| PostgreSQL                                      |
| **Payments**| M-Pesa STK Push API                              |
| **Maps**    | Leaflet + OpenStreetMap                           |
| **Auth**    | Devise or JWT-based authentication                |
| **Deployment**| Render / Heroku (API), Netlify / Vercel (frontend) |

---

## Architecture & User Roles

```mermaid
flowchart LR
    Driver -->|Request Rescue| API
    Provider -->|Accept & Share Location| API
    Admin -->|Manage & Monitor| API
    API -->|Broadcast Updates| WebSocket/ActionCable
    API -->|Trigger Payments| M-Pesa
    API -->|Serve Map Data| React-Leaflet
```

---

## Getting Started

### Prerequisites
- **Ruby** ≥ 3.x, **Rails** ≥ 7.x  
- **Node.js** ≥ 18.x, **npm** or **yarn**  
- **PostgreSQL**  
- **M-Pesa Daraja Sandbox credentials**  
- (Optional) **Redis** for ActionCable Pub/Sub  

### Backend Setup
```bash
git clone <repo-url>
cd backend
bundle install
rails db:create db:migrate db:seed
```

### Frontend Setup
```bash
cd frontend
npm install
```

---

## Environment Variables

Create `.env` in the backend root:

```
DATABASE_URL=postgres://user:pass@localhost:5432/road_rescue
SECRET_KEY_BASE=your_secret_key
MPESA_CONSUMER_KEY=your_mpesa_key
MPESA_CONSUMER_SECRET=your_mpesa_secret
MPESA_SHORTCODE=your_shortcode
MPESA_PASSKEY=your_passkey
FRONTEND_URL=http://localhost:3000
```

---

## Running Locally

**Backend:**
```bash
cd backend
bin/rails server
```

**Frontend:**
```bash
cd frontend
npm start
```

---

## Key Workflows

### Rescue Request Flow
1. Driver requests rescue → stored in DB → providers notified in real time.  
2. Provider accepts → backend triggers M-Pesa STK Push.  
3. Provider location tracked → driver sees ETA on map.  
4. Completion updates status for both parties.  

### Provider Approval Flow
1. Admin views providers list.  
2. Clicks **Approve** or **Unapprove** → PATCH `/api/providers/:id`.  
3. UI updates optimistically and syncs after server response.  

---

## API Endpoints

| Method | Route                    | Description                 |
|--------|-------------------------|-----------------------------|
| GET    | `/api/users`             | Fetch all users             |
| PATCH  | `/api/providers/:id`     | Approve/unapprove provider  |
| POST   | `/api/requests`          | Create rescue request       |
| GET    | `/api/requests`          | Fetch all requests          |
| POST   | `/api/payments/stkpush`  | Trigger M-Pesa STK Push     |
| WS     | `/cable`                 | WebSocket for chat/location |

---

## Frontend Details

- **Routing:** React Router with loaders (`useLoaderData`) for prefetching users, requests, and sessions.  
- **State Management:** React hooks + context for session, chat, and requests.  
- **Optimistic Updates:** Approve/unapprove provider logic updates UI instantly.  
- **Dynamic Tables:** TailwindCSS styling with conditional rendering based on user roles.  

---

## Real-Time Location & Maps

- Providers broadcast GPS coordinates via WebSockets.  
- Drivers view live positions on **React Leaflet** maps.  
- Automatic map centering and marker updates ensure clarity.  

---

## Chat

- Each request spawns a dedicated chat channel (driver ↔ provider, optionally admin).  
- ActionCable broadcasts messages in real time.  
- Messages persist in the database for history retrieval.  

---

## Payments (M-Pesa STK Push)

- Rails backend integrates **Safaricom Daraja API**.  
- STK Push triggered when a provider accepts a rescue request.  
- Payment confirmation updates the request’s payment status and logs the transaction.  

---

## Testing

- **Backend:** RSpec for models, controllers, and ActionCable channels.  
- **Frontend:** React Testing Library + Jest for components and hooks.  
- **E2E:** Cypress or Playwright for end-to-end testing.  

---

## Deployment

1. Deploy Rails API on Render/Heroku with PostgreSQL and Redis.  
2. Build React app (`npm run build`) and deploy via Netlify or Vercel.  
3. Set production environment variables (M-Pesa credentials, URLs).  

---

## Future Improvements

- Push notifications for request updates.  
- Optimized routing for providers.  
- Multi-language support.  
- Enhanced analytics dashboard with charts.  
- Offline-first support for poor connectivity.  

---

## License

MIT License – feel free to modify and distribute.