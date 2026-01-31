npx serverless invoke -f getTransportModes
npx serverless invoke -f getNetworkStatus
npx serverless invoke -f searchLocations -d '{"queryStringParameters": {"searchKey": "road"}}'
npx serverless invoke -f getTrams -d '{"queryStringParameters": {"atcoCode": "9400ZZMASTW"}}'
