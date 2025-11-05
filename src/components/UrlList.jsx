import { Link2, BarChart3 } from 'lucide-react';
import UrlCard from './UrlCard';

const UrlList = ({ urls, copyToClipboard, deleteUrl, isUrlExpired }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Your Links</h2>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <BarChart3 className="w-5 h-5" />
          <span>{urls.length} total links</span>
        </div>
      </div>

      {urls.length === 0 ? (
        <div className="text-center py-12">
          <Link2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No URLs shortened yet. Create your first one above!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {urls.map((url) => (
            <UrlCard
              key={url.short_id}
              url={url}
              copyToClipboard={copyToClipboard}
              deleteUrl={deleteUrl}
              isUrlExpired={isUrlExpired}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UrlList;
