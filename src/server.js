const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

// ⚙️ Middleware
app.use(cors());
app.use(express.json());

// 🟢 Root endpoint
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

// 🟢 Test routes trước - KHÔNG CẦN FILE NGOÀI
app.get("/api/test", (req, res) => {
    res.json({
        message: "✅ API routes working!",
        timestamp: new Date().toISOString()
    });
});

app.get("/api/auth/test", (req, res) => {
    res.json({
        message: "✅ Auth routes working!",
        endpoint: "/api/auth/test"
    });
});

app.get("/api/vehicles/test", (req, res) => {
    res.json({
        message: "✅ Vehicle routes working!",
        endpoint: "/api/vehicles/test"
    });
});

// 🟢 Swagger đơn giản - KHÔNG CẦN FILE NGOÀI
app.get("/api-docs", (req, res) => {
    res.send(`
        <html>
            <head><title>CRM Wash API Docs</title></head>
            <body>
                <h1>🚗 CRM Wash API Documentation</h1>
                <h2>Available Endpoints:</h2>
                <ul>
                    <li><a href="/">GET / - Root endpoint</a></li>
                    <li><a href="/health">GET /health - Health check</a></li>
                    <li><a href="/api/test">GET /api/test - API test</a></li>
                    <li><a href="/api/auth/test">GET /api/auth/test - Auth test</a></li>
                    <li><a href="/api/vehicles/test">GET /api/vehicles/test - Vehicle test</a></li>
                </ul>
                <p><strong>Base URL:</strong> ${req.protocol}://${req.get('host')}</p>
            </body>
        </html>
    `);
});

// 🟢 404 handler
app.use("*", (req, res) => {
    res.status(404).json({
        message: "Endpoint not found",
        path: req.originalUrl,
        method: req.method,
        availableRoutes: [
            "GET /",
            "GET /health",
            "GET /api-docs",
            "GET /api/test",
            "GET /api/auth/test",
            "GET /api/vehicles/test"
        ]
    });
});

// Export cho Vercel
module.exports = app;