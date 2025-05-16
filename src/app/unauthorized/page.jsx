export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-5xl font-bold mb-2">Access Denied</h1>
      <p className="mb-6">You don’t have permission to view this.</p>
      <a href="/" className="underline text-blue-600">
        Return Home
      </a>
    </div>
  );
}
