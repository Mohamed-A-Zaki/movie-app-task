import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import app from "./app";

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
