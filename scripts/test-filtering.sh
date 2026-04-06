# npx serverless invoke local -f getTrams -d '{"queryStringParameters": {"atcoCode": "9400ZZMASTW"}}'
npx serverless invoke local -f getTrams -d '{"queryStringParameters": {"atcoCode": "9400ZZMASTW", "lineIds": "Pink_Line,Navy_Line", "towards": "ends"}}'
# npx serverless invoke local -f getTrams -d '{"queryStringParameters": {"atcoCode": "9400ZZMAFIR", "lineIds": "Pink_Line,Navy_Line", "towards": "ends"}}'
