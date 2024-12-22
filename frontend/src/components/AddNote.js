import React, {useState} from 'react'
import { createBrowserHistory } from "history";
import { useNavigate } from 'react-router-dom';
import {
    Link
  } from "react-router-dom";

const AddNote = () => {

    const [credentials, setCredentials] = useState({title: "", desc: ""}) 
    
    let navigate = useNavigate();
    
        const handleSubmit = async (e) => {
            e.preventDefault();
    
            const response = await fetch("http://localhost:5000/notes/addnote/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "authtoken": localStorage.getItem('token')
                },
                body: JSON.stringify({title: credentials.title, desc: credentials.desc}),
                mode: 'cors'
            });
            const json = await response.json()
            console.log(json);
            if (json.success){

                navigate('/')
    
            }
            else{
                alert("Some Error occurred: " + JSON.stringify(json));
            }
        }
    
        const onChange = (e)=>{
            setCredentials({...credentials, [e.target.name]: e.target.value})
        }
      return (
        <section className="bg-gray-50 dark:bg-gray-900 md:w-[50%]">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Link to="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
              iNotebook  
          </Link>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                     Add a New Note
                  </h1>
                  <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                      <div>
                          <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                          <input type="text" name="title" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter the Title" required="" onChange={onChange}/>
                      </div>
                      <div>
                          <label htmlFor="desc" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                          <input type="text" name="desc" id="desc" placeholder="Enter the Description" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={onChange}/>
                      </div>
                      <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Note</button>
                  </form>
              </div>
          </div>
      </div>
    </section>
      )
}

export default AddNote
