import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  const links = [
    { id: 1, href: '/mentions_legales', label: 'Mentions légales' },
    { id: 2, href: '/conditions_generales', label: 'Conditions générales' },
  ]

  return (
    <>
      <br />
      <br />
      <br />
      <div className="w-full bg-gray-100 py-12">
        <div className="container mx-auto xl:flex lg:flex text-center xl:text-left lg:text-left">
          <div className="xl:w-3/6 lg:w-3/6 sm:w-full text-center xl:text-left mb-6 xl:mb-0 lg:mb-0">
            <p className="text-gray-800"> © 2020 Freelances Lyonnais</p>
          </div>
          <div className="xl:w-3/6 lg:w-3/6 sm:w-full">
            <ul className="xl:flex lg:flex md:flex sm:flex justify-around">
              {links.map(({ id, href, label }) => (
                <li className="text-gray-800 hover:text-gray-900 mb-3 xl:mb-0 lg:mb-0 md:mb-0 sm:mb-0">
                  <Link key={id} to={href}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer
