import Portis from '@portis/web3'
import React, { useEffect, useState } from 'react'
import SuperfluidSDK from '@superfluid-finance/js-sdk'
import Web3 from 'web3'
import { Link } from 'react-router-dom'
import axios from 'axios'

const bobAdd = "0xbd225264c591720369b98de561c4cbe01ddd2e14"
const aliceAddress = "0x7D98112f0Cf86fADcF09EdDbbE1BEEe4381D394f"

function Home() {
    const [count, setCount] = useState()
    const [wallet, setwallet] = useState()
    const [flow, setflow] = useState()
    const myLocalPOANode = {
        nodeUrl: "https://matic-mumbai.chainstacklabs.com",
        chainId: 80001,
      };
    // Posrtis login
    const portis = new Portis('835530b2-c62e-4b03-86f0-5795ae704490', myLocalPOANode, {
        scope: ["email", "reputation"]
    })
    
    portis.onLogin((walletAddress, email, reputation) => {
        setwallet(walletAddress)
        console.log(walletAddress, email, reputation);
        document.getElementById("walletAdd").innerHTML = walletAddress; 
        document.getElementById("email").innerHTML = email;
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

                const sf = new SuperfluidSDK.Framework({
                    web3: new Web3(portis.provider),
                });
                await sf.initialize()

                const userBob = sf.user({
                address: wallet, 
                token: "0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f" // address of the Super Token
                });

                await userBob.flow({
                    recipient: aliceAddress,
                    flowRate: "385802469135802" 
                    });

                // if (data.coords.speed > 5) {
                //     await userBob.flow({
                //         recipient: aliceAddress,
                //         flowRate: "385802469135802" 
                //         });
                // } else {
                //     await userBob.flow({
                //         recipient: aliceAddress,
                //         flowRate: "0"
                //         });
                // }
                    
            },
            error => console.log(error),
            {
                enableHighAccuracy: true
            }
        )
    }

    // GrapgQL
    const main = async () => {
        try {
            const result = await axios.post(
                "https://api.thegraph.com/subgraphs/name/superfluid-finance/superfluid-mumbai",
                {
                    query : `{
                        account(
                            id: "0xbd225264c591720369b98de561c4cbe01ddd2e14"
                        ) {
                            flowsOwned {
                                flowRate
                                sum
                                lastUpdate
                                token {
                                    id
                                    symbol
                                }
                            }
                            flowsReceived {
                                id
                            }
                        }
                    }` 
                }
            )
            console.log(result.data);
            setflow(result.data.account)
        } catch(error) {
            console.log(error);
        }
    }

    setInterval(() => {
        main()
    }, 2000)
    
    
    // calculating totals
    const now = new Date()
    const THREE_HOURS_AGO = new Date(now - 3 * 3600)
    const lastUpdate = THREE_HOURS_AGO
    const sum = 0
    const flowRate = 0.00027778 // 1 per hour

    const totalFlowed = sum + flowRate * (now - lastUpdate)

    console.log(`Total flowed: ${totalFlowed} tokens`);

    // Streams are live
    // const interestEarnedIn2Seconds = flowRate * 2
    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setCount(count + interestEarnedIn2Seconds);
    //     }, 2000);
    //     return () => clearTimeout(timer);
    // })

    const stop = async() => {
        const sf = new SuperfluidSDK.Framework({
            web3: new Web3(portis.provider),
        });
        await sf.initialize()

        const userBob = sf.user({
        address: wallet, 
        token: "0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f" // address of the Super Token
        });

        await userBob.flow({
            recipient: aliceAddress,
            flowRate: "0" 
            })
        window.location.reload()
    }

    return (
        <div className="App">
            <button onClick={() => start()} className="portis-button">Start Running</button>
            <button className="portis-button" onClick={() => stop()} >Stop Running</button>
            <button onClick={() => portis.provider.enable()} className="portis-button">Login to Wallet</button>
            <button onClick={() => portis.logout()} className="portis-button">Log Out</button>
            <div className="main">
            <h3 id="">Address </h3>
            <p id="walletAdd"> </p>
            <h3 id="">Email </h3>
            <p id="email"> </p>
            <h3 id="geoDataTime">Time 0</h3>
            <h3 id="geoDataSpeed">Speed 0</h3>
            <h3 >Flow {flow} </h3>
            </div>
        </div>
    )
}
export default Home
