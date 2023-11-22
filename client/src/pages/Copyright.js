import React, {useEffect, useState} from 'react'
import axios from "axios"
import {AiOutlinePaperClip} from "react-icons/ai"

function Copyright() {
const url = "https://memorycardgame.onrender.com"
const [imagesData, setImagesData] = useState([])
const [themeData, setThemeData] = useState([]) //fetch all to set the theme list with only theme name info
const [themeList, setThemeList] = useState([])

    useEffect(() => {
        // fetch full data in images collection
        const fetchData = async () => {
            try {
                const response = await axios.get(`${url}/images/img`)
                
                setImagesData(response.data)
            } catch (error) {
                console.err(error)
            }
        }
        fetchData()
    }, [])


    //fetch themes & make a list
    useEffect(() => {
    const fetchThemeData = async () => {
        try {
        const response = await axios.get(`${url}/themes/`)
        setThemeData(response.data)
        } catch (error) {
        
        }
    }
    fetchThemeData()
    },[])



    useEffect(() => {
    if (themeData) {
        const names = themeData.map(theme => theme.name); // Extract names from themeData
        setThemeList(names); // Set themeList to the extracted names
    }
    }, [themeData]);



const normalizedText = (text) => {
    const result = text.toLowerCase().replace(/[\s-]/g, '')
    return result
}

// Regroupez les images par thème en créant un objet, chaque clé = theme name (normalized) : [tableau d'images du thème]
const imagesByTheme = themeList.reduce((acc, theme) => {
  
    const normalizedTheme = normalizedText(theme); // chaque theme passe dans le normaliseur pour être lower sans espace

    acc[normalizedTheme] = imagesData.filter((image) => { // acc ajoute normalizedTheme comme nouvelle clé-thème ou y accède si elle existe deja dans l'objet, on filtre dans images data pour trouver toutes les images dont le image.titleFrom === le normalizedTheme. Cela permet de remplir le tableau uniquement d'images du normalizedTheme (clé).
      const normalizedImageTitle = normalizedText(image.titleFrom);
      return normalizedTheme === normalizedImageTitle;
    });
    return acc;
  }, {});

  return (
    <section className='flex flex-col bg-[--firstColor] text-[--secondColor] px-20 pt-20 md:min-h-[calc(100vh-40px)]'>
        <article className='space-y-5 '>
            <h1 className='text-2xl font-bold'> # Copyright</h1>
            <p>Les images utilisées sur ce site ne sont pas de notre propriété, mais sont la propriété de leurs détenteurs de droits respectifs. Ces images ont été obtenues à partir de diverses sources.</p>
            <p>Ces images sont protégées par des droits d'auteur, et nous respectons pleinement ces droits. Nous croyons en la création et le partage responsables de contenu visuel sur Internet.</p>
            <p className='text-xl font-semibold'>## Crédits et Sources</p>
            <p>Les informations écrites ci-dessous ont été renseignés lors de l'upload de chaque image par les utilisateurs.</p>
            <p>Nous tenons à remercier les auteurs et sources d'origine des images utilisées sur ce site. Voici les crédits pour chaque image, avec des liens vers leurs sources respectives :</p>
            
            {themeList.map((theme) => {
              const normalizedTheme = normalizedText(theme);
              const matchingImages = imagesByTheme[normalizedTheme] || [];

              if (matchingImages.length > 0) {
                const themeDataForTheme = themeData.find((t) => normalizedText(t.name) === normalizedTheme);
                const lastBackImage = themeDataForTheme.backImg[themeDataForTheme.backImg.length - 1];
                
                return (
                  <details key={normalizedTheme}>
                    <summary className='cursor-pointer'>{theme}</summary>
                    <ul className='list-disc pl-10 bg-[--secondColor] text-[--firstColor] font-semibold text-md rounded-xl py-5'>
                      {matchingImages.map((image) => (
                        <li key={image.imageSrc}>
                          {image.name} : <a href={image.imageSrc} target='blank' className='font-bold tracking-widest hover:border-b-2 border-[--fourthColor]'>{image.imageAuthor} <AiOutlinePaperClip className='inline-block'/></a> 
                        </li>
                      ))}

          {lastBackImage && lastBackImage.backImageName ? (

            <li>Image d'illustration du thème au dos des cartes : {lastBackImage.backImageName} : <a href={lastBackImage.backImageSrc} target='blank' className='font-bold tracking-widest hover:border-b-2 border-[--fourthColor]'>{lastBackImage.backImageAuthor} <AiOutlinePaperClip className='inline-block'/></a></li>
          ) : (
            <li>Image d'illustration du thème au dos des cartes : Image du jeu par défaut </li>
          )}
        </ul>
      </details>
    );
  }
  return null;
})}



           {/*  <p>Si vous êtes l'auteur d'une image utilisée sur ce site et que vous souhaitez que nous retirions votre image ou que nous modifions son crédit, veuillez nous contacter à [votre adresse e-mail de contact].</p> */}

            <p>Nous sommes reconnaissants envers tous les artistes et créateurs dont le travail a contribué à l'aspect visuel de notre site. Nous encourageons également nos visiteurs à respecter les droits d'auteur et à utiliser les images de manière responsable.</p>
        </article>
    </section>
  )
}

export default Copyright