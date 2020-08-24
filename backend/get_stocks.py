import json
import boto3

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('market-eye')
    data = table.scan()

    return {
        'statusCode': 200,
        'body': data
    }
