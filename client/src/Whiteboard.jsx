import React, { useRef } from "react";
import { Excalidraw } from "@excalidraw/excalidraw";
import { exportToBlob } from "@excalidraw/excalidraw";

export default function Whiteboard() {
  const excalidrawRef = useRef(null);

  // Save scene as JSON
  const saveScene = () => {
    const elements = excalidrawRef.current.getSceneElements();
    localStorage.setItem("whiteboardScene", JSON.stringify(elements));
    alert("Scene saved!");
  };

  // Load scene from JSON
  const loadScene = () => {
    const saved = localStorage.getItem("whiteboardScene");
    if (saved) {
      excalidrawRef.current.updateScene({ elements: JSON.parse(saved) });
      alert("Scene loaded!");
    }
  };

  // Export to PNG
  // const exportPNG = async () => {
  //   const elements = excalidrawRef.current.getSceneElements();
  //   const appState = excalidrawRef.current.getAppState();
  //   const blob = await exportToBlob({
  //     elements,
  //     appState,
  //     mimeType: "image/png",
  //   });
  //   const url = URL.createObjectURL(blob);
  //   const link = document.createElement("a");
  //   link.href = url;
  //   link.download = "whiteboard.png";
  //   link.click();
  // };

  return (
    <div className="h-4 flex flex-col">
      {/* Whiteboard */}
      <div className="flex-1">
        <Excalidraw
          ref={excalidrawRef}
          initialData={{
            appState: {
              viewBackgroundColor: "#f9f9f9",
              currentItemStrokeColor: "#000000",
            },
            elements: [],
          }}
          onChange={(elements) => {
            console.log("Scene updated:", elements);
          }}
        />
      </div>

      {/* Custom controls */}
      <div className="p-3 bg-gray-200 flex gap-2">
        <button
          onClick={saveScene}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Save
        </button>
        <button
          onClick={loadScene}
          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Load
        </button>
        <button
          className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Export PNG
        </button>
      </div>
    </div>
  );
}
