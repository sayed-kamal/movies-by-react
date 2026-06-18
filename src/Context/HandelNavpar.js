import { createContext, useEffect, useState } from "react";



export let HandelNavpar =  createContext();

export default function HandelNavoarProvider(props) {

    let [handelNavpar, setHandelNavpar] = useState(false);

    useEffect(() => {

   if(localStorage.getItem('token')){
     setHandelNavpar(true);
   }

 }, []);


    
    return <HandelNavpar.Provider value={{handelNavpar,setHandelNavpar}}>
        {props.children}

    </HandelNavpar.Provider>
    
}