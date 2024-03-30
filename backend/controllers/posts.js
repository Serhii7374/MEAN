const Post = require("../models/post");

exports.createPost = (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + '/images/' + req.file.filename,
    creator: req.body.creator
  });
  post.save().then((createdPost) => {
    res.status(201).json({
      message: 'Post added successfully',
      post: {
        _id: createdPost._id,
        title: createdPost.title,
        content: createdPost.content,
        imagePath: createdPost.imagePath,
        creator: createdPost.creator
      }
    });
  });
};

exports.updatePost = (req, res, next) => {
  const post = new Post({
    _id: req.params.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({_id: req.params.id}, post).then((result) => {
    console.log(result)
    res.status(200).json({message: 'Update successfully!',})
  })
};

exports.getPosts = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  let fetchedPosts;
  if (pageSize && currentPage) {
    postQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }
  postQuery
    .then(documents => {
      fetchedPosts = documents;
      return Post.countDocuments();
    })
    .then((count) => {
      res.status(200).json({
        message: 'posts fetched successfully!',
        posts: fetchedPosts,
        maxPosts: count
      })
    })
};

exports.getPostById = (req, res, next) => {
  Post.findById(req.params.id).then((post) => {
    if (post) {
      console.log(post)
      res.status(200).json(post)
    } else {
      res.status(404).json({message: 'Post not found!'})
    }
  })
};

exports.deletePost =  (req, res, next) => {
  Post.deleteOne({_id: req.params.id}).then(()=>{
    console.log('deleted from DB!')
    res.status(200).json({message: 'Post deleted!'})
  })
}
