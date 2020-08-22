import json
import requests
import os
import boto3

def lambda_handler(event, context):

    dynamodb = boto3.client('dynamodb')

    ticker = event['ticker']
    price = event['price']

    response = requests.get(f"https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol={ticker}&&apikey={os.environ['api']}")

    if response.status_code == 200:

        dynamodb.put_item(TableName='market-eye', Item={'ticker': ticker, 'price': price})

        stock_json = response.json()['Global Quote']

        if len(stock_json) == 0:
            return {
                'statusCode': 500,
                'body': f"Ticker {ticker} invalid"
            }

        return {
            'statusCode': 200,
            'body': json.dumps(stock_json)
        }
        