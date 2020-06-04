import React , {Component} from 'react'
import './App.css';

const list =[
  {
    title: 'React',
    owner : 'Facebook',
    url : 'www.reactjs.org',
    Id : 0
  },
  {
    title : 'Angular2',
    owner: 'Google',
    url: 'www.angular.io',
    Id: 1
  },
  {
    title: 'Vuejs',
    owner: 'Evan',
    url: 'www.vuejs.org',
    Id : 2
  }
]
function isSearched(val){
  return function (item){
    return (item.title.toLowerCase().includes(val.toLowerCase()));
  }
}
class App extends Component {
  constructor (props){
    super(props) ;
    this.state = {
      list , //list ,  i = i+1 , i +=1
      searchValue : '' 
    }
    //this.onClick =this.onClick.bind(this);
    this.onChanged=this.onChanged.bind(this);
    this.onDelete =this.onDelete.bind(this);
  }
 onDelete (i) {
   const newList = this.state.list.filter(function (item){
     return item.Id !== i ;
   })
   this.setState ({
     list : newList 
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
    const {searchValue ,list} =this.state ;
    return (
      <div className='App'>
        <Search 
        value = {searchValue}
        onChange = {this.onChanged}
          >
            <h3>Search with :</h3>
            </Search>
        <hr />
        <Table 
        list = {list}
        Pattern = {searchValue}
        onDelete ={this.onDelete}
        />
      </div>
    )
  }
}
class Search extends Component {
render (){
  const {value , onChange ,children} =this.props ;
  return (
    <form>
     {children} <input
      type ="text"
      value ={value}
      onChange={onChange} >
      </input>
    </form>
  )
}
}

class Table extends Component{
render () {
  const {list , Pattern ,onDelete} = this.props ;
  return (
    <div>
      {list.filter(isSearched(Pattern)).map (item =>
      <div key={item.Id} >
        <span>{item.title}</span>
        &nbsp; By : <span>
          <a href={item.url} >{item.owner}</a>
        </span>

      </div>
        )}
    </div>
  )
}
}
export default App ;