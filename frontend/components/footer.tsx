export function Footer() {
  return (
    <footer className="border-t border-border bg-white px-4 py-4 sm:px-6">
      <div className="flex flex-col items-center justify-between gap-2 text-xs text-slate-500 sm:flex-row">
        <p>
          &copy; {new Date().getFullYear()} Mortgage Station / Kuya Jerry. All
          rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-slate-700">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-slate-700">
            Terms of Service
          </a>
          <a href="#" className="hover:text-slate-700">
            Support
          </a>
        </div>
      </div>
    </footer>
  );
}
