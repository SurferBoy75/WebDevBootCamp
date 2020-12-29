//const data = `{"ticker":{"base":"BTC","target":"USD","price":"27143.45333096","volume":"144058.69315679","change":"35.36505993"},"timestamp":1609178522,"success":true,"error":""}`

//XHR - the old way... (avoid using this)
const req = new XMLHttpRequest();

req.onload = function () {
    console.error("the old way (XHR - avoid using this)")
    console.log("ALL DONE WITH REQUEST!!");
    const data = JSON.parse(this.responseText);
    console.log(data.ticker.price);
}

req.onerror = function () {
    console.error("ERROR!!!");
    console.log(this);
}

req.open('GET', 'https://api.cryptonator.com/api/ticker/btc-usd')

req.send();

// this is better..
fetch('https://api.cryptonator.com/api/ticker/btc-usd')
    .then(res => {
        console.warn("using fetch to do the same thing")
        console.log("FETCH: Pending Parse...")
        return res.json()
    })
    .then(data => {
        console.log("FETCH: DATA SUCCESSFULLY PARSED!", data)
        console.log("FETCH price:", data.ticker.price)
    })
    .catch(e => {
        console.error("no response from server!")
    })


axios.get('https://api.cryptonator.com/api/ticker/btc-usd')
    .then(res => {
        console.warn("now using Axios...")
        console.log("AXIOS: price:", res.data.ticker.price)
        console.warn("control released:  'fetchBitcoinPrice' function available for use")
    })
    .catch(err => {
        console.error("AXIOS: Error - something went wrong")
    })

const fetchBitcoinPrice = async () => {
    try {
        const res = await axios.get('https://api.cryptonator.com/api/ticker/btc-usd')
        console.log("price: ", res.data.ticker.price)
    } catch (e) {
        console.error("something went wrong")
    }
}
