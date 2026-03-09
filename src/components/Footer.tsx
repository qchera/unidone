export default function Footer() {
  return (
    <footer className="fixed bottom-0 w-full text-center p-4 text-sm text-gray-500">
      Status: {process.env.NEXT_PUBLIC_APP_STATUS}
    </footer>
  );
}
