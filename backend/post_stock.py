import json
import requests
import os
import boto3
import logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)


def lambda_handler(event, context):
    logging.info(f"{event} got event")
    dynamodb = boto3.resource('dynamodb')

    ticker = event['ticker'].upper()
    price =  event['price']

    isValidPrice = str(price).isnumeric()
    isValidPrice = isValidPrice and int(price) > 0

    response = requests.get(
        f"https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol={ticker}&&apikey={os.environ['api']}")

    if response.status_code == 200:
        
        stock_json = response.json()['Global Quote']

        if stock_json == {}:

            return json.dumps({
                'statusCode': 500,
                'body': f"Ticker {ticker} invalid"
            })

        if not isValidPrice:
            return json.dumps({
                'statusCode': 500,
                'body': f"Price {price} invalid"
            })

        table = dynamodb.Table('market-eye')
        table.put_item(Item={'ticker': ticker, 'price': price})

        return json.dumps({
            'statusCode': 200,
            'body': json.dumps(stock_json)
        })