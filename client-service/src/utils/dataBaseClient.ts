import { Client } from "pg"
import "dotenv/config";


export const DBClient = () => {
    return new Client({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB
    });
};


// AWS MANAGED: "user-service.cvqa8euuwunj.eu-north-1.rds.amazonaws.com",
// AWS SELF MANAGED : "ec2-16-16-144-180.eu-north-1.compute.amazonaws.com",
