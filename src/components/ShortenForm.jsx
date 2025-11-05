import { Link2, Copy, Calendar } from 'lucide-react';
import { toast } from 'react-toastify';
import { BASE_URL } from '../config/api';

const ShortenForm = ({ urlForm, setUrlForm, handleShortenUrl, loading, shortenedUrl }) => {
  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!', { autoClose: 2000 });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Shorten Your URL</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Long URL</label>
          <input
            type="url"
            value={urlForm.longUrl}
            onChange={(e) => setUrlForm({...urlForm, longUrl: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="https://example.com/very/long/url"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Custom Alias (Optional)</label>
            <input
              type="text"
              value={urlForm.customAlias}
              onChange={(e) => setUrlForm({...urlForm, customAlias: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="my-custom-link"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Expiry Date (Optional)</span>
              </div>
            </label>
            <input
              type="date"
              value={urlForm.expiryDate}
              min={getMinDate()}
              onChange={(e) => setUrlForm({...urlForm, expiryDate: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>

        <button
          onClick={handleShortenUrl}
          disabled={loading || !urlForm.longUrl}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
        >
          <Link2 className="w-5 h-5" />
          <span>{loading ? 'Shortening...' : 'Shorten URL'}</span>
        </button>
      </div>

      {shortenedUrl && (
        <div className="mt-6 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Your Shortened URL:</h3>
          <div className="flex items-center space-x-2 bg-white p-4 rounded-lg border border-gray-200">
            <span className="flex-1 text-indigo-600 font-medium truncate">
              {shortenedUrl.shortId}
            </span>
            <button
              onClick={() => copyToClipboard(`${BASE_URL}/redirect/${shortenedUrl.shortId}`)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Copy className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShortenForm;
