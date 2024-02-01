const neo4j = require('neo4j-driver')
const { schedule } = require('@netlify/functions')
const { writeToGsheet } = require('./utils/writeToGSheet.js')
const { executeQuery } = require('./query-exec/campaignData.js')


const initializeDatabase = (driver, query) =>
  executeQuery(driver, query).catch((error) => {
    console.error('Database query failed to complete\n', error.message)
})

const handler = async () => {

  const driver = neo4j.driver(
    SECRETS.NEO4J_URI || 'bolt://localhost:7687',
    neo4j.auth.basic(
      SECRETS.NEO4J_USER || 'neo4j',
      SECRETS.NEO4J_PASSWORD || 'neo4j'
    )
  )

  /*
    run all queries individually and aggregate the values returned in each query.
    Values are aggregated in dictionary for each pastor

    Dicts are then deconstructed to return an array of values for sequential row-wise updates
  */
    const fetchData = async () => {
        const allData = {}
        for(query of queries){
            const result = await executeQuery(driver, query).catch((error) => {
                throw new Error(
                  `Database query failed\n${error.message}\n${error.stack}`
                )
              })
            
            Object.entries(result).forEach(([pastorName, pastorData])=> {
                if(!allData[pastorName]){
                    allData[pastorName] = pastorData
                }else{
                    allData[pastorName] = { ...allData[pastorName], ...pastorData };
                }
            })
        }
    
        // transform data to allow row-wise update on google sheet
        const allRows = [headerRow];
    
        for (pastorName in allData){
            const pastorData = allData[pastorName];
            const rowData = [pastorName, ...Object.values(pastorData)];
            allRows.push(rowData)
        }
         return allRows
    }
    
   const campaignDataQuery = await fetchData().catch((error) => {
    throw new Error(
        `Data formatting failed \n${error.message}\n${error.stack}`
      )
   })

    /*
   * We catch any errors that occur during initialization of the google client
   * In this case, ensure that the google client is authentication occurs
   */
    const campaignData = 'Automated Full Time Campaign Data'
    const SPREADSHEET_ID = '14YuUSVf_SFWZEcwx3AuchQ_0-ZTNaHCHcf9-cGQaPl4'

    await writeToGsheet(campaignDataQuery, campaignData, SPREADSHEET_ID).catch(
    (error) => {
      throw new Error(
        `Error writing to google sheet\n${error.message}\n${error.stack}`
      )
    }
)

  return {
    statusCode: 200,
  }
}

module.exports.handler = schedule('30 23 * * 0', handler)