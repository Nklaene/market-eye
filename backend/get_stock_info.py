import json
import requests
import os
import boto3
import logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)

def lambda_handler(event, context):


    logger.info(event)
    ticker = event["queryStringParameters"]["ticker"]

    response = requests.get(
        f"https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol={ticker}&&apikey={os.environ['api']}")

    stock_json = response.json()['Global Quote']
    logger.info(stock_json)

    return {
        'statusCode': 200,
        'headers': {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": True
        },
        'body': json.dumps(stock_json)
    }