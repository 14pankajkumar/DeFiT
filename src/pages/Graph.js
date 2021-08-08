import React, { useState } from 'react'
import axios from 'axios'
import { JsonToTable } from "react-json-to-table";
import Counter from './Counter';

const QUERY_URL = "https://api.thegraph.com/subgraphs/name/superfluid-finance/superfluid-mumbai"

function Graph({wallet}) {
    const [data, setData] = React.useState({})

    const query = `
        {
            account(id: "${wallet}") {
                flowsOwned {
                    flowRate
                    sum
                    lastUpdate
                    token { 
                        id
                        symbol
                    }
                }
            }
        }
        `

    const loadData = async() => {
        const result = await axios.post(QUERY_URL, {query})
        setData(result.data.data.account)
        console.log(result.data.data.account);
    }

    React.useEffect(() => {
        loadData()
    })

    return (
        <div key={({id}, index) => id}>
            <JsonToTable json={data} />
            <Counter/>
        </div>
    )
}

export default Graph
