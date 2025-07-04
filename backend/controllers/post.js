import { Post } from "../models/Post.js";
import { User } from "../models/User.js";

// Create a post
export const createPost = async (req, res) => {
    try {
        const newPost = new Post(req.body);
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Update a post
export const updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId.toString() === req.body.userId) {
            await post.updateOne({ $set: req.body });
            res.status(200).json("Post updated successfully");
        } else {
            res.status(403).json("You can update only your post");
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

// Delete a post
export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId.toString() === req.body.userId) {
            await post.deleteOne();
            res.status(200).json("Post deleted successfully");
        } else {
            res.status(403).json("You can delete only your post");
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

// Like / Unlike a post
export const likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } });
            res.status(200).json("The post has been liked");
        } else {
            await post.updateOne({ $pull: { likes: req.body.userId } });
            res.status(200).json("The post has been unliked");
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

// Get a post by ID
export const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate("userId", "username profilePicture");
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Get timeline posts (user + followings)
export const getTimeline = async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({ userId: currentUser._id });
        const friendPosts = await Promise.all(
            currentUser.followers.map(friendId => {
                return Post.find({ userId: friendId });
            })
        );
        res.status(200).json(userPosts.concat(...friendPosts));
    } catch (err) {
        res.status(500).json(err);
    }
};

export const verityUser = (req, res) => {
    res.json({ message: "You accessed a protected route!", user: req.user });
}

// export const verityUser = (req, res) => {
//     console.log(req.user.role)
//     if(req.user.role){
//         res.json({ message: "You accessed a protected route!", user: req.user });
//     }else{
//         res.send("You can't access this route")
//     }
//
// }
