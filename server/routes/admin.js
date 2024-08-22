const mongoose = require("mongoose");
const express = require("express");
const { User, Course, Admin } = require("../db")
const jwt = require("jsonwebtoken");
const { SECRET } = require("../middleware/auth");
const { authenticateJwt } = require("../middleware/auth");
const { rmSync } = require("fs");

const router = express.Router();

router.get("/me", authenticateJwt, async (req, res) => {
    const admin = await Admin.findOne({username: req.user.username});
    if(!admin){
      res.status(403).json({message: "admin doesn't exist"});
      return
    }
    res.json({  
        username: admin.username
    })
})


router.post("/signup", async (req, res) => {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (admin) {
      res.status(403).json({ message: "Admin already exists" });
    } else {
      const obj = { username: username, password: password };
      const newAdmin = new Admin(obj);
      await newAdmin.save();
      const token = jwt.sign({ username, role: "admin" }, SECRET, {
        expiresIn: "1h",
      });
      res.json({ message: "Admin created succesfully", token });
    }
  });
  
  router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username, password });
    if (admin) {
      const token = jwt.sign({ username, role: "admin" }, SECRET, {
        expiresIn: "1h",
      });
      res.json({ message: "Logged in succesfully", token });
    } else {
      res
        .status(403)
        .json({ message: "invalid username or password, authentication failed" });
    }
  });
  
  router.post("/courses", authenticateJwt, async (req, res) => {
    const course = new Course(req.body);
    await course.save();
    res.json({ message: "course created successfully", courseId: course.id });
  });
  
  router.put("/courses/:courseId", authenticateJwt, async (req, res) => {
    const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, {
      new: true,
    });
    if (course) {
      res.json({ message: "course updated successfully" });
    } else {
      res.status(404).json({ message: "course not found" });
    }
  });
  
  router.get("/courses", authenticateJwt, async (req, res) => {
    const courses = await Course.find({}); //empty object because we want all courses
    res.json({ courses });
  });

  router.get("/courses/:courseId", authenticateJwt, async(req, res) => {
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId);
    res.json({course});
  });
  
module.exports = router