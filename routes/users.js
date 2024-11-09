const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// Update user
router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.user?.isAdmin) { // Corrected typo here
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                return res.status(500).json(err);
            }
        }
        try {
            const user = await User.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );
            res.status(200).json("Account updated successfully");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You can update only your own account!");
    }
}); 

// Additional routes: delete user, get a user, follow users

module.exports = router; 
