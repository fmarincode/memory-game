import express from 'express';
import mongoose from 'mongoose';
import { ThemeModel } from '../models/Theme.js';

const router = express.Router()

//get all themes
router.get("/", async (req, res) => {
    try {
        const response = await ThemeModel.find({})
        res.json(response)
    } catch (err) {
        res.json(err)
    }
})

router.get("/:userOwner", async (req, res) => {
    const userOwner = req.params.userOwner
    try {
        const response = await ThemeModel.find({})
        const filteredResults = results.filter(item => item.userOwner === userOwner) // filter les résultats par userOwner

        if (filteredResults.length > 0) {
            res.status(200).json(filteredResults);
        } else {
            res.status(404).json({ message: "Aucun thème trouvé avec ce pseudo." });
        }

    } catch (err) {
        res.json(err)
    }
})

router.get("/:theme", async (req, res) => {
    const theme = req.params.theme;

    try {
        const results = await ThemeModel.find({}); 
        const filteredResults = results.filter(item => item.name === theme); // Filtrer les résultats par le nom

        if (filteredResults.length > 0) {
            res.status(200).json(filteredResults);
        } else {
            res.status(404).json({ message: "Aucun thème trouvé avec ce titre." });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});


router.post("/", async(req, res) => {
    const {name, media, userOwner} = req.body;

    const theme = await ThemeModel.findOne({name: name})

    if (theme){
        return res.json({message: "This theme already exists !"})
    }

    const newTheme = new ThemeModel({name, media, userOwner})
    await newTheme.save()

    res.json({message: "Theme Registered Successfully !"})
})

// add a backImg
router.post("/:themeName/backImages/add", async (req, res) => {
    const themeName = req.params.themeName;
    const { backImageName, backImage, backImageSrc, backImageAuthor } = req.body;

    try {
        // Rechercher le thème par nom
        const theme = await ThemeModel.findOne({ name: themeName });

        if (!theme) {
            return res.status(404).json({ message: "Thème non trouvé." });
        }

        // Ajouter les données d'arrière-plan au thème

        theme.backImg.push({
            backImageName,
            backImage,
            backImageSrc,
            backImageAuthor
        });

        await theme.save();

        res.status(201).json({ message: "Données d'arrière-plan ajoutées avec succès au thème." });
    } catch (err) {
        res.status(500).json(err);
    }
});



export {router as themesRouter}