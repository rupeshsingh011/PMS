import React, { useState } from 'react';
import { Download, FileBarChart, PieChart, BarChart3, Filter } from 'lucide-react';
import PageHeader from '../common/PageHeader';
import Modal from '../common/Modal';

const StatCard = ({ title, value, subtitle, icon: Icon, bgColor }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4"><div className={`p-3 rounded-xl ${bgColor}`}><Icon className="w-6 h-6 text-white" /></div></div>
    <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
    <div className="flex items-end gap-2 mt-1"><h2 className="text-3xl font-bold text-gray-900">{value}</h2>{subtitle && <span className="text-sm font-medium text-gray-400 mb-1">{subtitle}</span>}</div>
  </div>
);

const FinancialReports = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6 pb-12">
      <PageHeader title="Financial Reports" breadcrumbs={[{ name: 'Accounts' }, { name: 'Reports' }]} primaryAction={{ label: 'Custom Report', icon: Filter, onClick: () => setIsModalOpen(true) }} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Balance Sheet" value="Ready" icon={FileBarChart} bgColor="bg-blue-600" />
        <StatCard title="Cash Flow" value="Positive" icon={BarChart3} bgColor="bg-emerald-600" />
        <StatCard title="Tax Liability" value="Computed" icon={PieChart} bgColor="bg-amber-500" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group">
          <FileBarChart className="w-12 h-12 text-blue-500 mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-xl font-bold text-gray-900">Balance Sheet</h3>
          <p className="text-gray-500 mt-2 mb-6">A snapshot of assets, liabilities, and equity.</p>
          <button className="text-blue-600 font-bold hover:underline">Download PDF &rarr;</button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Custom Financial Report">
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label><select className="w-full border border-gray-200 rounded-lg p-2"><option>Comprehensive Financial Summary</option><option>Quarterly Projections</option></select></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label><input type="date" className="w-full border border-gray-200 rounded-lg p-2 mb-2" /><input type="date" className="w-full border border-gray-200 rounded-lg p-2" /></div>
          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg flex items-center justify-center gap-2"><Download className="w-4 h-4"/> Generate & Download</button>
        </form>
      </Modal>
    </div>
  );
};
export default FinancialReports;
