import React, { useState } from 'react'
import loginIcon from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from 'react-icons/fa';
import { json, Link, useNavigate } from 'react-router-dom';
import imageTobase64 from '../helpers/imageTobase64.js'
import SummaryApi from '../common/index.js';
import { toast } from 'react-toastify';
const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showconfirmpassword, setshowconfirmpassword] = useState(false)
  const [data,setData] = useState({
    email : "",
    password : "",
    name : "",
    confirmPassword : "",
    profilePic : "",
  })

  const navigate = useNavigate()

  const handleOnChange = (e) =>{
        const {name, value}  = e.target

        setData((preve)=>{
          return{
              ...preve,
              [name] : value
          }
        })
  }

  const handleUploadPic = async(e)=>{
      const file = e.target.files[0]
      const imagePic = await imageTobase64(file)
      setData((preve)=>{
        return{
          ...preve,
          profilePic : imagePic
        }
        
      })
  }

  const handleSubmit = async(e)=>{
         e.preventDefault()

         if(data.password === data.confirmPassword){
          console.log("SummaryApi.signUp.url", SummaryApi.signUp.url)
          const dataResponse = await fetch('http://localhost:8080/api/signup',{
            method : SummaryApi.signUp.method,
            headers : {
              "content-type" : "application/json"
            },
            body : JSON.stringify(data)
           })
           
           const dataApi = await dataResponse.json()

           if(dataApi.sucess){
            toast.success(dataApi.message)
            navigate("/login")
           }

           if(dataApi.error){
            toast.error(dataApi.message)
           }

           toast(dataApi.message)

           console.log("data", dataApi)
         }else{
          console.log("Please check password and confirm password")
         }

         
  }

  console.log("data login, data")

  return (
    <section id='signup'>
        <div className='mx-auto container px-4'>
              <div className='bg-white p-5 w-full max-w-sm mx-auto '>
                      <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full' >
                        <div>
                          <img src={data.profilePic || loginIcon} alt='login icon'></img>
                        </div>
                         <form>
                          <label>
                          <div className='text-xs bg-slate-200 bg-opacity-80 pb-4 pt-2 text-center absolute bottom-0 w-full cursor-pointer ' >
                           Upload Photo
                        </div>
                            <input type='file' className='hidden' onChange={handleUploadPic}/>
                          </label>
                         
                         </form>
                      </div>

                      <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                        
                      <div className='grid'>
                          <label>Name: </label>
                          <div className='bg-slate-100 p-2'>
                          <input type='text' 
                          placeholder='enter your name'
                          name='name'
                          required
                          value={data.name} 
                          onChange={handleOnChange}
                          className='w-full h-full outline-none bg-transparent'></input>
                          </div>
                        </div>
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        <div className='grid'>
                          <label>Email: </label>
                          <div className='bg-slate-100 p-2'>
                          <input type='email' 
                          placeholder='enter email'
                          required
                          name='email'
                          value={data.email} 
                          onChange={handleOnChange}
                          className='w-full h-full outline-none bg-transparent'></input>
                          </div>
                        </div>
                        <div>
                          <label>Password: </label>
                          <div className='bg-slate-100 p-2 flex'>
                          <input 
                          type={showPassword? "text" : "password"} 
                          placeholder='enter password'
                          value={data.password}
                          required
                          name='password' 
                          onChange={handleOnChange}
                          className='w-full h-full outline-none bg-transparent'>

                          </input>
                          <div className='cursor-pointer text-xl' onClick={()=>setShowPassword((preve)=>!preve)}>
                            <span>
                              {
                                showPassword ? (
                                  < FaEyeSlash />
                                ): (
                                  < FaEye />
                                )
                              }
                            
                            
                            </span>
                            
                          </div>
                          </div>

                        </div>

                        <div>
                          <label>Confirm Password: </label>
                          <div className='bg-slate-100 p-2 flex'>
                          <input 
                          type={showconfirmpassword? "text" : "password"} 
                          placeholder='enter confirm password'
                          value={data.confirmPassword}
                          required
                          name='confirmPassword' 
                          onChange={handleOnChange}
                          className='w-full h-full outline-none bg-transparent'>

                          </input>
                          <div className='cursor-pointer text-xl' onClick={()=>setshowconfirmpassword((preve)=>!preve)}>
                            <span>
                              {
                                showconfirmpassword ? (
                                  < FaEyeSlash />
                                ): (
                                  < FaEye />
                                )
                              }
                            
                            
                            </span>
                            
                          </div>
                          </div>

                        </div>



                        <button className='bg-red-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6 hover:bg-red-700'>SignUp</button>
                      </form>

                      <p className='py-5'>Already have an account ? <Link to={"/Login"} className='hover:text-red-700 text-red-600 hover:underline'>Login</Link></p>
              </div>
        </div>
    </section>
  )
}

export default SignUp