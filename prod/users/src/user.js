const mongoose = require('mongoose');
const PostSchema = require('./post');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: {
		type: String,
		validate: {
			validator: (name) => name.length > 2,
			message: 'Name must be longer than 2 characters.'
		},
		required: [true, 'Name is required.']
	},
	posts: [PostSchema],	//Sub Document
	likes: Number,
	blogPosts: [{					// Reference to other Model
		type: Schema.Types.ObjectId,
		ref: 'blogPost'
	}]
});

UserSchema.virtual('postCount').get(function() {
	return this.posts.length;
});

UserSchema.pre('remove', function(next) {
	// Avoid Cyclic Dependency using require() but this method here.
	const BlogPost = mongoose.model('blogPost');

	BlogPost.remove({ id_: { $in: this.blogPosts } })
		// Call next middleware in chain or execture the above remove
		.then(() => next());
});

const User = mongoose.model('user',UserSchema)

module.exports = User;
