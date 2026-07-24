// app/classes/page.jsx
"use client";
import SideBar from "@/components/SideBar";
import { School, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Classes() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <SideBar />

      <div className="flex-1 ml-20 p-8">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Link>

          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <School className="w-10 h-10 text-purple-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Classes</h1>
            <p className="text-gray-600 text-lg mb-8">
              Class management feature is coming soon. Stay tuned!
            </p>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Return to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
