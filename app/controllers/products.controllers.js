const Products = require("../models/products.model");
const Videos = require("../models/videos.model");

exports.create = async (req, res) => {
  const { title, price, link, imageUrl } = req.body;

  try {
    const video = await Videos.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    const productValidate = await Products.findOne({
      title,
      videoId: video.id,
    });
    if (productValidate) {
      return res.status(400).json({ message: "Product already exist" });
    }

    const product = await Products.create({
      title,
      price,
      link,
      imageUrl,
      videoId: video.id,
    });

    video.products.push(product.id);
    await video.save();

    res.status(201).json({
      message: "Success creating new product",
      data: {
        id: product.id,
        title: product.title,
        price: product.price,
        link: product.link,
        imageUrl: product.imageUrl,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductsByVideoId = async (req, res) => {
  try {
    const videoId = req.params.id;
    const products = await Products.find({ videoId });
    res.status(200).json({
      message: "Success finding all products",
      data: products,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.update = async (req, res) => {
  const { title, price, link, imageUrl } = req.body;

  try {
    const product = await Products.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (title) product.title = title;
    if (price) product.price = price;
    if (link) product.link = link;
    if (imageUrl) product.imageUrl = imageUrl;

    await product.save();

    res.status(200).json({
      message: "Success updating product",
      data: {
        id: product.id,
        title: product.title,
        price: product.price,
        link: product.link,
        imageUrl: product.imageUrl,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const product = await Products.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const video = await Videos.findById(product.videoId);
    if (video) {
      video.products.pull(product.id);
      await video.save();
    }

    res.status(200).json({ message: "Delete product success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
