import json
import boto3

def lambda_handler(event, context):

    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('market-eye')

    ticker = event['ticker'].upper()

    table.delete_item(
        Key={
            'ticker': ticker
        }
    )

    return {
        'statusCode': 200,
    }