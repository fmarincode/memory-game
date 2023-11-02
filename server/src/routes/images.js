import express from 'express';
import mongoose from 'mongoose';
import { ImagesModel } from '../models/Images.js';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from 'path';

const router = express.Router()


router.get("/img", async (req, res) => {
    try {
        const response = await ImagesModel.find({})
        res.json(response)
    } catch (err) {
        res.json(err)
    }
})


// Obtenez le chemin du répertoire du fichier en cours d'exécution
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, 'uploads');
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const fileExtension = path.extname(file.originalname); // Obtenir l'extension du fichier d'origine
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = file.fieldname + '-' + uniqueSuffix + fileExtension; // Ajouter l'extension au nom du fichier
    cb(null, filename);
  }
});




const upload = multer({ storage: storage })

router.post("/add", upload.single("image"), async (req, res) => {
  const { name, titleFrom, userOwner, imageSrc, imageAuthor } = req.body;
  const image = new ImagesModel({
      name,
      titleFrom,
      image: req.file.filename,
      userOwner,
      imageSrc,
      imageAuthor,
  });

  try {
      const response = await image.save();
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
        src: `http://localhost:8000/images/image/${image._id}`, // Construisez l'URL de l'image
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