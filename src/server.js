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
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || "development"
    });
});

// 🟢 Health check endpoint
app.get("/health", (req, res) => {
    res.json({
        status: "OK",
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || "development",
        nodeVersion: process.version,
        memoryUsage: process.memoryUsage()
    });
});

// 🟢 Database test endpoint
app.get("/api/db-test", async (req, res) => {
    try {
        res.json({
            message: "Database connection test",
            env: {
                DB_HOST: process.env.DB_HOST ? "✅ Set" : "❌ Missing",
                DB_PORT: process.env.DB_PORT ? "✅ Set" : "❌ Missing",
                DB_NAME: process.env.DB_NAME ? "✅ Set" : "❌ Missing",
                DB_USER: process.env.DB_USER ? "✅ Set" : "❌ Missing",
                DB_SSL: process.env.DB_SSL ? "✅ Set" : "❌ Missing"
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 🟢 Test routes
app.get("/api/test", (req, res) => {
    res.json({
        message: "✅ API routes working!",
        timestamp: new Date().toISOString(),
        method: req.method,
        url: req.url
    });
});

// 🟢 AUTH ROUTES
app.get("/api/auth/test", (req, res) => {
    res.json({
        message: "✅ Auth routes working!",
        endpoint: "/api/auth/test"
    });
});

app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;

    // Mock login logic
    if (!email || !password) {
        return res.status(400).json({
            error: "Email và password là bắt buộc",
            required: ["email", "password"]
        });
    }

    // Mock successful login
    res.json({
        message: "Login successful",
        user: {
            id: 1,
            email: email,
            name: "Test User"
        },
        token: "mock_jwt_token_here",
        expiresIn: "30d"
    });
});

app.post("/api/auth/register", (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            error: "Name, email và password là bắt buộc",
            required: ["name", "email", "password"]
        });
    }

    res.json({
        message: "Registration successful",
        user: {
            id: Date.now(),
            name,
            email,
            createdAt: new Date().toISOString()
        }
    });
});

// 🟢 VEHICLE ROUTES
app.get("/api/vehicles/test", (req, res) => {
    res.json({
        message: "✅ Vehicle routes working!",
        endpoint: "/api/vehicles/test"
    });
});

app.get("/api/vehicles", (req, res) => {
    res.json({
        message: "Get all vehicles",
        data: [
            {
                id: 1,
                licensePlate: "30A-12345",
                brand: "Toyota",
                model: "Camry",
                year: 2020,
                color: "Đen"
            },
            {
                id: 2,
                licensePlate: "29B-67890",
                brand: "Honda",
                model: "Civic",
                year: 2019,
                color: "Trắng"
            }
        ]
    });
});

app.post("/api/vehicles", (req, res) => {
    const { licensePlate, brand, model, year, color } = req.body;

    if (!licensePlate || !brand || !model) {
        return res.status(400).json({
            error: "LicensePlate, brand và model là bắt buộc",
            required: ["licensePlate", "brand", "model"]
        });
    }

    res.json({
        message: "Vehicle created successfully",
        data: {
            id: Date.now(),
            licensePlate,
            brand,
            model,
            year,
            color,
            createdAt: new Date().toISOString()
        }
    });
});

// 🟢 SERVICE ROUTES
app.get("/api/services", (req, res) => {
    res.json({
        message: "Get all services",
        data: [
            {
                id: 1,
                name: "Rửa xe cơ bản",
                price: 50000,
                duration: 30,
                description: "Rửa ngoài, lau khô"
            },
            {
                id: 2,
                name: "Rửa xe VIP",
                price: 100000,
                duration: 60,
                description: "Rửa ngoài, trong, hút bụi, đánh bóng"
            }
        ]
    });
});

app.post("/api/services", (req, res) => {
    const { name, price, duration, description } = req.body;

    if (!name || !price) {
        return res.status(400).json({
            error: "Name và price là bắt buộc",
            required: ["name", "price"]
        });
    }

    res.json({
        message: "Service created successfully",
        data: {
            id: Date.now(),
            name,
            price,
            duration,
            description,
            createdAt: new Date().toISOString()
        }
    });
});

// 🟢 CUSTOMER ROUTES
app.get("/api/customers", (req, res) => {
    res.json({
        message: "Get all customers",
        data: [
            {
                id: 1,
                name: "Nguyễn Văn A",
                phone: "0901234567",
                email: "nguyenvana@email.com",
                address: "123 Đường ABC, Quận 1, TP.HCM"
            },
            {
                id: 2,
                name: "Trần Thị B",
                phone: "0909876543",
                email: "tranthib@email.com",
                address: "456 Đường XYZ, Quận 2, TP.HCM"
            }
        ]
    });
});

app.post("/api/customers", (req, res) => {
    const { name, phone, email, address } = req.body;

    if (!name || !phone) {
        return res.status(400).json({
            error: "Name và phone là bắt buộc",
            required: ["name", "phone"]
        });
    }

    res.json({
        message: "Customer created successfully",
        data: {
            id: Date.now(),
            name,
            phone,
            email,
            address,
            createdAt: new Date().toISOString()
        }
    });
});

// 🟢 API Documentation
app.get("/api-docs", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>CRM Wash API Documentation</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 40px; }
                h1 { color: #333; }
                h2 { color: #666; border-bottom: 1px solid #ddd; padding-bottom: 10px; }
                ul { list-style-type: none; padding: 0; }
                li { margin: 8px 0; }
                a { color: #007bff; text-decoration: none; }
                a:hover { text-decoration: underline; }
                .method { 
                    padding: 2px 8px; 
                    border-radius: 4px; 
                    color: white; 
                    font-size: 12px; 
                    margin-right: 10px;
                }
                .get { background-color: #28a745; }
                .post { background-color: #007bff; }
                .put { background-color: #ffc107; color: black; }
                .delete { background-color: #dc3545; }
                .endpoint { font-family: monospace; background: #f8f9fa; padding: 2px 4px; }
            </style>
        </head>
        <body>
            <h1>🚗 CRM Wash API Documentation</h1>
            
            <h2>🔗 Base URL</h2>
            <p><strong>${req.protocol}://${req.get('host')}</strong></p>
            
            <h2>📋 Available Endpoints:</h2>
            
            <h3>🏠 General</h3>
            <ul>
                <li><span class="method get">GET</span><a href="/" target="_blank"><span class="endpoint">/</span> - Root endpoint</a></li>
                <li><span class="method get">GET</span><a href="/health" target="_blank"><span class="endpoint">/health</span> - Health check</a></li>
                <li><span class="method get">GET</span><a href="/api/test" target="_blank"><span class="endpoint">/api/test</span> - API test</a></li>
                <li><span class="method get">GET</span><a href="/api/db-test" target="_blank"><span class="endpoint">/api/db-test</span> - Database test</a></li>
            </ul>
            
            <h3>🔐 Authentication</h3>
            <ul>
                <li><span class="method get">GET</span><a href="/api/auth/test" target="_blank"><span class="endpoint">/api/auth/test</span> - Auth test</a></li>
                <li><span class="method post">POST</span><span class="endpoint">/api/auth/login</span> - User login</li>
                <li><span class="method post">POST</span><span class="endpoint">/api/auth/register</span> - User registration</li>
            </ul>
            
            <h3>🚗 Vehicles</h3>
            <ul>
                <li><span class="method get">GET</span><a href="/api/vehicles/test" target="_blank"><span class="endpoint">/api/vehicles/test</span> - Vehicle test</a></li>
                <li><span class="method get">GET</span><a href="/api/vehicles" target="_blank"><span class="endpoint">/api/vehicles</span> - Get all vehicles</a></li>
                <li><span class="method post">POST</span><span class="endpoint">/api/vehicles</span> - Create vehicle</li>
            </ul>
            
            <h3>🛠️ Services</h3>
            <ul>
                <li><span class="method get">GET</span><a href="/api/services" target="_blank"><span class="endpoint">/api/services</span> - Get all services</a></li>
                <li><span class="method post">POST</span><span class="endpoint">/api/services</span> - Create service</li>
            </ul>
            
            <h3>👥 Customers</h3>
            <ul>
                <li><span class="method get">GET</span><a href="/api/customers" target="_blank"><span class="endpoint">/api/customers</span> - Get all customers</a></li>
                <li><span class="method post">POST</span><span class="endpoint">/api/customers</span> - Create customer</li>
            </ul>
            
            <h2>📝 Example Usage</h2>
            <h3>POST /api/auth/login</h3>
            <pre>{
  "email": "user@example.com",
  "password": "password123"
}</pre>
            
            <h3>POST /api/vehicles</h3>
            <pre>{
  "licensePlate": "30A-12345",
  "brand": "Toyota",
  "model": "Camry",
  "year": 2020,
  "color": "Đen"
}</pre>
            
            <p><em>Built with ❤️ for CRM Wash System</em></p>
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
        suggestion: "Check /api-docs for available endpoints",
        availableRoutes: [
            "GET /",
            "GET /health",
            "GET /api-docs",
            "GET /api/test",
            "GET /api/db-test",
            "GET /api/auth/test",
            "POST /api/auth/login",
            "POST /api/auth/register",
            "GET /api/vehicles",
            "POST /api/vehicles",
            "GET /api/services",
            "POST /api/services",
            "GET /api/customers",
            "POST /api/customers"
        ]
    });
});

// 🟢 Error handler
app.use((error, req, res, next) => {
    console.error("❌ Server error:", error.message);
    res.status(500).json({
        message: "Internal server error",
        error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong',
        timestamp: new Date().toISOString()
    });
});

// 🚀 Chỉ listen khi không phải Vercel
if (!process.env.VERCEL && process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`🚀 Server đang chạy trên cổng ${PORT}`);
        console.log(`📄 API Docs: http://localhost:${PORT}/api-docs`);
    });
}

// Export cho Vercel
module.exports = app;