'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface ReportStatus {
  reportId: string;
  status: 'submitted' | 'under_review' | 'in_progress' | 'resolved';
  lastUpdated: string;
  details: string;
  timeline: {
    date: string;
    status: string;
    description: string;
  }[];
  assignedDepartment?: string;
  expectedResolutionDate?: string;
}

export default function TrackReport() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [searchId, setSearchId] = useState('');
  const [error, setError] = useState('');

  // Default report status for demonstration
  const defaultReport: ReportStatus = {
    reportId: 'REPORT-2024-001',
    status: 'under_review',
    lastUpdated: new Date().toLocaleDateString(),
    details: 'Your report is currently being reviewed by our team.',
    timeline: [
      {
        date: new Date(Date.now() - 172800000).toLocaleDateString(), // 2 days ago
        status: 'submitted',
        description: 'Report submitted successfully'
      },
      {
        date: new Date(Date.now() - 86400000).toLocaleDateString(), // 1 day ago
        status: 'under_review',
        description: 'Report assigned to review team'
      }
    ],
    assignedDepartment: 'Anti-Corruption Bureau',
    expectedResolutionDate: new Date(Date.now() + 604800000).toLocaleDateString() // 7 days from now
  };

  const [reportStatus, setReportStatus] = useState<ReportStatus>(defaultReport);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // For demonstration, we'll show the default report if ID matches
      if (searchId === 'REPORT-2024-001') {
        setReportStatus(defaultReport);
      } else {
        setError('Report not found. Please check the ID and try again.');
      }
    } catch (err) {
      setError('Failed to fetch report status. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'bg-yellow-100 text-yellow-800';
      case 'under_review':
        return 'bg-blue-100 text-blue-800';
      case 'in_progress':
        return 'bg-purple-100 text-purple-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted':
        return '📝';
      case 'under_review':
        return '👀';
      case 'in_progress':
        return '🔍';
      case 'resolved':
        return '✅';
      default:
        return '❓';
    }
  };

  // Redirect if not authenticated
  if (status === 'unauthenticated') {
    router.push('/auth/signin?callbackUrl=/track');
    return null;
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="p-4 rounded-md bg-white shadow-sm">
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Track Your Report
          </h1>
          <p className="mt-3 text-lg text-gray-500">
            Enter your report ID to check its current status
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white shadow sm:rounded-lg mb-8">
          <div className="px-4 py-5 sm:p-6">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <label htmlFor="search-id" className="block text-sm font-medium text-gray-700">
                    Report ID
                  </label>
                  <input
                    type="text"
                    id="search-id"
                    name="search-id"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    placeholder="Enter Report ID (e.g., REPORT-2024-001)"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                  >
                    {isLoading ? 'Searching...' : 'Search'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {error && (
          <div className="mb-8 rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white shadow sm:rounded-lg overflow-hidden">
          {/* Current Status Header */}
          <div className="bg-gray-50 px-4 py-5 border-b border-gray-200 sm:px-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Report Status
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Report ID: {reportStatus.reportId}
                </p>
              </div>
              <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${getStatusColor(reportStatus.status)}`}>
                {getStatusIcon(reportStatus.status)} 
                <span className="ml-2">
                  {reportStatus.status.replace('_', ' ').toUpperCase()}
                </span>
              </span>
            </div>
          </div>

          <div className="px-4 py-5 sm:p-6">
            <div className="space-y-6">
              {/* Department and Timeline */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Assigned Department</h4>
                  <p className="mt-1 text-sm text-gray-900">{reportStatus.assignedDepartment || 'Pending Assignment'}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Expected Resolution</h4>
                  <p className="mt-1 text-sm text-gray-900">{reportStatus.expectedResolutionDate || 'To be determined'}</p>
                </div>
              </div>

              {/* Status Timeline */}
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-4">Status Timeline</h4>
                <div className="flow-root">
                  <ul className="-mb-8">
                    {reportStatus.timeline.map((event, eventIdx) => (
                      <li key={event.date}>
                        <div className="relative pb-8">
                          {eventIdx !== reportStatus.timeline.length - 1 ? (
                            <span
                              className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                              aria-hidden="true"
                            />
                          ) : null}
                          <div className="relative flex space-x-3">
                            <div>
                              <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${getStatusColor(event.status)}`}>
                                {getStatusIcon(event.status)}
                              </span>
                            </div>
                            <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                              <div>
                                <p className="text-sm text-gray-500">{event.description}</p>
                              </div>
                              <div className="whitespace-nowrap text-right text-sm text-gray-500">
                                {event.date}
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Support Section */}
              <div className="rounded-md bg-blue-50 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">
                      Need assistance?
                    </h3>
                    <div className="mt-2 text-sm text-blue-700">
                      <p>
                        If you have any questions or concerns about your report, please contact our support team.
                        Our dedicated team is available 24/7 to assist you.
                      </p>
                    </div>
                    <div className="mt-4">
                      <a
                        href="#"
                        className="text-sm font-medium text-blue-800 hover:text-blue-600"
                      >
                        Contact Support →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 