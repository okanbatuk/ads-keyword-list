import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAccounts } from "../utils/api";
import { Account } from "../types";
import { StatusBadge } from "./StatusBadge";

interface AccountDropdownProps {
  selectedAccount: Account | null;
  onAccountChange: (account: Account | null) => void;
}

export const AccountDropdown: React.FC<AccountDropdownProps> = ({
  selectedAccount,
  onAccountChange,
}) => {
  const {
    data: accounts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["accounts"],
    queryFn: fetchAccounts,
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const accountId = e.target.value;
    const account = accounts?.find((a) => a.id === Number(accountId)) || null;
    onAccountChange(account);
  };

  if (isLoading) {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Account
        </label>
        <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-10 rounded-md"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Account
        </label>
        <div className="text-red-500 text-sm">Error loading accounts</div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Account
      </label>
      <div className="relative">
        <select
          value={selectedAccount?.id || ""}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        >
          <option value="">Select an account</option>
          {accounts?.map((account) => (
            <option key={account.id} value={account.id}>
              {account.name}
            </option>
          ))}
        </select>
        {selectedAccount && (
          <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
            <StatusBadge status={selectedAccount.status} />
          </div>
        )}
      </div>
    </div>
  );
};
