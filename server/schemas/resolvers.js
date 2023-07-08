const { Book, User } = require('../models');

const { signToken } = require('../utils/auth');


const resolvers = {


    Query: {

        // Resolver for getting a single user by id or username

        async user(parent, { id, username }) {

            const foundUser = await User.findOne({
                $or: [{ _id: id }, { username: username }],

            });

            if (!foundUser) {
                throw new Error('User not found!');

            }
            return foundUser;

        },

    },


    Mutation: {

        // Resolver for creating a user
        async createUser(parent, { input }) {

            const user = await User.create(input);
            const token = signToken(user);

            return { token, user };



        },

        // Resolver for logging in a user

        async login(parent, { input }) {

            const user = await User.findOne({

                $or: [{ username: input.username }, { email: input.email }],

            });

            if (!user) {
                throw new Error('User not found!');

            }

            const correctPw = await user.isCorrectPassword(input.password);

            if (!correctPw) {
                throw new Error('Incorrect password!');

            }
            const token = signToken(user);
            return { token, user };

        },
        // Resolver for saving a book to a user's savedBooks

        async saveBook(parent, { input }, context) {
            const user = context.user;

            if (!user) {

                throw new Error('Authentication required!');

            }
            const updatedUser = await User.findByIdAndUpdate(user._id,

                { $addToSet: { savedBooks: input } },
                {
                    new: true, runValidators: true
                });
            return updatedUser;

        },

        // Resolver for deleting a book from a user's savedBooks
        async deleteBook(parent, { bookId }, context) {
            const user = context.user;
            if (!user) {
                throw new Error('Authentication required!');
            }
            const updatedUser = await User.findByIdAndUpdate(
                user._id,
                { $pull: { savedBooks: { bookId: bookId } } },
                { new: true }
            );
            if (!updatedUser) {
                throw new Error("User not found!");
            }
            return updatedUser;
        },
    },
    User: {
        // Resolver for populating the savedBooks field in the User type
        async savedBooks(parent) {
            const user = await parent.populate('savedBooks').execPopulate();
            return user.savedBooks;
        },
    },
};

module.exports = resolvers;