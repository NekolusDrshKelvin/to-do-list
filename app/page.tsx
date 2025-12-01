"use client";

import React, { useState, useEffect } from "react";
import { Calendar, CheckCircle, PlayCircle, Undo2, Trash2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// -----------------------------
// Task Type
// -----------------------------
type Task = {
  id: number;
  title: string;
  date: string;
  time: string;
  status: "todo" | "doing" | "done";
};

// -----------------------------
// Time Formatting Functions
// -----------------------------
const formatTime = (date: Date) =>
  date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

const formatFullDateTime = (date: Date) =>
  date.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

// -----------------------------
// Main Component
// -----------------------------
export default function TodoApp() {
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [theme, setTheme] = useState("dark");

  // -----------------------------
  // Effects
  // -----------------------------
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, [mounted]);

  // -----------------------------
  // Task Handlers
  // -----------------------------
  const addTask = () => {
    if (!newTask.trim() || !dueDate || !dueTime) return;

    const task: Task = {
      id: Date.now(),
      title: newTask,
      date: dueDate,
      time: dueTime,
      status: "todo",
    };

    setTasks([task, ...tasks]);
    setNewTask("");
    setDueDate("");
    setDueTime("");
  };

  const updateStatus = (id: number, status: Task["status"]) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, status } : t)));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // -----------------------------
  // Filtered Lists
  // -----------------------------
  const todoItems = tasks.filter((t) => t.status === "todo");
  const doingItems = tasks.filter((t) => t.status === "doing");
  const doneItems = tasks.filter((t) => t.status === "done");

  // -----------------------------
  // Theme Styles
  // -----------------------------
  const themeStyles: Record<string, string> = {
    dark: "bg-black text-white",
    light: "bg-white text-black",
    blue: "bg-blue-950 text-blue-100",
    pink: "bg-pink-950 text-pink-100",
    neon: "bg-black text-green-400",
    gradient: "bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white",
  };

  const cardStyles: Record<string, string> = {
    dark: "bg-white/10 border-white/20",
    light: "bg-black/10 border-black/20",
    blue: "bg-blue-900/40 border-blue-300/40",
    pink: "bg-pink-900/40 border-pink-300/40",
    neon: "bg-green-900/20 border-green-500/50",
    gradient: "bg-white/20 border-white/30",
  };

  const listItemStyles: Record<string, string> = {
    dark: "bg-white/10 border-white/20",
    light: "bg-black/10 border-black/20",
    blue: "bg-blue-900/40 border-blue-300",
    pink: "bg-pink-900/40 border-pink-300",
    neon: "bg-green-900/40 border-green-500",
    gradient: "bg-white/20 border-white/40",
  };

  const inputStyles: Record<string, string> = {
    dark: "bg-white/15 text-white border-white/20",
    light: "bg-black/10 text-black border-black/20",
    blue: "bg-blue-900/40 text-blue-100 border-blue-300",
    pink: "bg-pink-900/40 text-pink-100 border-pink-300",
    neon: "bg-green-900/40 text-green-400 border-green-500",
    gradient: "bg-white/20 text-white border-white/40",
  };

  const iconStyles: Record<string, string> = {
    dark: "text-white",
    light: "text-black",
    blue: "text-blue-200",
    pink: "text-pink-200",
    neon: "text-green-400",
    gradient: "text-white",
  };

  const fontStyles: Record<string, string> = {
    dark: "text-white",
    light: "text-black",
    blue: "text-blue-100",
    pink: "text-pink-100",
    neon: "text-green-400",
    gradient: "text-white",
  };

  // -----------------------------
  // Sections Mapping
  // -----------------------------
  const sections: [string, Task[]][] = [
    ["Todo Items", todoItems],
    ["In Progress", doingItems],
    ["Completed", doneItems],
  ];

  // -----------------------------
  // Render
  // -----------------------------
  return (
    <div className={`min-h-screen py-8 px-4 ${themeStyles[theme]}`}>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Theme Buttons */}
        <div className="flex justify-end gap-2">
          {Object.keys(themeStyles).map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`px-3 py-2 rounded-md border font-semibold ${
                theme === t ? "opacity-100 border-white" : "opacity-50"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Clock */}
        <div className="text-center mb-4">
          <div className={`p-6 rounded-2xl border ${cardStyles[theme]}`}>
            {mounted && (
              <>
                <div className="text-5xl font-mono font-bold mb-2">{formatTime(currentTime)}</div>
                <div className="text-lg opacity-70">{formatFullDateTime(currentTime)}</div>
              </>
            )}
          </div>
          <h1 className="text-4xl font-bold mt-4">Todo App with Adaptive Themes</h1>
        </div>

        {/* Add Task */}
        <Card className={`border ${cardStyles[theme]}`}>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${fontStyles[theme]}`}>
              <Calendar className={`h-5 w-5 ${iconStyles[theme]}`} /> Add Task
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <input
              type="text"
              placeholder="Task Name..."
              className={`w-full p-3 rounded-xl border outline-none ${inputStyles[theme]}`}
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="date"
                className={`p-3 rounded-xl border outline-none ${inputStyles[theme]}`}
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
              <input
                type="time"
                className={`p-3 rounded-xl border outline-none ${inputStyles[theme]}`}
                value={dueTime}
                onChange={(e) => setDueTime(e.target.value)}
              />
            </div>
            <button
              onClick={addTask}
              className="w-full p-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-300"
            >
              Add Task
            </button>
          </CardContent>
        </Card>

        {/* Todo / Doing / Done Sections */}
        {sections.map(([title, items]) => (
          <Card key={title} className={`border ${cardStyles[theme]}`}>
            <CardHeader>
              <CardTitle className={fontStyles[theme]}>{title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {items.map((task) => (
                <div
                  key={task.id}
                  className={`p-4 rounded-xl border flex justify-between items-center ${listItemStyles[theme]}`}
                >
                  <div>
                    <p className={`font-bold ${task.status === "done" ? "line-through" : ""} ${fontStyles[theme]}`}>
                      {task.title}
                    </p>
                    <p className={`text-sm opacity-70 ${fontStyles[theme]}`}>
                      {task.date} at {task.time}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    {task.status === "todo" && (
                      <>
                        <button onClick={() => updateStatus(task.id, "doing")}>
                          <PlayCircle className={`w-6 h-6 ${iconStyles[theme]}`} />
                        </button>
                        <button onClick={() => deleteTask(task.id)}>
                          <Trash2 className="w-6 h-6 text-red-400" />
                        </button>
                      </>
                    )}
                    {task.status === "doing" && (
                      <>
                        <button onClick={() => updateStatus(task.id, "done")}>
                          <CheckCircle className={`w-6 h-6 ${iconStyles[theme]}`} />
                        </button>
                        <button onClick={() => updateStatus(task.id, "todo")}>
                          <Undo2 className={`w-6 h-6 ${iconStyles[theme]}`} />
                        </button>
                      </>
                    )}
                    {task.status === "done" && (
                      <button onClick={() => deleteTask(task.id)}>
                        <Trash2 className="w-6 h-6 text-red-400" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
