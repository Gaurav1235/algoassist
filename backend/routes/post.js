const express = require('express');

const router = express.Router();

const  { authMiddleware } = require("../middleware");
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL
})

router.get("/post", authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    });

    res.json({
        balance: account.balance
    })
});



module.exports = router;