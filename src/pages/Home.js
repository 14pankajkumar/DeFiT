import Portis from '@portis/web3'
import React from 'react'
import SuperfluidSDK from '@superfluid-finance/js-sdk'
import Web3 from 'web3'
import { Link } from 'react-router-dom'

// let bobAdd = "0x563F9bcF8cbc7A102608e41e36B3C0d2547ae9cE"
let aliceAddress = "0x7D98112f0Cf86fADcF09EdDbbE1BEEe4381D394f"
function Home() {
    // Posrtis login
    const portis = new Portis('835530b2-c62e-4b03-86f0-5795ae704490', 'maticMumbai', {
        scope: ["email", "reputation"]
    })
    
    portis.onLogin((walletAddress, email, reputation) => {
        console.log(walletAddress, email, reputation);
        document.getElementById("walletAdd").innerHTML = "Wallet Address " + walletAddress; 
        document.getElementById("email").innerHTML = "Email " + email;
    });
    
    portis.isLoggedIn().then(({ error, result }) => {
        console.log(error, result);
    });  
    
    portis.onLogout(() => {
        console.log('User logged out');
    });

    // GeoLocation
    const coordinates = []

    const start = () => {
        navigator.geolocation.watchPosition(
            async data => {
                console.log(data);
                coordinates.push([data.coords.latitude, data.coords.longitude]);
                window.localStorage.setItem("coordinates", JSON.stringify(coordinates));
                document.getElementById("geoDataTime").innerHTML = "Time " + data.timestamp;
                document.getElementById("geoDataSpeed").innerHTML = "Speed " + data.coords.speed;

                if (data.coords.speed > 2) {
                    // SF initiaziled
                    const sf = new SuperfluidSDK.Framework({
                        web3: new Web3(portis.provider)
                    })
                    await sf.initialize()

                    // create user
                    // const walletAddress = await window.ethereum.request({
                    //     method: 'eth_requestAccounts',
                    //     params: [
                    //     {
                    //         eth_accounts: {}
                    //     }
                    //     ]
                    // });

                    const userBob = sf.user({
                        address: "0xbd225264c591720369b98de561c4cbe01ddd2e14",
                        token: "0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f",
                        // 0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f fDAIx token
                        //0xF2d68898557cCb2Cf4C10c3Ef2B034b2a69DAD00 original
                    });

                    await userBob.flow({
                        recipient: aliceAddress, // my recipientAcc
                        flowRate: '385802469135802'
                    });
                    await userBob.flow({
                        recipient: aliceAddress, // my recipientAcc
                        flowRate: '0'
                    });
                }
                
                // await userBob.flow({
                //     recipient: aliceAddress, // my recipientAcc
                //     flowRate: '385802469135802'
                // });
                // setInterval(() => {
                
                // }, 1000)
            },
            error => console.log(error),
            {
                enableHighAccuracy: true
            }
        )
    }

    return (
        <div className="App">
            <h1>
            <Link to="/" className="portis-button">Home</Link>
            </h1>
            <h1>
            <button onClick={() => start()} className="portis-button">Start</button>
            <button className="portis-button">Stop</button>
            </h1>
            <Link to="/superfluid" className="portis-button">Go to SuperFluid</Link>
            <button onClick={() => portis.provider.enable()} className="portis-button">Login to Wallet</button>
            <button onClick={() => portis.logout()} className="portis-button">Log Out</button>
            <h1 id="walletAdd">Address </h1>
            <h1 id="email">Email </h1>
            <h1 id="geoDataTime">Time 0</h1>
            <h1 id="geoDataSpeed">Speed 0</h1>
        </div>
    )
}
export default Home
