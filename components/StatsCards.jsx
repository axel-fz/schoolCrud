// components/StatsCards.jsx
'use client'
import React from 'react'
import { Users, UserCheck, UserCog, TrendingUp } from 'lucide-react'

const StatsCards = ({ stats }) => {
  const cards = [
    {
      title: 'Total Students',
      value: stats.total,
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600'
    },
    {
      title: 'Male Students',
      value: stats.boys,
      icon: UserCheck,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-100',
      textColor: 'text-green-600'
    },
    {
      title: 'Female Students',
      value: stats.girls,
      icon: UserCog,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600'
    },
    {
      title: 'Active Students',
      value: stats.active,
      icon: TrendingUp,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-600'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{card.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{card.value}</p>
              </div>
              <div className={`${card.bgColor} p-3 rounded-lg`}>
                <card.icon className={`w-8 h-8 ${card.textColor}`} />
              </div>
            </div>
            <div className={`mt-4 h-1 bg-gradient-to-r ${card.color} rounded-full`}></div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default StatsCards