import { useState, useEffect } from 'react';

export default function HospitalBedManagement() {
  // State to store list of beds
  const [beds, setBeds] = useState([]);
  
  // State for new bed form
  const [newBedId, setNewBedId] = useState('');
  const [newBedType, setNewBedType] = useState('Regular');
  const [newBedWard, setNewBedWard] = useState('General');
  
  // Load sample data on first render
  useEffect(() => {
    // Sample data
    const sampleBeds = [
      { id: 'B101', type: 'Regular', ward: 'General', isOccupied: false },
      { id: 'B102', type: 'Regular', ward: 'General', isOccupied: true },
      { id: 'B103', type: 'ICU', ward: 'Critical Care', isOccupied: true },
      { id: 'B104', type: 'Pediatric', ward: 'Children', isOccupied: false },
    ];
    setBeds(sampleBeds);
  }, []);

  // Function to add a new bed
  const handleAddBed = () => {
    // Validate inputs
    if (!newBedId.trim()) {
      alert('Please enter a bed ID');
      return;
    }
    
    // Check if bed ID already exists
    if (beds.some(bed => bed.id === newBedId)) {
      alert('A bed with this ID already exists');
      return;
    }
    
    // Create new bed object
    const newBed = {
      id: newBedId,
      type: newBedType,
      ward: newBedWard,
      isOccupied: false
    };
    
    // Add new bed to the list
    setBeds([...beds, newBed]);
    
    // Clear the form
    setNewBedId('');
    setNewBedType('Regular');
    setNewBedWard('General');
  };

  // Function to toggle bed occupancy
  const toggleOccupancy = (bedId) => {
    setBeds(beds.map(bed => {
      if (bed.id === bedId) {
        return { ...bed, isOccupied: !bed.isOccupied };
      }
      return bed;
    }));
  };

  // Function to delete a bed
  const deleteBed = (bedId) => {
    setBeds(beds.filter(bed => bed.id !== bedId));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-800">Hospital Bed Management System</h1>
      
      {/* Add New Bed Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Bed</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Bed ID</label>
              <input
                type="text"
                value={newBedId}
                onChange={(e) => setNewBedId(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="e.g., B105"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Bed Type</label>
              <select
                value={newBedType}
                onChange={(e) => setNewBedType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="Regular">Regular</option>
                <option value="ICU">ICU</option>
                <option value="Pediatric">Pediatric</option>
                <option value="Maternity">Maternity</option>
                <option value="Emergency">Emergency</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Ward</label>
              <select
                value={newBedWard}
                onChange={(e) => setNewBedWard(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="General">General</option>
                <option value="Critical Care">Critical Care</option>
                <option value="Children">Children</option>
                <option value="Maternity">Maternity</option>
                <option value="Emergency">Emergency</option>
              </select>
            </div>
          </div>
          
          <button
            onClick={handleAddBed}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          >
            Add Bed
          </button>
        </div>
      </div>
      
      {/* Bed List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Bed List</h2>
        
        {/* Filter/Search options could be added here */}
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left">Bed ID</th>
                <th className="py-3 px-4 text-left">Type</th>
                <th className="py-3 px-4 text-left">Ward</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {beds.length > 0 ? (
                beds.map((bed) => (
                  <tr key={bed.id} className="border-b">
                    <td className="py-3 px-4">{bed.id}</td>
                    <td className="py-3 px-4">{bed.type}</td>
                    <td className="py-3 px-4">{bed.ward}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-sm ${bed.isOccupied ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                        {bed.isOccupied ? 'Occupied' : 'Available'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => toggleOccupancy(bed.id)}
                          className={`px-3 py-1 rounded text-white text-sm ${bed.isOccupied ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-500 hover:bg-blue-600'}`}
                        >
                          {bed.isOccupied ? 'Mark Available' : 'Mark Occupied'}
                        </button>
                        <button
                          onClick={() => deleteBed(bed.id)}
                          className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-4 text-center text-gray-500">No beds available. Add a new bed to get started.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Summary Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-sm text-blue-800">Total Beds</div>
            <div className="text-2xl font-bold">{beds.length}</div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-sm text-green-800">Available</div>
            <div className="text-2xl font-bold">{beds.filter(bed => !bed.isOccupied).length}</div>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg">
            <div className="text-sm text-red-800">Occupied</div>
            <div className="text-2xl font-bold">{beds.filter(bed => bed.isOccupied).length}</div>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-sm text-purple-800">Occupancy Rate</div>
            <div className="text-2xl font-bold">
              {beds.length ? Math.round((beds.filter(bed => bed.isOccupied).length / beds.length) * 100) : 0}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}