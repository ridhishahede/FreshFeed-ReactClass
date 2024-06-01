import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<News pageSize="15" country="in" category="general" pageTitle="FreshFeed - Top Headlines"/>} />
          <Route exact path="/business" element={<News pageSize="15" country="in" category="Business" pageTitle="FreshFeed - Top Headlines in Business"/>} />
          <Route exact path="/sports" element={<News pageSize="15" country="in" category="Sports" pageTitle="FreshFeed - Top Headlines in Sports"/>} />
          <Route exact path="/health" element={<News pageSize="15" country="in" category="Health" pageTitle="FreshFeed - Top Headlines in Health"/>} />
          <Route exact path="/entertainment" element={<News pageSize="15" country="in" category="Entertainment" pageTitle="FreshFeed - Top Headlines in Entertainment"/>} />
          <Route exact path="/science" element={<News pageSize="15" country="in" category="Science" pageTitle="FreshFeed - Top Headlines in Science"/>} />
          <Route exact path="/technology" element={<News pageSize="15" country="in" category="Technology" pageTitle="FreshFeed - Top Headlines in Technology"/>} />
        </Routes>
      </Router>
    )
  }
}

