import React, { useState, useEffect, useContext } from 'react'

import SongContext from './SongContext'
import UserContext from '../UserContext'

import { useAuth0 } from '@auth0/auth0-react'

const SongProvider = ({ children }) => {

  const [dataSong, setDataSong] = useState([])
  const { userLogged } = useContext(UserContext)

  const { getIdTokenClaims } = useAuth0()

  const handleLikes = async (liked) => {

    const token = await getIdTokenClaims()
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/tracks/addToLike${userLogged&&userLogged._id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token ? token.__raw : "Not Auth"}`,
      },
      body: JSON.stringify({ liked })
    })
    const data = await response.json()
    console.log(data)
    try {

      const updateFilter = dataSong.filter((update) => {
        return update._id !== data.updateLike._id
      })
      const dataAllSongs = [...updateFilter, data.updateLike].sort((a, b) => a._id.localeCompare(b._id))
      setDataSong([...dataAllSongs])

    } catch (error) {
      console.log(error)
      console.log(data)
    }
  }

  useEffect(() => {
    const musicTracks = async () => {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/tracks`);
      const data = await response.json();
      console.log(data)
      setDataSong(data.allSong)
    }
    musicTracks()
  }, [setDataSong])






  return (
    <SongContext.Provider value={{ dataSong, setDataSong, handleLikes: handleLikes }}>
      {children}
    </SongContext.Provider>
  )
}

export default SongProvider