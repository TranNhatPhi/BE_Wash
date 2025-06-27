const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

// ⚙️ Middleware
app.use(cors());
app.use(express.json());

// 🟢 Root endpoint (QUAN TRỌNG cho Vercel)
app.get("/", (req, res) => {
    res.json({
        message: "🚗 CRM Wash API is running on Vercel!",
        version: "1.0.0",
        docs: "/api-docs",
        timestamp: new Date().toISOString()
    });
});

// 🟢 Health check endpoint
app.get("/health", (req, res) => {
    res.json({
        status: "OK",
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || "development"
    });
});

// 🟢 Kết nối database với error handling
let dbConnected = false;
try {
    const { connectDB } = require("./config/db");
    connectDB().then(() => {
        dbConnected = true;
        console.log("✅ Database connected");
    }).catch(err => {
        console.error("❌ Database connection failed:", err.message);
    });
} catch (error) {
    console.error("❌ Database module error:", error.message);
}

// 🟢 Swagger với error handling
try {
    const swaggerDocs = require("./config/swaggerConfig");
    swaggerDocs(app);
} catch (error) {
    console.error("❌ Swagger setup failed:", error.message);
}

// 🟢 Models với error handling
try {
    require('./models/associations');
} catch (error) {
    console.error("❌ Models setup failed:", error.message);
}

// 🟢 Routes với error handling
try {
    app.use("/api/auth", require("./routes/auth"));
    app.use("/api/vehicles", require("./routes/vehicle"));
    app.use("/api/services", require("./routes/service"));
    app.use("/api/customers", require("./routes/customer"));
    app.use("/api/customers-vehicles", require("./routes/customerVehicle"));
} catch (error) {
    console.error("❌ Routes setup failed:", error.message);
}

// 🟢 404 handler
app.use("*", (req, res) => {
    res.status(404).json({
        message: "Endpoint not found",
        path: req.originalUrl,
        method: req.method
    });
});

// 🟢 Error handler
app.use((error, req, res, next) => {
    console.error("❌ Server error:", error.message);
    res.status(500).json({
        message: "Internal server error",
        error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
});

// 🚀 Chỉ listen khi không phải Vercel
if (!process.env.VERCEL && process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`🚀 Server đang chạy trên cổng ${PORT}`);
    });
}

// Export cho Vercel
module.exports = app;