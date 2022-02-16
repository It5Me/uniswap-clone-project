import React, { useState } from 'react'

export interface ITransactionContext {
  connectWallet: () => void
  currentAccount: string
}

export const TransactionContext = React.createContext<
  ITransactionContext | undefined
>(undefined)

let eth: any

declare const window: any

if (typeof window !== 'undefined') {
  eth = window.ethereum
}

export const TransactionProvider: React.FC = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState('')

  const connectWallet = async (metamask = eth) => {
    try {
      if (!metamask) return alert('Please install metamask')
      const accounts = await metamask.request({ method: 'eth_requestAccounts' })
      setCurrentAccount(accounts[0])
    } catch (err) {
      console.log(err)
      //   throw new Error('No ethereum object.')
    }
  }

  const checkIfwalletIsConnected = async (metamask = eth) => {
    try {
      if (!metamask) return alert('Plese install metamask')

      const accounts = await metamask.request({ method: 'eth_accounts' })

      if (accounts.length) {
        setCurrentAccount(accounts[0])
        console.log('wallet is already connected!')
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <TransactionContext.Provider value={{ connectWallet, currentAccount }}>
      {children}
    </TransactionContext.Provider>
  )
}
