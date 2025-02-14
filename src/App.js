// import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {  Routes, Route } from 'react-router-dom';
// import { useState } from "react";
import LoadingBar from "react-top-loading-bar";
import NewsWrapper from './components/NewsWrapper';


export default class App extends Component {

  state = {
    progress: 0
  }

  setProgress =(progress) => {
    this.setState({progress});
  }

  render() {
    
    return (
      <div>
          <Navbar/>
          <LoadingBar
        color="#f11946"
        progress={this.state.progress}
      //  
      />
          <Routes>
          <Route path="/" element={<News key="general" category="general" setProgress= {this.setProgress} />} />
          <Route path="/category/:category" element={<NewsWrapper setProgress ={this.setProgress} />} />
          </Routes>
      </div>
    )
  }
}




