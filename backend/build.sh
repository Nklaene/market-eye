#!/bin/bash
echo "starting build"
cd .env/lib/python3.7/site-packages/
zip -r9 ${OLDPWD}/function.zip .
cd $OLDPWD
zip -g function.zip post_stock.py 
zip -g function.zip get_stocks.py 
zip -g function.zip delete_stock.py 

aws lambda update-function-code --function-name post_stock --zip-file fileb://function.zip
aws lambda update-function-code --function-name get_stocks --zip-file fileb://function.zip
aws lambda update-function-code --function-name delete_stock --zip-file fileb://function.zip