# Responsive Design Guidelines & Architecture Standards

> **MANDATORY POLICY FOR PMS**: Every new page, feature, modal, table, and dashboard component in this project **MUST** be fully responsive across Mobile (320px – 640px), Tablet (641px – 1023px), and Desktop (1024px+).

---

## 1. Core Principles

1. **Mobile-First Thinking**: Start with single-column stacked layouts, then progressively enhance for larger viewports (`sm:`, `md:`, `lg:`, `xl:`).
2. **Never Allow Horizontal Overflow**: The viewport width (`100vw`) must never be broken by fixed widths (`w-[600px]`), uncontained tables, or nowrap flex items.
3. **Adaptive Margins**: When the sidebar collapses, layouts dynamically expand (`max-w-[1720px] mx-auto`) with reduced horizontal padding (`lg:px-4`) to make optimal use of screen real estate.

---

## 2. Standard Responsive Patterns

### A. Page Headers & Action Bars
Headers must wrap gracefully on small screens rather than forcing horizontal scroll.

```jsx
{/* ✅ CORRECT: Responsive header with wrapping */}
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
  <div>
    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Page Title</h1>
    <p className="text-xs sm:text-sm text-gray-500">Subtitle or contextual summary</p>
  </div>
  
  <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
    <button className="flex-1 sm:flex-none ...">Action 1</button>
    <button className="flex-1 sm:flex-none ...">Action 2</button>
  </div>
</div>
```

---

### B. KPI & Metric Card Grids
Always scale from 1 column on mobile to 2 or 4 on desktop.

```jsx
{/* ✅ Metric cards grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  <MetricCard ... />
  <MetricCard ... />
  <MetricCard ... />
  <MetricCard ... />
</div>
```

---

### C. Data Tables & Ledgers
**CRITICAL RULE**: Every table must be enclosed in an `overflow-x-auto` wrapper with `whitespace-nowrap` on headers and critical cell contents.

```jsx
{/* ✅ CORRECT: Always wrap tables in overflow-x-auto */}
<div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
  <div className="p-4 sm:p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
    <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Table Title</h3>
  </div>
  
  <div className="overflow-x-auto">
    <table className="w-full text-left text-sm">
      <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
        <tr>
          <th className="px-5 py-4 font-semibold whitespace-nowrap">Column 1</th>
          <th className="px-5 py-4 font-semibold whitespace-nowrap">Column 2</th>
          <th className="px-5 py-4 font-semibold whitespace-nowrap">Status</th>
          <th className="px-5 py-4 font-semibold whitespace-nowrap text-right">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {data.map(item => (
          <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
            <td className="px-5 py-4 whitespace-nowrap">{item.name}</td>
            <td className="px-5 py-4 whitespace-nowrap">{item.val}</td>
            <td className="px-5 py-4 whitespace-nowrap"><Badge /></td>
            <td className="px-5 py-4 whitespace-nowrap text-right"><Buttons /></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
```

---

### D. Modals & Dialogs
Use `components/common/Modal.jsx` or apply this responsive modal wrapper:

```jsx
{/* ✅ CORRECT: Responsive modal */}
<div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-3 sm:p-4 animate-fade-in">
  <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[92vh] flex flex-col overflow-hidden border border-gray-100">
    <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
      <h3 className="font-bold text-gray-900">Modal Header</h3>
      <button onClick={onClose}>&times;</button>
    </div>
    <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
      {/* Scrollable content on mobile */}
    </div>
  </div>
</div>
```

---

### E. Search & Filter Toolbars
Inputs and filters should stack vertically on small mobile viewports and expand horizontally on tablet/desktop.

```jsx
{/* ✅ Responsive search and filter bar */}
<div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
  <div className="relative flex-1 max-w-full sm:max-w-md">
    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
    <input type="text" placeholder="Search..." className="w-full pl-9 pr-4 py-2 border rounded-xl text-sm" />
  </div>
  
  <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
    <select className="px-3 py-2 border rounded-xl text-sm ...">...</select>
    <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold shrink-0">Apply</button>
  </div>
</div>
```

---

### F. Multi-Step / Tab Navigations
Tab strips should scroll horizontally without breaking on narrow mobile screens:

```jsx
{/* ✅ Responsive horizontal tab navigation */}
<div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-gray-200 custom-scrollbar">
  {tabs.map(tab => (
    <button key={tab.id} className="whitespace-nowrap px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold ...">
      {tab.label}
    </button>
  ))}
</div>
```

---

## 3. Checklist for Any New Page

Before completing any new page in the PMS project, verify:
- [ ] Header stacks and wraps cleanly on 360px viewport.
- [ ] No horizontal window scrollbar (`100vw`) on mobile.
- [ ] All data tables wrapped in `<div className="overflow-x-auto">`.
- [ ] Grids use `grid-cols-1 sm:grid-cols-2 lg:grid-cols-...`.
- [ ] Modals and slide-overs have `max-h-[90vh]` and `overflow-y-auto`.
- [ ] Buttons and form elements have `w-full sm:w-auto` or `max-w-full`.
- [ ] Images and icons do not distort on small viewports (`shrink-0`).
- [ ] `npm run build` and `npx oxlint` pass with 0 errors.

