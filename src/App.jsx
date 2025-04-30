import React, { useState, useEffect } from 'react';
import { Search, Globe, MapPin, Users, Phone, DollarSign, Languages, ChevronLeft } from 'lucide-react';
import './App.css';

const API_URL = 'http://localhost:5000/api';

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/countries`);
        if (!response.ok) throw new Error('Failed to fetch countries');
        const data = await response.json();
        setCountries(data);
        setFilteredCountries(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    if (countries.length > 0) {
      let result = [...countries];

      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        result = result.filter(country => 
          country.name.common.toLowerCase().includes(searchLower) ||
          country.name.official.toLowerCase().includes(searchLower) ||
          (country.capital && country.capital.some(cap => cap.toLowerCase().includes(searchLower)))
        );
      }

      if (regionFilter) {
        result = result.filter(country => country.region === regionFilter);
      }

      setFilteredCountries(result);
    }
  }, [searchTerm, regionFilter, countries]);

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
    window.scrollTo(0, 0);
  };

  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  const getRegions = () => {
    const regions = new Set(countries.map(country => country.region));
    return Array.from(regions).sort();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Globe className="animate-pulse mx-auto mb-4 text-blue-500" size={48} />
          <h2 className="text-xl font-semibold">Loading countries...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md">
          <h2 className="text-xl font-semibold text-red-600 mb-4">Error</h2>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold flex items-center">
            <Globe className="mr-2" size={24} />
            Countries Explorer
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {selectedCountry ? (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <button 
                onClick={() => setSelectedCountry(null)}
                className="flex items-center text-blue-500 hover:text-blue-700 mb-6 transition"
              >
                <ChevronLeft size={20} />
                <span>Back to All Countries</span>
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="aspect-video relative overflow-hidden rounded-lg shadow-md">
                    <img 
                      src={selectedCountry.flags.svg} 
                      alt={selectedCountry.flags.alt || `Flag of ${selectedCountry.name.common}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div>
                  <h2 className="text-3xl font-bold mb-4">{selectedCountry.name.common}</h2>
                  <p className="text-gray-600 mb-6">{selectedCountry.name.official}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="flex items-center mb-2">
                        <MapPin size={18} className="mr-2 text-gray-500" />
                        <span className="font-semibold mr-2">Capital:</span> 
                        {selectedCountry.capital ? selectedCountry.capital.join(', ') : 'N/A'}
                      </p>
                      <p className="flex items-center mb-2">
                        <Globe size={18} className="mr-2 text-gray-500" />
                        <span className="font-semibold mr-2">Region:</span> 
                        {selectedCountry.region}
                      </p>
                      <p className="mb-2 ml-6">
                        <span className="font-semibold mr-2">Subregion:</span> 
                        {selectedCountry.subregion || 'N/A'}
                      </p>
                      <p className="flex items-center mb-2">
                        <Users size={18} className="mr-2 text-gray-500" />
                        <span className="font-semibold mr-2">Population:</span> 
                        {formatNumber(selectedCountry.population)}
                      </p>
                      <p className="mb-2 ml-6">
                        <span className="font-semibold mr-2">Area:</span> 
                        {formatNumber(selectedCountry.area)} km²
                      </p>
                    </div>

                    <div>
                      <p className="flex items-start mb-2">
                        <DollarSign size={18} className="mr-2 mt-1 text-gray-500" />
                        <span>
                          <span className="font-semibold">Currencies:</span><br />
                          {selectedCountry.currencies ? 
                            Object.entries(selectedCountry.currencies).map(([code, currency]) => (
                              <span key={code} className="block ml-6">
                                {currency.name} ({currency.symbol})
                              </span>
                            )) : 'N/A'
                          }
                        </span>
                      </p>

                      <p className="flex items-start mb-2">
                        <Languages size={18} className="mr-2 mt-1 text-gray-500" />
                        <span>
                          <span className="font-semibold">Languages:</span><br />
                          {selectedCountry.languages ? 
                            Object.values(selectedCountry.languages).map((language, index) => (
                              <span key={index} className="block ml-6">
                                {language}
                              </span>
                            )) : 'N/A'
                          }
                        </span>
                      </p>

                      <p className="flex items-center mb-2">
                        <Phone size={18} className="mr-2 text-gray-500" />
                        <span className="font-semibold mr-2">Calling Code:</span> 
                        {selectedCountry.idd && selectedCountry.idd.root ? 
                          `${selectedCountry.idd.root}${selectedCountry.idd.suffixes?.[0] || ''}` : 'N/A'}
                      </p>
                    </div>
                  </div>

                  {selectedCountry.maps && selectedCountry.maps.googleMaps && (
                    <div className="mb-6">
                      <a 
                        href={selectedCountry.maps.googleMaps} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                      >
                        View on Google Maps
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
              <div className="relative md:w-1/3">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="text-gray-400" size={20} />
                </div>
                <input
                  type="text"
                  placeholder="Search for a country..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <select
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
                className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Filter by Region</option>
                {getRegions().map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>

            {filteredCountries.length === 0 ? (
              <div className="text-center py-12">
                <h2 className="text-xl font-semibold mb-2">No countries found</h2>
                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredCountries.map(country => (
                  <div 
                    key={country.cca3}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
                    onClick={() => handleCountryClick(country)}
                  >
                    <div className="h-40 overflow-hidden">
                      <img 
                        src={country.flags.png} 
                        alt={country.flags.alt || `Flag of ${country.name.common}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h2 className="text-lg font-bold mb-2 truncate">{country.name.common}</h2>
                      <p className="text-sm mb-1">
                        <span className="font-semibold">Population:</span> {formatNumber(country.population)}
                      </p>
                      <p className="text-sm mb-1">
                        <span className="font-semibold">Region:</span> {country.region}
                      </p>
                      <p className="text-sm">
                        <span className="font-semibold">Capital:</span> {country.capital ? country.capital[0] : 'N/A'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      <footer className="bg-white shadow-inner mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600">
          <p>Data provided by <a href="https://restcountries.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">REST Countries API</a></p>
        </div>
      </footer>
    </div>
  );
}

export default App;