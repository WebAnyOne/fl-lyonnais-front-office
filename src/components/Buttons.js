import React, { useState, useContext } from 'react'
import Button from '@material-ui/core/Button'
import { Link, useHistory } from 'react-router-dom'
import API from './API'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import AuthContext from './AuthContext'

export default function Buttons(props) {
  const history = useHistory()
  const [state, setState] = useState({ checkedA: props.is_active === 1 })
  const [open, setOpen] = useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const setTokenInLocalStorage = useContext(AuthContext).setToken
  const setUserInLocalStorage = useContext(AuthContext).saveUser
  const handleDelete = (e) => {
    API.delete('/freelances/account')
      .then((res) => {
        setUserInLocalStorage('{}')
        setTokenInLocalStorage('')
        history.push('/account_deleted')
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked })
    if (state.checkedA === true) {
      API.put('/freelances/' + props.id + '?activated=0')
        .then((res) => {})
        .catch((err) => {
          console.error(err)
        })
    }
    if (state.checkedA === false) {
      API.put('/freelances/' + props.id + '?activated=1')
        .then((res) => {})
        .catch((err) => {
          console.error(err)
        })
    }
  }

  return (
    <>
      <section className="text-justify max-w-5xl pt-6 mx-auto container bg-white">
        <div className="w-full bg-white py-5 flex flex-col md:flex-row items-center justify-between px-5 sm:px-10 rounded-t">
          <div className="mb-3 md:mb-0">
            <h2 className="text-gray-800 text-lg font-bold">
              Gérer mon compte
            </h2>
          </div>
          <div>
            <button
              onClick={handleClickOpen}
              className="font-normal bg-gray-200 focus:outline-none transition duration-150 ease-in-out hover:bg-gray-300 rounded text-indigo-600 px-6 py-2 text-sm"
            >
              Supprimer
            </button>
            <Link to="/compte">
              <button className="ml-3 font-normal focus:outline-none bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-6 py-2 text-sm">
                Éditer
              </button>
            </Link>
          </div>
          <div className="flex items-center  sm:w-auto justify-between sm:justify-start md:justify-start lg:justify-start xl:justify-start md:w-auto lg:w-auto xl:w-auto">
            <h4 className="text-gray-600 text-base mr-3">
              Désactiver / Activer
            </h4>

            <div className="cursor-pointer my-5 w-12 h-6 rounded-full bg-indigo-700 relative shadow-sm">
              <input
                checked={state.checkedA}
                onChange={handleChange}
                name="checkedA"
                type="checkbox"
                id="toggle2"
                className="focus:outline-none checkbox w-4 h-4 rounded-full bg-white absolute m-1 shadow-sm appearance-none cursor-pointer"
              />
              <label
                htmlFor="toggle2"
                className="checkbox toggle-label bg-gray-200 block w-12 h-6 overflow-hidden rounded-full bg-gray-300 cursor-pointer"
              />
            </div>
            <style>
              {`
            .checkbox:checked { right: 0; }
            .checkbox:checked + .toggle-label { background-color: #4c51bf; }
            `}
            </style>
          </div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {'Confirmation de la suppression'}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Etes-vous sûr de vouloir supprimer votre compte ?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Annuler
              </Button>
              <Button onClick={handleDelete} color="primary" autoFocus>
                Oui, Supprimer
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </section>
    </>
  )
}
