import { useState, useMemo } from "react";
import { Search, Users, UserCog, ChevronDown } from "lucide-react"; // Importing Icons
import "@fontsource/poppins"; // Importing Poppins font

// Sample User Data
const usersData = [
  { id: 1, name: "John Doe", email: "john.doe@example.com", role: "Admin", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com", role: "Editor", status: "Active" },
  { id: 3, name: "Peter Jones", email: "peter.jones@example.com", role: "Viewer", status: "Inactive" },
  { id: 4, name: "Mary Brown", email: "mary.brown@example.com", role: "Admin", status: "Active" },
  { id: 5, name: "David Lee", email: "david.lee@example.com", role: "Editor", status: "Inactive" },
  { id: 6, name: "Susan White", email: "susan.white@example.com", role: "Viewer", status: "Active" },
  { id: 7, name: "Susan White", email: "susan.white@example.com", role: "Viewer", status: "Active" },
  { id: 8, name: "Ken White", email: "ken.white@example.com", role: "Viewer", status: "Inactive" },
  { id: 9, name: "Karthi Perumal", email: "karthi.perumal@example.com", role: "Admin", status: "Active" },
  { id: 10, name: "Kevin", email: "kevin@example.com", role: "Viewer", status: "Viewer" }
];

// Dropdown options
const userRoles = ["All", "Admin", "Editor", "Viewer"];
const userStatus = ["All", "Active", "Inactive"];
const NoDataAvailable ="No Data Available"

export default function DataTable() {
  // State management for filters
  const [searchInput, setSearch] = useState("");
  const [filterRole, setRole] = useState("All");
  const [filterStatus, setStatus] = useState("All");

  // Filtering logic: Applies search, role, and status filters
  const filteredData = useMemo(() => {
    return usersData.filter(user =>
      (filterRole === "All" || user.role === filterRole) && // Role filter
      (filterStatus === "All" || user.status === filterStatus) && // Status filter
      (user.name.toLowerCase().includes(searchInput.toLowerCase()) || 
       user.email.toLowerCase().includes(searchInput.toLowerCase()))  // Search filter
    );
  }, [searchInput, filterRole, filterStatus]);

  return (
    <div className="min-h-screen bg-[#fafbff] flex justify-center p-6 font-[Poppins]">
      <div className="max-w-[1440px] w-full bg-white shadow-xl rounded-2xl p-6">
        
        {/* Header Section: Title & Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">User Management</h2>
          <div className="flex flex-wrap gap-4 justify-end">
            
            {/* Search Input with Icon */}
            <div className="relative w-[220px]">
              <input 
                type="text" 
                placeholder="Search by name or email..." 
                value={searchInput} 
                onChange={(e) => setSearch(e.target.value)} 
                className="border rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none text-sm placeholder:text-xs shadow-sm w-full"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>

            {/* Role Filter Dropdown with Icon */}
            <div className="relative w-[150px]">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <select 
                onChange={(e) => setRole(e.target.value)} 
                value={filterRole} 
                className="appearance-none border rounded-lg pl-10 pr-6 py-2 focus:ring-2 focus:ring-blue-400 outline-none shadow-sm text-sm w-full bg-white"
              >
                {userRoles.map(role => (
                  <option key={role} value={role}>{role}</option> // Maped Select Role Option
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
            </div>

            {/* Status Filter Dropdown with Icon */}
            <div className="relative w-[150px]">
              <UserCog className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <select 
                onChange={(e) => setStatus(e.target.value)} 
                value={filterStatus} 
                className="appearance-none border rounded-lg pl-10 pr-6 py-2 focus:ring-2 focus:ring-blue-400 outline-none shadow-sm text-sm w-full bg-white"
              >
                {userStatus.map(status => 
                  <option key={status} value={status}>{status}</option> // Maped Select Status Option
                )}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-gray-10 shadow-md rounded-lg">
            <thead>
              <tr className="bg-blue-100 text-blue-600 text-left text-sm">
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {/* Fitech Data in Table*/}
              {filteredData.length ? filteredData.map((user) => (
                <tr key={user.id} className="border-t hover:bg-blue-50 transition-all text-left">
                  <td className="p-6 text-gray-800 text-sm">{user.name}</td>
                  <td className="p-6 text-gray-800 text-sm">{user.email}</td>
                  <td className="p-6 text-gray-800 text-sm">{user.role}</td>
                  <td className={user.status === "Active" ? "text-green-500 p-4 text-sm" : "text-red-500 p-4 text-sm"}>
                    {user.status}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="4" className="p-6 text-center text-gray-500 text-sm">{NoDataAvailable}</td>  {/* Filter No Data in Table*/}
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
