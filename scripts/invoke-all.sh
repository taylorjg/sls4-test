echo searchLocations:
npx serverless invoke -f searchLocations -d '{"queryStringParameters": {"searchKey": "road"}}'
echo

echo getTrams:
npx serverless invoke -f getTrams -d '{"queryStringParameters": {"atcoCode": "9400ZZMASTW"}}'
echo
