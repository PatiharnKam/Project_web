require("dotenv").config();
var express = require('express');
var cors = require('cors');
var mongoose = require('mongoose');
var app = express();
var cookieParser = require("cookie-parser");
var session = require("express-session");
const e = require("express");

app.use(express.json());

app.use(cors({
    origin: "http://127.0.0.1:8081",  
    credentials: true 
}));

app.use(cookieParser());

app.use(
    session({
      secret: "superSecretKey", 
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 }, 
    })
);

const PORT = process.env.PORT || 8082;

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ Connected to MongoDB Atlas"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

const ContactSchema = new mongoose.Schema({
        ContactID: String,
        Firstname: String,
        Lastname: String,
        MobileNo: String,
        Email: String,
        Facebook: String,
        ImageURL: String
}, { versionKey: false }); 

const LoginSchema = new mongoose.Schema({
    Username: String,
    password: String
}, { versionKey: false }); 

const Login = mongoose.model('Users', LoginSchema, 'Users');

const Contact = mongoose.model('Contacts', ContactSchema, 'Contacts');
      
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB!',mongoose.connection.name);
});
mongoose.connection.on('error', (err) => {
    console.log('MongoDB connection error:', err);
});

app.post("/login", async (req, res) => {
    console.log("Login request received"); 
    const { username, password } = req.body;
  
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }
  
    try {
        
        const user = await Login.findOne({ Username: username });

        if (!user) {
            console.log("User not found");
            return res.status(400).json({ message: "Username or password invalid" });
        }

        console.log("User found:", username, user, password,"adfgfdsg",user.password);


        if (user.Username === username && user.password === password) {
            req.session.user = { username: user.Username };
            res.status(200).json({ message: "Login successful" });
            console.log("Login successful, session set:", req.session.user);
        } else {
            res.status(400).json({ message: "Username or password invalid" });
            console.log("Login failed");
        }
    } catch (err) {
        console.error("❌ Error during login:", err);  
        res.status(500).json({ message: "Server error", error: err.message });  
    }
});


app.get("/login", async (req, res) => {
    try {
        console.log("Fetching contacts...");
        const contacts = await Login.find(); 
        if (contacts.length === 0) {
             console.log("No contacts found.");
         }
        console.log(contacts);
        res.json(contacts);  
    } catch (err) {
        console.error("❌ Error fetching contacts:", err);
        res.status(500).json({ message: "Server error" });
    }
});

app.post("/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed" });
      }
      res.clearCookie("connect.sid");
      res.status(200).json({ message: "Logout successful" });
    });
  });

app.get("/check-auth", (req, res) => {
    if (req.session.user) {
        res.json({ loggedIn: true, user: req.session.user });
    } else {
        res.json({ loggedIn: false });
    }
});

app.post("/signup", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }
    try {
        const newUser = new Login({
            Username: username,
            password: password
        });
        const alreadyhave = await Login.findOne({ Username: username });
        if(!alreadyhave) {
            const savedUser = await newUser.save();
            console.log("New user added:", savedUser);
            res.status(200).json({ message: "Signup successful" });
        }else {
            if(newUser.Username === alreadyhave.Username){
                console.log("Username already exists:", username);
                return res.status(400).json({ message: "Username already exists" });
            }
        }
    } catch (err) {
        console.error("❌ Error saving user:", err);
        res.status(500).json({ message: "Server error" });
    }
});

app.get("/contacts", async (req, res) => {
    try {
        console.log("Fetching contacts...");
        const contacts = await Contact.find(); 
        if (contacts.length === 0) {
             console.log("No contacts found.");
         }
        console.log(contacts);
        res.json(contacts); 
    } catch (err) {
        console.error("❌ Error fetching contacts:", err);
        res.status(500).json({ message: "Server error" });
    }
});

app.get("/contacts/:id", async (req, res) => {
    try {
        console.log("Fetching contact...");
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            console.log("Contact not found.");
            return res.status(404).json({ message: "Contact not found" });
        }
        console.log(contact);
        res.json(contact);
    } catch (err) {
        console.error("❌ Error fetching contact:", err);
        res.status(500).json({ message: "Server error" });
    }
});

app.post("/contacts", async (req, res) => {
    try {
        const { ContactID, Firstname, Lastname, MobileNo, Email, Facebook, ImageURL } = req.body;

        if (!ContactID || !Firstname || !Lastname || !MobileNo) {
            return res.status(400).json({ message: "ContactID and Firstname and Lastname and Mobile are required" });
        }

        const newContact = new Contact({
            ContactID,
            Firstname,
            Lastname,
            MobileNo,
            Email,
            Facebook,
            ImageURL
        });

        const savedContact = await newContact.save();
        console.log("New contact added:", savedContact);

        res.status(200).json(savedContact);
    } catch (err) {
        console.error("❌ Error saving contact:", err);
        res.status(500).json({ message: "Server error" });
    }
});

app.put("/contacts/:id", async (req, res) => {
    try {
        const { ContactID, Firstname, Lastname, MobileNo, Email, Facebook, ImageURL } = req.body;

        if (!ContactID || !Firstname || !Lastname || !MobileNo) {
            return res.status(400).json({ message: "ContactID and Firstname and Lastname and Mobile are required" });
        }

        const updatedContact = await Contact.findByIdAndUpdate(req.params.id, {
            ContactID,
            Firstname,
            Lastname,
            MobileNo,
            Email,
            Facebook,
            ImageURL
        }, { new: true });

        console.log("Contact updated:", updatedContact);
        res.json(updatedContact);
    } catch (err) {
        console.error("❌ Error updating contact:", err);
        res.status(500).json({ message: "Server error" });
    }
});

app.delete("/contacts/:id", async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        console.log("Contact deleted:", contact);
        res.json(contact);
    } catch (err) {
        console.error("❌ Error deleting contact:", err);
        res.status(500).json({ message: "Server error" });
    }
});
    
  

app.listen(PORT, () => console.log(`🚀 Server running on port http://127.0.0.1:${PORT}`));
