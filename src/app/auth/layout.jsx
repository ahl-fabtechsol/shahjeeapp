export default function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white sm:bg-auth-gray">
      <div className="w-full h-full sm:h-auto  max-w-xl overflow-hidden rounded-lg bg-white p-8 sm:px-20 shadow-none sm:shadow-xl">
        {children}
      </div>
    </div>
  );
}
