
const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // function for our authenticated routes
  authMiddleware: function ({ req }) { // Destructure `req` and `res` from the context object
    // allows token to be sent via req.query or headers

    // allows token to be sent via  req.query or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }
    // if no token passed, return the req
    if (!token) {
      return req;
    }




    // let token = req.headers.authorization || '';

    // // Extract the token value from the Authorization header
    // if (token.startsWith('Bearer ')) {
    //   token = token.slice(7, token.length);
    // }

    // if (!token) {
    //   return res.status(400).json({ message: 'You have no token!' });
    // }

    // verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {

      console.log('Invalid token');
    }

    return req;

  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
