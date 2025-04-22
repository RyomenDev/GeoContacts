
import { useRouteError, isRouteErrorResponse } from "react-router-dom";

const ErrorBoundary = () => {
  const error = useRouteError();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-red-50 text-red-700 p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Oops! Something went wrong.</h1>
      {isRouteErrorResponse(error) ? (
        <p className="text-lg">
          {error.status} — {error.statusText}
        </p>
      ) : (
        <p className="text-lg">
          {error?.message || "Unexpected error occurred."}
        </p>
      )}
    </div>
  );
};

export default ErrorBoundary;
