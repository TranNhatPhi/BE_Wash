const express = require("express");
require('./models/associations');
const dotenv = require("dotenv");
const cors = require("cors");
const { sequelize, connectDB } = require("./config/db");
const swaggerDocs = require("./config/swaggerConfig");

dotenv.config();

const app = express();

// ⚙️ Middleware
app.use(cors());
app.use(express.json());

// 🟢 Kết nối database với error handling
connectDB().catch(err => {
    console.error("Database connection failed:", err);
});

// 🟢 Swagger (chỉ load nếu không có lỗi)
try {
    swaggerDocs(app);
} catch (error) {
    console.error("Swagger setup failed:", error.message);
}

// 🟢 Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/vehicles", require("./routes/vehicle"));  // 🟢 BỔ SUNG DÒNG NÀY
app.use("/api/services", require("./routes/service"));
app.use("/api/customers", require("./routes/customer"));
app.use("/api/customers-vehicles", require("./routes/customerVehicle"));

// Root endpoint
app.get("/", (req, res) => {
    res.json({ 
        message: "� CRM Wash API is running!",
        docs: "/api-docs",
        version: "1.0.0",
        timestamp: new Date().toISOString()
    });
});

// �🚀 Khởi động server chỉ khi không phải Vercel
if (!process.env.VERCEL) {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`🚀 Server đang chạy trên cổng ${PORT}`);
    });
}

// Export cho Vercel
module.exports = app;