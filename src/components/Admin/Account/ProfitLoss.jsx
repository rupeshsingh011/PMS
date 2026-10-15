import React, { useState } from 'react';
import { Download, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import PageHeader from '../common/PageHeader';
import Modal from '../common/Modal';

const plData = [
  { month: 'Jan', profit: 120000, loss: 40000 }, { month: 'Feb', profit: 150000, loss: 45000 },
  { month: 'Mar', profit: 180000, loss: 50000 }, { month: 'Apr', profit: 160000, loss: 30000 }
];

const StatCard = ({ title, value, subtitle, icon: Icon, bgColor }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4"><div className={`p-3 rounded-xl ${bgColor}`}><Icon className="w-6 h-6 text-white" /></div></div>
    <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
    <div className="flex items-end gap-2 mt-1"><h2 className="text-3xl font-bold text-gray-900">{value}</h2>{subtitle && <span className="text-sm font-medium text-gray-400 mb-1">{subtitle}</span>}</div>
  </div>
);

const ProfitLoss = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6 pb-12">
      <PageHeader title="Profit & Loss" breadcrumbs={[{ name: 'Accounts' }, { name: 'Profit & Loss' }]} primaryAction={{ label: 'Configure', icon: DollarSign, onClick: () => setIsModalOpen(true) }} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Gross Profit" value="₹16.3L" subtitle="Revenue minus COGS" icon={TrendingUp} bgColor="bg-blue-600" />
        <StatCard title="Net Income" value="₹8.1L" subtitle="After all expenses" icon={DollarSign} bgColor="bg-emerald-600" />
        <StatCard title="Total Operating Expenses" value="₹8.2L" icon={TrendingDown} bgColor="bg-amber-500" />
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-6">P&L Trend</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={plData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="profit" stroke="#10B981" fill="#10B981" fillOpacity={0.1} />
              <Area type="monotone" dataKey="loss" stroke="#EF4444" fill="#EF4444" fillOpacity={0.1} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="P&L Settings">
         <p className="text-gray-500 p-4 text-center">Settings configuration form will be available here.</p>
      </Modal>
    </div>
  );
};
export default ProfitLoss;
