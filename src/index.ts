import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import * as cors from "cors";

import userRoutes from "./routes/user";
import authRoutes from "./routes/auth";
import customerRoutes from "./routes/customer";
import employeeRoutes from "./routes/employee";
import vendorRoutes from "./routes/vendor";
import productRoutes from "./routes/product";
import storeRoutes from "./routes/store";

// Connects to the database => then starts the express
createConnection()
    .then(async connection => {
        // create a new express application instance
        const app = express();

        // call middlewares
        app.use(cors());
        app.use(helmet());
        app.use(bodyParser.json());

        // routes
        app.use("/users", userRoutes);
        app.use("/auth", authRoutes);
        app.use("/customers", customerRoutes);
        app.use("/employees", employeeRoutes);
        app.use("/vendors", vendorRoutes);
        app.use("/products", productRoutes);
        app.use("/stores", storeRoutes);

        app.listen(3001, () => {
            console.log("Server started on port 3000!");
        });
    })
    .catch(error => console.log(error));
