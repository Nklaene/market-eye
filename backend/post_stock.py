import json
import requests

def lambda_handler(event, context):

    ticker = event['ticker']

    return {
        'statusCode': 200,
        'body': json.dumps(f'Hello your ticker is {ticker}')
    }
