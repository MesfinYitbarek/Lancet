import express from "express";


import { contact, contactDisplay, deleteContact, markAsRead, newMessageCount } from "../Controller/contactController.js";
import { verifyToken } from "../utilis/verifyUser.js";

const contactRouter = express.Router();

// Display all contacts
contactRouter.get("/contactDisplay", contactDisplay);

// Get count of new (unread) messages
contactRouter.get("/newMessageCount", newMessageCount);

// Submit a new contact message
contactRouter.post("/contact", contact);

// Delete a contact message (protected by verifyToken middleware)
contactRouter.delete("/delete/:id", verifyToken, deleteContact);

// Mark a message as read
contactRouter.patch("/markAsRead/:id", markAsRead);

export default contactRouter;
