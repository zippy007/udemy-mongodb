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

  it('Saves a relation between user and a blogpost', (done) => {
    User.findOne({ name: 'Joe' })
      .populate('blogPosts')
      .then((user) => {
        console.log(user);
        assert(user.blogPosts[0].title === 'JS is Great')
        done();
      });
  });

  it('Saves a full relation tree (asssociations)', (done) => {
    User.findOne({ name: 'Joe' })
      .populate({
        path: 'blogPosts',
        populate: {
          path: 'comments',
          model: 'comment',
          populate: {
            path: 'user',
            model: 'user'
          }
        }
      })
      .then((user) => {
        assert(user.name === 'Joe');
        assert(user.blogPosts[0].title === 'JS is Great');
        assert(user.blogPosts[0].comments[0].content === 'Congrats on great post');
        assert(user.blogPosts[0].comments[0].user.name === 'Joe');
        done();
      });
  });

});
