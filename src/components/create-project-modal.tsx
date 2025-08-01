"use client";

import { useState } from "react";
import { Flag, X } from "lucide-react";

export default function CreateProjectModal({
  onCloseAction,
  onNextAction,
}: {
  onCloseAction: () => void;
  onNextAction: (projectName: string, startFrom: string) => void;
}) {
  const [projectName, setProjectName] = useState("");
  const [startFrom, setStartFrom] = useState("Survey");

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="w-12 h-12 rounded-lg border border-gray-200 flex items-center justify-center">
              <Flag className="w-5 h-5 text-gray-800" />
            </div>
            <button onClick={onCloseAction} className="text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Create Project</h2>
          <p className="text-gray-600 mb-6">Please enter a name for this project.</p>

          <div className="space-y-4">
            <div>
              <label htmlFor="projectName" className="block text-gray-700 mb-2">
                Project name
              </label>
              <input
                id="projectName"
                type="text"
                placeholder="e.g. Kate's Project"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8">
            <button
              onClick={onCloseAction}
              className="px-4 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => onNextAction(projectName, startFrom)}
              className="px-4 py-3 bg-purple-500 rounded-lg text-white font-medium hover:bg-purple-600"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
