const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json()); 
app.use(cors());        

// Models
const Reservation = require('./models/Reservation');
const Review = require('./models/Review');
const MenuItem = require('./models/MenuItem');

// --- 1. EMAIL TRANSPORTER CONFIGURATION ---
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

transporter.verify((error) => {
  if (error) console.log("❌ Email Config Error:", error);
  else console.log("✅ Email System Ready");
});

// --- 2. RESERVATION ROUTE (FIXED ReferenceError) ---
app.post('/api/reserve', async (req, res) => {
    try {
        // 1. Properly pull ALL variables from req.body
        const { 
            name, 
            email, 
            phone, 
            date, 
            time, 
            items, 
            billAmount, 
            paymentMode, 
            paymentStatus 
        } = req.body;

        // 2. Table Limit Logic
        const bookingCount = await Reservation.countDocuments({
            date: date,
            time: time,
            status: { $ne: 'Rejected' } 
        });

        if (bookingCount >= 5) {
            return res.status(400).json({ 
                message: "Reservation Full! All 5 tables are booked for this time slot." 
            });
        }

        // 3. Save the new reservation with payment data
        const newReservation = new Reservation({
            name,
            email,
            phone,
            date,
            time,
            items: items || [],
            billAmount: billAmount || "0.00",
            paymentMode: paymentMode || "Pay After Visiting", // Default fallback
            paymentStatus: paymentStatus || "Pending"        // Default fallback
        });

        await newReservation.save();
        res.status(201).json({ message: "Reservation & Pre-order Successful!" });

    } catch (err) {
        console.error("Server Error:", err); 
        res.status(500).json({ message: "Server Error. Please try again." });
    }
});

// --- 3. ADMIN STATUS UPDATE (With Acceptance/Rejection Email) ---
app.patch('/api/reservations/:id', async (req, res) => {
    try {
        const { status } = req.body;
        
        const booking = await Reservation.findByIdAndUpdate(
            req.params.id, 
            { status: status }, 
            { returnDocument: 'after' } 
        );

        if (!booking) return res.status(404).json({ error: "Booking not found" });

        // Format Items for Email
        const itemsList = booking.items && booking.items.length > 0 
            ? booking.items.map(item => `<li>${item.name} - ₹${item.price}</li>`).join('')
            : "<li>Table Booking Only</li>";

        let mailOptions = {
            from: `"Intermezzo Nashik" <${process.env.EMAIL_USER}>`,
            to: booking.email,
            subject: '',
            html: ''
        };

        if (status === 'Accepted') {
            mailOptions.subject = 'Table Confirmed! See you at Intermezzo ☕';
            mailOptions.html = `
                <div style="font-family: 'Segoe UI', sans-serif; border: 2px solid #DCAE96; padding: 25px; border-radius: 15px; color: #4A3728;">
                    <h2 style="text-align: center;">Reservation Confirmed!</h2>
                    <p>Hi <b>${booking.name}</b>,</p>
                    <p>Great news! Your table at <b>Intermezzo Nashik</b> is ready.</p>
                    <hr style="border: 0; border-top: 1px dashed #DCAE96;">
                    <p>📍 <b>Slot:</b> ${booking.date} at ${booking.time}</p>
                    <p>🍴 <b>Pre-ordered Items:</b></p>
                    <ul>${itemsList}</ul>
                    <p>💰 <b>Total Bill:</b> ₹${booking.billAmount}</p>
                    <hr style="border: 0; border-top: 1px dashed #DCAE96;">
                    <p style="text-align: center;">See you soon!</p>
                </div>`;
        } else if (status === 'Rejected') {
            mailOptions.subject = 'Update regarding your Intermezzo Reservation';
            mailOptions.html = `
                <div style="font-family: 'Segoe UI', sans-serif; padding: 25px; background-color: #FFF8F5; border-radius: 15px; color: #4A3728;">
                    <h2>Hello ${booking.name},</h2>
                    <p>We apologize, but we are unable to host you for <b>${booking.date} at ${booking.time}</b> as we are fully committed.</p>
                    <p>We would love to host you another time!</p>
                    <p>Warmly,<br/><b>The Intermezzo Team</b></p>
                </div>`;
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) console.log("❌ Mail Error:", error);
            else console.log("✅ Confirmation Mail Sent:", info.response);
        });

        res.json(booking);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update and notify" });
    }
});

// --- REVIEWS & MENU ---
app.post('/api/reviews', async (req, res) => {
    try {
        const newReview = new Review(req.body);
        await newReview.save();
        res.status(201).json(newReview);
    } catch (err) {
        res.status(500).json({ error: "Failed to save review" });
    }
});

app.get('/api/reviews', async (req, res) => {
    try {
        const reviews = await Review.find().sort({ date: -1 });
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch reviews" });
    }
});

app.get('/api/reservations', async (req, res) => {
    try {
        const allReservations = await Reservation.find().sort({ date: 1 });
        res.json(allReservations);
    } catch (err) {
        res.status(500).json({ error: "Could not fetch data" });
    }
});

app.get('/api/menu', async (req, res) => {
    const items = await MenuItem.find();
    res.json(items);
});

app.post('/api/menu', async (req, res) => {
    const newItem = new MenuItem(req.body);
    await newItem.save();
    res.json(newItem);
});

app.delete('/api/menu/:id', async (req, res) => {
    await MenuItem.findByIdAndDelete(req.params.id);
    res.json({ message: "Dish removed" });
});

app.put('/api/menu/:id', async (req, res) => {
    try {
        const updatedItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedItem);
    } catch (err) {
        res.status(500).json({ message: "Error updating dish" });
    }
});

// --- CONNECTION & SEEDING ---
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ Inter.mezzo DB is Online!"))
  .catch((err) => console.log("❌ DB Error:", err));

const seedMenu = async () => {
    const count = await MenuItem.countDocuments();
    if (count === 0) {
        const cafeMenu = [
            { name: "Rose Gold Latte", price: 250, category: "Coffee", desc: "Signature espresso with rose syrup." },
            { name: "Espresso Solo", price: 150, category: "Coffee", desc: "Bold single shot." },
        ]; 
        await MenuItem.insertMany(cafeMenu);
    }
};
seedMenu();

app.get('/', (req, res) => res.send("Inter.mezzo Server is Running..."));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server on port http://localhost:${PORT}`));