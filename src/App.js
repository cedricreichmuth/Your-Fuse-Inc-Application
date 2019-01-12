import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import cadImg from './cad.svg'
import chfImg from './chf.svg'
import eurImg from './eur.svg'
import refreshBtn from './refresh.svg'
import '@material/react-card/dist/card.css'


const CardSection = props =>{
  return(
    props.currentState.map((element, i)=>{
      return(
        <div className="mdc-card mdc-card--outlined">
          <div className="mdc-card__media card-header" style={{backgroundImage: `url(${element.image})`}}></div>
          <h1>{element.name}</h1>
          <p>1 {element.name} = {element.rate} USD</p>
        </div>
      )
    })
  )
}

class App extends Component {

  constructor(){
    super()

    this.state = {
      currencies: []
    }
  }

  componentDidMount(){
    this.getData();
  }

  getData = (e) => {
    let apiURL = 'http://apilayer.net/api/live?access_key=287b043d806d5150ab7c9917f1e3bad2&currencies=CAD,CHF,EUR&format=1';
      axios
        .get(apiURL)
        .then(data => {
          let rates = data.data.quotes;
          this.setState({
            currencies:[{name: 'CAD', image:cadImg, rate: rates.USDCAD}, {name: 'CHF', image: chfImg, rate: rates.USDCHF}, {name: 'EUR', image: eurImg, rate: rates.USDEUR}]
          })
          console.log(this.state);
        })
        .catch(err => {
          console.log(err);
        });
  }


  render() {
    return (
      <div className="App">
        <section className="card-section">
          <CardSection currentState={this.state.currencies} />
        </section>
        <img className="refresh-btn" src={refreshBtn} alt="Refresh"/>
      </div>
    );
  }
}

export default App;
