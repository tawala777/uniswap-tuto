const {ChainId, Fetcher,WETH, Route, Trade, TokenAmount, TradeType} = require('@uniswap/sdk')
const chainId = ChainId.MAINNET
const tokenAddress = '0x6B175474E89094C44Da98b954EedeAC495271d0F' //Dai Token address
const init = async () => {
    const dai = await Fetcher.fetchTokenData(chainId, tokenAddress)
    // console.log('dai::::::::::::',dai)

    const weth = WETH[chainId]
    // console.log('weth::::::::::::',weth)

    const pair = await Fetcher.fetchPairData(dai,weth)
    // console.log('pair::::::::::::',pair)

    const route = new Route([pair],weth)
    // console.log('route::::::::::::',route.midPrice)

    console.log('weth in dai',route.midPrice.toSignificant(6))
    // console.log('dai in weth',route.midPrice.invert().toSignificant(6))

    const trade = new Trade(route, new TokenAmount(weth, '1000'),TradeType.EXACT_INPUT)
    console.log('execPrice',trade.executionPrice.toSignificant(6))
    console.log('next MidPrice',trade.nextMidPrice.toSignificant(6))
}
init()
