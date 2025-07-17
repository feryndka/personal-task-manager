// lib/hooks/useTasks.ts
import { useState, useEffect, useCallback } from "react";

// Definisikan tipe Task agar bisa digunakan di komponen lain
export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

// Kunci untuk localStorage agar konsisten
const TASK_STORAGE_KEY = "tasks-data";

/**
 * Custom Hook untuk mengelola state dan logika CRUD untuk tugas.
 * Mengabstraksi interaksi dengan localStorage.
 */
export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Efek untuk memuat tugas dari localStorage saat aplikasi pertama kali dimuat
  useEffect(() => {
    try {
      const savedTasks = localStorage.getItem(TASK_STORAGE_KEY);
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    } catch (error) {
      console.error("Gagal memuat tugas dari localStorage", error);
      setTasks([]); // Jika ada error, mulai dengan array kosong
    }
  }, []);

  // Fungsi internal untuk memperbarui state dan localStorage
  const updateTasksInStorage = useCallback((newTasks: Task[]) => {
    setTasks(newTasks);
    localStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(newTasks));
  }, []);

  // Fungsi untuk menambah tugas baru
  const addTask = useCallback(
    (taskData: Omit<Task, "id" | "completed">) => {
      const newTask: Task = {
        id: Date.now(), // ID unik sederhana berdasarkan timestamp
        ...taskData,
        completed: false,
      };
      // Menambahkan tugas baru di awal array agar muncul paling atas
      updateTasksInStorage([newTask, ...tasks]);
    },
    [tasks, updateTasksInStorage]
  );

  // Fungsi untuk memperbarui tugas yang sudah ada
  const updateTask = useCallback(
    (id: number, taskData: Partial<Omit<Task, "id">>) => {
      const newTasks = tasks.map((t) =>
        t.id === id ? { ...t, ...taskData } : t
      );
      updateTasksInStorage(newTasks);
    },
    [tasks, updateTasksInStorage]
  );

  // Fungsi untuk menghapus tugas
  const deleteTask = useCallback(
    (id: number) => {
      const newTasks = tasks.filter((t) => t.id !== id);
      updateTasksInStorage(newTasks);
    },
    [tasks, updateTasksInStorage]
  );

  // Fungsi untuk mengubah status selesai/belum selesai
  const toggleTaskComplete = useCallback(
    (id: number) => {
      const newTasks = tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      );
      updateTasksInStorage(newTasks);
    },
    [tasks, updateTasksInStorage]
  );

  return { tasks, addTask, updateTask, deleteTask, toggleTaskComplete };
}
