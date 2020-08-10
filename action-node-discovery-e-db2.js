/*
Documentação IBM_DB para acesso ao Db2, em Python, Node.js, etc..
https://www.ibm.com/support/knowledgecenter/SSEPGG_11.5.0/com.ibm.swg.im.dbclient.python.doc/doc/c0054699.html
Exemplo: https://github.com/ibmdb/node-ibm_db/blob/master/examples/singleRowFetch.js
*/

var ibmdb = require('ibm_db');

const DiscoveryV1 = require('watson-developer-cloud/discovery/v1');
const extend = require('extend');
const vcap = require('vcap_services');

function main(params) {
    if(params.acao == "WD")
    {
        params.iam_apikey = "<API_KEY>";
        params.version = "2020-08-06";
        params.environment_id = "6e1035a5-5b53-481a-a6dc-85cfd8e5036c";
        params.collection_id = "df1421cd-5f82-4545-b299-68cdfcda34b5";
        // params.query must be sent
        return new Promise((resolve, reject) => {
        const _params = vcap.getCredentialsFromServiceBind(params, 'discovery');
        _params.headers = extend(
          {},
          _params.headers,
          { 'User-Agent': 'openwhisk' }
        );
        let service;
        try 
        {
          service = new DiscoveryV1(_params);
          service.query(_params, (err, response) => {
            if (err) 
            {
              reject(err.message);
            } 
            else 
            {
              resolve(response);
            }
          });
        } 
        catch (err) 
        {
          reject(err.message);
          return;
        }
      });
    
    }
    if(params.acao == "SALDO")
    {
        
        var connString = "DRIVER={DB2};"
            + "DATABASE=BLUDB;"
            + "UID=bwc81435;"
            + "PWD=<PASSWORD>;"
            + "HOSTNAME=dashdb-txn-sbox-yp-dal09-10.services.dal.bluemix.net;"
            + "port=50000";
            
        const conn = ibmdb.openSync(connString); 
        
        data = conn.querySync("SELECT saldo FROM SALDO WHERE tipoConta = '" + params.tipoConta + "' LIMIT 1;");
        
        return {"SALDO":data[0].SALDO };

        conn.close();

    }

}
