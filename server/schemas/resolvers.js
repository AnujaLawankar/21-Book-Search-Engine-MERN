const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');


const resolvers = {


    Query: {


        // Resolver for getting a single user by id or username
        me: async (parent, args, context) => {
            if (context.user) {
                data = await User.findOne({ _id: context.user._id }).select('-__v -password');
                return data;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },
    //     async user(parent, { id, username }) {

    //         const foundUser = await User.findOne({
    //             $or: [{ _id: id }, { username: username }],

    //         });

    //         if (!foundUser) {
    //             throw new Error('User not found!');

    //         }
    //         return foundUser;

    //     },

    // },

    // User: {
    //     _id: (parent) => parent._id.toString(), // Convert the ObjectId to a string
    //     // Add other field resolvers for User type if needed
    // },

    Mutation: {

        // Resolver for creating a user

        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('User not found. Do you have an account?');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials!');
            }

            const token = signToken(user);

            return { token, user };
        },
        saveBook: async (parent, { newBook }, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { savedBooks: newBook } },
                    { new: true }
                );
                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId } } },
                    { new: true }
                );
                return updatedUser;
            }
            throw new AuthenticationError('Login required!');
        },
    }
};

//         async createUser(parent, { input }) {

//             const user = await User.create(input);
//             const token = signToken(user);

//             //return { token, user };


//             //Ensure that the _id field is included in the returned User object
//             return { _id: user._id.toString(), username: user.username, token, user };

//         },

//         // Resolver for logging in a user

//         async login(parent, { input }) {

//             const user = await User.findOne({

//                 $or: [{ username: input.username }, { email: input.email }],

//             });

//             if (!user) {
//                 throw new Error('User not found!');

//             }

//             const correctPw = await user.isCorrectPassword(input.password);

//             if (!correctPw) {
//                 throw new Error('Incorrect password!');

//             }
//             const token = signToken(user);
//             return { token, user };

//         },
//         // Resolver for saving a book to a user's savedBooks

//         async saveBook(parent, { input }, context) {
//             const user = context.user;

//             if (!user) {

//                 throw new Error('Authentication required!');

//             }
//             const updatedUser = await User.findByIdAndUpdate(user._id,

//                 { $addToSet: { savedBooks: input } },
//                 {
//                     new: true, runValidators: true
//                 });
//             return updatedUser;

//         },

//         // Resolver for deleting a book from a user's savedBooks
//         async deleteBook(parent, { bookId }, context) {
//             const user = context.user;
//             if (!user) {
//                 throw new Error('Authentication required!');
//             }
//             const updatedUser = await User.findByIdAndUpdate(
//                 user._id,
//                 { $pull: { savedBooks: { bookId: bookId } } },
//                 { new: true }
//             );
//             if (!updatedUser) {
//                 throw new Error("User not found!");
//             }
//             return updatedUser;
//         },
//     },
//     // User: {
//     //     // Resolver for populating the savedBooks field in the User type
//     //     async savedBooks(parent) {
//     //         const user = await parent.populate('savedBooks').execPopulate();
//     //         return user.savedBooks;
//     //     },
//     // },
// };

module.exports = resolvers;