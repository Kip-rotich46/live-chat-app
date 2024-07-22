import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { PEOPLES_IMAGES } from "../../avatars";
import Cookies from "universal-cookie";
import { StreamVideoClient } from "@stream-io/video-react-sdk";
import { useUser } from "../../user-context";
import { useNavigate } from "react-router-dom";

interface FormValues {
  username: string;
  name: string;
}



const SignIn =  () => {
  const cookies = new Cookies();
  const {setClient, setUser} = useUser();
  const navigate = useNavigate();

  const schema = yup.object().shape({
    username: yup
      .string()
      .required("Username is Required")
      .matches(/^[a-zA-Z0-9_.@$]+$/, "Invalid username"),
    name: yup.string().required("Name is Required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<FormValues> = async (data, event) => {
    event?.preventDefault();

    const { username, name} = data;

    const response = await fetch('http://localhost:3001/auth/createUser',{
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        name,
        image: PEOPLES_IMAGES[Math.floor(Math.random() * PEOPLES_IMAGES.length)]
      })
    })

    if(!response.ok){
      alert('An Error Occured!')
      return;
    }

    const responseData = await response.json();
    console.log(responseData);

    const user: User = {
      id: username,
      name,
    };

    const myClient = new StreamVideoClient({
      apiKey: "4ar926p6bgh5",
      user,
      token: responseData.token
    });
    setClient(myClient);
    setUser({username, name});

    const expires = new Date();
    expires.setDate(expires.getDate() + 1);
    cookies.set('token', responseData.token, { expires });
    cookies.set('username', responseData.username, { expires });
    cookies.set('name', responseData.name, { expires });

    navigate('/');
  };


  return (
    <div className="sign-in home">
      <h1>Welcome to Chat Room</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div>
          <label>Username :</label>
          <input type="text" {...register("username")} />
          {errors.username && <p style={{color:'red'}}>{errors.username.message}</p>}
        </div>
        <div>
          <label>Name :</label>
          <input type="text" {...register("name")} />
          {errors.name && <p style={{color:'red'}}>{errors.name.message}</p>}

        </div>
        <button type="submit">Sign-In</button>
      </form>
    </div>
  );
};

export default SignIn;
