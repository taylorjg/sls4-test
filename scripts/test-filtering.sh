# npx serverless invoke local -f getTrams -d '{"queryStringParameters": {"atcoCode": "9400ZZMASTW"}}'
npx serverless invoke local -f getTrams -d '{"queryStringParameters": {"atcoCode": "9400ZZMASTW", "serviceIds": "Pink_Line,Navy_Line", "towards": "ends"}}'
# npx serverless invoke local -f getTrams -d '{"queryStringParameters": {"atcoCode": "9400ZZMAFIR", "serviceIds": "Pink_Line,Navy_Line", "towards": "ends"}}'
