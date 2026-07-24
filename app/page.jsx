/* eslint-disable react-hooks/set-state-in-effect */
// app/page.jsx
"use client";
import { useState, useEffect, useCallback } from "react";
import SideBar from "@/components/SideBar";
import StatsCards from "@/components/StatsCards";
import { Loader2, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/students");
      const data = await response.json();

      if (data.success) {
        setStudents(data.data);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Failed to fetch students");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Refetch data when window gains focus (e.g., navigating back)
  useEffect(() => {
    const handleFocus = () => fetchStudents();
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      const response = await fetch(`/api/students?id=${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success) {
        setStudents((prev) => prev.filter((s) => s._id !== id));
        setDeleteConfirm(null);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Failed to delete student");
    } finally {
      setDeletingId(null);
    }
  };

  // Calculate stats
  const stats = {
    total: students.length,
    boys: students.filter((s) => s.gender === "Male").length,
    girls: students.filter((s) => s.gender === "Female").length,
    active: students.filter((s) => s.isActive).length,
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SideBar />

      {/* Main Content */}
      <div className="flex-1 ml-20 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900">
              Student Dashboard
            </h1>
            <p className="mt-2 text-gray-600">
              Manage and monitor your student information
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Stats Cards */}
          {!loading && !error && (
            <>
              <StatsCards stats={stats} />

              {/* Recent Students Table */}
              <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Recent Enrollments
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left bg-gray-50">
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Gender
                        </th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Grade
                        </th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Course
                        </th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {students.slice(0, 5).map((student) => (
                        <tr key={student._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">
                              {student.firstName} {student.lastName}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                student.gender === "Male"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-pink-100 text-pink-800"
                              }`}
                            >
                              {student.gender}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {student.grade}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {student.course}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                student.isActive
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {student.isActive ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => router.push(`/edit-student/${student._id}`)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Edit student"
                              >
                                <Pencil className="w-4 h-4" />
                              </button>
                              {deleteConfirm === student._id ? (
                                <div className="flex items-center space-x-1">
                                  <button
                                    onClick={() => handleDelete(student._id)}
                                    disabled={deletingId === student._id}
                                    className="px-2 py-1 bg-red-600 text-white text-xs rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                                  >
                                    {deletingId === student._id ? '...' : 'Confirm'}
                                  </button>
                                  <button
                                    onClick={() => setDeleteConfirm(null)}
                                    className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-lg hover:bg-gray-300 transition-colors"
                                  >
                                    No
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => setDeleteConfirm(student._id)}
                                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                  title="Delete student"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
