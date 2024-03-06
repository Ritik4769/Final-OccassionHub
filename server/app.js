import express from 'express';
import cors from 'cors';
import userRouter from './Router/userRouter.js';
import catrererRouter from './Router/catererRouter.js';
import VenueRouter from './Router/VenueRouter.js';
import DecorationRouter from './Router/decorationRouter.js';
import DjRouter from './Router/djRouter.js';
import adminRouter from './Router/adminRouter.js';
import passesRouter from './Router/passesRouter.js';
import methodOverride from 'method-override';
import expressFileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';
import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

var app = express();
app.use(express.static(path.join(__dirname, 'public/assets/images')));

app.use("public/assets/images", express.static("images"));

app.use(cors());
app.use(methodOverride("_method"));
app.use(expressFileUpload());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/user', userRouter);
app.use("/caterer", catrererRouter);
app.use("/venue", VenueRouter);
app.use("/decoration",DecorationRouter);
app.use('/dj',DjRouter);
app.use("/admin",adminRouter);
app.use("/passes",passesRouter);

app.listen("4001", () => {
    console.log("Server connection successful");
});