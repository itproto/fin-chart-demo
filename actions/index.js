import d3 from 'd3';

export const REQUEST_DATA = 'REQUEST_DATA';
export const RECEIVE_DATA = 'RECEIVE_DATA';
export const SELECT_STOCK = 'SELECT_STOCK';
export const SELECT_EXCHANGE = 'SELECT_EXCHANGE';

export function selectStock(stock){
  return {
    type: SELECT_STOCK,
    stock
  };
}

export function selectExchange(exchange){
  return {
    type: SELECT_EXCHANGE,
    exchange
  };
}

export function requestData(){
  return {
    type: REQUEST_DATA
  };
}

export function receiveData(data){
  return {
    type: RECEIVE_DATA,
    data
  };
}

const parseDate = d3.time.format('%Y-%m-%dT%H:%M:%S.%LZ').parse;

export function fetchData() {
  return dispatch => {

    dispatch(requestData());
    d3.json('./data.json', (err, srcData) => {
        const allData = srcData.data.map(d => Object.assign({}, d, {
              time: parseDate(d.time),
              price: +d.price,
              change: +d.change
           })
        );
        
        const res = Object.assign(srcData, {data: allData});
        dispatch(receiveData(res));

        const selectedSym = srcData.stocks[0].sym;
        dispatch(selectStock(selectedSym));

        const selectedExchange = srcData.exchanges[0].mic;
        dispatch(selectExchange(selectedExchange));
    });
  };
}
