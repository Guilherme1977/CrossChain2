import { getContract, web3Fn } from '../tools/web3Utils'
import {setLocalConfig, getLocalConfig, fromWei} from '../tools/tools'
import config from '../../config'
const contract = getContract()

const DESTBALANCE = 'DESTBALANCE'

export function getNodeBalance(account?:any, token?:string, chainID?:any, dec?:any) {
  return new Promise(resolve => {
    
    if (
      account
      && token
      && chainID
    ) {
      const lObj = getLocalConfig(account, token, chainID, DESTBALANCE, 1000 * 10)
      if (lObj && lObj.balance) {
        resolve(fromWei(lObj.balance, dec))
      } else {
        contract.options.address = token
        web3Fn.setProvider(config.getCurChainInfo(chainID).nodeRpc)
        contract.methods.balanceOf(account).call((err:any, res:any) => {
          if (err) {
            console.log(err)
            resolve('')
          } else {
            // console.log(res)
            setLocalConfig(account, token, chainID, DESTBALANCE, {balance: res})
            resolve(fromWei(res, dec))
          }
        })
      }
    } else {
      resolve('')
    }
  })
}

const SRCTOTALSUPPLY = 'SRCTOTALSUPPLY'
function getBlandTs (tokenList:any, chainId?:any, account?:string | null | undefined) {
  return new Promise(resolve => {
    web3Fn.setProvider(config.getCurChainInfo(chainId).nodeRpc)
    const batch = new web3Fn.BatchRequest()
    const len = tokenList.length
    const list:any = {}
    for (let i = 0; i < len; i++) {
      const tokenObj = tokenList[i]
      contract.options.address = tokenObj.token
      const tsData = contract.methods.totalSupply().encodeABI()
      batch.add(web3Fn.eth.call.request({data: tsData, to: tokenObj.token}, 'latest', (err:any, res:any) => {
        if (!list[tokenObj.token]) list[tokenObj.token] = {}
        if (err) {
          // console.log(err)
          list[tokenObj.token].ts = ''
        } else {
          list[tokenObj.token].ts = fromWei(web3Fn.utils.hexToNumberString(res), tokenObj.dec)
        }
        if ((i + 1) === len) {
          resolve(list)
        }
      }))

      if (account) {
        const blData = contract.methods.balanceOf(account).encodeABI()
        batch.add(web3Fn.eth.call.request({data: blData, to: tokenObj.token}, 'latest', (err:any, res:any) => {
          if (!list[tokenObj.token]) list[tokenObj.token] = {}
          if (err) {
            // console.log(err)
            list[tokenObj.token].balance = ''
          } else {
            list[tokenObj.token].balance = fromWei(web3Fn.utils.hexToNumberString(res), tokenObj.dec)
          }
        }))
      }
    }
    batch.execute()
  })
}
export function getNodeTotalsupply(token?:string, chainId?:any, dec?:any, account?:string | null | undefined) {
  return new Promise(resolve => {
    
    if (
      token
      && chainId
    ) {
      const lObj = getLocalConfig(SRCTOTALSUPPLY, token, chainId, SRCTOTALSUPPLY, 1000 * 10)
      if (lObj && lObj.totalsupply) {
        resolve(fromWei(lObj.totalsupply, dec))
      } else {
        const tokenList = [{
          token: token,
          dec: dec
        }]
        getBlandTs(tokenList, chainId, account).then((res:any) => {
          console.log(res)
        })
      }
    } else {
      resolve('')
    }
  })
}


export function getGroupTotalsupply (tokenList:any, chainId?:any, account?:string | null | undefined) {
  return new Promise(resolve => {
    // console.log(chainId)
    if (!chainId) resolve(false)
    else {
      const lData = getLocalConfig(SRCTOTALSUPPLY, SRCTOTALSUPPLY, chainId, SRCTOTALSUPPLY, 1000 * 10)
      // console.log(lData)
      // console.log(token)
      if (lData && lData.list) {
        resolve(lData.list)
      } else {
        getBlandTs(tokenList, chainId, account).then((res:any) => {
          // console.log(res)
          if (res) {
            setLocalConfig(SRCTOTALSUPPLY, SRCTOTALSUPPLY, chainId, SRCTOTALSUPPLY, {list: res})
          }
          resolve(res)
        })
      }
    }
  })
}
