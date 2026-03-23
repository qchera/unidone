import TaskManager from "@/components/TaskManager";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <main className="w-full max-w-3xl py-16 px-4">
        <h1 className="text-4xl font-bold text-center mb-8 dark:text-white">
          Unidone
        </h1>
        <TaskManager />
      </main>
    </div>
  );
}
