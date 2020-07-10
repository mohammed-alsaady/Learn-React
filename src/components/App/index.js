import React , {Component} from 'react'
import './index.css';
import axios from 'axios'
import {sortBy} from 'lodash';
import Btn from '../Button'
import Search from '../Search'
import Table from '../Table'
import {
  DEFAULT_QUERY ,
     PATH_BASE ,
     PATH_SEARCH,
     PARAM_SEARCH,
     PARAM_PAGE,
     DEFAULT_HPP,
     PARAM_HPP
} from '../../constants';




class App extends Component {
  _isMounted =false ;
  constructor (props){
    super(props) ;
    this.state = {
      searchValue : DEFAULT_QUERY ,
      results : null ,
      searchKey :'' ,
      error : null ,
      isLoading : false ,
      sortKey : 'NONE',
      isSortReverse : false 
        }
    //this.onClick =this.onClick.bind(this);
    this.onChanged=this.onChanged.bind(this);
    this.onDelete =this.onDelete.bind(this);
    this.setTopStories =this.setTopStories.bind(this);
    this.onSearchSubmit =this.onSearchSubmit.bind(this);
    this.fetchSearchTopStories =this.fetchSearchTopStories.bind(this);
    this.needsToSearch=this.needsToSearch.bind(this);
    this.onSort = this.onSort.bind(this);
  }

  onSort (sortKey){
    const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse
    this.setState ({sortKey ,isSortReverse})
  }

  needsToSearch(searchValue){
    return !this.state.results[searchValue];
  }
  onSearchSubmit(event){
    const {searchValue} =this.state;
    this.setState({searchKey :searchValue})
    if (this.needsToSearch(searchValue)){
      this.fetchSearchTopStories(searchValue);
    }
    
    event.preventDefault();
  }
fetchSearchTopStories (searchValue ,page=0){
  this.setState({isLoading :true})
  axios (`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchValue}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(result => this._isMounted && this.setTopStories(result.data))
      .catch(error =>this._isMounted && this.setState({error}));
}

  setTopStories (result){
    const {hits ,page} =result ;
    const {searchKey, results} =this.state;
    const oldHits = results && results[searchKey]
    ?results[searchKey].hits
    :[]
    const updatedHits= [
      ... oldHits ,
      ...hits
    ]
    this.setState ({
      results:{
        ...results ,
        [searchKey]:{hits:updatedHits ,page}
      },
      isLoading :false
    }
    )
  }
componentDidMount (){
  this._isMounted =true;
  const {searchValue} = this.state ;
  this.setState ({searchKey:searchValue})
  this.fetchSearchTopStories(searchValue)    
}

componentWillUnmount (){
  this._isMounted =false ;
}


 onDelete (id) {
   const {searchKey ,results} =this.state;
   const {hits , page} = results[searchKey]
   const isNotID = item => item.objectID !==id ;
   const updateHits = hits.filter(isNotID);
   this.setState ({
     results :{
       ... results ,
       [searchKey]:{hits:updateHits ,page}
     }
   })
  
 }
 onClick() {
   console.log(this)
 }
 onChanged (event){
   this.setState({
     searchValue: event.target.value
   })

 }
  render() {
    const {searchValue ,results ,searchKey ,error,isLoading ,sortKey ,isSortReverse} =this.state ;
    const page =results &&
                results[searchKey]&&
                results[searchKey].page || 0;
    const hits =results &&
                results[searchKey]&&
                results[searchKey].hits || [] ;
    
    return (
      <div className='page'>
        <div className ='interactions'>
        <Search 
        value = {searchValue}
        onChange = {this.onChanged}
        onSubmit= {this.onSearchSubmit}
          >
          Search
            </Search>
            </div>
        <hr />
      
     {error 
     ?<p>Something went wrong! </p>
     :<Table 
        hits = {hits}
        sortKey={sortKey}
        onSort ={this.onSort}
        Pattern = {searchKey}
        onDelete ={this.onDelete}
        isSortReverse ={isSortReverse}
        />
     }
    
         <div className="interactions">
        <ButtonWithLoading
        isLoading={isLoading}
        onClick={()=> this.fetchSearchTopStories(searchKey , page+1)}>
          More
        </ButtonWithLoading>
        
       
         </div>
              </div>
    )
  }
}

// class Btn extends Component {
//   render(){
//     const {onClick ,className ='' ,children} =this.props ;
//     return (
//       <button 
//       onClick ={onClick} 
//       className ={className}
//       type ="button" >
//         {children}
//       </button>

//     )
//   }
// }
const Loading = () => 
<div> Loading ...</div>

  const withLoading = (component) => ({isLoading ,...rest}) =>

    isLoading 
    ?<Loading />
    :<component {...rest} />
  
  const ButtonWithLoading =withLoading(Btn);
  


export default App ;