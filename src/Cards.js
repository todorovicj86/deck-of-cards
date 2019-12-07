import React, { Component } from 'react'
import Card from './Card'
import './Cards.css'
import axios from 'axios';

const BASE_URL_API = "https://deckofcardsapi.com/api/deck/";

class Cards extends Component {

    constructor(props){
        super(props);
        this.state={
         deck: null,
         drawnCard: [],
           
        }
        this.handleClick = this.handleClick.bind(this);
    }

    async componentDidMount(){
       let deck = await axios.get(`${BASE_URL_API}new/shuffle/`);
       this.setState({
           deck: deck.data,
       })
       console.log(this.state.deck)
    }

    async getCard(){
        let deck_id = this.state.deck.deck_id;

        try {
            let cardUrl = `${BASE_URL_API}${deck_id}/draw/`;
            let cardData = await axios.get(cardUrl)
            if(!cardData.data.success){
                throw new Error("No more cards!")
            }
            let card = cardData.data.cards[0];

            this.setState(st =>({
                drawnCard: [
                    ...st.drawnCard,
                    {
                        id: card.code,
                        image: card.image,
                        name: `${card.suit} of ${card.value}`
                    }
                ]
            }));

        }catch(err){
            alert(err)
        }
    }

    handleClick(){
        this.getCard();
    }

    render(){
        return(
            <div className="Cards">
                <h1 className="Cards-title"> ♦ Card Game  ♦</h1>
                <button className= "Cards-btn" onClick={this.handleClick}> GIMME A CARD  </button>
                <div className="Cards-container">
                    {this.state.drawnCard.map(n =>
                        <Card 
                            image = {n.image}
                            altText = {n.name}
                            key={n.id}
                        />
                    )}
                </div>
            </div>
        )
    }

}

export default Cards;