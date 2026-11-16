import React, { useState } from 'react';
import {
  Package, AlertTriangle, Search, Plus, X,
  CheckCircle2, Truck, ArrowRightLeft, DollarSign
} from 'lucide-react';

const INITIAL_PARTS = [
  {
    sku: 'PRT-FL3-1430',
    name: 'Paper Pick-Up & Feed Roller Set',
    category: 'Mechanical',
    models: 'Canon IR-ADV DX C3835i, 2630i, 4525',
    bin: 'Bay A-03, Rack 2',
    inStock: 48,
    minThreshold: 20,
    unitCost: 850,
    status: 'In Stock'
  },
  {
    sku: 'PRT-FM1-W154',
    name: 'Fuser Film Sleeve & Pressure Bushing',
    category: 'Mechanical',
    models: 'HP LaserJet Enterprise M607, M608, M635',
    bin: 'Bay B-01, Rack 1',
    inStock: 6,
    minThreshold: 12,
    unitCost: 3200,
    status: 'Low Stock'
  },
  {
    sku: 'PRT-TON-C3835-BK',
    name: 'GPR-53 Black High-Yield Toner Cartridge',
    category: 'Consumables',
    models: 'Canon IR-ADV C3325i, C3525i, C3835i',
    bin: 'Toner Vault T-12',
    inStock: 94,
    minThreshold: 30,
    unitCost: 4500,
    status: 'In Stock'
  },
  {
    sku: 'PRT-OPT-CCD-90',
    name: 'Optical Scanner CCD Mirror Array Assembly',
    category: 'Optics',
    models: 'Epson WorkForce WF-C20750, WF-C879R',
    bin: 'Optics Cabinet C-4',
    inStock: 2,
    minThreshold: 5,
    unitCost: 11800,
    status: 'Critical'
  },
  {
    sku: 'PRT-PCB-MAIN-88',
    name: 'DC Controller Logic Board Unit',
    category: 'Electronics',
    models: 'Kyocera TASKalfa 4054i, 5054i',
    bin: 'ESD Safe Locker E-02',
    inStock: 5,
    minThreshold: 4,
    unitCost: 16500,
    status: 'In Stock'
  },
  {
    sku: 'PRT-WST-BX-42',
    name: 'Waste Toner Box WT-860',
    category: 'Consumables',
    models: 'Canon IR 2520, 2630, 2930',
    bin: 'Toner Vault T-04',
    inStock: 8,
    minThreshold: 15,
    unitCost: 1250,
    status: 'Low Stock'
  }
];

const SpareParts = () => {
  const [parts, setParts] = useState(INITIAL_PARTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Modals
  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedPart, setSelectedPart] = useState(null);

  // Form states
  const [issueData, setIssueData] = useState({
    engineer: 'Rajesh Kumar (Gurugram)',
    ticketId: 'TKT-1045',
    qty: 1
  });

  const [orderQty, setOrderQty] = useState(10);

  const categories = ['All', 'Mechanical', 'Consumables', 'Electronics', 'Optics'];

  const filteredParts = parts.filter(p => {
    const matchesSearch =
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.models.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.bin.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = categoryFilter === 'All' || p.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const handleIssuePart = (e) => {
    e.preventDefault();
    if (!selectedPart) return;
    setParts(parts.map(p => {
      if (p.sku === selectedPart.sku) {
        const newStock = Math.max(0, p.inStock - Number(issueData.qty));
        let newStatus = 'In Stock';
        if (newStock === 0) newStatus = 'Critical';
        else if (newStock <= p.minThreshold) newStatus = 'Low Stock';
        return { ...p, inStock: newStock, status: newStatus };
      }
      return p;
    }));
    setIsIssueModalOpen(false);
    setSelectedPart(null);
  };

  const handleOrderPart = (e) => {
    e.preventDefault();
    if (!selectedPart) return;
    setParts(parts.map(p => {
      if (p.sku === selectedPart.sku) {
        const newStock = p.inStock + Number(orderQty);
        return { ...p, inStock: newStock, status: 'In Stock' };
      }
      return p;
    }));
    setIsOrderModalOpen(false);
    setSelectedPart(null);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'In Stock':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            In Stock
          </span>
        );
      case 'Low Stock':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            Low Stock
          </span>
        );
      case 'Critical':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
            Critical Order
          </span>
        );
    }
  };

  const totalInventoryValue = parts.reduce((acc, p) => acc + (p.inStock * p.unitCost), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Spare Parts & Inventory</h1>
            <p className="text-xs text-gray-500">Warehouse stock, engineer van parts issuance, and minimum reorder tracking.</p>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total SKUs</span>
          <div className="text-2xl font-black text-gray-900 mt-2">{parts.length}</div>
          <div className="text-xs text-indigo-600 font-medium mt-1">Across 4 hardware brands</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Low Stock Warnings</span>
          <div className="text-2xl font-black text-amber-600 mt-2">
            {parts.filter(p => p.status === 'Low Stock' || p.status === 'Critical').length}
          </div>
          <div className="text-xs text-amber-600 font-medium mt-1">Below safe buffer limits</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Inventory Valuation</span>
          <div className="text-2xl font-black text-gray-900 mt-2">₹{(totalInventoryValue / 100000).toFixed(2)}L</div>
          <div className="text-xs text-emerald-600 font-medium mt-1">At wholesale landed cost</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Issued to Vans</span>
          <div className="text-2xl font-black text-blue-600 mt-2">28 units</div>
          <div className="text-xs text-gray-500 font-medium mt-1">Field service mobile stock</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
          <div className="relative w-full lg:w-96">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search SKU, part name, model, bin..."
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto pb-1">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategoryFilter(c)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  categoryFilter === c
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Parts Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[850px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <th className="py-4 px-6">Part SKU & Name</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Compatible Machines</th>
                <th className="py-4 px-6">Bin Location</th>
                <th className="py-4 px-6">Stock Level</th>
                <th className="py-4 px-6">Unit Cost</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredParts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-400">
                    No spare parts found matching query.
                  </td>
                </tr>
              ) : (
                filteredParts.map((p) => (
                  <tr key={p.sku} className="hover:bg-gray-50/70 transition-colors">
                    {/* SKU & Name */}
                    <td className="py-4 px-6">
                      <div className="font-bold text-gray-900 text-xs">{p.name}</div>
                      <div className="text-[11px] font-mono text-indigo-600 mt-0.5">{p.sku}</div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-6">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-700">
                        {p.category}
                      </span>
                    </td>

                    {/* Models */}
                    <td className="py-4 px-6">
                      <div className="text-xs text-gray-700 max-w-xs truncate" title={p.models}>
                        {p.models}
                      </div>
                    </td>

                    {/* Bin */}
                    <td className="py-4 px-6">
                      <span className="text-xs font-mono font-medium text-gray-600 bg-gray-50 px-2 py-1 rounded">
                        {p.bin}
                      </span>
                    </td>

                    {/* Stock Level */}
                    <td className="py-4 px-6">
                      <div className="font-bold text-gray-900 text-xs">
                        {p.inStock} <span className="text-gray-400 font-normal">/ min {p.minThreshold}</span>
                      </div>
                      <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden mt-1">
                        <div
                          className={`h-full rounded-full ${
                            p.inStock <= p.minThreshold / 2
                              ? 'bg-rose-500'
                              : p.inStock <= p.minThreshold
                              ? 'bg-amber-500'
                              : 'bg-emerald-500'
                          }`}
                          style={{ width: `${Math.min((p.inStock / (p.minThreshold * 2)) * 100, 100)}%` }}
                        />
                      </div>
                    </td>

                    {/* Unit Cost */}
                    <td className="py-4 px-6">
                      <span className="text-xs font-bold text-gray-800">₹{p.unitCost.toLocaleString()}</span>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-6">
                      {getStatusBadge(p.status)}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      <button
                        onClick={() => {
                          setSelectedPart(p);
                          setIsIssueModalOpen(true);
                        }}
                        className="px-2.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-xs font-bold transition-colors cursor-pointer mr-1.5"
                        title="Issue part to field technician"
                      >
                        Issue
                      </button>
                      <button
                        onClick={() => {
                          setSelectedPart(p);
                          setIsOrderModalOpen(true);
                        }}
                        className="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                        title="Reorder stock"
                      >
                        Restock
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Issue to Technician Modal */}
      {isIssueModalOpen && selectedPart && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 space-y-4">
            <div className="flex justify-between items-start border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <ArrowRightLeft className="w-5 h-5 text-indigo-600" />
                <h3 className="text-base font-bold text-gray-900">Issue Part to Technician</h3>
              </div>
              <button onClick={() => setIsIssueModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-gray-50 p-3 rounded-xl text-xs space-y-1">
              <div className="font-bold text-gray-900">{selectedPart.name}</div>
              <div className="text-gray-500 font-mono">{selectedPart.sku} • Available: {selectedPart.inStock} units</div>
            </div>

            <form onSubmit={handleIssuePart} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">Select Field Engineer *</label>
                <select
                  value={issueData.engineer}
                  onChange={(e) => setIssueData({ ...issueData, engineer: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-white"
                >
                  <option value="Rajesh Kumar (Gurugram)">Rajesh Kumar (Gurugram)</option>
                  <option value="Amit Vikram Singh (Delhi)">Amit Vikram Singh (Delhi)</option>
                  <option value="Sunil Verma (Noida)">Sunil Verma (Noida)</option>
                  <option value="Pooja Rawat (West Delhi)">Pooja Rawat (West Delhi)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">Ticket Reference ID</label>
                  <input
                    type="text"
                    required
                    value={issueData.ticketId}
                    onChange={(e) => setIssueData({ ...issueData, ticketId: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    max={selectedPart.inStock}
                    value={issueData.qty}
                    onChange={(e) => setIssueData({ ...issueData, qty: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsIssueModalOpen(false)}
                  className="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm"
                >
                  <Truck className="w-4 h-4" />
                  Confirm Issue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Restock PO Modal */}
      {isOrderModalOpen && selectedPart && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 space-y-4">
            <div className="flex justify-between items-start border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-bold text-gray-900">Restock Purchase Order</h3>
              </div>
              <button onClick={() => setIsOrderModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-emerald-50 p-3 rounded-xl text-xs space-y-1">
              <div className="font-bold text-emerald-900">{selectedPart.name}</div>
              <div className="text-emerald-700 font-mono">Current Stock: {selectedPart.inStock} • Unit Cost: ₹{selectedPart.unitCost}</div>
            </div>

            <form onSubmit={handleOrderPart} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">Restock Quantity</label>
                <input
                  type="number"
                  min="5"
                  value={orderQty}
                  onChange={(e) => setOrderQty(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>

              <div className="p-3 bg-gray-50 rounded-xl text-xs flex justify-between font-semibold">
                <span className="text-gray-600">Total Purchase Value:</span>
                <span className="text-gray-900">₹{(orderQty * selectedPart.unitCost).toLocaleString()}</span>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsOrderModalOpen(false)}
                  className="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  Create PO & Add Stock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpareParts;
