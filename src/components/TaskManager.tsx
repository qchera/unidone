"use client";

import { useState } from "react";
import posthog from "posthog-js";
import { useFeatureFlagEnabled } from "posthog-js/react";
import * as Sentry from "@sentry/nextjs";

interface Task {
  id: string;
  title: string;
  done: boolean;
  priority: "low" | "medium" | "high";
}

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Task["priority"]>("medium");
  const showUrgentFilter = useFeatureFlagEnabled("show-urgent-filter");

  // Simulate user login for Sentry context
  Sentry.setUser({ id: "1", email: "student@unidone.app" });

  const addTask = () => {
    if (!title.trim()) return;
    const task: Task = {
      id: Date.now().toString(),
      title,
      done: false,
      priority,
    };
    setTasks([...tasks, task]);
    posthog.capture("task_created", {
      priority: task.priority,
      category: "general",
    });
    setTitle("");
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((t) => {
        if (t.id === id) {
          const updated = { ...t, done: !t.done };
          if (updated.done) {
            posthog.capture("task_completed", {
              priority: updated.priority,
            });
          }
          return updated;
        }
        return t;
      })
    );
  };

  const deleteTask = (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      posthog.capture("task_deleted", {
        priority: task.priority,
        was_completed: task.done,
      });
    }
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Tasks</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task..."
          className="flex-1 border rounded px-3 py-2 dark:bg-zinc-800 dark:border-zinc-700"
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Task["priority"])}
          className="border rounded px-2 py-2 dark:bg-zinc-800 dark:border-zinc-700"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button
          onClick={addTask}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </div>
      {showUrgentFilter && (
        <button
          onClick={() => alert("Showing urgent tasks only!")}
          className="mb-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          🔥 Show Urgent Only
        </button>
      )}
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between border rounded p-3 dark:border-zinc-700"
          >
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTask(task.id)}
              />
              <span className={task.done ? "line-through text-gray-400" : ""}>
                {task.title}
              </span>
              <span className="text-xs text-gray-500">({task.priority})</span>
            </div>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={() => {
          const error = new Error("Break the world! Sentry test error");
          Sentry.captureException(error);
          console.error(error);
        }}
        className="mt-6 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
      >
        💥 Break the world
      </button>
    </div>
  );
}
