'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Lock, CheckCircle, XCircle, Clock, Server, Shield, Globe, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

interface SystemStatus {
  name: string;
  status: 'operational' | 'degraded' | 'outage';
  uptime: number;
  responseTime: number;
  lastChecked: string;
}

export default function SystemStatus() {
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  // Mock system status data
  const [systems, setSystems] = useState<SystemStatus[]>([
    {
      name: 'Note Creation Service',
      status: 'operational',
      uptime: 99.98,
      responseTime: 45,
      lastChecked: '2 minutes ago'
    },
    {
      name: 'Encryption Engine',
      status: 'operational',
      uptime: 99.99,
      responseTime: 12,
      lastChecked: '1 minute ago'
    },
    {
      name: 'Database Layer',
      status: 'operational',
      uptime: 99.95,
      responseTime: 23,
      lastChecked: '3 minutes ago'
    },
    {
      name: 'CDN & Distribution',
      status: 'operational',
      uptime: 99.97,
      responseTime: 67,
      lastChecked: '1 minute ago'
    },
    {
      name: 'Authentication Service',
      status: 'operational',
      uptime: 99.99,
      responseTime: 34,
      lastChecked: '2 minutes ago'
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'degraded':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'outage':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'degraded':
        return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'outage':
        return 'text-red-500 bg-red-500/10 border-red-500/20';
      default:
        return 'text-green-500 bg-green-500/10 border-green-500/20';
    }
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLastUpdated(new Date());
      setIsLoading(false);
    }, 1000);
  };

  const overallStatus = systems.every(s => s.status === 'operational') ? 'operational' :
                       systems.some(s => s.status === 'outage') ? 'outage' : 'degraded';

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <Lock className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold tracking-tight">VaultNote</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="mb-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold tracking-tight mb-4">System Status</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Real-time status of VaultNote services
              </p>
            </div>
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Overall Status */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className={`p-6 rounded-xl border ${getStatusColor(overallStatus)}`}>
            <div className="flex items-center space-x-3 mb-4">
              {getStatusIcon(overallStatus)}
              <h2 className="text-xl font-semibold">Overall Status</h2>
            </div>
            <div className="space-y-2">
              <p className="text-sm opacity-80">Last updated: {lastUpdated.toLocaleTimeString()}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm">All Systems</span>
                <span className="text-2xl font-bold">
                  {overallStatus === 'operational' ? 'Operational' :
                   overallStatus === 'degraded' ? 'Degraded' : 'Outage'}
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-border/40 bg-muted/30">
            <div className="flex items-center space-x-3 mb-4">
              <Globe className="h-6 w-6 text-blue-500" />
              <h2 className="text-xl font-semibold">Global Coverage</h2>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Regions Online</span>
                <span className="text-2xl font-bold text-green-500">3/3</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Switzerland, Germany, Netherlands
              </p>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-border/40 bg-muted/30">
            <div className="flex items-center space-x-3 mb-4">
              <Server className="h-6 w-6 text-purple-500" />
              <h2 className="text-xl font-semibold">Performance</h2>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Avg Response Time</span>
                <span className="text-2xl font-bold">36ms</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* System Components */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">System Components</h2>

          <div className="grid grid-cols-1 gap-4">
            {systems.map((system, index) => (
              <motion.div
                key={system.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-xl border ${getStatusColor(system.status)} hover:shadow-md transition-all duration-200`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(system.status)}
                    <div>
                      <h3 className="font-semibold text-lg">{system.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Last checked: {system.lastChecked}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="grid grid-cols-2 gap-6 text-sm">
                      <div>
                        <p className="text-muted-foreground">Uptime</p>
                        <p className="font-semibold">{system.uptime}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Response</p>
                        <p className="font-semibold">{system.responseTime}ms</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 rounded-xl border border-border/40 bg-muted/30">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="h-6 w-6 text-green-500" />
              <h3 className="text-lg font-semibold">Security & Privacy</h3>
            </div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Zero-knowledge encryption active</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Swiss data protection compliant</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Regular security audits</span>
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-xl border border-border/40 bg-muted/30">
            <div className="flex items-center space-x-3 mb-4">
              <Clock className="h-6 w-6 text-blue-500" />
              <h3 className="text-lg font-semibold">Maintenance Schedule</h3>
            </div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>• Weekly maintenance: Sundays 02:00-04:00 CET</li>
              <li>• Security updates: As needed, with advance notice</li>
              <li>• Emergency maintenance: Immediate when required</li>
            </ul>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-12 p-8 rounded-xl border border-border/40 bg-gradient-to-r from-primary/5 to-primary/10">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Need Help?</h3>
            <p className="text-muted-foreground mb-6">
              If you're experiencing issues not shown here, please contact our support team.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <a
                href="mailto:support@vaultnote.app"
                className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                <span>Contact Support</span>
              </a>
              <a
                href="https://discord.gg/vaultnote"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
              >
                <span>Join Discord</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-background/50 mt-16">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © 2025 VaultNote. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                Terms of Service
              </Link>
              <Link href="/status" className="text-sm text-muted-foreground hover:text-foreground">
                System Status
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
