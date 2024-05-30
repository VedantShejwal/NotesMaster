import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar"
import Passwordinput from "../../components/input/Passwordinput";
import { useState } from "react";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";


const Login = () => {

  const [email,SetEmail] = useState("");
  const [password,Setpassword] = useState("");
  const [error,Seterror] = useState(null);
  const navigate = useNavigate(null)

  const handlelogin = async (e)=>{
    e.preventDefault();
    if(!validateEmail(email)){
      Seterror("please enter a valid email address.");
      return;
    }
    if(!password){
      Seterror("please enter a password");
      return;
    }
    Seterror(null)

    try {
      const response = await axiosInstance.post("/login",{
        email:email,
        password:password
      })

      if(response.data && response.data.accessToken){
        localStorage.setItem("token",response.data.accessToken)
        navigate('/dashboard')
      }


    } catch (error) {
      if(error.response && error.response.data.message){
        Seterror(error.response.data.message)
      } else{
        Seterror("An unexpected error occured.Please try again.");
      }
    }
  };


  return (
    <div>
      <Navbar login={true}></Navbar>

      <div className="flex items-center justify-center mt-20">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handlelogin}>
            
            <h4 className="text-2xl mb-7">Login</h4>
            <input 
              type="text" 
              placeholder="Email" 
              className="input-box"
              value = {email}
              onChange={(e)=> SetEmail(e.target.value)}
              />

            <Passwordinput 
              value ={password}
              onChange={(e)=> Setpassword(e.target.value)}
              />
              
            {error && <p className="text-red-500 text-xs pb-1">{error}</p>} 
            
            <button type="submit" className="btn-primary">Login</button>
            
            <p className="text-sm text-center mt-4">
              Not registered yet?{" "}
              <Link to= "/signup" className="font-medium text-primary underline">
                Create an Account
              </Link>  
            </p>

          </form>

        </div>
      </div>
    </div>
  )
}

export default Login
