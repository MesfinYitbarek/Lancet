import Contact from "../models/ContactUs.js";
import errorHandler from "../utilis/error.js";


// contact message display
export const contactDisplay = async (req, res, next) => {
  try {
    const contact = await Contact.find();
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

// contact message submit
export const contact = async (req, res, next) => {
  try {
    const newContact = new Contact({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
      read: req.body.read,
    });

    await newContact.save(); 

    res
      .status(201)
      .json({ message: "Contact information submitted successfully!" });
  } catch (err) {
    next(err);
    res.status(500).json({ message: "Error submitting contact information" });
  }
};

// displaying number of new messages
export const newMessageCount =  async (req, res) => {
  try {
    const newMessageCount = await Contact.countDocuments({ read: false }); 
    res.json({ count: newMessageCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get new message count' });
  }
}


// deleting message
export const deleteContact = async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    return next(errorHandler(404, "Message not found!"));
  }

  try {
    await Contact.findByIdAndDelete(req.params.id);
  } catch (error) {
    next(error);
  }
};

//marking message as read
export const markAsRead = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({ message: "Message not found!" });
    }

    contact.read = true;
    await contact.save();

    res.json({ message: "Message marked as read successfully!" });
  } catch (error) {
    next(error);
  }
};
