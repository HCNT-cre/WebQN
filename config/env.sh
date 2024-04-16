#!/bin/bash

# Copy a .env.${NODE_ENV} file (ex: .env.production) as a .env file in the root folder.
# if NODE_END is not set, will use 'development' as default

set -e # Exit with nonzero exit code if anything fails

ENV_FILE="${PWD}/config/.env.base"
TARGET="${PWD}/.env"

echo "== Start .env copy =="

# Checking if env file exist
if [ ! -f $ENV_FILE ]; then
    echo "Expected config file '$ENV_FILE' not found. Stopping script."
    exit 1
fi

echo "Copying $ENV_FILE to $TARGET..."
cp $ENV_FILE $TARGET

# check ENV exist or not
if [ -z "$ENV" ]; then
    ENV="local"
fi

echo "Environment: $ENV"

if [ "$ENV" == "production" ]; then
    echo $TARGET
    sed -i '' "s|VITE_API_STORAGE=http://localhost/api/|VITE_API_STORAGE=https://luutrudientu.quangngai.gov.vn/api/|g" $TARGET
    sed -i '' "s|VITE_API_EXPORT_EXCEL=http://localhost:5678/excel|VITE_API_EXPORT_EXCEL=https://luutrudientu.quangngai.gov.vn/execl|g" $TARGET
fi

echo "== .env copy completed =="