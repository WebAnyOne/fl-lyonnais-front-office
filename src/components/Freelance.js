import React from 'react'
import { Link } from 'react-router-dom'

const Freelance = (props) => {
  const url = process.env.REACT_APP_API_URL + '/'
  const avatar = '/avatar.png'
  let photo = props.urlPhoto
  if (props.urlPhoto) {
    if (props.urlPhoto.substr(0, 4) !== 'http') {
      photo = url + props.urlPhoto
    }
  } else {
    photo = avatar
  }

  return (
    <div className="xl:w-1/3 sm:w-1/2 mx-auto sm:max-w-xs mb-20 xl:max-w-sm lg:w-1/2 relative">
      <Link key={props.id} to={`/detail/${props.id}`}>
        <div className="bg-top bg-cover bg-no-repeat h-64">
          <img
            style={{ opacity: props.loading ? 0.5 : 1 }}
            src={props.loading ? avatar : photo}
            alt=""
            className="h-full w-full overflow-hidden object-cover rounded shadow"
          />
        </div>
        <div className="py-5 bg-white flex flex-col justify-center w-11/12 mx-auto absolute rounded shadow -mt-12 right-0 left-0">
          <p className="text-xl text-center text-gray-800 font-normal mb-1">
            {props.firstname} {props.lastname}
          </p>
          {props.job_title ? (
            <p className="text-center text-base text-gray-600">
              {props.job_title.length < 35
                ? props.job_title
                : props.job_title.substring(0, 35) + ' ...'}
            </p>
          ) : (
            <p style={{ opacity: 0 }}>job_title</p>
          )}
        </div>
      </Link>
    </div>
  )
}

export default Freelance
