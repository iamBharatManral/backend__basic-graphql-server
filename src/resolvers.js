const { Users, posts } = require("./data");

const Query = {
  allUsers: () => [...Users],
  userById: (parent, args) => {
    return Users.find((user) => user.id === args.id);
  }
};

const User = {
  posts: (user) => posts.filter((post) => post.userId === user.id)
};

module.exports = { Query, User };
