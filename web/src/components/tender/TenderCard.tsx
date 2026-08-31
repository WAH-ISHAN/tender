import { MapPin, Calendar, Building2, Tag, Clock } from "lucide-react";

export default function TenderCard({ tender }: { tender: any }) {
  return (
    <div className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow bg-white flex flex-col h-full">
      <div className="flex justify-between items-start mb-3">
        <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-1 rounded-full">
          {tender.status}
        </span>
        <span className="text-sm text-gray-500 font-medium">Ref: {tender.referenceNo}</span>
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{tender.title}</h3>
      
      <div className="flex-grow space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <Building2 className="w-4 h-4 mr-2 text-gray-400 shrink-0" />
          <span className="truncate">{tender.organization}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Tag className="w-4 h-4 mr-2 text-gray-400 shrink-0" />
          <span>{tender.category} • {tender.subcategory}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="w-4 h-4 mr-2 text-gray-400 shrink-0" />
          <span>{tender.location}</span>
        </div>
      </div>
      
      <div className="pt-4 border-t border-gray-100 flex justify-between items-center mt-auto">
        <div className="flex items-center text-sm text-red-600 font-medium">
          <Clock className="w-4 h-4 mr-1 shrink-0" />
          <span>Closes: {tender.closingDate}</span>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
}
