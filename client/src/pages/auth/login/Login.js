import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../../context/auth";
import "./Login.css";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider , signInWithPopup } from "firebase/auth";





const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [auth, setAuth] = useAuth();


  const [showPassword, setShowPassword] = useState(false);

  const [showLoader, setShowLoader] = useState(false);






  // form function

  const handleSubmit = async (e) => {
    e.preventDefault();

    // `${process.env.REACT_APP_API}/api/v1/auth/login`,

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        { email, password }
      );
      if (res && res.data.success) {
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        console.log("sign in sucessfully")
        navigate(location.state || "/");


        toast.success("Sign in successfully", 8000);
        
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
            <section className='signIn mb-5'>
                <div class="breadcrumbWrapper">
                    <div class="container-fluid">
                        <ul class="breadcrumb breadcrumb2 mb-0">
                            <li><Link to="/">Home</Link>  </li>
                            <li>Sign In</li>
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

                        <h3>Sign In</h3>
                        <form className='mt-4'>
                            <div className='form-group mb-4 w-100'>
                                <TextField id="email" type="email" name='email' label="Email" className='w-100'
                                    onChange={(e) => setEmail(e.target.value)} value={email} />
                            </div>
                            <div className='form-group mb-4 w-100'>
                                <div className='position-relative'>
                                    <TextField id="password" type={showPassword === false ? 'password' : 'text'} name='password' label="Password" className='w-100'
                                        onChange={(e) => setPassword(e.target.value)} value={password} />
                                    <Button className='icon' onClick={() => setShowPassword(!showPassword)}>
                                        {
                                            showPassword === false ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />
                                        }

                                    </Button>
                                </div>
                            </div>



                            <div className='form-group mt-5 mb-4 w-100'>
                                <Button className='btn btn-g btn-lg w-100' onClick={handleSubmit}>Sign In</Button>
                            </div>


                            {/* <div className='form-group mt-5 mb-4 w-100 signInOr'>
                                <p className='text-center'>OR</p>
                                <Button className='w-100' variant="outlined" 
                                  onClick={signInWithGoogle}
                                  >
                                    <img src={GoogleImg} />
                                    Sign In with Google</Button>
                            </div> */}


                            <p className='text-center'>Not have an account
                                <b> <Link to="/signup">Sign Up</Link>
                                </b>
                            </p>

                        </form>
                    </div>
                </div>


            </section>
        </>
  );
};

export default Login;
