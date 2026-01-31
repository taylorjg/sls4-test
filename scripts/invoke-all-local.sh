echo searchLocations:
npx serverless invoke local -f searchLocations -d '{"queryStringParameters": {"searchKey": "road"}}'
echo

echo getTrams:
npx serverless invoke local -f getTrams -d '{"queryStringParameters": {"atcoCode": "9400ZZMASTW"}}'
echo
