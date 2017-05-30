const assert = require('assert')

const User = require('../src/user')
const Comment = require('../src/comment')
const BlogPost = require('../src/blogPost')

describe('Associations', (done) => {

  let joe, blogPost, comment;

  beforeEach((done) => {
      joe = new User({ name: 'Joe' });
      blogPost = new BlogPost({ title :'JS is Great', content: 'Yep it really is'});
      comment = new Comment({ content: 'Congrats on great post'});

      //  Mongo understands the assingment of Model by Reference
      joe.blogPosts.push(blogPost);
      blogPost.comments.push(comment);
      comment.user = joe;

      // All promises must suceed for the .then() to process.
      Promise.all([ joe.save(), blogPost.save(), comment.save() ])
        .then(() => done());
  });

  it.only('Saves a relation between user and a blogpost', (done) => {
    User.findOne({ name: 'Joe' })
      .populate('blogPosts')
      .then((user) => {
        console.log(user);
        assert(user.blogPosts[0].title === 'JS is Great')
        done();
      });
  });

});
