import React from 'react'

class Header extends React.Component {
    constructor (props){
        super(props) ;
        this.state = {
            show : true
        }
    }
    delNav = () => {
        this.setState ({show : false})
    }
    render () {
        let myNav 
        if (this.state.show){
            myNav =<Nav /> ;
        }
        return (
            <div>
        <h1>Hello Header</h1>
        {myNav}
        <button type="button" onClick={this.delNav} >Delete NavBar</button>
        </div>
        )
    }
    
}
class Nav extends React.Component {
    
    render(){
        return (
            <h3>Hello from Navbar</h3>
        )
    }
    componentWillUnmount (){
        alert('NavBar removed')
    }
}
export default Header