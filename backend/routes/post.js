const express = require('express');

const router = express.Router();
const path = require('path');

const  { authMiddleware } = require("../middleware");
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL
})

// app.use(
//     '/graphql',
//     graphqlHTTP({
//         schema,
//         graphiql: true,
//         context: { prisma }, // Pass Prisma instance to the context
//     })
// );

const { graphqlHTTP } = require('express-graphql');
const { resolvers } = require('./resolvers');
const { makeExecutableSchema } = require('graphql-tools');

// const schema = makeExecutableSchema({
//   typeDefs: require('fs').readFileSync('./schema.graphql', 'utf-8'),
//   resolvers: resolvers,
// });

const schema = makeExecutableSchema({
    typeDefs: require('fs').readFileSync(path.resolve(__dirname, '../prisma/schema.graphql'), 'utf-8'),
    resolvers: resolvers,
});

const app = express();

router.use('/graphql', authMiddleware, graphqlHTTP({ schema, graphiql: true }));

router.get('/posts',authMiddleware, async (req,res)=>{

    
    const posts = await prisma.post.findMany()
    console.log(posts)
    

    res.json({
        msg: posts
    })

      
})

// router.get("/post", authMiddleware, async (req, res) => {
    
// });



module.exports = router;