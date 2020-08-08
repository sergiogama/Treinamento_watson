const DiscoveryV1 = require('watson-developer-cloud/discovery/v1');
const extend = require('extend');
const vcap = require('vcap_services');

function main(params) {
    if(params.acao == "WD")
    {
        params.iam_apikey = "Khl8jD-x85JpVOLJmmhsKkjHJRJJ4-Xko4KaKsT_Ltgn";
        params.version = "2020-08-06";
        params.environment_id = "6e1035a5-5b53-481a-a6dc-85cfd8e5036c";
        params.collection_id = "df1421cd-5f82-4545-b299-68cdfcda34b5";
        //params.query = "Programador";
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
        if(params.tipoConta == "Conta")
            return {"SALDO": 222};
        else
            return {"SALDO": 444};
    }
}
global.main = main;
module.exports.test = main;
