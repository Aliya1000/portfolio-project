const nodemailer = require("nodemailer");
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
require("dotenv").config();
const express = require("express");
const Project = require("./models/Project");
const Contact = require("./models/Contact");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(cors());

app.use(express.json());
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("✅ MongoDB Connected");
})
.catch((err) => {
    console.log("❌ MongoDB Error:", err);
});
app.get("/api/projects", async (req, res) => {
    const projects = await Project.find();
    res.json(projects);
});
app.post("/api/projects", async (req, res) => {
    const project = await Project.create(req.body);
    res.json(project);
});
app.delete("/api/projects/:id", async (req, res) => {
    const project = await Project.findByIdAndDelete(req.params.id);
    res.json(project);
});
app.put("/api/projects/:id", async (req, res) => {
    const project = await Project.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );


    res.json(project);
});
app.post("/api/contact", async (req, res) => {

    const contact = await Contact.create(req.body);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

await transporter.verify();
console.log("SMTP OK");

try {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: "New Portfolio Contact Message",
    text: `
Name: ${req.body.name}
Email: ${req.body.email}
Message: ${req.body.message}
`
  });

  console.log("Email sent successfully");
} catch (err) {
  console.error("MAIL ERROR:", err);
}
    res.json(contact);
});
app.get("/api/contact", async (req, res) => {

    const contacts = await Contact.find();

    res.json(contacts);

});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});