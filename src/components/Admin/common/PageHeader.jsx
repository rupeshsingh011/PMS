import React from 'react';

const PageHeader = ({ title, breadcrumbs, primaryAction, children }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">{title}</h1>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex text-sm text-gray-500 mt-1.5 font-medium">
            {breadcrumbs.map((crumb, index) => (
              <span key={index} className="flex items-center">
                {index > 0 && <span className="mx-2 text-gray-400">/</span>}
                <span className={index === breadcrumbs.length - 1 ? "text-blue-600 font-semibold" : "hover:text-gray-700 transition-colors"}>
                  {crumb.name}
                </span>
              </span>
            ))}
          </nav>
        )}
      </div>
      
      <div className="flex items-center gap-3">
        {children}
        {primaryAction && (
          <button
            onClick={primaryAction.onClick}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 active:translate-y-0"
          >
            {primaryAction.icon && <primaryAction.icon className="w-4 h-4" />}
            {primaryAction.label}
          </button>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
