import React, { useState, useRef } from 'react';
import {
  Printer, Upload, X, CheckCircle, Save, RotateCcw, XCircle,
  Info, ShoppingCart, MapPin, Wifi, Cpu, Package, Shield,
  Settings, FileText, StickyNote, Bell, Image as ImageIcon,
  ChevronDown, AlertCircle, FileCheck, BookOpen, FileImage,
  Wrench, FileCog, ReceiptText
} from 'lucide-react';

// ─── Reusable Form Primitives ──────────────────────────────────────────────────

const SectionHeader = ({ icon: Icon, title, subtitle, color = 'indigo' }) => {
  const colors = {
    indigo: 'bg-indigo-600',
    blue: 'bg-blue-600',
    emerald: 'bg-emerald-600',
    violet: 'bg-violet-600',
    amber: 'bg-amber-600',
    rose: 'bg-rose-600',
    teal: 'bg-teal-600',
    orange: 'bg-orange-600',
    sky: 'bg-sky-600',
    slate: 'bg-slate-600',
    purple: 'bg-purple-600',
    cyan: 'bg-cyan-600',
  };
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className={`${colors[color] || 'bg-indigo-600'} p-2 rounded-xl`}>
        <Icon className="w-4 h-4 text-white" />
      </div>
      <div>
        <h3 className="text-base font-bold text-gray-900">{title}</h3>
        {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
};

const FormCard = ({ children, className = '', id }) => (
  <div id={id} className={`bg-white rounded-2xl border border-gray-200 shadow-sm p-6 ${className}`}>
    {children}
  </div>
);

const FormRow = ({ children, cols = 2 }) => (
  <div className={`grid grid-cols-1 ${cols === 3 ? 'md:grid-cols-3' : cols === 4 ? 'md:grid-cols-4' : 'md:grid-cols-2'} gap-x-6 gap-y-4`}>
    {children}
  </div>
);

const Label = ({ children, required }) => (
  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
    {children}
    {required && <span className="text-red-500 ml-1">*</span>}
  </label>
);

const inputClass = "w-full px-3.5 py-2.5 text-sm text-gray-900 bg-white border border-gray-300 rounded-xl outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 placeholder-gray-400 hover:border-gray-400";
const selectClass = `${inputClass} appearance-none cursor-pointer`;

const TextInput = ({ label, required, placeholder, value, onChange, name, type = 'text', icon }) => (
  <div>
    <Label required={required}>{label}</Label>
    <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder || `Enter ${label?.toLowerCase()}`}
        className={`${inputClass} ${icon ? 'pl-10' : ''}`}
      />
      {icon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          {icon}
        </span>
      )}
    </div>
  </div>
);

const SelectInput = ({ label, required, options, value, onChange, name }) => (
  <div>
    <Label required={required}>{label}</Label>
    <div className="relative">
      <select name={name} value={value} onChange={onChange} className={selectClass}>
        <option value="">Select {label}</option>
        {options.map(o => (
          <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
    </div>
  </div>
);

const DateInput = ({ label, required, value, onChange, name }) => (
  <div>
    <Label required={required}>{label}</Label>
    <input
      type="date"
      name={name}
      value={value}
      onChange={onChange}
      className={inputClass}
    />
  </div>
);

const CheckboxField = ({ label, checked, onChange, name, description }) => (
  <label className="flex items-start gap-3 cursor-pointer group">
    <div className="relative mt-0.5">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="sr-only peer"
      />
      <div className="w-5 h-5 border-2 border-gray-300 rounded-md peer-checked:bg-indigo-600 peer-checked:border-indigo-600 transition-all group-hover:border-indigo-400 flex items-center justify-center">
        {checked && <CheckCircle className="w-3.5 h-3.5 text-white fill-white" />}
      </div>
    </div>
    <div>
      <span className="text-sm font-medium text-gray-800 group-hover:text-indigo-700 transition-colors">{label}</span>
      {description && <p className="text-xs text-gray-400 mt-0.5">{description}</p>}
    </div>
  </label>
);

const RadioGroup = ({ label, required, options, value, onChange, name }) => (
  <div>
    <Label required={required}>{label}</Label>
    <div className="flex flex-wrap gap-4 pt-1">
      {options.map(opt => (
        <label key={opt.value} className="flex items-center gap-2 cursor-pointer group">
          <div className="relative">
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={onChange}
              className="sr-only peer"
            />
            <div className="w-5 h-5 rounded-full border-2 border-gray-300 peer-checked:border-indigo-600 transition-all group-hover:border-indigo-400 flex items-center justify-center">
              {value === opt.value && <div className="w-2.5 h-2.5 rounded-full bg-indigo-600" />}
            </div>
          </div>
          <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-700 transition-colors">{opt.label}</span>
        </label>
      ))}
    </div>
  </div>
);

const CheckboxGroup = ({ label, required, options, values, onChange }) => (
  <div>
    <Label required={required}>{label}</Label>
    <div className="flex flex-wrap gap-4 pt-1">
      {options.map(opt => (
        <label key={opt.value} className="flex items-center gap-2 cursor-pointer group">
          <div className="relative">
            <input
              type="checkbox"
              checked={values.includes(opt.value)}
              onChange={() => onChange(opt.value)}
              className="sr-only peer"
            />
            <div className="w-5 h-5 border-2 border-gray-300 rounded-md peer-checked:bg-indigo-600 peer-checked:border-indigo-600 transition-all group-hover:border-indigo-400 flex items-center justify-center">
              {values.includes(opt.value) && <CheckCircle className="w-3.5 h-3.5 text-white fill-white" />}
            </div>
          </div>
          <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-700 transition-colors">{opt.label}</span>
        </label>
      ))}
    </div>
  </div>
);

const Divider = ({ label }) => (
  <div className="flex items-center gap-3 my-5">
    <div className="flex-1 h-px bg-gray-100" />
    {label && <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider whitespace-nowrap">{label}</span>}
    <div className="flex-1 h-px bg-gray-100" />
  </div>
);

// ─── Document Upload Row ───────────────────────────────────────────────────────
const DocumentUpload = ({ label, icon: Icon, name, file, onChange, onClear, accept = '*' }) => {
  const ref = useRef();
  return (
    <div className="flex items-center justify-between p-3.5 rounded-xl border border-dashed border-gray-300 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all group">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
          <Icon className="w-4 h-4 text-indigo-500" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-700">{label}</p>
          {file
            ? <p className="text-xs text-indigo-600 mt-0.5 truncate max-w-xs">{file.name}</p>
            : <p className="text-xs text-gray-400 mt-0.5">No file chosen — click to upload</p>}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {file && (
          <button
            type="button"
            onClick={onClear}
            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        <button
          type="button"
          onClick={() => ref.current?.click()}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition-colors"
        >
          <Upload className="w-3.5 h-3.5" />
          {file ? 'Change' : 'Upload'}
        </button>
        <input ref={ref} type="file" name={name} accept={accept} className="hidden" onChange={onChange} />
      </div>
    </div>
  );
};

// ─── Image Upload Zone ─────────────────────────────────────────────────────────
const ImageUploadZone = ({ preview, onFileChange, onClear }) => {
  const ref = useRef();
  return (
    <div>
      {preview ? (
        <div className="relative inline-block">
          <img src={preview} alt="Printer preview" className="w-40 h-40 object-cover rounded-2xl border-2 border-indigo-200 shadow-md" />
          <button
            type="button"
            onClick={onClear}
            className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-md transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => ref.current?.click()}
          className="w-full h-44 border-2 border-dashed border-gray-300 hover:border-indigo-400 hover:bg-indigo-50/40 rounded-2xl flex flex-col items-center justify-center gap-3 transition-all group"
        >
          <div className="w-14 h-14 bg-indigo-50 group-hover:bg-indigo-100 rounded-2xl flex items-center justify-center transition-colors">
            <ImageIcon className="w-7 h-7 text-indigo-400 group-hover:text-indigo-600 transition-colors" />
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-gray-700 group-hover:text-indigo-700 transition-colors">Click to upload printer image</p>
            <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP — max 5 MB</p>
          </div>
        </button>
      )}
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={onFileChange} />
    </div>
  );
};

// ─── Toggle Switch ─────────────────────────────────────────────────────────────
const ToggleSwitch = ({ label, checked, onChange, name, description }) => (
  <label className="flex items-start justify-between gap-4 cursor-pointer group py-1">
    <div>
      <span className="text-sm font-semibold text-gray-800 group-hover:text-indigo-700 transition-colors">{label}</span>
      {description && <p className="text-xs text-gray-400 mt-0.5">{description}</p>}
    </div>
    <div className="relative shrink-0 mt-0.5">
      <input type="checkbox" name={name} checked={checked} onChange={onChange} className="sr-only peer" />
      <div className="w-10 h-5 bg-gray-200 peer-checked:bg-indigo-600 rounded-full transition-colors" />
      <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform peer-checked:translate-x-5" />
    </div>
  </label>
);

// ─── Main Component ────────────────────────────────────────────────────────────
const INITIAL = {
  // Image
  printerImage: null,
  printerImagePreview: null,

  // General
  printerName: '', assetId: '', printerCode: '', brand: '', model: '',
  serialNumber: '', printerType: '', functions: [], colorType: 'monochrome', status: 'active',

  // Purchase
  purchaseDate: '', purchaseCost: '', purchaseOrderNo: '', invoiceNumber: '',
  vendorName: '', supplier: '', manufacturer: '', countryOfOrigin: '',

  // Installation
  installationDate: '', installedBy: '', department: '', branch: '',
  building: '', floor: '', roomNumber: '', location: '', assignedUser: '',

  // Network
  hostName: '', ipAddress: '', macAddress: '', subnetMask: '',
  gateway: '', dnsServer: '', connectionType: '', driverVersion: '', firmwareVersion: '',

  // Hardware
  processor: '', ram: '', storage: '', monthlyDutyCycle: '',
  printResolution: '', printSpeed: '', paperTrayCapacity: '',
  paperSize: '', duplexPrinting: false, usbPort: false,
  ethernetPort: false, wifi: false, bluetooth: false,

  // Consumables
  blackToner: '', cyanToner: '', magentaToner: '', yellowToner: '',
  drumUnit: '', fuserUnit: '', transferBelt: '', wasteToner: '', rollerKit: '',

  // Warranty
  warrantyNumber: '', warrantyProvider: '', warrantyStartDate: '',
  warrantyEndDate: '', warrantyType: '', coverageDetails: '',
  amcAvailable: false, amcProvider: '', amcStartDate: '', amcEndDate: '',

  // Default Config
  defaultPaperSize: '', printQuality: '', defaultColorMode: '',
  autoSleep: false, autoPowerOff: false, securePrinting: false, pinProtection: false,

  // Documents
  docs: {
    invoice: null, warrantyCert: null, userManual: null,
    installReport: null, configFile: null, images: null,
  },

  // Notes
  internalNotes: '',

  // System
  activePrinter: true, remoteMonitoring: false, emailAlerts: false,
  maintenanceReminder: true, lowTonerNotification: true, errorNotification: true,
};

const AddPrinter = () => {
  const [form, setForm] = useState(INITIAL);
  const [saved, setSaved] = useState(false);

  const set = (name, value) => setForm(prev => ({ ...prev, [name]: value }));
  const handle = e => set(e.target.name, e.target.type === 'checkbox' ? e.target.checked : e.target.value);

  const toggleFunction = (val) =>
    setForm(prev => ({
      ...prev,
      functions: prev.functions.includes(val)
        ? prev.functions.filter(f => f !== val)
        : [...prev.functions, val],
    }));

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setForm(prev => ({
      ...prev, printerImage: file,
      printerImagePreview: URL.createObjectURL(file),
    }));
  };

  const handleDocChange = (key) => (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setForm(prev => ({ ...prev, docs: { ...prev.docs, [key]: file } }));
  };

  const clearDoc = (key) =>
    setForm(prev => ({ ...prev, docs: { ...prev.docs, [key]: null } }));

  const handleReset = () => setForm(INITIAL);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 pb-8">

      {/* ── Page Title Banner ── */}
      <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-violet-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <Printer className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Add New Printer</h1>
            <p className="text-indigo-100 text-sm mt-1">Register a new printer with complete configuration details</p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-indigo-100">
          {[
            { label: 'Image',        id: 'sec-image'       },
            { label: 'General Info', id: 'sec-general'     },
            { label: 'Purchase',     id: 'sec-purchase'    },
            { label: 'Installation', id: 'sec-install'     },
            { label: 'Network',      id: 'sec-network'     },
            { label: 'Hardware',     id: 'sec-hardware'    },
            { label: 'Consumables',  id: 'sec-consumables' },
            { label: 'Warranty',     id: 'sec-warranty'    },
            { label: 'Config',       id: 'sec-config'      },
            { label: 'Documents',    id: 'sec-documents'   },
            { label: 'Notes',        id: 'sec-notes'       },
            { label: 'System',       id: 'sec-system'      },
          ].map(({ label, id }) => (
            <button
              key={id}
              type="button"
              onClick={() => scrollTo(id)}
              className="bg-white/15 px-3 py-1 rounded-full hover:bg-white/30 transition-colors cursor-pointer"
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Success Toast ── */}
      {saved && (
        <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl animate-fade-in">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="font-semibold text-sm">Printer saved successfully!</span>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          1. PRINTER IMAGE
      ══════════════════════════════════════════════════════════════ */}
      <FormCard id="sec-image">
        <SectionHeader icon={ImageIcon} title="Printer Image" subtitle="Upload a photo of the printer for identification" color="indigo" />
        <ImageUploadZone
          preview={form.printerImagePreview}
          onFileChange={handleImageChange}
          onClear={() => setForm(prev => ({ ...prev, printerImage: null, printerImagePreview: null }))}
        />
      </FormCard>

      {/* ══════════════════════════════════════════════════════════════
          2. GENERAL INFORMATION
      ══════════════════════════════════════════════════════════════ */}
      <FormCard id="sec-general">
        <SectionHeader icon={Info} title="General Information" subtitle="Core identification details of the printer" color="indigo" />
        <FormRow>
          <TextInput label="Printer Name" name="printerName" value={form.printerName} onChange={handle} required placeholder="e.g. HP LaserJet MFP M430f" />
          <TextInput label="Asset ID" name="assetId" value={form.assetId} onChange={handle} required placeholder="e.g. AST-000125" />
          <TextInput label="Printer Code" name="printerCode" value={form.printerCode} onChange={handle} placeholder="e.g. PRT-2025-001" />
          <SelectInput
            label="Brand" name="brand" required value={form.brand} onChange={handle}
            options={['HP', 'Canon', 'Epson', 'Brother', 'Ricoh', 'Kyocera', 'Xerox', 'Lexmark', 'Samsung', 'Konica Minolta', 'Sharp', 'OKI', 'Pantum', 'Fujifilm']}
          />
          <TextInput label="Model" name="model" value={form.model} onChange={handle} required placeholder="e.g. M430f" />
          <TextInput label="Serial Number" name="serialNumber" value={form.serialNumber} onChange={handle} required placeholder="e.g. CNB3G17492" />
          <SelectInput
            label="Printer Type" name="printerType" required value={form.printerType} onChange={handle}
            options={[
              { value: 'laser', label: 'Laser' },
              { value: 'inkjet', label: 'Inkjet' },
              { value: 'dot-matrix', label: 'Dot Matrix' },
              { value: 'thermal', label: 'Thermal' },
              { value: 'led', label: 'LED' },
              { value: 'solid-ink', label: 'Solid Ink' },
            ]}
          />
          <SelectInput
            label="Status" name="status" required value={form.status} onChange={handle}
            options={[
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' },
              { value: 'maintenance', label: 'Under Maintenance' },
              { value: 'decommissioned', label: 'Decommissioned' },
              { value: 'spare', label: 'Spare / Stock' },
            ]}
          />
        </FormRow>
        <Divider />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CheckboxGroup
            label="Functions" required
            options={[
              { value: 'print', label: 'Print' },
              { value: 'scan', label: 'Scan' },
              { value: 'copy', label: 'Copy' },
              { value: 'fax', label: 'Fax' },
            ]}
            values={form.functions}
            onChange={toggleFunction}
          />
          <RadioGroup
            label="Color Type" required name="colorType"
            value={form.colorType} onChange={handle}
            options={[
              { value: 'color', label: 'Color' },
              { value: 'monochrome', label: 'Monochrome' },
              { value: 'both', label: 'Color + Mono' },
            ]}
          />
        </div>
      </FormCard>

      {/* ══════════════════════════════════════════════════════════════
          3. PURCHASE INFORMATION
      ══════════════════════════════════════════════════════════════ */}
      <FormCard id="sec-purchase">
        <SectionHeader icon={ShoppingCart} title="Purchase Information" subtitle="Procurement and vendor details" color="blue" />
        <FormRow>
          <DateInput label="Purchase Date" name="purchaseDate" value={form.purchaseDate} onChange={handle} required />
          <TextInput label="Purchase Cost (₹)" name="purchaseCost" value={form.purchaseCost} onChange={handle} placeholder="e.g. 45000" />
          <TextInput label="Purchase Order No." name="purchaseOrderNo" value={form.purchaseOrderNo} onChange={handle} placeholder="e.g. PO-2025-0048" />
          <TextInput label="Invoice Number" name="invoiceNumber" value={form.invoiceNumber} onChange={handle} placeholder="e.g. INV-2025-1234" />
          <TextInput label="Vendor Name" name="vendorName" value={form.vendorName} onChange={handle} required placeholder="e.g. ABC Technologies" />
          <TextInput label="Supplier" name="supplier" value={form.supplier} onChange={handle} placeholder="e.g. HP Authorized Dealer" />
          <TextInput label="Manufacturer" name="manufacturer" value={form.manufacturer} onChange={handle} placeholder="e.g. HP Inc." />
          <TextInput label="Country of Origin" name="countryOfOrigin" value={form.countryOfOrigin} onChange={handle} placeholder="e.g. USA" />
        </FormRow>
      </FormCard>

      {/* ══════════════════════════════════════════════════════════════
          4. INSTALLATION DETAILS
      ══════════════════════════════════════════════════════════════ */}
      <FormCard id="sec-install">
        <SectionHeader icon={MapPin} title="Installation Details" subtitle="Deployment location and assignment information" color="emerald" />
        <FormRow>
          <DateInput label="Installation Date" name="installationDate" value={form.installationDate} onChange={handle} required />
          <TextInput label="Installed By" name="installedBy" value={form.installedBy} onChange={handle} placeholder="e.g. Raj Kumar" />
          <SelectInput
            label="Department" name="department" required value={form.department} onChange={handle}
            options={['Accounts', 'HR', 'Admin', 'IT', 'Operations', 'Sales', 'Purchase', 'Legal', 'Marketing', 'Design', 'Finance', 'Logistics', 'Management']}
          />
          <SelectInput
            label="Branch" name="branch" value={form.branch} onChange={handle}
            options={['Head Office', 'Branch - Mumbai', 'Branch - Delhi', 'Branch - Chennai', 'Branch - Bengaluru', 'Branch - Hyderabad', 'Branch - Pune', 'Branch - Kolkata']}
          />
          <TextInput label="Building" name="building" value={form.building} onChange={handle} placeholder="e.g. Main Building" />
          <TextInput label="Floor" name="floor" value={form.floor} onChange={handle} placeholder="e.g. Floor 2" />
          <TextInput label="Room Number" name="roomNumber" value={form.roomNumber} onChange={handle} placeholder="e.g. Room 205" />
          <TextInput label="Location Description" name="location" value={form.location} onChange={handle} placeholder="e.g. Near reception desk" />
          <TextInput label="Assigned User" name="assignedUser" value={form.assignedUser} onChange={handle} placeholder="e.g. John Doe" />
        </FormRow>
      </FormCard>

      {/* ══════════════════════════════════════════════════════════════
          5. NETWORK CONFIGURATION
      ══════════════════════════════════════════════════════════════ */}
      <FormCard id="sec-network">
        <SectionHeader icon={Wifi} title="Network Configuration" subtitle="Network settings and connectivity details" color="violet" />
        <FormRow>
          <TextInput label="Host Name" name="hostName" value={form.hostName} onChange={handle} placeholder="e.g. HP-M430F-25" />
          <TextInput label="IP Address" name="ipAddress" value={form.ipAddress} onChange={handle} placeholder="e.g. 192.168.1.25" />
          <TextInput label="MAC Address" name="macAddress" value={form.macAddress} onChange={handle} placeholder="e.g. 00:1B:44:11:3A:B7" />
          <TextInput label="Subnet Mask" name="subnetMask" value={form.subnetMask} onChange={handle} placeholder="e.g. 255.255.255.0" />
          <TextInput label="Default Gateway" name="gateway" value={form.gateway} onChange={handle} placeholder="e.g. 192.168.1.1" />
          <TextInput label="DNS Server" name="dnsServer" value={form.dnsServer} onChange={handle} placeholder="e.g. 8.8.8.8" />
          <SelectInput
            label="Connection Type" name="connectionType" value={form.connectionType} onChange={handle}
            options={[
              { value: 'ethernet', label: 'Ethernet (Wired)' },
              { value: 'wifi', label: 'Wi-Fi (Wireless)' },
              { value: 'usb', label: 'USB Direct' },
              { value: 'bluetooth', label: 'Bluetooth' },
              { value: 'cloud', label: 'Cloud / AirPrint' },
            ]}
          />
          <TextInput label="Driver Version" name="driverVersion" value={form.driverVersion} onChange={handle} placeholder="e.g. Universal PCL6" />
          <TextInput label="Firmware Version" name="firmwareVersion" value={form.firmwareVersion} onChange={handle} placeholder="e.g. v4.5.2" />
        </FormRow>
      </FormCard>

      {/* ══════════════════════════════════════════════════════════════
          6. HARDWARE SPECIFICATIONS
      ══════════════════════════════════════════════════════════════ */}
      <FormCard id="sec-hardware">
        <SectionHeader icon={Cpu} title="Hardware Specifications" subtitle="Technical capabilities and hardware features" color="amber" />
        <FormRow>
          <TextInput label="Processor" name="processor" value={form.processor} onChange={handle} placeholder="e.g. 800 MHz" />
          <TextInput label="RAM" name="ram" value={form.ram} onChange={handle} placeholder="e.g. 256 MB" />
          <TextInput label="Storage" name="storage" value={form.storage} onChange={handle} placeholder="e.g. 8 GB eMMC" />
          <TextInput label="Monthly Duty Cycle" name="monthlyDutyCycle" value={form.monthlyDutyCycle} onChange={handle} placeholder="e.g. 80,000 pages/month" />
          <TextInput label="Print Resolution" name="printResolution" value={form.printResolution} onChange={handle} placeholder="e.g. 1200 x 1200 dpi" />
          <TextInput label="Print Speed (PPM)" name="printSpeed" value={form.printSpeed} onChange={handle} placeholder="e.g. 40 ppm" />
          <TextInput label="Paper Tray Capacity" name="paperTrayCapacity" value={form.paperTrayCapacity} onChange={handle} placeholder="e.g. 500 sheets" />
          <SelectInput
            label="Paper Size Support" name="paperSize" value={form.paperSize} onChange={handle}
            options={['A4', 'A3', 'A5', 'Letter', 'Legal', 'B5', 'Executive', 'Custom']}
          />
        </FormRow>
        <Divider label="Connectivity & Features" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          <CheckboxField label="Duplex Printing" name="duplexPrinting" checked={form.duplexPrinting} onChange={handle} description="Auto double-sided" />
          <CheckboxField label="USB Port" name="usbPort" checked={form.usbPort} onChange={handle} description="USB available" />
          <CheckboxField label="Ethernet Port" name="ethernetPort" checked={form.ethernetPort} onChange={handle} description="RJ-45 port" />
          <CheckboxField label="Wi-Fi" name="wifi" checked={form.wifi} onChange={handle} description="Wireless support" />
          <CheckboxField label="Bluetooth" name="bluetooth" checked={form.bluetooth} onChange={handle} description="BT connectivity" />
        </div>
      </FormCard>

      {/* ══════════════════════════════════════════════════════════════
          7. CONSUMABLES
      ══════════════════════════════════════════════════════════════ */}
      <FormCard id="sec-consumables">
        <SectionHeader icon={Package} title="Consumables" subtitle="Toner, ink, and replaceable component part numbers" color="rose" />
        <FormRow cols={3}>
          <TextInput label="Black Toner Part No." name="blackToner" value={form.blackToner} onChange={handle} placeholder="e.g. CF237A" />
          <TextInput label="Cyan Toner Part No." name="cyanToner" value={form.cyanToner} onChange={handle} placeholder="e.g. CF311A" />
          <TextInput label="Magenta Toner Part No." name="magentaToner" value={form.magentaToner} onChange={handle} placeholder="e.g. CF313A" />
          <TextInput label="Yellow Toner Part No." name="yellowToner" value={form.yellowToner} onChange={handle} placeholder="e.g. CF312A" />
          <TextInput label="Drum Unit Part No." name="drumUnit" value={form.drumUnit} onChange={handle} placeholder="e.g. CF234A" />
          <TextInput label="Fuser Unit Part No." name="fuserUnit" value={form.fuserUnit} onChange={handle} placeholder="e.g. RM2-5425" />
          <TextInput label="Transfer Belt Part No." name="transferBelt" value={form.transferBelt} onChange={handle} placeholder="e.g. RM2-6435" />
          <TextInput label="Waste Toner Container" name="wasteToner" value={form.wasteToner} onChange={handle} placeholder="e.g. WT-890" />
          <TextInput label="Roller Kit Part No." name="rollerKit" value={form.rollerKit} onChange={handle} placeholder="e.g. CF054A" />
        </FormRow>
      </FormCard>

      {/* ══════════════════════════════════════════════════════════════
          8. WARRANTY & AMC
      ══════════════════════════════════════════════════════════════ */}
      <FormCard id="sec-warranty">
        <SectionHeader icon={Shield} title="Warranty & AMC" subtitle="Coverage dates, provider and contract details" color="teal" />

        {/* Warranty */}
        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Warranty Details</p>
        <FormRow>
          <TextInput label="Warranty Number" name="warrantyNumber" value={form.warrantyNumber} onChange={handle} placeholder="e.g. WR-2025-00789" />
          <TextInput label="Warranty Provider" name="warrantyProvider" value={form.warrantyProvider} onChange={handle} placeholder="e.g. HP India Pvt. Ltd." />
          <DateInput label="Warranty Start Date" name="warrantyStartDate" value={form.warrantyStartDate} onChange={handle} />
          <DateInput label="Warranty End Date" name="warrantyEndDate" value={form.warrantyEndDate} onChange={handle} />
          <SelectInput
            label="Warranty Type" name="warrantyType" value={form.warrantyType} onChange={handle}
            options={[
              { value: 'standard', label: 'Standard (1 Year)' },
              { value: 'extended', label: 'Extended (2–3 Years)' },
              { value: 'onsite', label: 'On-Site Service' },
              { value: 'depot', label: 'Depot / Carry-In' },
              { value: 'comprehensive', label: 'Comprehensive' },
            ]}
          />
          <TextInput label="Coverage Details" name="coverageDetails" value={form.coverageDetails} onChange={handle} placeholder="e.g. Parts + Labour, On-site" />
        </FormRow>

        <Divider label="Annual Maintenance Contract (AMC)" />

        <div className="mb-4">
          <CheckboxField
            label="AMC Available"
            name="amcAvailable"
            checked={form.amcAvailable}
            onChange={handle}
            description="Check if this printer has an active AMC"
          />
        </div>

        <div className={`transition-all overflow-hidden ${form.amcAvailable ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
          <FormRow>
            <TextInput label="AMC Provider" name="amcProvider" value={form.amcProvider} onChange={handle} placeholder="e.g. ABC Technologies" />
            <TextInput label="AMC Cost (₹/yr)" name="amcCost" value={form.amcCost} onChange={handle} placeholder="e.g. 12000" />
            <DateInput label="AMC Start Date" name="amcStartDate" value={form.amcStartDate} onChange={handle} />
            <DateInput label="AMC End Date" name="amcEndDate" value={form.amcEndDate} onChange={handle} />
          </FormRow>
        </div>
      </FormCard>

      {/* ══════════════════════════════════════════════════════════════
          9. DEFAULT CONFIGURATION
      ══════════════════════════════════════════════════════════════ */}
      <FormCard id="sec-config">
        <SectionHeader icon={Settings} title="Default Configuration" subtitle="Factory and user-configured print defaults" color="purple" />
        <FormRow>
          <SelectInput
            label="Default Paper Size" name="defaultPaperSize" value={form.defaultPaperSize} onChange={handle}
            options={['A4', 'A3', 'A5', 'Letter', 'Legal', 'B5', 'Executive']}
          />
          <SelectInput
            label="Print Quality" name="printQuality" value={form.printQuality} onChange={handle}
            options={[
              { value: 'draft', label: 'Draft (Fast)' },
              { value: 'normal', label: 'Normal' },
              { value: 'best', label: 'Best (High Quality)' },
            ]}
          />
          <SelectInput
            label="Default Color Mode" name="defaultColorMode" value={form.defaultColorMode} onChange={handle}
            options={[
              { value: 'color', label: 'Full Color' },
              { value: 'mono', label: 'Monochrome / B&W' },
              { value: 'auto', label: 'Auto Detect' },
            ]}
          />
        </FormRow>
        <Divider label="Power & Security Settings" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <ToggleSwitch label="Auto Sleep Mode" name="autoSleep" checked={form.autoSleep} onChange={handle} description="Reduce power when idle" />
          <ToggleSwitch label="Auto Power Off" name="autoPowerOff" checked={form.autoPowerOff} onChange={handle} description="Power off after inactivity" />
          <ToggleSwitch label="Secure Printing" name="securePrinting" checked={form.securePrinting} onChange={handle} description="Hold jobs until authenticated" />
          <ToggleSwitch label="PIN Protection" name="pinProtection" checked={form.pinProtection} onChange={handle} description="Require PIN for access" />
        </div>
      </FormCard>

      {/* ══════════════════════════════════════════════════════════════
          10. DOCUMENTS
      ══════════════════════════════════════════════════════════════ */}
      <FormCard id="sec-documents">
        <SectionHeader icon={FileText} title="Documents" subtitle="Attach all relevant files for this printer" color="sky" />
        <div className="space-y-3">
          <DocumentUpload
            label="Purchase Invoice"
            icon={ReceiptText}
            name="doc_invoice"
            file={form.docs.invoice}
            onChange={handleDocChange('invoice')}
            onClear={() => clearDoc('invoice')}
            accept=".pdf,.jpg,.jpeg,.png"
          />
          <DocumentUpload
            label="Warranty Certificate"
            icon={Shield}
            name="doc_warranty"
            file={form.docs.warrantyCert}
            onChange={handleDocChange('warrantyCert')}
            onClear={() => clearDoc('warrantyCert')}
            accept=".pdf,.jpg,.jpeg,.png"
          />
          <DocumentUpload
            label="User Manual"
            icon={BookOpen}
            name="doc_manual"
            file={form.docs.userManual}
            onChange={handleDocChange('userManual')}
            onClear={() => clearDoc('userManual')}
            accept=".pdf"
          />
          <DocumentUpload
            label="Installation Report"
            icon={FileCheck}
            name="doc_install"
            file={form.docs.installReport}
            onChange={handleDocChange('installReport')}
            onClear={() => clearDoc('installReport')}
            accept=".pdf,.docx,.doc"
          />
          <DocumentUpload
            label="Configuration File"
            icon={FileCog}
            name="doc_config"
            file={form.docs.configFile}
            onChange={handleDocChange('configFile')}
            onClear={() => clearDoc('configFile')}
            accept=".xml,.json,.cfg,.txt"
          />
          <DocumentUpload
            label="Additional Images"
            icon={FileImage}
            name="doc_images"
            file={form.docs.images}
            onChange={handleDocChange('images')}
            onClear={() => clearDoc('images')}
            accept="image/*"
          />
        </div>
      </FormCard>

      {/* ══════════════════════════════════════════════════════════════
          11. NOTES
      ══════════════════════════════════════════════════════════════ */}
      <FormCard id="sec-notes">
        <SectionHeader icon={StickyNote} title="Internal Notes" subtitle="Any additional remarks or observations about this printer" color="orange" />
        <div>
          <Label>Notes</Label>
          <textarea
            name="internalNotes"
            value={form.internalNotes}
            onChange={handle}
            rows={5}
            placeholder="Enter any internal notes, special instructions, known issues, or configuration remarks..."
            className={`${inputClass} resize-y min-h-[120px]`}
          />
        </div>
      </FormCard>

      {/* ══════════════════════════════════════════════════════════════
          12. SYSTEM SETTINGS
      ══════════════════════════════════════════════════════════════ */}
      <FormCard id="sec-system">
        <SectionHeader icon={Bell} title="System Settings" subtitle="Monitoring, alerts and system-level configuration" color="slate" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <ToggleSwitch
            label="Active Printer"
            name="activePrinter"
            checked={form.activePrinter}
            onChange={handle}
            description="Mark this printer as active in the system"
          />
          <ToggleSwitch
            label="Enable Remote Monitoring"
            name="remoteMonitoring"
            checked={form.remoteMonitoring}
            onChange={handle}
            description="Monitor printer status remotely"
          />
          <ToggleSwitch
            label="Enable Email Alerts"
            name="emailAlerts"
            checked={form.emailAlerts}
            onChange={handle}
            description="Send email notifications for events"
          />
          <ToggleSwitch
            label="Enable Maintenance Reminder"
            name="maintenanceReminder"
            checked={form.maintenanceReminder}
            onChange={handle}
            description="Alert when maintenance is due"
          />
          <ToggleSwitch
            label="Enable Low Toner Notification"
            name="lowTonerNotification"
            checked={form.lowTonerNotification}
            onChange={handle}
            description="Notify when toner level is low"
          />
          <ToggleSwitch
            label="Enable Error Notification"
            name="errorNotification"
            checked={form.errorNotification}
            onChange={handle}
            description="Alert on printer errors"
          />
        </div>
      </FormCard>

      {/* ══════════════════════════════════════════════════════════════
          FORM ACTIONS
      ══════════════════════════════════════════════════════════════ */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <AlertCircle className="w-4 h-4 text-amber-500" />
            <span>Fields marked with <span className="text-red-500 font-bold">*</span> are required</span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 text-gray-700 font-semibold text-sm rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all"
            >
              <RotateCcw className="w-4 h-4" /> Reset
            </button>
            <button
              type="button"
              className="flex items-center gap-2 px-5 py-2.5 border border-indigo-300 text-indigo-700 bg-indigo-50 font-semibold text-sm rounded-xl hover:bg-indigo-100 transition-all"
            >
              <Save className="w-4 h-4" /> Save Draft
            </button>
            <button
              type="button"
              className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 text-gray-600 font-semibold text-sm rounded-xl hover:bg-gray-50 transition-all"
            >
              <XCircle className="w-4 h-4" /> Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-7 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              <Printer className="w-4 h-4" /> Save Printer
            </button>
          </div>
        </div>
      </div>

    </form>
  );
};

export default AddPrinter;
