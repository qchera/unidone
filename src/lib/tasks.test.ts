import { describe, it, expect, beforeEach } from "vitest";
import {
  addTask,
  removeTask,
  toggleTask,
  getTasks,
  filterByStatus,
  filterByPriority,
  resetTasks,
} from "./tasks";

beforeEach(() => {
  resetTasks();
});

describe("addTask", () => {
  it("should create a task with correct title and default priority", () => {
    const task = addTask("Do homework");
    expect(task.title).toBe("Do homework");
    expect(task.priority).toBe("medium");
    expect(task.done).toBe(false);
  });

  it("should create a task with specified priority", () => {
    const task = addTask("Urgent fix", "high");
    expect(task.priority).toBe("high");
  });
});

describe("removeTask", () => {
  it("should remove an existing task", () => {
    const task = addTask("To remove");
    expect(removeTask(task.id)).toBe(true);
    expect(getTasks()).toHaveLength(0);
  });

  it("should return false for non-existent task", () => {
    expect(removeTask("fake-id")).toBe(false);
  });
});

describe("toggleTask", () => {
  it("should toggle task done status", () => {
    const task = addTask("Toggle me");
    const toggled = toggleTask(task.id);
    expect(toggled?.done).toBe(true);
  });

  it("should return null for non-existent task", () => {
    expect(toggleTask("fake-id")).toBeNull();
  });
});

describe("filterByStatus", () => {
  it("should filter completed tasks", () => {
    const t1 = addTask("Task 1");
    addTask("Task 2");
    toggleTask(t1.id);
    expect(filterByStatus(true)).toHaveLength(1);
    expect(filterByStatus(false)).toHaveLength(1);
  });
});

describe("filterByPriority", () => {
  it("should filter tasks by priority", () => {
    addTask("Low task", "low");
    addTask("High task", "high");
    addTask("Another high", "high");
    expect(filterByPriority("high")).toHaveLength(2);
    expect(filterByPriority("low")).toHaveLength(1);
  });
});
