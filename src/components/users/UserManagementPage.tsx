"use client";

import StatsCards from "@/components/users/StatsCards";
import UserFilters from "@/components/users/UserFilters";
import UsersTable from "@/components/users/UsersTable";
import { userManagementUsers } from "@/lib/user-management-data";
import { useMemo, useState } from "react";

const categoryOptions = ["All", "Matura", "Semimatura", "Entrance Exams"];
const typeOptions = ["All", "Student", "Premium"];
const statusOptions = ["All", "Active", "Suspended", "Inactive"];

export default function UserManagementPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [type, setType] = useState("All");
  const [plan, setPlan] = useState("All");
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const planOptions = useMemo(() => {
    const plans = Array.from(new Set(userManagementUsers.map((user) => user.activePlan)));
    return ["All", ...plans];
  }, []);

  const filteredUsers = useMemo(() => {
    return userManagementUsers.filter((user) => {
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
  }, [search, category, type, plan, status]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / rowsPerPage));
  const safePage = Math.min(page, totalPages);

  const paginatedUsers = useMemo(() => {
    const start = (safePage - 1) * rowsPerPage;
    return filteredUsers.slice(start, start + rowsPerPage);
  }, [filteredUsers, safePage, rowsPerPage]);

  const stats = useMemo(() => {
    return {
      total: userManagementUsers.length,
      active: userManagementUsers.filter((user) => user.status === "Active").length,
      suspended: userManagementUsers.filter((user) => user.status === "Suspended").length,
      inactive: userManagementUsers.filter((user) => user.status === "Inactive").length,
    };
  }, []);

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
      />
    </div>
  );
}
