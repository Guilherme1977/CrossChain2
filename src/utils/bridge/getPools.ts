// import * as multicall from '@makerdao/multicall'
// // import {aggregate} from '@makerdao/multicall'
import config from '../../config'
console.log(config)


// function getData (chainId:any, arr:any, account?: string | undefined) {
//   const multicallConfig = {
//     rpcUrl: config.chainInfo[chainId].nodeRpc,
//     multicallAddress: config.chainInfo[chainId].queryToken
//   }
//   const callArr = []
//   for (let obj of arr) {
//     callArr.push([
//       {
//         target: obj.token,
//         call: ['totalSupply()(uint256)'],
//         returns: [['TS_' + obj.symbol, (val:any) => val / 10 ** Number(obj.decimals)]]
//       }
//     ])
//     if (account) {
//       callArr.push({
//         target: obj.token,
//         call: ['balanceOf(address)(uint256)', account],
//         returns: [['BL_' + obj.symbol, (val:any) => val / 10 ** Number(obj.decimals)]]
//       })
//     }
//   }
//   multicall.aggregate([...callArr], multicallConfig).then((res:any) => {
//     console.log(res)
//   })
// }