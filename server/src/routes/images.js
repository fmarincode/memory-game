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

//get images by user by theme
router.get("/img/:userOwner/:theme", async (req, res) => {
  try {
      const userOwner = req.params.userOwner;
      const theme = req.params.theme;

      // Utiliser la méthode find avec le filtre sur userOwner
      const images = await ImagesModel.find({ userOwner, titleFrom: theme });

      res.json(images);
  } catch (err) {
      res.status(500).json({ error: "Une erreur s'est produite" });
  }
});




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



// delete an image

router.delete("/:themeName/:imageName/delete", async (req, res) => {
  const themeName = req.params.themeName;
  const imageName = req.params.imageName;

  try {
      // Recherche de toutes les images avec themeName égal à titlefrom
      const images = await ImagesModel.find({ titleFrom : themeName });

      if (images.length === 0) {
          return res.status(404).json({ message: "Aucune image trouvée avec le themeName spécifié." });
      }

      // Recherche de l'image spécifique par son nom
      const imageToDelete = images.find((image) => image.name === imageName);

      if (!imageToDelete) {
          return res.status(404).json({ message: "Image non trouvée avec le nom spécifié." });
      }

      // Suppression de l'image spécifique
      await ImagesModel.findByIdAndDelete(imageToDelete._id);

      res.status(200).json({ message: "Image supprimée avec succès." });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Une erreur s'est produite lors de la suppression de l'image." });
  }
});

// delete all images by theme
router.delete("/img/delete/:themeName", async (req, res) => {
  const themeName = req.params.themeName;
  console.log("Deleting images for theme:", themeName);
  try {
      // Recherche de toutes les images avec themeName égal à titleFrom
      const images = await ImagesModel.find({ titleFrom : themeName });
      
      if (images.length === 0) {
          return res.status(404).json({ message: "Aucune image trouvée avec le themeName spécifié." });
      }

      await ImagesModel.deleteMany({titleFrom : themeName});

      res.status(200).json({ message: "Toutes les images ont été supprimées avec succès." });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Une erreur s'est produite lors de la suppression des iamges." });
  }
});


export {router as imgsRouter}