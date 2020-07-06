const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
// Load Shop model
const Shop = require("../../models/Shop");

router.post("/register", (req, res) => {
    // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  Shop.findOne({ email: req.body.email }).then(shop => {
      if (shop) {
        return res.status(400).json({ email: "Email already exists" });
      } else {
        const newShop = new Shop({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          phoneno: req.body.phoneno
        });
  // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newShop.password, salt, (err, hash) => {
            if (err) throw err;
            newShop.password = hash;
            newShop
              .save()
              .then(shop => res.json(shop))
              .catch(err => console.log(err));
          });
        });
      }
    });
  });

  router.post("/login", (req, res) => {
    // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  const email = req.body.email;
    const password = req.body.password;
  // Find shop by email
    Shop.findOne({ email }).then(shop => {
      // Check if shop exists
      if (!shop) {
        return res.status(404).json({ emailnotfound: "Email not found" });
      }
  // Check password
      bcrypt.compare(password, shop.password).then(isMatch => {
        if (isMatch) {
          // shop matched
          // Create JWT Payload
          const payload = {
            id: shop.id,
            name: shop.name
          };
  // Sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 31556926 // 1 year in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
      });
    });
  });
  
  module.exports = router;