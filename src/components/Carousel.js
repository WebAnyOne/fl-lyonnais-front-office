import React from 'react'

function SwipeableTextMobileStepper(props) {
  const noImageAvailable = '/noImageAvailable.jpg'
  return (
    <section className="text-justify max-w-5xl pt-8 mx-auto container bg-white">
      <div className="flex flex-col items-center content-center justify-center h-auto bg-white w-70">
        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
          Références
        </h1>
        <div className="flex flex-wrap -m-4">
          {props.references.map((reference) => (
            <div className="lg:w-1/3 sm:w-1/2 p-4 m-3 md:m-0">
              <div className="flex relative">
                <a
                  href={
                    reference.url.substr(0, 4) === 'http'
                      ? reference.url
                      : 'https://' + reference.url
                  }
                >
                  <img
                    alt={reference.name}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    src={
                      !reference.image
                        ? noImageAvailable
                        : reference.image.substr(0, 4) === 'http'
                        ? reference.image
                        : process.env.REACT_APP_API_URL + '/' + reference.image
                    }
                  />
                  <div className="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100">
                    <h1 className="tracking-widest text-sm title-font font-medium text-indigo-500 mb-1 opacity-0">
                      {reference.name}
                    </h1>
                    <h1 className="title-font text-lg font-medium text-gray-900 mb-3 text-indigo-500">
                      {reference.name}
                    </h1>
                    <p className="leading-relaxed opacity-0">
                      Photo booth fam kinfolk cold-pressed sriracha leggings
                      jianbing microdosing tousled waistcoat.
                    </p>
                  </div>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SwipeableTextMobileStepper
