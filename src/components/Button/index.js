 import React ,{Component} from 'react'
 const  Btn = ({onClick ,className ='' ,children}) =>
 {
   return (
    <button 
    onClick ={onClick} 
    className ='button-inline'
    type ="button" >
      {children}
    </button>
   )};
   export default Btn ;
  