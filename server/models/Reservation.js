const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    status: { type: String, default: 'Pending' }, // For your Admin Panel later!
    items: { type: Array, default: [] }, 
    billAmount: { type: String, default: "0.00" },
    paymentMode: { type: String, default: 'Pay After Visiting' },
    paymentStatus: { type: String, default: 'Pending' }, // 'Paid' or 'Pending'
});


module.exports = mongoose.model('Reservation', ReservationSchema);