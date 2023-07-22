import mongoose  from "mongoose";
import PostMessage from "../models/postMessage.js";
import User from '../models/user.js';

export const getPosts = async (req, res) => {
    try{
        const postMessages = await PostMessage.find();

        res.status(200).json(postMessages);
    }
    catch(error){
        res.status(404).json({ message: error.message });
    }
};

export const createPost = async (req, res) => {
    if(!req.userId){
        return res.json({ success: false, message: "Please sign in to create post." });
    }
    const user = await User.findById(req.userId);
    const post = req.body;
    const newPost = new PostMessage({ ...post, creator: user.name, creatorId: user._id});
    try{
        await newPost.save();

        res.status(201).json(newPost);
    }
    catch(error){
        res.status(409).json({ success:false, message: error.message });
    }
};

export const updatePost = async (req, res) => {
    if(!req.userId){
        return res.json({ success:false, message: "Please sign in to update post." });
    }

    const { id: _id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('No post with that id');
    }
    const oldPost = await PostMessage.findById(_id);
    if(!oldPost){
        return res.json({ success:false, message: "No post with that id" });
    }
    if(oldPost.creatorId !== String(req.userId)){
        return res.json({ success:false, message: "You can only update posts created by you." });
    }

    const post = req.body;
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true });
    res.json(updatedPost);
};

export const deletePost = async (req, res) => {
    if(!req.userId){
        return res.json({ success:false, message: "Please sign in to delete post." });
    }

    const { id: _id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.json({ success:false, message: "No post with that id" });
    }
    const oldPost = await PostMessage.findById(_id);
    if(!oldPost){
        return res.json({ success:false, message: "No post with that id" });
    }
    if(oldPost.creatorId !== String(req.userId)){
        return res.json({ message: "You can only update posts created by you." });
    }


    await PostMessage.findByIdAndRemove(_id);

    res.json({ message: 'Post deleted successfully! ' });
};

export const likePost = async (req, res) => {
    const { id: _id } = req.params;

    if(!req.userId){
        return res.json({ message: "Unauthenticated' "});
    }
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.json({ success:false, message: "No post with that id" });
    }

    let post = await PostMessage.findById(_id);
    const index = post.likes.findIndex((id) => (id === String(req.userId)));
    
    if(index === -1){
        // like the post
        post.likes.push(req.userId);
        console.log("Liking");
    }
    else{
        // dislike a post
        console.log("Disliking");
        post = post.likes.filter((id) => (id !== String(req.userId)));
    }
    post.likes = post.likes || [];

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, {likes: [...post.likes]}, { new: true });

    res.json(updatedPost);
};