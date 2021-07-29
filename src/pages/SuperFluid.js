// import Portis from '@portis/web3';
import React from 'react'
import SuperfluidSDK from '@superfluid-finance/js-sdk'
import Web3 from 'web3'

let speed = 0
// let bobAdd = "0x563F9bcF8cbc7A102608e41e36B3C0d2547ae9cE"
let aliceAddress = "0x7D98112f0Cf86fADcF09EdDbbE1BEEe4381D394f"

function SuperFluid() {

    async function sfluid() {
        // const portis = new Portis('835530b2-c62e-4b03-86f0-5795ae704490', 'maticMumbai')
        // object initialization
        const sf = new SuperfluidSDK.Framework({
            web3: new Web3(window.ethereum)
        })
        await sf.initialize()

        // create user
        const walletAddress = await window.ethereum.request({
            method: 'eth_requestAccounts',
            params: [
            {
                eth_accounts: {}
            }
            ]
        });
        const userBob = sf.user({
            address: walletAddress[0],
            token: "0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f",
            // 0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f fDAIx token
            //0xF2d68898557cCb2Cf4C10c3Ef2B034b2a69DAD00 original
        });

        
        if(speed > 10) {
            await userBob.flow({
                recipient: aliceAddress, // my recipientAcc
                flowRate: '385802469135802'
        });
        }else {
            await userBob.flow({
                recipient: aliceAddress, // my recipientAcc
                flowRate: '0'
        });
    }


        const details = (await userBob.details()).cfa.flow;
        console.log(details);   
    }

    return (
        <div className="App">
            <button onClick={() => sfluid()} className="portis-button" >Start Flow</button>
        </div>
    )
}

export default SuperFluid
