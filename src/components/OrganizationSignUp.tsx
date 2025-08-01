import React, { useState, ChangeEvent, FormEvent } from 'react';
import { ChevronDown } from 'lucide-react';

interface OrganizationSignUpProps {
  onToggle: () => void;
}

const OrganizationSignUp: React.FC<OrganizationSignUpProps> = ({ onToggle }) => {

  const [file, setFile] = useState(null);
  
  
  const handleFileChange = (e) => {
      setFile(e.target.files[0]);
    };

  
  const [formData, setFormData] = useState({
    organizationName: '',
     name: "",
    yearEstablished: "",
    nationality: "",
    state: "",
    website: "",
    address: "",
    email:"",
    password:"",
    interests: "",
    sector: "",
    managedBy: "",
    isOrganization:"true",
    managerEmail: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    for (const key in formData) {
      if (!formData[key as keyof typeof formData]) {
        alert(`Please fill in the ${key} field`);
        return;
      }
    }
    alert('Organization SignUp submitted');
    // API call here
  };

  return (
  
    <div className="h-auto w-full px-4 py-8 md:px-8 lg:px-16 overflow-hidden">
      <div className="">
        
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold mb-6" style={{ color: "#2d3748" }}>
          About you
        </h2>

        
        </div>

        <div className="mb-10">
          <div className="flex justify-between ">
            <div>
              <h3 className="text-xl font-semibold" style={{ color: "#2d3748" }}>
                Organization Info
              </h3>
              <p className="text-sm text-gray-600">Provide your personal info</p>
            </div>

            <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Organization Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-100 rounded-md border border-gray-200"
              />
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Year Of Establishment</label>
                  <div className="relative">
                    <select
                      name="yearEstablished"
                      value={formData.yearEstablished}
                      onChange={handleChange}
                      className="w-full appearance-none px-4 py-2 bg-gray-100 rounded-md border border-gray-200"
                    >
                      <option value="">Select Year</option>
                      {Array.from({ length: 2025 - 1950 + 1 }, (_, index) => {
                        const year = 1950 + index;
                        return (
                          <option key={year} value={year} className="">
                            {year}
                          </option>
                        );
                      })}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <ChevronDown />
                    </div>
                  </div>
              </div>
              
              <div>
  <label className="block text-sm text-gray-600 mb-1">Nationality</label>
  <div className="relative">
    <select
      name="nationality"
      value={formData.nationality}
      onChange={handleChange}
      className="w-full px-4 py-2 bg-gray-100 rounded-md border border-gray-200 appearance-none"
    >
      <option value="">Select Nationality</option>
      <option value="Afghanistan">Afghanistan</option>
      <option value="Albania">Albania</option>
      <option value="Algeria">Algeria</option>
      <option value="Andorra">Andorra</option>
      <option value="Angola">Angola</option>
      <option value="Argentina">Argentina</option>
      <option value="Australia">Australia</option>
      <option value="Austria">Austria</option>
      <option value="Bangladesh">Bangladesh</option>
      <option value="Belgium">Belgium</option>
      <option value="Bhutan">Bhutan</option>
      <option value="Brazil">Brazil</option>
      <option value="Canada">Canada</option>
      <option value="China">China</option>
      <option value="Denmark">Denmark</option>
      <option value="Egypt">Egypt</option>
      <option value="Finland">Finland</option>
      <option value="France">France</option>
      <option value="Germany">Germany</option>
      <option value="India">India</option>
      <option value="Indonesia">Indonesia</option>
      <option value="Italy">Italy</option>
      <option value="Japan">Japan</option>
      <option value="Mexico">Mexico</option>
      <option value="Nepal">Nepal</option>
      <option value="Netherlands">Netherlands</option>
      <option value="New Zealand">New Zealand</option>
      <option value="Norway">Norway</option>
      <option value="Pakistan">Pakistan</option>
      <option value="Russia">Russia</option>
      <option value="Singapore">Singapore</option>
      <option value="South Africa">South Africa</option>
      <option value="Spain">Spain</option>
      <option value="Sri Lanka">Sri Lanka</option>
      <option value="Sweden">Sweden</option>
      <option value="Switzerland">Switzerland</option>
      <option value="United Kingdom">United Kingdom</option>
      <option value="United States">United States</option>
      <option value="Vietnam">Vietnam</option>
      {/* Add more countries if you want */}
    </select>
    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
      <ChevronDown />
    </div>
  </div>
</div>

              <div>
              <label className="block text-sm text-gray-600 mb-1">State</label>
                <div className="relative">
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-100 rounded-md border border-gray-200"
                  />
                 
                </div>
              </div>

              
            </div>

            <div>
      <label className="block text-sm text-gray-600 mb-1">Profile Picture</label>
      <div className="flex items-center justify-between w-full px-4 py-2 bg-gray-100 rounded-md border border-gray-200">
        <input type="file" onChange={handleFileChange} className="flex-1 text-gray-600" />
        
      </div>
    </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Website</label>
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-100 rounded-md border border-gray-200"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-100 rounded-md border border-gray-200"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-100 rounded-md border border-gray-200"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-100 rounded-md border border-gray-200"
              />
            </div>
          </div>

            
          </div>

          
        </div>

        {/* <div className="mb-10 flex items-center ">
          <div className="mb-2 mr-[10vw]">
            <h3 className="text-xl font-semibold" style={{ color: "#2d3748" }}>
              Interests
            </h3>
            <p className="text-sm text-gray-600">Provide your interests</p>
          </div>

          <div className="w-full relative flex items-center justify-center">
            <input
              type="text"
              name="interests"
              value={formData.interests}
              onChange={handleChange}
              className="w-[71vw] px-4 py-2 bg-gray-100 rounded-md border border-gray-200"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <ChevronDown />
            </div>
          </div>
        </div> */}

        <div className="mb-10 flex items-center">
  <div className="mb-2 mr-24">
    <h3 className="text-xl font-semibold" style={{ color: "#2d3748" }}>
      Interests
    </h3>
    <p className="text-sm text-gray-600">Select your interest</p>
  </div>

  <div className="w-[72vw] relative flex items-center justify-center">
    <select
      name="interests"
      value={formData.interests}
      onChange={handleChange}
      className="w-full px-4 py-2 bg-gray-100 rounded-md border border-gray-200 appearance-none"
    >
      <option value="" disabled>
        -- Select your interest --
      </option>
      <option value="Software Development">Software Development</option>
      <option value="Data Science">Data Science</option>
      <option value="Artificial Intelligence">Artificial Intelligence</option>
      <option value="Cybersecurity">Cybersecurity</option>
      <option value="UI/UX Design">UI/UX Design</option>
      <option value="Cloud Computing">Cloud Computing</option>
      <option value="Digital Marketing">Digital Marketing</option>
      <option value="Product Management">Product Management</option>
      <option value="Finance">Finance</option>
      <option value="Human Resources">Human Resources</option>
      <option value="Consulting">Consulting</option>
      <option value="Healthcare Technology">Healthcare Technology</option>
      <option value="Entrepreneurship">Entrepreneurship</option>
    </select>

    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
      <ChevronDown />
    </div>
  </div>
</div>


        <div className="mb-10 flex  justify-between">
          <div className="mb-2 mr-[10vw]">
            <h3 className="text-xl font-semibold" style={{ color: "#2d3748" }}>
              Sector
            </h3>
            <p className="text-sm text-gray-600">Provide your organization's sector</p>
          </div>

          <div className="space-y-4 w-full">
            <div className="relative flex items-center justify-center">
              <input
                type="text"
                name="sector"
                value={formData.sector}
                onChange={handleChange}
                className="w-[71vw] px-4 py-2 bg-gray-100 rounded-md border border-gray-200"
              />
              
            </div>

            
          </div>
        </div>

        <div className="mb-10 flex  justify-between">
          <div className="mb-2 mr-3">
            <h3 className="text-xl font-semibold" style={{ color: "#2d3748" }}>
              Manager
            </h3>
            <p className="text-sm text-gray-600">Managed By</p>
          </div>

          <div className="space-y-4 w-[71vw] ">
            <input
              type="text"
              name="managedBy"
              value={formData.managedBy}
              onChange={handleChange}
              placeholder="This account will be managed by"
              className="w-full px-4 py-2 bg-gray-100 rounded-md border border-gray-200"
            />

            <input
              type="email"
              name="managerEmail"
              value={formData.managerEmail}
              onChange={handleChange}
              placeholder="Manager email address"
              className="w-full px-4 py-2 bg-gray-100 rounded-md border border-gray-200"
            />
          </div>
          
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Proceed
          </button>
        </div>
      </form>
    </div>

  );
};

export default OrganizationSignUp;
