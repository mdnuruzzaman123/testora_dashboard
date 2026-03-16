"use client";

import StatsCards from "@/components/users/StatsCards";
import SuspendUserModal from "@/components/users/SuspendUserModal";
import UserDetailsModal from "@/components/users/UserDetailsModal";
import UserFilters from "@/components/users/UserFilters";
import UsersTable from "@/components/users/UsersTable";
import { userManagementUsers } from "@/lib/user-management-data";
import { useMemo, useState } from "react";
import type { UserManagementRow } from "./UserRow";

const categoryOptions = ["All", "Matura", "Semimatura", "Entrance Exams"];
const typeOptions = ["All", "Student", "Premium"];
const statusOptions = ["All", "Active", "Suspended", "Inactive"];

export default function UserManagementPage() {
  const [usersState, setUsersState] = useState(userManagementUsers);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [type, setType] = useState("All");
  const [plan, setPlan] = useState("All");
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [viewingUser, setViewingUser] = useState<UserManagementRow | null>(null);
  const [suspendingUser, setSuspendingUser] = useState<UserManagementRow | null>(null);

  const planOptions = useMemo(() => {
    const plans = Array.from(new Set(usersState.map((user) => user.activePlan)));
    return ["All", ...plans];
  }, [usersState]);

  const filteredUsers = useMemo(() => {
    return usersState.filter((user) => {
      const query = search.trim().toLowerCase();
      const matchesSearch =
        query.length === 0 ||
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query);
      const matchesCategory = category === "All" || user.preferredCategory === category;
      const matchesType = type === "All" || user.type === type;
      const matchesPlan = plan === "All" || user.activePlan === plan;
      const matchesStatus = status === "All" || user.status === status;

      return matchesSearch && matchesCategory && matchesType && matchesPlan && matchesStatus;
    });
  }, [usersState, search, category, type, plan, status]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / rowsPerPage));
  const safePage = Math.min(page, totalPages);

  const paginatedUsers = useMemo(() => {
    const start = (safePage - 1) * rowsPerPage;
    return filteredUsers.slice(start, start + rowsPerPage);
  }, [filteredUsers, safePage, rowsPerPage]);

  const stats = useMemo(() => {
    return {
      total: usersState.length,
      active: usersState.filter((user) => user.status === "Active").length,
      suspended: usersState.filter((user) => user.status === "Suspended").length,
      inactive: usersState.filter((user) => user.status === "Inactive").length,
    };
  }, [usersState]);

  const updateStatus = (id: string, newStatus: "Active" | "Suspended" | "Inactive") => {
    setUsersState((prev) => prev.map((u) => (u.id === id ? { ...u, status: newStatus } : u)));
  };

  const handleArchive = (id: string) => {
    setUsersState((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <div className="space-y-3">
      <section>
        <h2 className="text-xl font-semibold text-[#3f5f7a]">User Management</h2>
        <p className="text-sm text-[#7e95ab]">View, search, and manage all users</p>
      </section>

      <StatsCards stats={stats} />

      <UserFilters
        search={search}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        category={category}
        onCategoryChange={(value) => {
          setCategory(value);
          setPage(1);
        }}
        type={type}
        onTypeChange={(value) => {
          setType(value);
          setPage(1);
        }}
        plan={plan}
        onPlanChange={(value) => {
          setPlan(value);
          setPage(1);
        }}
        status={status}
        onStatusChange={(value) => {
          setStatus(value);
          setPage(1);
        }}
        categories={categoryOptions}
        types={typeOptions}
        plans={planOptions}
        statuses={statusOptions}
      />

      <UsersTable
        users={paginatedUsers}
        totalItems={filteredUsers.length}
        page={safePage}
        rowsPerPage={rowsPerPage}
        onPageChange={setPage}
        onRowsPerPageChange={(rows) => {
          setRowsPerPage(rows);
          setPage(1);
        }}
        onViewUser={setViewingUser}
        onSuspendUser={setSuspendingUser}
        onDeactivateUser={(user) => updateStatus(user.id, "Inactive")}
        onArchiveUser={(user) => handleArchive(user.id)}
      />

      <UserDetailsModal
        open={!!viewingUser}
        user={viewingUser}
        onClose={() => setViewingUser(null)}
      />

      <SuspendUserModal
        open={!!suspendingUser}
        user={suspendingUser}
        onClose={() => setSuspendingUser(null)}
        onConfirm={() => {
          if (suspendingUser) {
            updateStatus(suspendingUser.id, "Suspended");
          }
          setSuspendingUser(null);
        }}
      />
    </div>
  );
}
