const {ChainId, Fetcher,WETH, Route, Trade, TokenAmount, TradeType, Percent} = require('@uniswap/sdk')
const ethers = require('ethers')
const chainId = ChainId.MAINNET
const tokenAddress = '0x6B175474E89094C44Da98b954EedeAC495271d0F' //Dai Token address

const init = async () => {
    const dai = await Fetcher.fetchTokenData(chainId, tokenAddress)
    const weth = WETH[chainId]
    const pair = await Fetcher.fetchPairData(dai,weth)
    const route = new Route([pair],weth)
    console.log('weth in dai',route.midPrice.toSignificant(6))
    const trade = new Trade(route, new TokenAmount(weth, '100000000000000000'),TradeType.EXACT_INPUT)
    console.log('inputAmount',trade.inputAmount.toSignificant(6))
    console.log('execPrice',trade.executionPrice.toSignificant(6))
    console.log('next MidPrice',trade.nextMidPrice.toSignificant(6))
    const slippageTolerance = new Percent('50','10000') // 50 bips .. 1 bip = 1/100 de %   
    const amountOutMin = trade.minimumAmountOut(slippageTolerance).raw   
    console.log('amountOutMin:::::::::',amountOutMin)
    const path = [weth.address,dai.address]
    const to = ''
    const deadLine = Math.floor(Date.now() / 1000) + 60 * 20
    const value = trade.inputAmount.raw
    // const provider = ethers.getDefaultProvider('mainnet',{
    //     infura: ''
    // })
}
init()
