import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';



export default class Navbar extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentTime: new Date().toLocaleTimeString()
    };
  }

  componentDidMount(){
    this.interval = setInterval(() =>{
      this.setState({currentTime: new Date().toLocaleTimeString()});
    },1500);
  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }

  render() {
    return (
      <nav className="navbar  bg-dark border-bottom border-body" data-bs-theme="dark">
        <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
        <img src="nwes.jpg" alt="NewsApp Logo" width="100" height="50" />
      </NavLink>
          <span className="text-light">{this.state.currentTime}</span>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><NavLink className= "nav-link" to="/">Home</NavLink></li>
              
              <li className="nav-item"><NavLink className= "nav-link" to="/category/business">Business</NavLink></li>
              <li className="nav-item"><NavLink className= "nav-link" to="/category/enterainment">Entertainment</NavLink></li>
              <li className="nav-item"><NavLink className= "nav-link" to="/category/general">General</NavLink></li>
              <li className="nav-item"><NavLink className= "nav-link" to="/category/health">Health</NavLink></li>
              <li className="nav-item"><NavLink className= "nav-link" to="/category/science">Science</NavLink></li>
              <li className="nav-item"><NavLink className= "nav-link" to="/category/sports">Sports</NavLink></li>
              <li className="nav-item"><NavLink className= "nav-link" to="/category/technology">Technology</NavLink></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
