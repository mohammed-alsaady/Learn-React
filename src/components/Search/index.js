import React from 'react'
class Search extends React.Component {
  componentDidMount (){
    if(this.input){
      this.input.focus();
    }
  }
    render (){
      const {value , onChange ,onSubmit ,children} =this.props ;
      return (
        <form onSubmit={onSubmit}>
          <input
          type ="text"
          value ={value}
          onChange={onChange}
          ref ={(node) => {this.input = node;}}
          >
          </input>
          <button type='submit'>
            {children}
          </button>
        </form>
      )
    }
    }
    export default Search ;

// const Search = ({value ,onChange,onSubmit ,children}) => {
// let input ;
// return {
//   <form onSubmit ={onSubmit}>
//   <input 
//   type="text"
//   value={value}
//   onChange={onChange}
//   ref ={(node) => input =node;}
//   ></input>
//   </form>
// }

// }