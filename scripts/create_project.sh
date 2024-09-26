#!/bin/bash

# Check if a project name was provided
if [ -z "$1" ]; then
  echo "Usage: $0 <project-name> [<path>]"
  exit 1
fi

# Assign the first argument as the project name
PROJECT_NAME=$1

# Capitalize the project name and replace hyphens with spaces
CHALLENGE_NAME=$(echo "$PROJECT_NAME" | awk -F'-' '{for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) substr($i,2)} 1' OFS=' ')

# Assign the second argument as the path, default to 'problems' if not provided
PROJECT_PATH=${2:-problems}

# Create the full path where the project will be created
FULL_PATH="$PROJECT_PATH/$PROJECT_NAME"

# Copy the starter project to the specified directory with the project name, excluding node_modules
rsync -av --progress starter/ "$FULL_PATH" --exclude node_modules

# Replace all instances of "starter" with the project name in package.json files
find "$FULL_PATH/solutions/react-ts" -name 'package.json' -exec sed -i '' -e "s/starter/$PROJECT_NAME/g" {} +

# Replace "Example Challenge" with the formatted challenge name in README.md files
find "$FULL_PATH" -name 'README.md' -exec sed -i '' -e "s/Example Challenge/$CHALLENGE_NAME/g" {} +

# Change to the project directory
cd "$FULL_PATH/solutions/react-ts"

# Install dependencies and start the development server
npm install

echo "Project '$PROJECT_NAME' created successfully at '$FULL_PATH'."
