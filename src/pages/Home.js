import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <>
      <Helmet>
        <title>Freelances Lyonnais</title>
      </Helmet>
      <div className="bg-white">
        <div className="container mx-auto flex flex-col items-center py-12 sm:py-24">
          <div className="w-11/12 sm:w-2/3 mb-5 sm:mb-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center text-gray-800 font-extrabold leading-tight">
              Bienvenue chez Les{' '}
              <span className="text-indigo-700">Freelances Lyonnais</span>
            </h1>
            <p className="mt-5 sm:mt-10 text-gray-600 font-normal text-center text-lg sm:text-lg">
              Si vous êtes arrivé.e.s sur cette page, c’est que vous en
              connaissez au moins un.e :) <br />
              Vous avez apprécié la qualité de son travail, sa proximité
              géographique, et sa disponibilité. <br />
              Imaginez maintenant qu’on vous dise qu’on connaît 1800 autres
              professionnel.le.s comme ça ?
            </p>
          </div>
          <div className="flex justify-center items-center">
            <Link to="/inscription">
              <button className="focus:outline-none bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white m-4 px-4 sm:px-10 py-2 sm:py-4 text-sm">
                Je créé ma fiche freelance gratuitement
              </button>
            </Link>
            <Link to="/liste_freelance">
              <button className="ml-4 focus:outline-none bg-white transition duration-150 ease-in-out hover:border-indigo-600 hover:text-indigo-600 rounded border border-indigo-700 text-indigo-700 m-4 px-4 sm:px-10 py-2 sm:py-4 text-sm">
                Les Freelances Lyonnais
              </button>
            </Link>
          </div>
        </div>
      </div>
      <section className="text-justify max-w-8xl pt-16 mx-auto container bg-white">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 px-4 md:px-2 lg:px-12 py-10 flex items-center">
            <img className="rounded" src="/imgHome1.jpg" alt="" />
          </div>
          <div className="flex flex-col justify-center w-full md:w-1/2 px-4 md:pr-12">
            <div className="pl-4">
              <h2 className="text-4xl font-bold leading-tight text-gray-800">
                Lyon, c’est un petit réseau, et ça tombe bien.
              </h2>
              <p className="text-xl text-gray-600 leading-normal pt-4">
                C’est bien connu, à Lyon, les choses fonctionnent en réseaux.
                Les Freelances Lyonnais l’ont compris, et jouent sur cette
                dynamique pour trouver leurs client.e.s et leurs partenaires de
                prestations. Ce réseau offre des rendez-vous mensuels pour
                réseauter et se tenir à jour sur les actualités professionnelles
                locales. Notre groupe Facebook nous permet de consulter en tout
                temps ces 1800 professionnel.le.s et aller chercher les
                réponses, ressources et conseils qui font la différence.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="text-justify max-w-8xl pt-16 mx-auto container bg-white">
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-col w-full lg:w-6/12 px-4 lg:px-8 justify-center">
            <h2 className="text-4xl font-extrabold leading-tight text-gray-800 pt-6">
              Un arsenal de compétences dans lequel piocher
            </h2>
            <p className="text-xl font-light text-gray-600 leading-normal pt-4">
              L’annuaire des Freelances, c’est un peu comme faire son marché ou
              visiter son magasin de quartier : vous appuyez le commerce local
              et vous avez l’avantage d’une offre sur mesure, dans votre langue,
              voire votre quartier ! Ce Freelance bénéficie de l’appui de son
              réseau pour aller chercher une compétence additionnelle dont votre
              projet aura besoin, soumettre à la sagesse de la foule
              connaisseuse les questions pointues ou encore vous référer un
              autre prestataire de confiance.
            </p>
          </div>
          <div className="w-full md:w-1/2 px-4 md:px-2 lg:px-12 py-10 flex items-center">
            <img className="rounded" src="/imgHome2.jpg" alt="" />
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
