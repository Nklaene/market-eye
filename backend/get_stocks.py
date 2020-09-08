import json
import boto3
import requests
import os
import logging
import time

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('market-eye')
    data = table.scan()

    return {
        'statusCode': 200,
        'body': data
    }