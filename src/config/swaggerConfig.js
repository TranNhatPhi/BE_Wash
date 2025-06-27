// const swaggerJsdoc = require("swagger-jsdoc");
// const swaggerUi = require("swagger-ui-express");

// const baseUrl = process.env.VERCEL_URL
//     ? `https://${process.env.VERCEL_URL}`
//     : process.env.BASE_URL || "http://localhost:5000";

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

// Xác định base URL
const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.BASE_URL || "http://localhost:5000";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "CRM Wash API",
            version: "1.0.0",
            description: "🚗 Hệ thống API quản lý tiệm rửa xe",
        },
        servers: [
            {
                url: baseUrl,
                description: process.env.VERCEL_URL ? "🚀 Vercel Production" : "🔧 Local Server"
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
    // Đường dẫn routes cho Vercel
    apis: [
        path.join(__dirname, "../routes/auth.js"),
        path.join(__dirname, "../routes/vehicle.js"),
        path.join(__dirname, "../routes/service.js"),
        path.join(__dirname, "../routes/customer.js"),
        path.join(__dirname, "../routes/customerVehicle.js"),
    ],
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log(`📄 Swagger Docs: ${baseUrl}/api-docs`);
};

module.exports = swaggerDocs;
