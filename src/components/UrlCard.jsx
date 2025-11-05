import { ExternalLink, Copy, Trash2, Clock, Calendar, BarChart3 } from 'lucide-react';

const UrlCard = ({ url, copyToClipboard, deleteUrl, isUrlExpired }) => {
  const expired = isUrlExpired(url.expiry);

  return (
    <div
      className={`p-6 border rounded-lg hover:shadow-md transition-shadow ${
        expired ? 'border-red-200 bg-red-50' : 'border-gray-200'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            {expired && (
              <span className="px-2 py-1 text-xs font-medium text-red-600 bg-red-100 rounded">Expired</span>
            )}
            <a
              href={url.long_url}
              target="_blank"
              rel="noopener noreferrer"
              className={`font-semibold flex items-center space-x-1 ${
                expired ? 'text-red-600 hover:text-red-700' : 'text-indigo-600 hover:text-indigo-700'
              }`}
            >
              <span className="truncate">{url.short_id}</span>
              <ExternalLink className="w-4 h-4 flex-shrink-0" />
            </a>
            <button
              onClick={() => copyToClipboard(`${url.short_id}`)}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <Copy className="w-4 h-4 text-gray-500 cursor-pointer" />
            </button>
          </div>
          <p className="text-sm text-gray-600 truncate">{url.long_url}</p>
        </div>
        <button
          onClick={() => deleteUrl(url.short_id)}
          className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <Trash2 className="w-5 h-5 cursor-pointer" />
        </button>
      </div>
      <div className="flex items-center space-x-4 text-xs text-gray-500">
        <div className="flex items-center space-x-1">
          <Clock className="w-4 h-4" />
          <span>Created {new Date(url.created_at).toLocaleDateString()}</span>
        </div>
        {url.expiry && (
          <div className={`flex items-center space-x-1 ${expired ? 'text-red-600' : ''}`}>
            <Calendar className="w-4 h-4" />
            <span>Expires {new Date(url.expiry).toLocaleDateString()}</span>
          </div>
        )}
        {url.clicks !== undefined && (
          <div className="flex items-center space-x-1">
            <BarChart3 className="w-4 h-4" />
            <span>{url.clicks} clicks</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default UrlCard;
