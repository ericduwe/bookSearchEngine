const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({_id: context.user._id});
            } 
            throw new AuthenticationError('You need to be logged in!');
        },
    },

    Mutation: {
        loginUser: async (parent, {email, password}) => {
            const user = await User.findOne({ $or: [{ username: username }, { email: email }] });
            if (!user) {
              throw new AuthenticationError("Can't find this user");
            }
        
            const correctPw = await user.isCorrectPassword(password);
        
            if (!correctPw) {
              throw new AuthenticationError('Wrong password!')
            }
            const token = signToken(user);
            return { token, user };
        },

        addUser: async (parent, {username, email, password}) => {
            const user = await User.create({username, email, password});

            if (!user) {
            throw new AuthenticationError('Something is wrong!')
            }
            const token = signToken(user);
            return { token, user };
        } ,

        saveBook: async (parent, args) => {
            try {
                const updatedUser = await User.findOneAndUpdate(
                  { _id },
                  { $addToSet: { savedBooks: args } },
                  { new: true, runValidators: true }
                );
                return {updatedUser};
              } catch (err) {
                console.log(err);
                return res.status(400).json(err);
              }
        },

        removeBook: async (parent, {Book}, context) => {
            const updatedUser = await User.findOneAndUpdate(
                { _id },
                { $pull: { savedBooks: Book } },
                { new: true }
              );
              if (!updatedUser) {
                throw new AuthenticationError("Couldn't find user with this id!");
              }
              return {updatedUser};
        }

    }
}

module.exports = resolvers