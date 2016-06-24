import React, { Component } from 'react';
import { connect } from 'react-redux';

import Chart from './../components/Chart';
import {fetchData, selectStock} from './../actions';

class App extends Component {

  componentDidMount() {
    const {fetchData, selectedSym } = this.props;
    fetchData();
  }


  render(){
    const chartStyle = {
      width: 700
    };

    const {selectedData, stocks, selectedStock, onStockSelect} = this.props;

    return (
      <div style={chartStyle}>
        <select onChange={e => onStockSelect(e.target.value)} value={selectedStock}>
        {stocks.map((stock) => {
             return <option value={stock.sym} key={stock.sym}>{stock.name}</option>;
          })
        }
        </select>

        <Chart data={selectedData}  />
      </div>
    );
  }

}

const mapStateToProps = (state) => {
    return {
       selectedData: state.selectedData,
       stocks: state.data.stocks
    };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onStockSelect: (stock) => {
      dispatch(selectStock(stock));
    },

    fetchData: () => {
      dispatch(fetchData());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App); 
