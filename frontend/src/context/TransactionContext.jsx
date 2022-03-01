import React, {useEffect, useState} from 'react';
import {BigNumber, ethers} from 'ethers';

import {contractABI, contractAddress} from '../utils/constants';

import { toHex } from '../utils/splitString';
//create react context
export const TransactionContext = React.createContext();

//access to the ethereum object through metamask
//const {ethereum} = window;

//fetch ethereum contract from address, abi and signer. Return contract instance.
const getEthereumContract = () =>{
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const verifyContract = new ethers.Contract(contractAddress, contractABI, signer);

    // console.log("contract address: " + transactionContract.address);
    return verifyContract;
}

//create context to share among files
export const TransactionProvider = ({children}) => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [formData, setFormData] = useState({proof:'', input:''});
    const handleChange = (e, name) => {
        setFormData((prevState) => ({...prevState, [name]: e.target.value }))
    }

    const checkIfWalletIsConnected = async () => {
        try {
            //if metamask is not connected, there is not ethereum object.
            if(!ethereum) return alert("wallet connecting falied. Install metamask.");
            //wait until metamask is installed.
            const accounts = await ethereum.request({method: 'eth_accounts'});
            //after that, set the current account to the first account
            if(accounts.length) {
                setCurrentAccount(accounts[0]);
                // getAllTransactions();
            } else{
                console.log("no accounts found");
            }

         console.log("list of accounts: " + accounts);

        } catch (error) {
            console.log(error);
            alert("wallet connecting falied. Install metamask.");
            throw new Error("no eth object.");
        }
    }

    const connectWallet = async () => {
        try{
            if(!ethereum) return alert("wallet connecting falied. Install metamask.");
            const accounts = await ethereum.request({method: 'eth_requestAccounts'});
            setCurrentAccount(accounts[0]);
        } catch (error) {
            alert("wallet connecting falied. Install metamask.");
            console.log(error);
            throw new Error("no eth object.");
        }
    }

    const verify = async () => {
        try {
            if(!ethereum) return alert("wallet connecting falied. Install metamask.");
            const {proof, input} = formData;
            const verifyContract = getEthereumContract();

            //-----
            // console.log({input});
            const a = toHex(proof);
            console.log("proof: ");
            console.log(a);
            console.log("input: ");
            // console.log(web3.toBigNumber(input));
            // const num = BigNumber.from(input);
            // console.log(num);
            //-----
            
            const transactionHash = await verifyContract.verifyTx(a, [input]);
            console.log(transactionHash);
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            console.log(transactionHash);
            console.log(`Success - ${transactionHash.hash}`);
        } catch (error) {
            console.log(error);
            throw new Error("no eth object.");
        }
    }
    
    useEffect(() => {
        checkIfWalletIsConnected();
        // getEthereumContract();
        // checkIfTransactionsExist();
    }, []);

    return(
        //context for sharing data between parents and childrens. sharing components are inside the value.
        //wrapping entire react application with all of the data going to get passed in to this section
        <TransactionContext.Provider value={{ connectWallet, currentAccount, handleChange, verify, formData}}>
            {children}
        </TransactionContext.Provider>
    )
}