// app/dashboard/page.tsx
"use client";

import { useState, useMemo, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

// Custom Hook dan Komponen yang sudah kita buat
import { useTasks, type Task } from "@/lib/hooks/useTasks";
import TaskList from "@/components/TaskList";
import TaskModal from "@/components/TaskModal";
import Pagination from "@/components/Pagination";
import { PlusIcon } from "@/components/Icons";

const TASKS_PER_PAGE = 5;

/**
 * Halaman Dashboard utama.
 * Bertanggung jawab sebagai "konduktor" untuk state UI dan data.
 */
export default function DashboardPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Menggunakan custom hook untuk semua logika data tugas
  const { tasks, addTask, updateTask, deleteTask, toggleTaskComplete } =
    useTasks();

  // State yang spesifik untuk halaman ini (UI state)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  // Mengambil state dari URL untuk search dan pagination
  const searchTerm = searchParams.get("q") || "";
  const currentPage = Number(searchParams.get("page")) || 1;

  // --- Handler untuk memperbarui URL ---
  const handleUrlUpdate = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      // Selalu kembali ke halaman 1 setiap kali ada pencarian baru
      if (key === "q") {
        params.set("page", "1");
      }
      // Gunakan router.replace agar tidak menambah history browser
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  // --- Logika untuk memfilter dan memaginasi data ---
  const filteredTasks = useMemo(() => {
    if (!searchTerm) return tasks;
    return tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [tasks, searchTerm]);

  const paginatedTasks = useMemo(() => {
    const startIndex = (currentPage - 1) * TASKS_PER_PAGE;
    return filteredTasks.slice(startIndex, startIndex + TASKS_PER_PAGE);
  }, [filteredTasks, currentPage]);

  const totalPages = Math.ceil(filteredTasks.length / TASKS_PER_PAGE);

  // --- Handler untuk Modal dan Aksi CRUD ---
  const openModal = (task: Task | null = null) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setTaskToEdit(null);
    setIsModalOpen(false);
  };

  const handleSaveTask = (taskData: Omit<Task, "id" | "completed">) => {
    if (taskToEdit) {
      updateTask(taskToEdit.id, taskData);
    } else {
      addTask(taskData);
    }
    closeModal();
  };

  const handleDeleteWithConfirmation = (id: number) => {
    // Mengganti confirm() bawaan browser agar lebih mudah di-styling nanti jika perlu
    if (window.confirm("Apakah Anda yakin ingin menghapus tugas ini?")) {
      deleteTask(id);
    }
  };

  return (
    <div className="bg-white min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
          <h1 className="text-3xl font-bold text-gray-800">My Tasks</h1>
          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 w-full sm:w-auto cursor-pointer"
          >
            <PlusIcon />
            <span>Add Task</span>
          </button>
        </header>

        <div className="mb-6">
          <input
            type="search"
            placeholder="Cari tugas..."
            defaultValue={searchTerm}
            onChange={(e) => handleUrlUpdate("q", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition text-black"
          />
        </div>

        <TaskList
          tasks={paginatedTasks}
          onToggleComplete={toggleTaskComplete}
          onEdit={openModal}
          onDelete={handleDeleteWithConfirmation}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => handleUrlUpdate("page", String(page))}
        />
      </div>

      <TaskModal
        isOpen={isModalOpen}
        task={taskToEdit}
        onSave={handleSaveTask}
        onClose={closeModal}
      />
    </div>
  );
}
