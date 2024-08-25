# File Tree Challenge

## Problem Description

Create a file tree component that displays a hierarchical file structure. The component should allow users to expand and collapse folders to navigate through the file system. Files and folders should be displayed in a structured manner, with folders being expandable to show their contents.

![File Tree Demo](public/images/demo.png)

## Requirements

- The file tree should display a hierarchical structure of files and folders.
- Each folder should be collapsible, allowing users to expand or collapse its contents.
- The tree should sort files and folders alphabetically within each directory.
- Files and folders should be styled to indicate their level of nesting.
- The file tree component should be able to handle any depth of nesting.
- Ensure the component is accessible, with appropriate ARIA roles and properties.
- Style the component to make it visually clear which items are files and which are folders. Use padding to indicate nesting levels.

## Example

Here's an example of the file tree data structure:

```javascript
const fileTreeData = [
  {
    name: "src",
    type: "folder",
    children: [
      {
        name: "index.ts",
        type: "file",
      },
      {
        name: "app",
        type: "folder",
        children: [
          {
            name: "app.tsx",
            type: "file",
          },
        ],
      },
      {
        name: "styles.css",
        type: "file",
      },
      {
        name: "utils",
        type: "folder",
        children: [
          {
            name: "utils.ts",
            type: "file",
          },
        ],
      },
    ],
  },
  {
    name: "README.md",
    type: "file",
  },
];
```

## Live Demo

[Check out the live demo here](#)
