import React, { useState } from 'react';
import {
  Wifi, Search, X, CheckCircle2,
  RefreshCw, Terminal, Globe, Cpu, RotateCcw
} from 'lucide-react';

const INITIAL_DEVICES = [
  {
    id: 'IOT-8801',
    model: 'Canon imageRUNNER ADV DX C3835i',
    serial: 'CAN-880129-DX',
    client: 'Globex Inc',
    ip: '10.240.14.88',
    status: 'Online',
    tonerK: 74,
    tonerC: 62,
    tonerM: 58,
    tonerY: 81,
    tray1: 90,
    tray2: 25,
    firmware: 'v4.12.08',
    diagnostic: 'Operational - Optimal condition',
    lastPing: '4s ago'
  },
  {
    id: 'IOT-8802',
    model: 'HP LaserJet Enterprise MFP M635',
    serial: 'HP-635109-M',
    client: 'Acme Corp',
    ip: '192.168.1.104',
    status: 'Warning',
    tonerK: 12,
    tonerC: 0,
    tonerM: 0,
    tonerY: 0,
    tray1: 40,
    tray2: 5,
    firmware: 'v2.89.01',
    diagnostic: 'Low Black Toner (12%) & Tray 2 Empty',
    lastPing: '12s ago'
  },
  {
    id: 'IOT-8803',
    model: 'Kyocera TASKalfa 4054i',
    serial: 'KYO-405400-TK',
    client: 'Zenith Logistics',
    ip: '172.16.50.22',
    status: 'Online',
    tonerK: 88,
    tonerC: 92,
    tonerM: 85,
    tonerY: 89,
    tray1: 95,
    tray2: 90,
    firmware: 'v3.01.14',
    diagnostic: 'Operational - High duty throughput',
    lastPing: '2s ago'
  },
  {
    id: 'IOT-8804',
    model: 'Epson WorkForce WF-C20750',
    serial: 'EPS-770123-WF',
    client: 'Starlight Media Hub',
    ip: '10.100.8.55',
    status: 'Warning',
    tonerK: 45,
    tonerC: 18,
    tonerM: 20,
    tonerY: 34,
    tray1: 60,
    tray2: 80,
    firmware: 'v5.00.02',
    diagnostic: 'Cyan Ink Low (18%) & ADF Sensor warning',
    lastPing: '8s ago'
  },
  {
    id: 'IOT-8805',
    model: 'Ricoh MP C3004ex',
    serial: 'RIC-550301-MP',
    client: 'Prime Healthcare',
    ip: '192.168.100.12',
    status: 'Offline',
    tonerK: 50,
    tonerC: 45,
    tonerM: 52,
    tonerY: 48,
    tray1: 0,
    tray2: 0,
    firmware: 'v1.44.11',
    diagnostic: 'Device Unreachable / Network Offline',
    lastPing: '45m ago'
  }
];

const RemoteSupport = () => {
  const [devices, setDevices] = useState(INITIAL_DEVICES);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Diagnostic Console Modal
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [consoleLogs, setConsoleLogs] = useState([]);
  const [isCommandRunning, setIsCommandRunning] = useState(false);

  const statuses = ['All', 'Online', 'Warning', 'Offline'];

  const filteredDevices = devices.filter(d => {
    const matchesSearch =
      d.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.serial.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.ip.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || d.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleOpenConsole = (device) => {
    setSelectedDevice(device);
    setConsoleLogs([
      `[${new Date().toLocaleTimeString()}] Authenticated SNMP v3 secure session to ${device.ip}...`,
      `[${new Date().toLocaleTimeString()}] Connection established: TLS 1.3 encrypted tunnel.`,
      `[${new Date().toLocaleTimeString()}] Engine status query: ${device.diagnostic}`,
      `[${new Date().toLocaleTimeString()}] Ready for diagnostic commands.`
    ]);
  };

  const handleRunCommand = (commandName) => {
    setIsCommandRunning(true);
    const newLog = `[${new Date().toLocaleTimeString()}] Executing: ${commandName}...`;
    setConsoleLogs(prev => [...prev, newLog]);

    setTimeout(() => {
      let result = '';
      if (commandName === 'Restart Print Spooler') {
        result = `[${new Date().toLocaleTimeString()}] Spooler service stopped. Cache purged. Spooler restarted OK.`;
      } else if (commandName === 'Calibrate Registration') {
        result = `[${new Date().toLocaleTimeString()}] Test pattern exposed. Optical alignment calibrated to 0.02mm delta.`;
      } else {
        result = `[${new Date().toLocaleTimeString()}] Telemetry test page sent to duplex engine. Output bin: Verified.`;
      }
      setConsoleLogs(prev => [...prev, result]);
      setIsCommandRunning(false);
    }, 1200);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Online':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Online
          </span>
        );
      case 'Warning':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            Telemetry Alert
          </span>
        );
      case 'Offline':
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">
            Offline
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
            <Wifi className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Remote Diagnostic Support</h1>
            <p className="text-xs text-gray-500">Live IoT printer telemetry, toner levels, remote spooler reboot, and tele-maintenance.</p>
          </div>
        </div>

        <button
          onClick={() => setDevices([...devices])}
          className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 font-semibold rounded-xl text-xs transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Ping All Fleets
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Connected Devices</span>
          <div className="text-2xl font-black text-gray-900 mt-2">{devices.length}</div>
          <div className="text-xs text-indigo-600 font-medium mt-1">SNMP v3 cloud gateways</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Live & Operational</span>
          <div className="text-2xl font-black text-emerald-600 mt-2">
            {devices.filter(d => d.status === 'Online').length}
          </div>
          <div className="text-xs text-emerald-600 font-medium mt-1">Heartbeat within 10s</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Tele-Fix Success</span>
          <div className="text-2xl font-black text-blue-600 mt-2">44.6%</div>
          <div className="text-xs text-blue-600 font-medium mt-1">Resolved without on-site visit</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Telemetry Alerts</span>
          <div className="text-2xl font-black text-amber-600 mt-2">
            {devices.filter(d => d.status === 'Warning').length}
          </div>
          <div className="text-xs text-amber-600 font-medium mt-1">Low toner or jam alerts</div>
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
              placeholder="Search IP, serial, model, client..."
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto pb-1">
            {statuses.map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  statusFilter === s
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Devices Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[850px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <th className="py-4 px-6">Hardware Device</th>
                <th className="py-4 px-6">Client & IP Address</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Toner Levels</th>
                <th className="py-4 px-6">Tray Capacities</th>
                <th className="py-4 px-6">Telemetry State</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredDevices.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-400">
                    No connected printers found.
                  </td>
                </tr>
              ) : (
                filteredDevices.map((d) => (
                  <tr key={d.id} className="hover:bg-gray-50/70 transition-colors">
                    {/* Device */}
                    <td className="py-4 px-6">
                      <div className="font-bold text-gray-900 text-xs">{d.model}</div>
                      <div className="text-[11px] font-mono text-gray-400 mt-0.5">{d.serial} • {d.firmware}</div>
                    </td>

                    {/* Client & IP */}
                    <td className="py-4 px-6">
                      <div className="font-semibold text-gray-800 text-xs">{d.client}</div>
                      <div className="flex items-center gap-1 text-[11px] font-mono text-indigo-600 mt-0.5">
                        <Globe className="w-3 h-3 text-gray-400" />
                        {d.ip} <span className="text-gray-400 font-normal">({d.lastPing})</span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-6">
                      {getStatusBadge(d.status)}
                    </td>

                    {/* Toners */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        {/* K */}
                        <div className="flex flex-col items-center">
                          <div className="w-3 h-9 bg-gray-100 rounded-sm overflow-hidden flex flex-col justify-end">
                            <div className="w-full bg-gray-800" style={{ height: `${d.tonerK}%` }} />
                          </div>
                          <span className="text-[9px] font-bold text-gray-600 mt-1">K</span>
                        </div>
                        {/* C */}
                        <div className="flex flex-col items-center">
                          <div className="w-3 h-9 bg-gray-100 rounded-sm overflow-hidden flex flex-col justify-end">
                            <div className="w-full bg-cyan-500" style={{ height: `${d.tonerC}%` }} />
                          </div>
                          <span className="text-[9px] font-bold text-cyan-600 mt-1">C</span>
                        </div>
                        {/* M */}
                        <div className="flex flex-col items-center">
                          <div className="w-3 h-9 bg-gray-100 rounded-sm overflow-hidden flex flex-col justify-end">
                            <div className="w-full bg-pink-500" style={{ height: `${d.tonerM}%` }} />
                          </div>
                          <span className="text-[9px] font-bold text-pink-600 mt-1">M</span>
                        </div>
                        {/* Y */}
                        <div className="flex flex-col items-center">
                          <div className="w-3 h-9 bg-gray-100 rounded-sm overflow-hidden flex flex-col justify-end">
                            <div className="w-full bg-amber-400" style={{ height: `${d.tonerY}%` }} />
                          </div>
                          <span className="text-[9px] font-bold text-amber-500 mt-1">Y</span>
                        </div>
                      </div>
                    </td>

                    {/* Trays */}
                    <td className="py-4 px-6">
                      <div className="text-xs space-y-1">
                        <div className="flex items-center gap-1.5 text-gray-600">
                          <span className="text-[10px] text-gray-400">Tray 1:</span>
                          <span className="font-bold text-gray-800">{d.tray1}%</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-600">
                          <span className="text-[10px] text-gray-400">Tray 2:</span>
                          <span className={`font-bold ${d.tray2 <= 10 ? 'text-rose-600' : 'text-gray-800'}`}>
                            {d.tray2}%
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Telemetry state */}
                    <td className="py-4 px-6">
                      <div className="text-xs font-medium text-gray-700 max-w-[200px] truncate" title={d.diagnostic}>
                        {d.diagnostic}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      <button
                        onClick={() => handleOpenConsole(d)}
                        className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                      >
                        Launch Console
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Remote Diagnostic Console Modal */}
      {selectedDevice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-gray-950 text-gray-100 rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-gray-800 space-y-5 max-h-[90vh] overflow-y-auto font-mono text-xs">
            {/* Modal Header */}
            <div className="flex justify-between items-start border-b border-gray-800 pb-4">
              <div>
                <div className="flex items-center gap-2 text-indigo-400 text-sm font-bold">
                  <Terminal className="w-4 h-4" />
                  Remote Web Diagnostic Console
                </div>
                <div className="text-gray-400 text-xs mt-1">
                  Target: {selectedDevice.model} ({selectedDevice.ip}) • Client: {selectedDevice.client}
                </div>
              </div>
              <button
                onClick={() => setSelectedDevice(null)}
                className="p-2 text-gray-400 hover:text-white rounded-xl hover:bg-gray-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Diagnostic Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                disabled={isCommandRunning}
                onClick={() => handleRunCommand('Restart Print Spooler')}
                className="flex items-center justify-center gap-2 py-2 px-3 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 text-indigo-300 rounded-xl font-bold transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Restart Spooler
              </button>

              <button
                disabled={isCommandRunning}
                onClick={() => handleRunCommand('Calibrate Registration')}
                className="flex items-center justify-center gap-2 py-2 px-3 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 text-cyan-300 rounded-xl font-bold transition-colors"
              >
                <Cpu className="w-3.5 h-3.5" />
                Color Calibration
              </button>

              <button
                disabled={isCommandRunning}
                onClick={() => handleRunCommand('Send Test Diagnostic Page')}
                className="flex items-center justify-center gap-2 py-2 px-3 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 text-emerald-300 rounded-xl font-bold transition-colors"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Test Print Page
              </button>
            </div>

            {/* Terminal Feed */}
            <div className="bg-black/80 rounded-2xl p-4 border border-gray-800 h-64 overflow-y-auto space-y-1.5 text-[11px] leading-relaxed text-emerald-400">
              {consoleLogs.map((log, i) => (
                <div key={i} className="font-mono">
                  {log}
                </div>
              ))}
              {isCommandRunning && (
                <div className="text-amber-400 animate-pulse">
                  &gt; Executing remote diagnostic command over encrypted telemetry port...
                </div>
              )}
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-gray-800 text-gray-400">
              <span>Status: TLS 1.3 Active</span>
              <button
                onClick={() => setSelectedDevice(null)}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-sans font-bold text-xs"
              >
                Disconnect & Exit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RemoteSupport;
