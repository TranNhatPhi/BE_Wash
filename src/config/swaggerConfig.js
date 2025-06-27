const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");

// Xác định base URL cho Vercel
const baseUrl = process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}`
    : process.env.BASE_URL || "http://localhost:5000";

// Xác định đường dẫn routes cho Vercel
const getRoutesPath = () => {
    if (process.env.VERCEL) {
        // Trên Vercel, đường dẫn tương đối từ src/config/
        return [
            path.join(__dirname, "../routes/auth.js"),
            path.join(__dirname, "../routes/vehicle.js"),
            path.join(__dirname, "../routes/service.js"),
            path.join(__dirname, "../routes/customer.js"),
            path.join(__dirname, "../routes/customerVehicle.js"),
        ];
    } else {
        // Local development
        return ["./src/routes/*.js"];
    }
};

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "CRM Wash API",
            version: "1.0.0",
            description: "🚗 Hệ thống API quản lý tiệm rửa xe: POS, doanh thu, nhân viên, lịch đặt lịch, thống kê, báo cáo, và nhiều hơn nữa.",
            contact: {
                name: "CRM Wash Dev Team",
                email: "support@crmwash.com"
            },
        },
        servers: [
            {
                url: baseUrl,
                description: process.env.VERCEL ? "� Vercel Production" : "🔧 Local Server"
            }
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [{ BearerAuth: [] }], // ⚠️ Bảo vệ tất cả endpoint bằng JWT nếu không override
    },
    apis: getRoutesPath(), // Đường dẫn động cho local và Vercel
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log(`📄 Swagger Docs: ${baseUrl}/api-docs`);
};

module.exports = swaggerDocs;
