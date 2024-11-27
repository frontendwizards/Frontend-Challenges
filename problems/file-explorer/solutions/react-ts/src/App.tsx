import { useState } from "react";
import "./styles.css";

type FileTreeNode = {
  name: string;
  type: "file" | "folder";
  children?: FileTreeNode[];
};

const fileTreeData: FileTreeNode[] = [
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

function TreeNode({
  node,
  depth,
}: {
  node: Readonly<FileTreeNode>;
  depth: Readonly<number>;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const { name, children = [], type } = node;

  const toggleOpen = () => setIsExpanded(!isExpanded);

  const sortedFiles = children
    .filter((child) => child.type === "file")
    .sort((a, b) => a.name.localeCompare(b.name));

  const sortedFolders = children
    .filter((child) => child.type === "folder")
    .sort((a, b) => a.name.localeCompare(b.name));

  const sortedChildren = [...sortedFolders, ...sortedFiles];

  return (
    <li
      role={type === "folder" ? "treeitem" : "none"}
      aria-expanded={type === "folder" ? isExpanded : undefined}
      style={{ paddingLeft: `${depth * 20}px` }}
    >
      <span>{name} </span>
      {type === "folder" && (
        <button
          onClick={toggleOpen}
          className="text-xl"
          aria-expanded={isExpanded}
          aria-label={`${isExpanded ? "close" : "open"} folder ${name}`}
        >
          [{isExpanded ? "-" : "+"}]
        </button>
      )}
      {isExpanded && (
        <ul>
          {sortedChildren.map((child, index) => (
            <TreeNode key={index} node={child} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}

function FileTree({ treeData }: { treeData: Readonly<FileTreeNode[]> }) {
  return (
    <ul role="tree">
      {treeData.map((node, index) => (
        <TreeNode key={index} node={node} depth={0} />
      ))}
    </ul>
  );
}

export default function App() {
  return (
    <main className="!bg-gray-800 w-full text-white text-2xl p-12 h-full">
      <FileTree treeData={fileTreeData} />
    </main>
  );
}
