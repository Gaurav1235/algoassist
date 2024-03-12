// resolvers.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL
})

const resolvers = {
  Query: {
    //add async await syntax
    user: async (_, { id }) => await prisma.user.findUnique({ where: { id } }),
    allUsers: async () => await prisma.user.findMany(),
    allPosts: async () => await prisma.post.findMany(),
  },
  Mutation: {
    createUser: async (_, { name, email }) => await prisma.user.create({ data: { name, email } }),
    createPost: async (_, { title, content, authorId }) => {
        try {
          console.log(authorId)
          const newPost = await prisma.post.create({
            data: {
              title,
              content,
              authorId,
            },
          });
  
          return newPost;
        } catch (error) {
          console.error(error);
          throw new Error('Failed to create post');
        }
      },
  },
};

module.exports = { resolvers };
