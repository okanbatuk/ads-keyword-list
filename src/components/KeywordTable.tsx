import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchKeywords } from "../utils/api";
import { AdGroup } from "../types";
import { format } from "date-fns";

interface KeywordTableProps {
  selectedAdGroup: AdGroup | null;
  start: Date | null;
  end: Date | null;
  disabled?: boolean;
}

export const KeywordTable: React.FC<KeywordTableProps> = ({
  selectedAdGroup,
  start,
  end,
  disabled = false,
}) => {
  const [page, setPage] = useState(1);
  const [search] = useState("");

  const limit = 50;

  const { data, isLoading, error } = useQuery({
    queryKey: [
      "keywords",
      selectedAdGroup?.id,
      start ? format(start, "yyyy-MM-dd") : null,
      end ? format(end, "yyyy-MM-dd") : null,
      page,
    ],
    queryFn: () =>
      fetchKeywords(
        selectedAdGroup!.id,
        format(start!, "yyyy-MM-dd"),
        format(end!, "yyyy-MM-dd"),
        page,
        limit,
      ),
    enabled: !!(selectedAdGroup && start && end) && !disabled,
  });

  const totalPages = data ? Math.ceil(data.total / limit) : 0;

  if (disabled || !selectedAdGroup || !start || !end) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Keywords
        </h2>
        <div className="text-gray-500 dark:text-gray-400 text-center py-8">
          Select an ad group and date range to view keywords
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Keywords
        </h2>
        <div className="text-red-500 text-center py-8">
          Error loading keywords
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Keywords ({data?.total})
        </h2>
      </div>

      {!data?.keywords?.length ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            {data?.total === 0
              ? "There is no keyword data for the selected date range."
              : search.trim().length > 0 && search.trim().length < 2
                ? "Please type at least 2 characters to search."
                : "No keywords match your search."}
          </p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider  hover:bg-gray-100 dark:hover:bg-gray-600">
                    Keyword
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider hover:bg-gray-100 dark:hover:bg-gray-600">
                    Avg Quality Score
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {data.keywords.map((keyword) => (
                  <tr
                    key={keyword.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {keyword.keyword}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {keyword.avgQs.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {data?.total > 1 && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-gray-700 dark:text-gray-300">
                Showing {(page - 1) * limit + 1} to{" "}
                {Math.min(page * limit, data?.total)} of {data?.total} results
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="px-3 py-1 text-sm text-gray-700 dark:text-gray-300">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
