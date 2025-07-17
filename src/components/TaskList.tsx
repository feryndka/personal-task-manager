// components/TaskList.tsx
import type { Task } from "@/lib/hooks/useTasks";
import { EditIcon, TrashIcon } from "./Icons"; // Kita akan buat file icons.tsx

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: number) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

/**
 * Komponen yang bertanggung jawab hanya untuk menampilkan daftar tugas.
 */
export default function TaskList({
  tasks,
  onToggleComplete,
  onEdit,
  onDelete,
}: TaskListProps) {
  // Tampilan jika tidak ada tugas (empty state)
  if (tasks.length === 0) {
    return (
      <div className="text-center py-16 px-6 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-700">
          Tidak ada tugas ditemukan
        </h3>
        <p className="text-gray-500 mt-2">
          Mulai tambahkan tugas pertama Anda atau ubah filter pencarian.
        </p>
      </div>
    );
  }

  // Tampilan daftar tugas
  return (
    <main className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`bg-white p-5 rounded-xl shadow-lg transition-all duration-300 flex items-start gap-4 ${
            task.completed ? "opacity-50" : ""
          }`}
        >
          <input
            type="checkbox"
            aria-label={`Tandai ${task.title} sebagai selesai`}
            checked={task.completed}
            onChange={() => onToggleComplete(task.id)}
            className="mt-1 h-6 w-6 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
          />
          <div className="flex-1">
            <h2
              className={`font-bold text-lg text-gray-800 ${
                task.completed ? "line-through" : ""
              }`}
            >
              {task.title}
            </h2>
            <p
              className={`text-gray-600 whitespace-pre-line ${
                task.completed ? "line-through" : ""
              }`}
            >
              {task.description}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              aria-label={`Edit ${task.title}`}
              onClick={() => onEdit(task)}
              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-full transition cursor-pointer"
            >
              <EditIcon />
            </button>
            <button
              aria-label={`Hapus ${task.title}`}
              onClick={() => onDelete(task.id)}
              className="p-2 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded-full transition cursor-pointer"
            >
              <TrashIcon />
            </button>
          </div>
        </div>
      ))}
    </main>
  );
}
