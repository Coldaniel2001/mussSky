import React, { useContext, useState } from 'react';
import addImageProfile from '../../assets/images/icons/addImageProfile.png'
import axios from 'axios';
import UserContext from '../../context/UserContext';

function ProfileImg() {
  const { userLogged, setUserLogged } = useContext(UserContext)

  const handleEditImage = async (e) => {
    const data = new FormData();
    data.append("file", e.target.files[0]);
    data.append("userId", userLogged._id); 
                                    // luego guardamos estos datos en el context (ver con squad)
    try {
      console.log("hola")
        const res = await editImgFetch(data);
        console.log(res)
        setUserLogged({ ...userLogged, picture: res.data.img }); 
    } catch (error) {
        console.error(error);
    }
  }

  const editImgFetch = async (data) => {
    return await axios.post('http://localhost:4002/users/image', data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
  };

  return (
    <div>
      <label>
        <img className='w-[10rem] cursor-pointer rounded-full' src={userLogged.picture} alt="UP" />
        <input type="file" className='hidden' onChange={handleEditImage} />
 		  </label>
    </div>
  );
}

export default ProfileImg;