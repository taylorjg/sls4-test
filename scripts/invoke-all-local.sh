npx serverless invoke local -f getNetworkStatus
npx serverless invoke local -f searchLocations -d '{"queryStringParameters": {"searchKey": "road"}}'
npx serverless invoke local -f getTrams -d '{"queryStringParameters": {"atcoCode": "9400ZZMASTW"}}'
