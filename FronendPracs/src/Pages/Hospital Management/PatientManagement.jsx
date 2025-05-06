import { useState, useEffect } from 'react';

export default function PatientManagement() {
  // State to store lists of beds and patients
  const [beds, setBeds] = useState([]);
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // State for new patient form
  const [newPatientId, setNewPatientId] = useState('');
  const [newPatientName, setNewPatientName] = useState('');
  const [newPatientAge, setNewPatientAge] = useState('');
  const [newPatientGender, setNewPatientGender] = useState('Male');
  const [newPatientCondition, setNewPatientCondition] = useState('Stable');

  // State for bed assignment modal
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  
  // Load sample data on first render
  useEffect(() => {
    // Sample beds data
    const sampleBeds = [
      { id: 'B101', type: 'Regular', ward: 'General', isOccupied: false, patientId: null, admissionTime: null },
      { id: 'B102', type: 'Regular', ward: 'General', isOccupied: true, patientId: 'P102', admissionTime: new Date(Date.now() - 86400000).toISOString() },
      { id: 'B103', type: 'ICU', ward: 'Critical Care', isOccupied: true, patientId: 'P103', admissionTime: new Date(Date.now() - 172800000).toISOString() },
      { id: 'B104', type: 'Pediatric', ward: 'Children', isOccupied: false, patientId: null, admissionTime: null },
    ];
    
    // Sample patients data
    const samplePatients = [
      { id: 'P101', name: 'John Doe', age: 45, gender: 'Male', condition: 'Stable', bedId: null, admissionTime: null, dischargeTime: new Date(Date.now() - 259200000).toISOString() },
      { id: 'P102', name: 'Jane Smith', age: 32, gender: 'Female', condition: 'Fair', bedId: 'B102', admissionTime: new Date(Date.now() - 86400000).toISOString(), dischargeTime: null },
      { id: 'P103', name: 'Robert Johnson', age: 68, gender: 'Male', condition: 'Critical', bedId: 'B103', admissionTime: new Date(Date.now() - 172800000).toISOString(), dischargeTime: null },
      { id: 'P104', name: 'Sarah Williams', age: 27, gender: 'Female', condition: 'Good', bedId: null, admissionTime: null, dischargeTime: new Date(Date.now() - 345600000).toISOString() },
    ];
    
    setBeds(sampleBeds);
    setPatients(samplePatients);
    setFilteredPatients(samplePatients);
  }, []);

  // Update filtered patients when search term changes
  useEffect(() => {
    const filtered = patients.filter(patient => 
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      patient.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPatients(filtered);
  }, [searchTerm, patients]);

  // Function to add a new patient
  const handleAddPatient = () => {
    // Validate inputs
    if (!newPatientId.trim() || !newPatientName.trim() || !newPatientAge.trim()) {
      alert('Please fill all required fields');
      return;
    }
    
    // Check if patient ID already exists
    if (patients.some(patient => patient.id === newPatientId)) {
      alert('A patient with this ID already exists');
      return;
    }
    
    // Create new patient object
    const newPatient = {
      id: newPatientId,
      name: newPatientName,
      age: parseInt(newPatientAge),
      gender: newPatientGender,
      condition: newPatientCondition,
      bedId: null,
      admissionTime: null,
      dischargeTime: null
    };
    
    // Add new patient to the list
    setPatients([...patients, newPatient]);
    
    // Clear the form
    setNewPatientId('');
    setNewPatientName('');
    setNewPatientAge('');
    setNewPatientGender('Male');
    setNewPatientCondition('Stable');
  };
  
  // Function to delete a patient
  const deletePatient = (patientId) => {
    // Check if patient is currently assigned to a bed
    const patient = patients.find(p => p.id === patientId);
    if (patient && patient.bedId) {
      alert('Cannot delete a patient currently assigned to a bed. Please discharge the patient first.');
      return;
    }
    setPatients(patients.filter(patient => patient.id !== patientId));
  };
  
  // Function to assign a bed to a patient
  const assignBed = (patientId, bedId) => {
    const currentTime = new Date().toISOString();
    
    // Update patient
    setPatients(patients.map(patient => {
      if (patient.id === patientId) {
        return { 
          ...patient, 
          bedId: bedId, 
          admissionTime: currentTime,
          dischargeTime: null
        };
      }
      return patient;
    }));
    
    // Update bed
    setBeds(beds.map(bed => {
      if (bed.id === bedId) {
        return { 
          ...bed, 
          isOccupied: true, 
          patientId: patientId,
          admissionTime: currentTime
        };
      }
      return bed;
    }));
    
    setShowAssignModal(false);
    setSelectedPatient(null);
  };
  
  // Function to discharge a patient from a bed
  const dischargePatient = (patientId) => {
    const patient = patients.find(p => p.id === patientId);
    if (!patient || !patient.bedId) return;
    
    const bedId = patient.bedId;
    const currentTime = new Date().toISOString();
    
    // Update patient
    setPatients(patients.map(p => {
      if (p.id === patientId) {
        return { 
          ...p, 
          bedId: null, 
          dischargeTime: currentTime
        };
      }
      return p;
    }));
    
    // Update bed
    setBeds(beds.map(b => {
      if (b.id === bedId) {
        return { 
          ...b, 
          isOccupied: false, 
          patientId: null,
          admissionTime: null
        };
      }
      return b;
    }));
  };
  
  // Function to open assign bed modal for a specific patient
  const openAssignModal = (patient) => {
    setSelectedPatient(patient);
    setShowAssignModal(true);
  };
  
  // Function to get available beds
  const getAvailableBeds = () => {
    return beds.filter(bed => !bed.isOccupied);
  };
  
  // Function to format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString();
  };

  // Function to get bed details
  const getBedDetails = (bedId) => {
    const bed = beds.find(b => b.id === bedId);
    return bed ? `${bed.id} (${bed.ward} - ${bed.type})` : 'None';
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-800">Patient Management System</h1>
      
      {/* Add New Patient Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Register New Patient</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Patient ID</label>
              <input
                type="text"
                value={newPatientId}
                onChange={(e) => setNewPatientId(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="e.g., P105"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                value={newPatientName}
                onChange={(e) => setNewPatientName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Patient Name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Age</label>
              <input
                type="number"
                value={newPatientAge}
                onChange={(e) => setNewPatientAge(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Age"
                min="0"
                max="120"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Gender</label>
              <select
                value={newPatientGender}
                onChange={(e) => setNewPatientGender(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Condition</label>
              <select
                value={newPatientCondition}
                onChange={(e) => setNewPatientCondition(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="Critical">Critical</option>
                <option value="Serious">Serious</option>
                <option value="Fair">Fair</option>
                <option value="Stable">Stable</option>
                <option value="Good">Good</option>
              </select>
            </div>
          </div>
          
          <button
            onClick={handleAddPatient}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          >
            Register Patient
          </button>
        </div>
      </div>
      
      {/* Patient List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Patient List</h2>
          
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded w-64"
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              🔍
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Age</th>
                <th className="py-3 px-4 text-left">Gender</th>
                <th className="py-3 px-4 text-left">Condition</th>
                <th className="py-3 px-4 text-left">Bed</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Admission Time</th>
                <th className="py-3 px-4 text-left">Discharge Time</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.length > 0 ? (
                filteredPatients.map((patient) => (
                  <tr key={patient.id} className="border-b">
                    <td className="py-3 px-4">{patient.id}</td>
                    <td className="py-3 px-4">{patient.name}</td>
                    <td className="py-3 px-4">{patient.age}</td>
                    <td className="py-3 px-4">{patient.gender}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-sm ${
                        patient.condition === 'Critical' ? 'bg-red-100 text-red-800' :
                        patient.condition === 'Serious' ? 'bg-orange-100 text-orange-800' :
                        patient.condition === 'Fair' ? 'bg-yellow-100 text-yellow-800' :
                        patient.condition === 'Stable' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {patient.condition}
                      </span>
                    </td>
                    <td className="py-3 px-4">{getBedDetails(patient.bedId)}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-sm ${patient.bedId ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                        {patient.bedId ? 'Admitted' : 'Not Admitted'}
                      </span>
                    </td>
                    <td className="py-3 px-4">{formatDate(patient.admissionTime)}</td>
                    <td className="py-3 px-4">{formatDate(patient.dischargeTime)}</td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        {patient.bedId ? (
                          <button
                            onClick={() => dischargePatient(patient.id)}
                            className="px-3 py-1 rounded bg-yellow-500 text-white hover:bg-yellow-600 text-sm"
                          >
                            Discharge
                          </button>
                        ) : (
                          <button
                            onClick={() => openAssignModal(patient)}
                            className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 text-sm"
                            disabled={getAvailableBeds().length === 0}
                          >
                            Admit
                          </button>
                        )}
                        <button
                          onClick={() => deletePatient(patient.id)}
                          className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 text-sm"
                          disabled={patient.bedId !== null}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="py-4 text-center text-gray-500">
                    {searchTerm ? 'No patients match your search.' : 'No patients registered. Add a new patient to get started.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Summary Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-sm text-blue-800">Total Patients</div>
            <div className="text-2xl font-bold">{patients.length}</div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-sm text-green-800">Currently Admitted</div>
            <div className="text-2xl font-bold">{patients.filter(patient => patient.bedId).length}</div>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="text-sm text-yellow-800">Available Beds</div>
            <div className="text-2xl font-bold">{getAvailableBeds().length}</div>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-sm text-purple-800">Admission Rate</div>
            <div className="text-2xl font-bold">
              {patients.length ? Math.round((patients.filter(patient => patient.bedId).length / patients.length) * 100) : 0}%
            </div>
          </div>
        </div>
      </div>

      {/* Bed Assignment Modal */}
      {showAssignModal && selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Assign Bed to {selectedPatient.name}</h3>
            
            {getAvailableBeds().length > 0 ? (
              <>
                <p className="mb-4">Select an available bed to assign to this patient:</p>
                <div className="max-h-60 overflow-y-auto mb-4">
                  {getAvailableBeds().map(bed => (
                    <div 
                      key={bed.id}
                      className="p-3 border border-gray-200 rounded mb-2 hover:bg-gray-50 cursor-pointer"
                      onClick={() => assignBed(selectedPatient.id, bed.id)}
                    >
                      <div className="font-medium">{bed.id}</div>
                      <div className="text-sm text-gray-600">Ward: {bed.ward} • Type: {bed.type}</div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-red-500 mb-4">No beds are currently available.</p>
            )}
            
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setShowAssignModal(false);
                  setSelectedPatient(null);
                }}
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}