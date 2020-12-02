import React from 'react'
import { Helmet } from 'react-helmet'

function LegalDisclaimer() {
  return (
    <>
      <Helmet>
        <title>Mentions légales</title>
      </Helmet>
      <section className="text-justify max-w-8xl pt-16 mx-auto container bg-white">
        <div className="container flex justify-center mx-auto pt-16">
          <h1 className="xl:text-4xl text-3xl text-center text-gray-800 font-extrabold pb-6 sm:w-4/6 w-5/6 mx-auto">
            Mentions légales
          </h1>
        </div>
        <div className="flex justify-center">
          <div className="w-full sm:w-1/2">
            <h4 className="mb-6 text-2xl text-gray-800 font-bold">
              Dénomination :
            </h4>
            <p className="mb-5 text-gray-800 text-xl">Freelances Lyonnais</p>
            <h4 className="mb-6 text-2xl text-gray-800 font-bold">
              Siège Social :
            </h4>
            <p className="mb-5 text-gray-800 text-xl">
              <p>WebAnyOne SAS</p>
              <p>18-20 rue Tronchet 69006 Lyon</p>
              <p>Immatriculée au RCS de LYON : N° 880 240 130 00018</p>
              <p>Numéro individuel d'identification fiscale : FR65880240130</p>
            </p>
            <h4 className="mb-6 text-2xl text-gray-800 font-bold">
              Adresse de courrier électronique et numéro de téléphone :
            </h4>
            <p className="mb-5 text-gray-800 text-xl">
              <p>Pierre Ammeloot</p>
              <p>pierre@webanyone.fr</p>
              <p>+33 6 02 12 06 33</p>
            </p>
            <h4 className="mb-6 text-2xl text-gray-800 font-bold">
              Mentions complémentaires :
            </h4>
            <p className="mb-5 text-gray-800 text-xl">
              <p>
                Hébergeur du site internet : OVH, 2 rue Kellermann, 59100
                Roubaix, France
              </p>
              <p>Directeur de la publication : Pierre Ammeloot</p>
            </p>
            <h4 className="mb-6 text-2xl text-gray-800 font-bold">
              Site web développé par :
            </h4>
            <p className="mb-5 text-gray-800 text-xl">
              <li>
                v1.0 : 30/07/2020 :{' '}
                <a
                  className="text-indigo-600 underline"
                  href="https://armins.co/"
                >
                  Armin
                </a>
                ,{' '}
                <a
                  className="text-indigo-600 underline"
                  href="https://www.linkedin.com/in/pascal-pereira/"
                >
                  Pascal
                </a>
                ,{' '}
                <a
                  className="text-indigo-600 underline"
                  href="https://www.linkedin.com/in/christophe-crebier/"
                >
                  Christophe
                </a>
                ,{' '}
                <a
                  className="text-indigo-600 underline"
                  href="https://www.linkedin.com/in/florenthoudeille/"
                >
                  Florent
                </a>{' '}
                et{' '}
                <a
                  className="text-indigo-600 underline"
                  href="https://www.linkedin.com/in/ikram-beldjilali-298a501a2/"
                >
                  Ikram
                </a>
              </li>
              <li>
                v2.0 : 30/11/2020 :{' '}
                <a
                  className="text-indigo-600 underline"
                  href="https://armins.co/"
                >
                  Armin
                </a>
              </li>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default LegalDisclaimer
