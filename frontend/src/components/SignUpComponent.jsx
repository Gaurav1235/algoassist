import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import { BACKEND_URL } from '../config';

export const SignupComponent = () => {

    const navigate = useNavigate();

    const [postInputs, setPostInputs] = useState({
        email : "",
        password : ""
    })

    async function sendRequest() {
        try {
            // replace this if you add version specific urls
            // const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`)
            console.log("aguav")
            const response = await axios.post(`${BACKEND_URL}/user/signUp`,postInputs)
            const jwt = response.data.token;
            localStorage.setItem('token', jwt);
            // console.log(localStorage.getItem('token'))
            navigate("/posts");
        }
        catch (e){
            console.log(e)
        }
    }

    return <div className="h-screen flex justify-center flex-col">
        {/* {JSON.stringify(postInputs)} */}
        <div className="flex justify-center">
            <div> 
                <div className='px-10'>
                    <div className="text-2xl font-extrabold">
                        Create an account
                    </div>
                    <div className="text-slate-400 pt-1">
                        Already have an account? 
                        <Link className='pl-2 underline' to="/signin">Login</Link>
                    </div>
                </div>
                <div className="mt-4">
                    <div className='pt-4'>
                    <LabelledInput label={"Email"} placeholder={"John@gmail.com"} id={"email" } onChange={(e)=>{
                        setPostInputs({
                            ...postInputs,
                            email: e.target.value
                        })
                    }}></LabelledInput>
                    </div>
                    <div className='pt-4'> 
                    <LabelledInput label={"Password"} type = {"password"} placeholder={"*******"} id = {"password"} onChange={(e)=>{
                        setPostInputs({
                            ...postInputs,
                            password: e.target.value
                        })
                    }}></LabelledInput>
                    <button onClick={sendRequest} type="button" className="w-full mt-4 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
} 

function LabelledInput({label, placeholder, type, id, onChange}){
    return <div>
        <label htmlFor="first_name" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">{label}</label>
        <input onChange={onChange} type= {type || "text"} id={id} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder={placeholder} required />
    </div>
}