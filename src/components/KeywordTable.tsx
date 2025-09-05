import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchKeywords } from "../utils/api";
import { AdGroup, SortConfig } from "../types";
import { useDebounce } from "../hooks/useDebounce";
import { format } from "date-fns";

interface KeywordTableProps {
  selectedAdGroup: AdGroup | null;
  startDate: Date | null;
  endDate: Date | null;
  disabled?: boolean;
}

export const KeywordTable: React.FC<KeywordTableProps> = ({
  selectedAdGroup,
  startDate,
  endDate,
  disabled = false,
}) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: null,
    direction: null,
  });

  const debouncedSearch = useDebounce(search, 500);
  const limit = 10;

  const { data, isLoading, error } = useQuery({
    queryKey: [
      "keywords",
      selectedAdGroup?.id,
      startDate ? format(startDate, "yyyy-MM-dd") : null,
      endDate ? format(endDate, "yyyy-MM-dd") : null,
      page,
      debouncedSearch,
      sortConfig.field,
      sortConfig.direction,
    ],
    queryFn: () =>
      fetchKeywords(
        selectedAdGroup!.id,
        format(startDate!, "yyyy-MM-dd"),
        format(endDate!, "yyyy-MM-dd"),
        page,
        limit,
        debouncedSearch || undefined,
        sortConfig.field || undefined,
        sortConfig.direction || undefined,
      ),
    enabled: !!(selectedAdGroup && startDate && endDate) && !disabled,
  });

  const handleSort = (field: "keyword" | "avgQs") => {
    setSortConfig((prev) => {
      if (prev.field === field) {
        if (prev.direction === "asc") return { field, direction: "desc" };
        if (prev.direction === "desc") return { field: null, direction: null };
      }
      return { field, direction: "asc" };
    });
    setPage(1);
  };

  const getSortIcon = (field: "keyword" | "avgQs") => {
    if (sortConfig.field !== field) return "↕️";
    if (sortConfig.direction === "asc") return "▲";
    if (sortConfig.direction === "desc") return "▼";
    return "↕️";
  };

  const totalPages = data ? Math.ceil(data.total / limit) : 0;

  if (disabled || !selectedAdGroup || !startDate || !endDate) {
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
          Keywords ({data?.total || 0})
        </h2>
        <div className="w-64">
          <input
            type="text"
            placeholder="Search keywords..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th
                onClick={() => handleSort("keyword")}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                Keyword {getSortIcon("keyword")}
              </th>
              <th
                onClick={() => handleSort("avgQs")}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                Avg QS {getSortIcon("avgQs")}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {data?.keywords.map((keyword) => (
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

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Showing {(page - 1) * limit + 1} to{" "}
            {Math.min(page * limit, data?.total || 0)} of {data?.total || 0}{" "}
            results
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
    </div>
  );
};
