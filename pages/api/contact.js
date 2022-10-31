import { MongoClient } from "mongodb";
import React from "react";
import {
  nameValidate,
  emailValidate,
  messageValidate,
} from "../../helpers/validation";

async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, message } = req.body;

    if (
      !email ||
      !emailValidate(email) ||
      !name ||
      !nameValidate(name) ||
      !message ||
      !messageValidate(message)
    ) {
      res.status(422).json({ message: "Invalid input" });
      return;
    }

    const newMessage = {
      email,
      name,
      message,
    };

    let client;

    try {
      client = await MongoClient.connect(
        "mongodb+srv://JovanSreco:kEMupCFrCiUPqSAX@cluster0.oohkwxr.mongodb.net/my-site?retryWrites=true&w=majority"
      );
    } catch (error) {
      res.status(500).json({ message: "Could not connect to database." });
      return;
    }

    const db = client.db();

    try {
      const result = await db.collection("messages").insertOne(newMessage);
      newMessage.id = result.insertedId;
    } catch (error) {
      client.close();
      res.status(500).json({ message: "Storing message failed!" });
      return;
    }

    client.close();

    res.status(201).json({
      mesage: "Successfully stored message!",
    });
  }
}

export default handler;
