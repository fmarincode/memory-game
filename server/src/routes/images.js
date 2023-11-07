import express from 'express';
import mongoose from 'mongoose';
import { ImagesModel } from '../models/Images.js';


const router = express.Router()


router.get("/img", async (req, res) => {
    try {
        const response = await ImagesModel.find({})
        res.json(response)
    } catch (err) {
        res.json(err)
    }
})




router.post("/add", async (req, res) => {
  const { name, titleFrom, image, userOwner, imageSrc, imageAuthor } = req.body;
  const imagePost = new ImagesModel({
      name,
      titleFrom,
      image,
      userOwner,
      imageSrc,
      imageAuthor,
  });

  try {
      const response = await imagePost.save();
      res.json(response);
  } catch (err) {
      res.status(400).json(err);
  }
});



  // Get images by title
router.get("/:title", async (req, res) => {
  const title = req.params.title;

  try {
    const results = await ImagesModel.find({ titleFrom: title });
    if (results.length > 0) {
      // Transformez les résultats pour inclure l'ID et l'URL de l'image
      const transformedResults = results.map((image) => ({
        id: image._id, // Ajoutez l'ID de l'image
        src: image.image, // Construisez l'URL de l'image
      }));
      res.status(200).json(transformedResults);
    } else {
      res.status(404).json({ message: "Aucune image trouvée avec ce titre." });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});





router.get("/image/:imageId", async (req, res) => {
  const imageId = req.params.imageId;

  try {
    const image = await ImagesModel.findById(imageId);

    if (image) {
      // Renvoyer les données de l'image en tant que réponse
      const imagePath = path.join(__dirname, 'uploads', image.image);
      res.sendFile(imagePath);
    } else {
      res.status(404).json({ message: "Image introuvable" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});



export {router as imgsRouter}