// const swaggerJsdoc = require("swagger-jsdoc");
// const swaggerUi = require("swagger-ui-express");

// const baseUrl = process.env.BASE_URL || "http://localhost:5000";

// const options = {
//     definition: {
//         openapi: "3.0.0",
//         info: {
//             title: "CRM Wash API",
//             version: "1.0.0",
//             description: "🚗 Hệ thống API quản lý tiệm rửa xe: POS, doanh thu, nhân viên, lịch đặt lịch, thống kê, báo cáo, và nhiều hơn nữa.",
//             contact: {
//                 name: "CRM Wash Dev Team",
//                 email: "support@crmwash.com"
//             },
//         },
//         servers: [
//             {
//                 url: baseUrl,
//                 description: baseUrl.includes("localhost") ? "🔧 Local Server" : "🚀 Production Server"
//             }
//         ],
//         components: {
//             securitySchemes: {
//                 BearerAuth: {
//                     type: "http",
//                     scheme: "bearer",
//                     bearerFormat: "JWT",
//                 },
//             },
//         },
//         security: [{ BearerAuth: [] }], // ⚠️ Bảo vệ tất cả endpoint bằng JWT nếu không override
//     },
//     apis: ["./src/routes/*.js"], // Đường dẫn đến file Swagger comment
//     //apis: ["./routes/*.js"], product
// };

// const swaggerSpec = swaggerJsdoc(options);

// const swaggerDocs = (app) => {
//     app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
//     console.log(`📄 Swagger Docs: ${baseUrl}/api-docs`);
// };

// module.exports = swaggerDocs;
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");

// Xác định base URL cho Vercel
const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.BASE_URL || "http://localhost:5000";

// Xác định đường dẫn routes cho Vercel vs Local
const getRoutesPath = () => {
    if (process.env.VERCEL) {
        // Trên Vercel, dùng path tuyệt đối
        return [
            path.join(__dirname, "../routes/auth.js"),
            path.join(__dirname, "../routes/vehicle.js"),
            path.join(__dirname, "../routes/service.js"),
            path.join(__dirname, "../routes/customer.js"),
            path.join(__dirname, "../routes/customerVehicle.js")
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
                description: process.env.VERCEL ? "🚀 Vercel Production" : "🔧 Local Server"
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
        security: [{ BearerAuth: [] }],
    },
    apis: getRoutesPath(), // Dùng function để xác định đường dẫn động
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app) => {
    // Debug log
    console.log("🔍 Swagger setup - Environment:", process.env.VERCEL ? "Vercel" : "Local");
    console.log("🔍 Swagger setup - Base URL:", baseUrl);
    console.log("🔍 Swagger setup - APIs paths:", getRoutesPath());

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
        explorer: true,
        customCss: '.swagger-ui .topbar { display: none }',
        customSiteTitle: "CRM Wash API Docs"
    }));

    console.log(`📄 Swagger Docs available at: ${baseUrl}/api-docs`);
};

module.exports = swaggerDocs;