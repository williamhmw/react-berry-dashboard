import React, { Component } from 'react';
// material-ui
import { Grid, Link } from '@material-ui/core';

// project imports
import SubCard from '../../ui-component/cards/SubCard';
import MainCard from '../../ui-component/cards/MainCard';
import SecondaryAction from '../../ui-component/cards/CardSecondaryAction';
import { gridSpacing } from '../../store/constant';

//Kanban
import Board from 'react-trello'

//==============================|| KANBAN ||==============================//
const data = require('./kanban/data.json')
    
const handleDragStart = (cardId, laneId) => {
    console.log('drag started')
    console.log(`cardId: ${cardId}`)
    console.log(`laneId: ${laneId}`)
  }
  
  const handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
    console.log('drag ended')
    console.log(`cardId: ${cardId}`)
    console.log(`sourceLaneId: ${sourceLaneId}`)
    console.log(`targetLaneId: ${targetLaneId}`)
  }
  
  class Kanban extends Component {
    state = { boardData: { lanes: [] } }
  
    setEventBus = (eventBus) => {
      this.setState({ eventBus })
    }
  
    async componentWillMount() {
      const response = await this.getBoard()
      this.setState({ boardData: response })
    }
  
    getBoard() {
      return new Promise((resolve) => {
        resolve(data)
      })
    }
  
    shouldReceiveNewData = (nextData) => {
      console.log('New card has been added')
      console.log(nextData)
    }
  
    handleCardAdd = (card, laneId) => {
      console.log(`New card added to lane ${laneId}`)
      console.dir(card)
    }
  
    render() {
      return (
        <MainCard title="Kanban Trello Demo" secondary={<SecondaryAction link="https://next.material-ui.com/system/typography/" />}>
            <Grid container spacing={gridSpacing}>  
                <Board
                    editable
                    onCardAdd={this.handleCardAdd}
                    data={this.state.boardData}
                    draggable
                    onDataChange={this.shouldReceiveNewData}
                    eventBusHandle={this.setEventBus}
                    handleDragStart={handleDragStart}
                    handleDragEnd={handleDragEnd}
                    canAddLanes
                    style={{backgroundColor: 'white'}} //Alterar cor de fundo de todo o painel
                    collapsibleLanes //Retrair as colunas
                    lang="pt"
                /> 
            </Grid>
        </MainCard>
      )
    }
  }
export default Kanban;



//====BEGIN LICENSE KEY====\nFmv681KfyoiBuAoTBB3hyjxRhaLoXXnsCUI51qSDVSCCNAfxF6wuUl1jurRGFOEC11xCSiNk5YfjANzPDoFyR56POG/y2qRPWM2Kz782tE24DyUKXXDISAf8AV3aCsGmwqRKImEXmUQN9tTOxwmAib+NU/yhZPs6LM15aaJ8wBfR4vzrO8nS5Zvx5wT300e94acm/sPX+GWpNfCX53UatOlqxOa5h1mDKIrGagJMPRGGi2DT0sklJxgEjfmGwLpXe1CHrl+aZ29ixN2oBOZuG/DlcE5CTGZNq+GiQvENKKYI+4CqbGBG2VijznzzV43lf408KhBre2fu0iOXpGPaMA==||U2FsdGVkX1+vR4+h/wr62qrwuvGoQdbUmK+OLsMEVVKaXNuK2tlDpW8XSF83aiO/Lc6TUGfGBDwW3UOJxKzsnX04QwSDLb8QTesbRtZtbhc=\nev8XOnHwqR1VwxxyrTFPlCoqkuEgONdnRoak11w1XJkVSYxo/c/1Nfoo2UGMqSG3j/xmZBJLEdH3i7ZvoMGZZkNWFi9hZ0BcWcLnnF1GGQoOQQ3yImVSkFvN6iYqEEZ23yVishaYnK+Ko3q1UhYuT4bM+tAzyhuzIoTzuJo20qrzKQx/5gJ5iPYAi6O+myjAg/dUkVuOc3dR4T2jgw4MD4RFdQNcXVqMwXUPdaME52p0MpNR78D6CF5Q4cADP4FfYC8Da9xFva765gZU0VXwF4itahcJOHlRMjzcTso7JoMTEuDY35qJao0X9TG0smjL2Dz02yX6mV1OElb4n51PKA==\n====END LICENSE KEY====
