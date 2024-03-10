const express = require('express');
const router = express.Router();
const z = require('zod');
const jwt = require("jsonwebtoken")
const  { authMiddleware } = require("../middleware");
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL
})

const { ZodError } = require('zod');
const JWT_SECRET = process.env.JWT_SECRET

// Define your routes
const signupSchema = z.object({
    email: z.string().email(),
    // firstName: z.string(),
    // lastName: z.string(),
    password: z.string()
});


// more strict password 
const signinSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
});

router.post('/signUp', async (req, res) => {

    email = req.body.email;
	// firstName = req.body.firstName;
	// lastName = req.body.lastName;
	password = req.body.password;

    // userData = {email,firstName,lastName, password};
    userData = {email, password};

    try {
        // Attempt to validate the data
        signupSchema.safeParse(userData);
        console.log('Data is valid!');

        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        
        console.log(user);

        if(user){
            res.status(411).send("Email already taken / Incorrect inputs");
        }
        else{
            const dbUser = await prisma.user.create({data:userData});

            console.log(dbUser);
            console.log(JWT_SECRET);

            const token = jwt.sign({userId:dbUser.id},JWT_SECRET);

            res.status(200).json({msg:'User created successfully',token});
        }


    } catch (error) {
        if (error instanceof ZodError) {
          console.error('Validation failed:', error.errors);
          res.send('Validation failed!');
        } else {
          console.error('Unexpected error during validation:', error);
        }

    }

    // res.send('Hello from the main route!');
});


router.post('/signin',async (req,res)=>{

    email = req.body.email;
	password = req.body.password;

    userData = {email, password};

    try {
        // Attempt to validate the data
        signinSchema.safeParse(userData);
        console.log('Data is valid!');

        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        
        if(user.password != password){
            res.status(411).send("Incorrect inputs");
        }
        else{
            const token = jwt.sign({userId:user._id},JWT_SECRET);
            res.status(200).json({msg:'User signed in successfully',token});
        }


    } catch (error) {
        if (error instanceof ZodError) {
          console.error('Validation failed:', error.errors);
          res.send('Validation failed!');
        } else {
          console.error('Unexpected error during validation:', error);
          res.send('Unexpected error during validation');
        }
    }


})

// other auth routes

const updateBody = z.object({
	password: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
})

router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    await User.updateOne(req.body, {
        _id: req.userId
    })

    res.json({
        message: "Updated successfully"
    })
})

router.get('/bulk',authMiddleware, async (req, res)=>{

    filter = req.query.filter || "";

    const users = await User.find({
        $or: [
          { 'firstName':{ 
            "$regex": filter
          } },
          { 'lastName': {
            "$regex": filter
        }}
        ]
    }, function(err, docs) {
        if(!err) res.send(docs);
    });

    res.json({
        user: users.map(user => ({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })

})

router.get('/users',authMiddleware, async (req,res)=>{

    
    const users = await prisma.user.findMany()
    console.log(users)
    

    res.json({
        msg: "sds"
    })

      
})

module.exports = router;

// app.post('/createUser',async(req,res)=>{
    
//     const user = await prisma.user.create({
//         data: {
//           name: 'Jasd',
//           email: 'gura@kaun.com'
//         }
//     });

//     console.log(user);

//     if(user){
//         res.json({
//             msg: "user created"
//         })
//     }
//     else{
//         res.json({
//             msg: "error creating user"
//         })
//     }

// })
