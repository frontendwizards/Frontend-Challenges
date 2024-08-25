#!/bin/bash

# Check if a project name was provided
if [ -z "$1" ]; then
  echo "Usage: $0 <project-name> [<path>]"
  exit 1
fi

# Assign the first argument as the project name
PROJECT_NAME=$1

# Assign the second argument as the path, default to 'problems' if not provided
PROJECT_PATH=${2:-problems}

# Create the full path where the project will be created
FULL_PATH="$PROJECT_PATH/$PROJECT_NAME"

# Copy the starter project to the specified directory with the project name
cp -r starter "$FULL_PATH"

# Replace all instances of "starter" with the project name in package.json files
find "$FULL_PATH" -name 'package.json' -exec sed -i'' -e "s/starter/$PROJECT_NAME/g" {} +

echo "Project '$PROJECT_NAME' created successfully at '$FULL_PATH'."
