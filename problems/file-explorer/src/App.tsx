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
  const [isOpen, setIsOpen] = useState(false);

  const { name, children = [], type } = node;

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <li
      role={type === "folder" ? "treeitem" : "none"}
      aria-expanded={type === "folder" ? isOpen : undefined}
      style={{ paddingLeft: `${depth * 20}px` }}
    >
      <span>{name} </span>
      {type === "folder" && (
        <button
          onClick={toggleOpen}
          className="text-xl"
          aria-expanded={isOpen}
          aria-label={`${isOpen ? "close" : "open"} folder ${name}`}
        >
          [{isOpen ? "-" : "+"}]
        </button>
      )}
      {isOpen && (
        <ul>
          {children.map((child, index) => (
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
    <main className="bg-gray-800 h-screen w-full text-white text-2xl p-12">
      <FileTree treeData={fileTreeData} />
    </main>
  );
}
