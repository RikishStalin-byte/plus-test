"use client";

import { useEffect, useState } from "react";

type PR = {
  title: string;
  summary: string;
};

export default function Home() {
  const [prs, setPrs] = useState<PR[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   fetch("/api/prs")
      .then((res) => res.json())
      .then((data) => {
        setPrs(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Backend error:", error);
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-2 text-4xl font-bold text-gray-900">
          Plus Dashboard
        </h1>

        <p className="mb-8 text-gray-600">
          Pull Request Summary Dashboard
        </p>

        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">
            Pull Requests
          </h2>

          {loading ? (
            <p className="text-gray-500">Loading PRs...</p>
          ) : prs.length === 0 ? (
            <p className="text-gray-500">No pull requests found.</p>
          ) : (
            <div className="space-y-4">
              {prs.map((pr, index) => (
                <div
                  key={index}
                  className="rounded-lg border p-4"
                >
                  <h3 className="font-semibold text-gray-900">
                    {pr.title}
                  </h3>

                  <p className="mt-2 text-gray-600 whitespace-pre-line">
                    {pr.summary}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}