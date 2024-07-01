import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {toast , Toaster } from "react-hot-toast";
import "./Register.css";
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { Button } from '@mui/material';
import GoogleImg from '../../../assets/images/google.png';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';



const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();




  const [showPassword, setShowPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);

    const [showLoader, setShowLoader] = useState(false);

  // form function

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        { name, email, password, phone, address, answer }
      );
      if (res && res.data.success) {
        navigate("/signIn");
        toast.success("Registration successfully completed");
      } else {
        toast.error(res.data.message);
      }
    } catch (e) {
      console.log(e);
      toast.error("something went wrong");
    }
  };

  return (
    <>
     <Toaster position="bottom-center" />
            <section className='signIn mb-5'>
                <div className="breadcrumbWrapper res-hide">
                    <div className="container-fluid">
                        <ul className="breadcrumb breadcrumb2 mb-0">
                            <li><Link to="/">Home</Link>  </li>
                            <li>SignUp</li>
                        </ul>
                    </div>
                </div>

                <div className='loginWrapper'>
                    <div className='card shadow'>

                        <Backdrop
                            sx={{ color: '#000', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={showLoader}
                            className="formLoader"
                        >
                            <CircularProgress color="inherit" />
                        </Backdrop>

                        <h3>SignUp</h3>
                        <form className='mt-4'>
                            <div className='form-group mb-4 w-100'>
                                <TextField id="name" type="text" name='name' label="Name" className='w-100' onChange={(e) => setName(e.target.value)}  value={name}/>
                            </div>
                            <div className='form-group mb-4 w-100'>
                                <TextField id="email" type="email" name='email' label="Email" className='w-100' onChange={(e) => setEmail(e.target.value)}  value={email}/>
                            </div>
                            <div className='form-group mb-4 w-100'>
                                <div className='position-relative'>
                                    <TextField id="password" type={showPassword === false ? 'password' : 'text'} name='password' label="Password" className='w-100' onChange={(e) => setPassword(e.target.value)} 
                                     value={password}/>
                                    <Button className='icon' onClick={() => setShowPassword(!showPassword)}>
                                        {
                                            showPassword === false ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />
                                        }

                                    </Button>
                                </div>

                            </div>

                            <div className='form-group mb-4 w-100'>
                                <div className='position-relative'>
                                    <TextField id="conformPassword" type={showPassword1 === false ? 'password' : 'text'} name='conformPassword' label="Confirm Password" className='w-100' onChange={(e) => setShowPassword1(e.target.value)}  value={showPassword1}/>
                                    <Button className='icon' onClick={() => setShowPassword1(!showPassword1)}>
                                        {
                                            showPassword1 === false ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />
                                        }

                                    </Button>
                                </div>

                            </div>
                            <div className='form-group mb-4 w-100'>
                                <TextField id="phone" type="number" name='number' label="Number" className='w-100' onChange={(e) => setPhone(e.target.value)}  value={phone}/>
                            </div>
                            <div className='form-group mb-4 w-100'>
                                <TextField id="address" type="text" name='address' label="Address" className='w-100' onChange={(e) => setAddress(e.target.value)}  value={address}/>
                            </div>
                            <div className='form-group mb-4 w-100'>
                                <TextField id="answer" type="text" name='answer' label="Answer" className='w-100' onChange={(e) => setAnswer(e.target.value)}  value={answer}/>
                            </div>


                            <div className='form-group mt-5 mb-4 w-100'>
                                <Button className='btn btn-g btn-lg w-100' onClick={handleSubmit}>Sign Up</Button>
                            </div>

                            <p className='text-center'>Already have an account
                                <b> <Link to="/signIn">Sign In</Link>
                                </b>
                            </p>



                        </form>
                    </div>
                </div>


            </section>
        </>
    
  );
};

export default Register;
