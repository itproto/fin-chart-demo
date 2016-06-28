import React, { Component } from 'react';
import { connect } from 'react-redux';

import PriceChart from './../components/PriceChart';
import VolumeChart from './../components/VolumeChart';
import {fetchData, selectStock, selectExchange} from './../actions';

class App extends Component {

  componentDidMount() {
    const {fetchData, selectedSym } = this.props;
    fetchData();
  }


  render(){
    const chartStyle = {
      width: 700
    };

    const {selectedData, exchangeData, stocks, exchanges, 
      selectedStock, selectedExchange, onStockSelect, onExchangeSelect} = this.props;

    return (
      <div style={chartStyle}>
        <select onChange={e => onStockSelect(e.target.value)} value={selectedStock}>
          {stocks.map((stock) => {
               return <option value={stock.sym} key={stock.sym}>{stock.name}</option>;
            })
          }
        </select>
        <select onChange={e => onExchangeSelect(e.target.value)} value={selectedExchange}>
          {exchanges.map((exchange) => {
               return <option value={exchange.mic} key={exchange.mic}>{exchange.name}</option>;
            })
          }
        </select>
        <PriceChart data={selectedData}  />
        <VolumeChart data={exchangeData}  />
      </div>
    );
  }

}

const mapStateToProps = (state) => {
    return {
       selectedData: state.selectedData,
       exchangeData: state.exchangeData,
       stocks: state.data.stocks,
       exchanges: state.data.exchanges
    };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onStockSelect: (stock) => {
      dispatch(selectStock(stock));
    },

    onExchangeSelect: (exchange) => {
      dispatch(selectExchange(exchange));
    },
    fetchData: () => {
      dispatch(fetchData());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App); 
