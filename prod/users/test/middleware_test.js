const assert = require('assert')

const User = require('../src/user')
const BlogPost = require('../src/blogPost')

describe('Middleware', () => {

  let joe, blogPost;

  beforeEach((done) => {
      joe = new User({ name: 'Joe' });
      blogPost = new BlogPost({ title :'JS is Great', content: 'Yep it really is'});

      //  Mongo understands the assingment of Model by Reference
      joe.blogPosts.push(blogPost);

      // All promises must suceed for the .then() to process.
      Promise.all([ joe.save(), blogPost.save() ])
        .then(() => done());
  });

  xit('Users clean up blogposts on remove', (done) => {
    console.log('About to remove');
    joe.remove()
      .then(() => BlogPost.count())
      .then((count) => {
        console.log('Blog Posts: ' + count);
        assert(count === 0);
        done();
      });
  });
});
