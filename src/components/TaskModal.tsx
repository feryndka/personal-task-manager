// components/TaskModal.tsx
"use client";

import { useState, useEffect } from "react";
import type { Task } from "@/lib/hooks/useTasks";

interface TaskModalProps {
  isOpen: boolean;
  task: Task | null;
  onSave: (taskData: Omit<Task, "id" | "completed">) => void;
  onClose: () => void;
}

/**
 * Komponen Modal untuk menambah atau mengedit tugas.
 */
export default function TaskModal({
  isOpen,
  task,
  onSave,
  onClose,
}: TaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Sinkronisasi state form dengan data tugas yang akan diedit
  useEffect(() => {
    if (isOpen) {
      setTitle(task?.title || "");
      setDescription(task?.description || "");
    }
  }, [isOpen, task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Judul tidak boleh kosong!");
      return;
    }
    onSave({ title, description });
  };

  if (!isOpen) return null;

  // Menutup modal saat mengklik area latar belakang
  return (
    <div
      className="fixed inset-0 bg-gray-50 bg-opacity-50 flex items-center justify-center z-50 p-4 text-black"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg animate-fade-in-up"
        onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup saat mengklik area form
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {task ? "Edit Task" : "Add New Task"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 font-medium mb-2"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              autoFocus
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-gray-700 font-medium mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            ></textarea>
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer py-2 px-5 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="cursor-pointer py-2 px-5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 shadow-md transition"
            >
              Save Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
