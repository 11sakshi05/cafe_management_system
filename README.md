
# Enterprise Cafe Management and Reservation System

This repository contains a full-stack solution designed to digitize the reservation, pre-ordering, and billing lifecycle for hospitality businesses. The application leverages the MERN stack to provide a robust interface for both customers and administrators.

## Project Overview

The system provides a seamless end-to-end workflow starting from client-side table booking to administrative approval and automated billing. It addresses common operational challenges such as overbooking through algorithmic concurrency control and ensures financial transparency with a dynamic tax and service charge engine.

## Core Features

### 1. Advanced Reservation Engine
* **Automated Slot Management:** Implements server-side logic to limit reservations to five tables per time slot, ensuring optimal resource allocation.
* **Pre-order Integration:** Enables customers to select menu items during the booking process, reducing onsite wait times and improving kitchen throughput.

### 2. Financial and Billing Logic
* **Dynamic Receipt Generation:** Client-side calculation of subtotals, 18% GST, and 2% service charges.
* **Hybrid Payment Processing:** Supports simulated online UPI payments with dynamic QR generation and offline "Pay at Venue" options.

### 3. Administrative Control Plane
* **Reservation Oversight:** A dedicated dashboard for real-time monitoring of booking requests, payment statuses, and customer data.
* **Menu CRUD Operations:** A complete management interface allowing administrators to create, update, or remove menu offerings without direct database manipulation.

### 4. Automated Communication Workflow
* **SMTP Integration:** Utilizes secure email protocols to dispatch professionally formatted HTML receipts and confirmation messages to users upon administrative approval.

## Technical Specifications

### Frontend
* **Library:** React.js
* **State Management:** Functional components and React Hooks
* **API Client:** Axios for asynchronous HTTP requests

### Backend
* **Runtime Environment:** Node.js
* **Framework:** Express.js
* **Communication:** Nodemailer for SMTP-based messaging

### Database
* **Technology:** MongoDB
* **Object Modeling:** Mongoose ODM
* **Schema Design:** Structured NoSQL documents for reservations, menu items, and reviews.

## Installation and Configuration

### Prerequisites
* Node.js (v14.x or higher)
* MongoDB Atlas account or local MongoDB instance

### Environment Setup
Configure a `.env` file in the server directory with the following variables:
* `PORT`: The port number for the backend server.
* `MONGO_URI`: The connection string for the MongoDB database.
* `EMAIL_USER`: The SMTP service email address.
* `EMAIL_PASS`: The application-specific password for the SMTP service.

### Execution
1. Install dependencies in both `/client` and `/server` directories using `npm install`.
2. Launch the backend server using `npm start`.
3. Launch the frontend development server using `npm start`.

## API Architecture

### Reservation Endpoints
* `POST /api/reserve`: Validates and persists new booking requests.
* `GET /api/reservations`: Retrieves all records for administrative review.
* `PATCH /api/reservations/:id`: Updates booking status and triggers automated notifications.

### Menu Endpoints
* `GET /api/menu`: Returns the current list of available items.
* `POST /api/menu`: Enables the addition of new inventory.
* `PUT /api/menu/:id`: Modifies existing item attributes.
* `DELETE /api/menu/:id`: Removes items from the active menu.

## Security Considerations
* **Credential Masking:** Sensitive data is managed through environment variables to prevent exposure in version control.
* **Validation:** Server-side checks are implemented to ensure data integrity during the reservation and billing processes.
