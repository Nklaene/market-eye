import json
import requests
import os

def lambda_handler(event, context):

    ticker = event['ticker']
    response = requests.get(f"https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol={ticker}&&apikey={os.environ['api']}")

    if response.status_code == 200:
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
        


# print(lambda_handler(
#     {
#         'ticker': 'tsla'
#     },
#     True
# ))