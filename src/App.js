import React from 'react'
import ContactForm from './components/ContactForm';
import Header from './components/Header';

const App=()=> {
  
    return (
      <div className="container">
        <div className="col-md-6 offset-md-3">
          <Header />
          <ContactForm />
        </div>
      </div>
    );
  }

export default App