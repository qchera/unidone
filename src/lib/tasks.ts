export interface Task {
  id: string;
  title: string;
  done: boolean;
  priority: "low" | "medium" | "high";
}

let tasks: Task[] = [];

export function getTasks(): Task[] {
  return [...tasks];
}

export function addTask(title: string, priority: Task["priority"] = "medium"): Task {
  const task: Task = {
    id: Date.now().toString(),
    title,
    done: false,
    priority,
  };
  tasks.push(task);
  return task;
}

export function removeTask(id: string): boolean {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return false;
  tasks.splice(index, 1);
  return true;
}

export function toggleTask(id: string): Task | null {
  const task = tasks.find((t) => t.id === id);
  if (!task) return null;
  task.done = !task.done;
  return task;
}

export function filterByStatus(done: boolean): Task[] {
  return tasks.filter((t) => t.done === done);
}

export function filterByPriority(priority: Task["priority"]): Task[] {
  return tasks.filter((t) => t.priority === priority);
}

export function resetTasks(): void {
  tasks = [];
}
