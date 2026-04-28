import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="rounded-[2rem] border border-border/70 bg-card/95 px-8 py-10 text-center shadow-soft">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">404</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">This page does not exist.</h1>
        <p className="mt-3 max-w-md text-sm leading-7 text-muted-foreground">
          The path <span className="font-medium text-foreground">{location.pathname}</span> could not be found.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition hover:bg-foreground/92"
        >
          Return to home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
