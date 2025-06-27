const path = require('path');
require('dotenv').config({
    path: path.resolve(__dirname, '../../.env')
});
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10),
        dialect: 'postgres',
        logging: false,
        dialectOptions: process.env.DB_SSL === 'true' ? {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        } : {},
    }
);

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ [DB] Kết nối cơ sở dữ liệu thành công!");
        return true;
    } catch (error) {
        console.error("❌ [DB] Kết nối thất bại:", error.message);
        // Trên Vercel, không nên thoát process
        if (!process.env.VERCEL) {
            process.exit(1);
        }
        return false;
        process.exit(1);
    }
};

module.exports = { sequelize, connectDB };
