// components/SideBar.jsx
"use client";
import React, { useState, useEffect } from "react";
import {
  Users,
  UserPlus,
  GraduationCap,
  BarChart3,
  School,
  UserCheck,
} from "lucide-react";
import Link from "next/link";

const SideBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [totalStudents, setTotalStudents] = useState(0);

  useEffect(() => {
    const fetchTotal = async () => {
      try {
        const response = await fetch("/api/students");
        const data = await response.json();
        if (data.success) {
          setTotalStudents(data.data.length);
        }
      } catch {
        // Silently fail - keep 0
      }
    };
    fetchTotal();
  }, []);

  const menuItems = [
    { icon: BarChart3, label: "Dashboard", href: "/" },
    { icon: Users, label: "All Students", href: "/students" },
    { icon: UserPlus, label: "Add Student", href: "/add-student" },
    { icon: GraduationCap, label: "Courses", href: "/courses" },
    { icon: School, label: "Classes", href: "/classes" },
  ];

  return (
    <div
      className={`fixed left-0 top-0 h-screen bg-gradient-to-b from-blue-600 to-blue-800 shadow-2xl transition-all duration-300 z-50 flex flex-col ${
        isExpanded ? "w-49" : "w-20"
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Logo Area */}
      <div className="flex items-center p-4 border-b border-blue-500/30">
        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
          <GraduationCap className="w-6 h-6 text-blue-600" />
        </div>
        {isExpanded && (
          <span className="ml-3 text-white font-bold text-lg whitespace-nowrap">
            CRUD
          </span>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 py-6">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="flex items-center px-4 py-3 mx-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 group mb-1"
          >
            <item.icon className="w-6 h-6 min-w-[24px]" />
            {isExpanded && (
              <span className="ml-3 text-sm font-medium whitespace-nowrap">
                {item.label}
              </span>
            )}
          </Link>
        ))}
      </nav>

      {/* Stats Preview at Bottom */}
      <div className="p-4 border-t border-blue-500/30">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
            <UserCheck className="w-5 h-5 text-white" />
          </div>
          {isExpanded && (
            <div className="text-white">
              <p className="text-xs opacity-80">Total Students</p>
              <p className="font-bold text-lg">{totalStudents}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
