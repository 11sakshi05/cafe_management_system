Full-Stack Café Management System
A robust MERN-stack application designed to streamline the reservation and pre-ordering lifecycle for the hospitality industry. The system integrates real-time table availability logic, dynamic billing, and automated customer communication.

Key Features
Table Reservation System: Implements concurrency control to limit bookings to five tables per time slot, preventing over-capacity.

Pre-order and Billing Engine: Real-time calculation of subtotal, 18% GST, and 2% service charges with persistent data storage.

Dual-Mode Payment Simulation: Supports "Pay After Visiting" and "Online Payment" via dynamic UPI QR code generation.

Automated SMTP Workflow: Admin-controlled approval system that triggers professionally formatted HTML receipts via Nodemailer.

Admin Dashboard: Centralized interface for managing live reservation requests and full CRUD operations for the café menu.

Tech Stack
Frontend: React.js, Axios

Backend: Node.js, Express.js

Database: MongoDB (Mongoose ODM)

Authentication & Security: Dotenv

Communication: Nodemailer (SMTP)

Project Architecture
The application follows a Model-View-Controller (MVC) design pattern on the backend to ensure scalability and maintainable code. The frontend utilizes functional components and hooks to manage complex states across the multi-step reservation process.

Installation and Setup
Clone the repository:

Bash
git clone https://github.com/yourusername/intermezzo.git
Install dependencies for both Client and Server:

Bash
cd client && npm install
cd ../server && npm install
Configure Environment Variables:
Create a .env file in the server directory based on the provided .env.example.

Run the application:

Start the server: npm start (inside /server)

Start the client: npm start (inside /client)

API Endpoints
Reservations
POST /api/reserve - Creates a new reservation request.

GET /api/reservations - Retrieves all reservations for admin view.

PATCH /api/reservations/:id - Updates status and triggers email notification.

Menu
GET /api/menu - Fetches all current menu items.

POST /api/menu - Adds a new dish (Admin only).

PUT /api/menu/:id - Updates existing dish details.

DELETE /api/menu/:id - Removes a dish from the system.

Future Enhancements
Integration of real-world payment gateways (Stripe/Razorpay).

Machine Learning-based personalized menu recommendations.

Automated SMS notifications using Twilio API.
