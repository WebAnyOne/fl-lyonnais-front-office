import React from 'react'
import { Helmet } from 'react-helmet'

function detailBio(props) {
  const url = process.env.REACT_APP_API_URL + '/'
  const avatar = '/avatar.png'
  let photo = props.freelances.url_photo
  if (props.freelances.url_photo) {
    if (props.freelances.url_photo.substr(0, 4) !== 'http') {
      photo = url + props.freelances.url_photo
    }
  } else {
    photo = avatar
  }

  return (
    <>
      <Helmet>
        <title>
          {props.freelances.firstname +
            ' ' +
            props.freelances.lastname +
            ' - Annuaire Freelances Lyonnais'}
        </title>
      </Helmet>

      <div className="flex flex-col items-center content-center justify-center h-auto bg-white w-100">
        <div>
          <img
            src={photo}
            alt={`${props.freelances.lastname}`}
            className="w-64 h-64 m-5 rounded-full"
          />
        </div>
        {props.freelances.firstname && (
          <div className="content-center w-4/5 h-auto m-5 text-center ">
            <p className="text-4xl font-extrabold leading-10 tracking-tight text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
              {' '}
              Salut! Je suis{' '}
              <span className="text-indigo-600">
                {props.freelances.firstname}
              </span>
            </p>
            <p className="text-5xl font-thin text-indigo-400">
              {' '}
              {props.freelances.job_title}
            </p>
          </div>
        )}

        <div className="px-6 flex items-center sm:flex-row flex-wrap">
          {props.freelances.url_web_site && (
            <a
              href={
                props.freelances.url_web_site.substr(0, 4) === 'http'
                  ? props.freelances.url_web_site
                  : 'https://' + props.freelances.url_web_site
              }
              className="w-12 h-12 mb-4 lg:mb-0 bg-cover rounded-full mr-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
              </svg>
            </a>
          )}
          {props.freelances.phone_number && (
            <a
              href={'tel:' + props.freelances.phone_number}
              className="w-12 h-12 mb-4 lg:mb-0 bg-cover rounded-full mr-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </a>
          )}
          {props.freelances.email && (
            <a
              href={'mailto:' + props.freelances.email}
              className="w-12 h-12 mb-4 lg:mb-0 bg-cover rounded-full mr-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </a>
          )}
          {props.freelances.street && (
            <a
              href={
                'https://www.google.fr/maps/search/' +
                props.freelances.street +
                ' ' +
                props.freelances.zip_code +
                ' ' +
                props.freelances.city +
                ' ' +
                props.freelances.country
              }
              className="w-12 h-12 mb-4 lg:mb-0 bg-cover rounded-full mr-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </a>
          )}
        </div>

        <section className="max-w-5xl pt-16 mx-auto container bg-white">
          {props.freelances.bio && (
            <div className="flex flex-col items-center content-center justify-center h-auto bg-white w-70">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                En quelques mots
              </h1>
              <p className="text-justify m-4 text-lg">
                {props.freelances.bio}{' '}
              </p>
            </div>
          )}
          {props.freelances.siret && props.freelances.average_daily_rate && (
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="bg-white rounded flex items-center justify-between m-4 px-5 relative shadow">
                <div className="absolute w-2 h-4 bg-indigo-700 left-0" />
                <h3 className="py-6 leading-4 text-gray-800 font-normal text-base">
                  TJM :
                </h3>
                <h2 className="text-gray-800 text-2xl leading-normal font-bold">
                  {props.freelances.average_daily_rate} € / jour
                </h2>
              </div>
              <div className="bg-white rounded flex items-center justify-between m-4 px-5 relative shadow">
                <div className="absolute w-2 h-4 bg-indigo-700 left-0" />
                <h3 className="py-6 leading-4 text-gray-800 font-normal text-base">
                  SIRET :
                </h3>
                <h2 className="text-gray-800 text-2xl leading-normal font-bold">
                  {props.freelances.siret}
                </h2>
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  )
}

export default detailBio
