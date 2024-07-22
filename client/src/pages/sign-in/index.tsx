import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormValues {
  username: string;
  name: string;
}

const SignIn = () => {
  const schema = yup.object().shape({
    username: yup
      .string()
      .required("Username is Required")
      .matches(/^[a-zA-Z0-9_.@$]+$/, "Invalid username"),
    name: yup.string().required("Name is Required"),
  });

  const onSubmit: SubmitHandler<FormValues> = (data, event) => {
    event?.preventDefault();

    const { username, name} = data

    console.log(username,name)
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) });

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
