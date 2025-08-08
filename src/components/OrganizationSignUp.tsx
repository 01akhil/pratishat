
// import React, { useState, ChangeEvent, FormEvent } from 'react';
// import { ChevronDown } from 'lucide-react';

// interface OrganizationSignUpProps {
//   onToggle: () => void;
// }

// const OrganizationSignUp: React.FC<OrganizationSignUpProps> = ({ onToggle }) => {
//   const [file, setFile] = useState<File | null>(null);

//   // ✅ Fix: Type the event as ChangeEvent<HTMLInputElement>
//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setFile(e.target.files[0]);
//     }
//   };

//   const [formData, setFormData] = useState({
//     organizationName: '',
//     name: '',
//     yearEstablished: '',
//     nationality: '',
//     state: '',
//     website: '',
//     address: '',
//     email: '',
//     password: '',
//     interests: '',
//     sector: '',
//     managedBy: '',
//     isOrganization: 'true',
//     managerEmail: '',
//   });

//   const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = (e: FormEvent) => {
//     e.preventDefault();
//     for (const key in formData) {
//       if (!formData[key as keyof typeof formData]) {
//         alert(`Please fill in the ${key} field`);
//         return;
//       }
//     }

//     alert('Organization SignUp submitted');

//     // TODO: Upload file and send formData to backend
//   };

//   return (
//     <div className="h-auto w-full px-4 py-8 md:px-8 lg:px-16 overflow-hidden">
//       <form onSubmit={handleSubmit}>
//         <h2 className="text-2xl font-bold mb-6 text-gray-800">About you</h2>

//         <div className="mb-10">
//           <h3 className="text-xl font-semibold text-gray-800">Organization Info</h3>
//           <p className="text-sm text-gray-600 mb-4">Provide your personal info</p>

//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm text-gray-600 mb-1">Organization Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 bg-gray-100 rounded-md border border-gray-200"
//               />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div>
//                 <label className="block text-sm text-gray-600 mb-1">Year Of Establishment</label>
//                 <div className="relative">
//                   <select
//                     name="yearEstablished"
//                     value={formData.yearEstablished}
//                     onChange={handleChange}
//                     className="w-full appearance-none px-4 py-2 bg-gray-100 rounded-md border border-gray-200"
//                   >
//                     <option value="">Select Year</option>
//                     {Array.from({ length: 2025 - 1950 + 1 }, (_, index) => {
//                       const year = 1950 + index;
//                       return (
//                         <option key={year} value={year}>
//                           {year}
//                         </option>
//                       );
//                     })}
//                   </select>
//                   <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//                     <ChevronDown />
//                   </div>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm text-gray-600 mb-1">Nationality</label>
//                 <select
//                   name="nationality"
//                   value={formData.nationality}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 bg-gray-100 rounded-md border border-gray-200 appearance-none"
//                 >
//                   <option value="">Select Nationality</option>
//                   <option value="India">India</option>
//                   <option value="United States">United States</option>
//                   <option value="United Kingdom">United Kingdom</option>
//                   <option value="Australia">Australia</option>
//                   <option value="Germany">Germany</option>
//                   {/* Add more as needed */}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm text-gray-600 mb-1">State</label>
//                 <input
//                   type="text"
//                   name="state"
//                   value={formData.state}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 bg-gray-100 rounded-md border border-gray-200"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm text-gray-600 mb-1">Profile Picture</label>
//               <input type="file" onChange={handleFileChange} className="w-full text-sm text-gray-700" />
//             </div>

//             <div>
//               <label className="block text-sm text-gray-600 mb-1">Website</label>
//               <input
//                 type="text"
//                 name="website"
//                 value={formData.website}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 bg-gray-100 rounded-md border border-gray-200"
//               />
//             </div>

//             <div>
//               <label className="block text-sm text-gray-600 mb-1">Address</label>
//               <input
//                 type="text"
//                 name="address"
//                 value={formData.address}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 bg-gray-100 rounded-md border border-gray-200"
//               />
//             </div>

//             <div>
//               <label className="block text-sm text-gray-600 mb-1">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 bg-gray-100 rounded-md border border-gray-200"
//               />
//             </div>

//             <div>
//               <label className="block text-sm text-gray-600 mb-1">Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 bg-gray-100 rounded-md border border-gray-200"
//               />
//             </div>
//           </div>
//         </div>

//         <div className="mb-10">
//           <h3 className="text-xl font-semibold text-gray-800 mb-2">Interests</h3>
//           <select
//             name="interests"
//             value={formData.interests}
//             onChange={handleChange}
//             className="w-full px-4 py-2 bg-gray-100 rounded-md border border-gray-200"
//           >
//             <option value="">Select Interest</option>
//             <option value="Software Development">Software Development</option>
//             <option value="Data Science">Data Science</option>
//             <option value="Cybersecurity">Cybersecurity</option>
//             <option value="AI">AI</option>
//             <option value="UI/UX">UI/UX</option>
//           </select>
//         </div>

//         <div className="mb-10">
//           <h3 className="text-xl font-semibold text-gray-800 mb-2">Sector</h3>
//           <input
//             type="text"
//             name="sector"
//             value={formData.sector}
//             onChange={handleChange}
//             className="w-full px-4 py-2 bg-gray-100 rounded-md border border-gray-200"
//           />
//         </div>

//         <div className="mb-10">
//           <h3 className="text-xl font-semibold text-gray-800 mb-2">Manager Info</h3>
//           <input
//             type="text"
//             name="managedBy"
//             value={formData.managedBy}
//             onChange={handleChange}
//             placeholder="Manager Name"
//             className="w-full mb-3 px-4 py-2 bg-gray-100 rounded-md border border-gray-200"
//           />
//           <input
//             type="email"
//             name="managerEmail"
//             value={formData.managerEmail}
//             onChange={handleChange}
//             placeholder="Manager Email"
//             className="w-full px-4 py-2 bg-gray-100 rounded-md border border-gray-200"
//           />
//         </div>

//         <div className="flex justify-end">
//           <button
//             type="submit"
//             className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
//           >
//             Proceed
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default OrganizationSignUp;










import React, { useState, ChangeEvent, FormEvent, useRef, useEffect } from 'react';
import { ChevronDown, X } from 'lucide-react';

interface OrganizationSignUpProps {
  onToggle: () => void;
}

const OrganizationSignUp: React.FC<OrganizationSignUpProps> = ({ onToggle }) => {
  const [file, setFile] = useState<File | null>(null);
  const [showInterestDropdown, setShowInterestDropdown] = useState(false);
  const [customInterest, setCustomInterest] = useState('');
  const [showSectorDropdown, setShowSectorDropdown] = useState(false);
  const [customSector, setCustomSector] = useState('');
  const interestRef = useRef<HTMLDivElement>(null);
  const sectorRef = useRef<HTMLDivElement>(null);

  const predefinedInterests = [
    'Software Development',
    'Data Science',
    'Cybersecurity',
    'Artificial Intelligence',
    'UI/UX Design',
    'Mobile Development',
    'Web Development',
    'Cloud Computing',
    'DevOps',
    'Machine Learning',
    'Blockchain',
    'Game Development',
    'Digital Marketing',
    'E-commerce',
    'Fintech'
  ];

  const predefinedSectors = [
    'Technology',
    'Healthcare',
    'Finance',
    'Education',
    'Manufacturing',
    'Retail',
    'Hospitality',
    'Transportation',
    'Real Estate',
    'Energy',
    'Agriculture',
    'Entertainment',
    'Media',
    'Telecommunications',
    'Automotive',
    'Aerospace',
    'Construction',
    'Food & Beverage',
    'Pharmaceutical',
    'Consulting',
    'Legal Services',
    'Government',
    'Non-profit',
    'Insurance',
    'Banking',
    'E-commerce',
    'Logistics',
    'Mining',
    'Environmental',
    'Sports & Recreation'
  ];

  const countries = [
    'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Argentina', 'Armenia', 'Australia',
    'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium',
    'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei',
    'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde',
    'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 'Costa Rica',
    'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic',
    'East Timor', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia',
    'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana',
    'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras',
    'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy',
    'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'North Korea', 'South Korea',
    'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya',
    'Liechtenstein', 'Lithuania', 'Luxembourg', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives',
    'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia',
    'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia',
    'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Norway',
    'Oman', 'Pakistan', 'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines',
    'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis',
    'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'São Tomé and Príncipe',
    'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia',
    'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Sudan', 'Spain', 'Sri Lanka',
    'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania',
    'Thailand', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan',
    'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States',
    'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'
  ];

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const [formData, setFormData] = useState({
    organizationName: '',
    name: '',
    yearEstablished: '',
    nationality: '',
    state: '',
    website: '',
    address: '',
    email: '',
    password: '',
    interests: [] as string[],
    sector: '',
    managedBy: '',
    isOrganization: 'true',
    managerEmail: '',
    managerWhatsapp: '',
    requestVerification: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const addCustomInterest = () => {
    if (customInterest.trim() && !formData.interests.includes(customInterest.trim())) {
      setFormData(prev => ({
        ...prev,
        interests: [...prev.interests, customInterest.trim()]
      }));
      setCustomInterest('');
    }
  };

  const removeInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest)
    }));
  };

  const handleSectorSelect = (sector: string) => {
    setFormData(prev => ({ ...prev, sector }));
    setShowSectorDropdown(false);
    setCustomSector('');
  };

  const addCustomSector = () => {
    if (customSector.trim()) {
      setFormData(prev => ({ ...prev, sector: customSector.trim() }));
      setShowSectorDropdown(false);
      setCustomSector('');
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (interestRef.current && !interestRef.current.contains(event.target as Node)) {
        setShowInterestDropdown(false);
      }
      if (sectorRef.current && !sectorRef.current.contains(event.target as Node)) {
        setShowSectorDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // const handleSubmit = () => {
    
  //   // Validate required fields
  //   const requiredFields = ['name', 'yearEstablished', 'nationality', 'state', 'email', 'password', 'sector', 'managedBy', 'managerEmail'];
    
  //   for (const field of requiredFields) {
  //     if (!formData[field as keyof typeof formData]) {
  //       alert(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field`);
  //       return;
  //     }
  //   }

  //   if (formData.interests.length === 0) {
  //     alert('Please select at least one interest');
  //     return;
  //   }

  //   alert('Organization SignUp submitted');
  //   console.log('Form data:', formData);
  //   console.log('File:', file);
  // };


  const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();

  // Validate required fields
  const requiredFields = [
    'name', 
    'yearEstablished', 
    'nationality', 
    'state', 
    'email', 
    'password', 
    'sector', 
    'managedBy', 
    'managerEmail'
  ];
  
  for (const field of requiredFields) {
    if (!formData[field as keyof typeof formData]) {
      alert(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field`);
      return;
    }
  }

  if (formData.interests.length === 0) {
    alert('Please select at least one interest');
    return;
  }

  const form = new FormData();
  form.append('isOrganization', 'true');
  form.append('organizationName', formData.name);
  form.append('yearEstablished', formData.yearEstablished);
  form.append('nationality', formData.nationality);
  form.append('state', formData.state);
  form.append('email', formData.email);
  form.append('password', formData.password);
  form.append('website', formData.website);
  form.append('address', formData.address);
  form.append('interests', JSON.stringify(formData.interests));
  form.append('sector', formData.sector);
  form.append('managedBy', formData.managedBy);
  form.append('managerEmail', formData.managerEmail);
  form.append('managerWhatsapp', formData.managerWhatsapp);
  form.append('requestVerification', formData.requestVerification.toString());
  
  if (file) form.append('profile_image', file);
  
  try {
    const res = await fetch('/api/signup', {
      method: 'POST',
      body: form,
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);
      router.push('/dashboard');
    } else {
      alert(data.error || 'Something went wrong.');
    }
  } catch (err) {
    console.error(err);
    alert('Request failed.');
  }
};


  return (
    <div className="h-auto w-full px-4 py-8 md:px-8 lg:px-16 overflow-hidden">
      <div onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">About you</h2>

        <div className="mb-10">
          <h3 className="text-xl font-semibold text-gray-800">Organization Info</h3>
          <p className="text-sm text-gray-600 mb-4">Provide your organization info</p>

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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                        <option key={year} value={year}>
                          {year}
                        </option>
                      );
                    })}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <ChevronDown className="h-4 w-4" />
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
                    className="w-full appearance-none px-4 py-2 bg-gray-100 rounded-md border border-gray-200"
                  >
                    <option value="">Select Country</option>
                    {countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-100 rounded-md border border-gray-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Profile Picture</label>
              <input type="file" onChange={handleFileChange} className="w-full text-sm text-gray-700" />
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

        <div className="mb-10">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Interests</h3>
          
          <div className="relative" ref={interestRef}>
            <div
              className="w-full px-4 py-2 bg-gray-100 rounded-md border border-gray-200 cursor-pointer flex justify-between items-center"
              onClick={() => setShowInterestDropdown(!showInterestDropdown)}
            >
              <span className="text-gray-700">
                {formData.interests.length > 0 ? `${formData.interests.length} interest(s) selected` : 'Select Interests'}
              </span>
              <ChevronDown className="h-4 w-4" />
            </div>

            {showInterestDropdown && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                <div className="p-2 border-b">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={customInterest}
                      onChange={(e) => setCustomInterest(e.target.value)}
                      placeholder="Add custom interest..."
                      className="flex-1 px-3 py-1 text-sm border border-gray-300 rounded"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomInterest())}
                    />
                    <button
                      type="button"
                      onClick={addCustomInterest}
                      className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Add
                    </button>
                  </div>
                </div>
                
                {predefinedInterests.map((interest) => (
                  <div key={interest} className="flex items-center px-3 py-2 hover:bg-gray-50">
                    <input
                      type="checkbox"
                      id={interest}
                      checked={formData.interests.includes(interest)}
                      onChange={() => handleInterestToggle(interest)}
                      className="mr-2"
                    />
                    <label htmlFor={interest} className="text-sm cursor-pointer flex-1">
                      {interest}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Selected Interests Cards */}
          {formData.interests.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {formData.interests.map((interest) => (
                <div
                  key={interest}
                  className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  <span>{interest}</span>
                  <button
                    type="button"
                    onClick={() => removeInterest(interest)}
                    className="ml-2 hover:bg-blue-200 rounded-full p-1"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mb-10">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Sector</h3>
          <div className="relative" ref={sectorRef}>
            <div
              className="w-full px-4 py-2 bg-gray-100 rounded-md border border-gray-200 cursor-pointer flex justify-between items-center"
              onClick={() => setShowSectorDropdown(!showSectorDropdown)}
            >
              <span className="text-gray-700">
                {formData.sector || 'Select Sector'}
              </span>
              <ChevronDown className="h-4 w-4" />
            </div>

            {showSectorDropdown && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                <div className="p-2 border-b">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={customSector}
                      onChange={(e) => setCustomSector(e.target.value)}
                      placeholder="Add custom sector..."
                      className="flex-1 px-3 py-1 text-sm border border-gray-300 rounded"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomSector())}
                    />
                    <button
                      type="button"
                      onClick={addCustomSector}
                      className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Add
                    </button>
                  </div>
                </div>
                
                {predefinedSectors.map((sector) => (
                  <div
                    key={sector}
                    className="px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm"
                    onClick={() => handleSectorSelect(sector)}
                  >
                    {sector}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mb-10">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Manager Info</h3>
          <div className="space-y-3">
            <input
              type="text"
              name="managedBy"
              value={formData.managedBy}
              onChange={handleChange}
              placeholder="Manager Name"
              className="w-full px-4 py-2 bg-gray-100 rounded-md border border-gray-200"
            />
            <input
              type="email"
              name="managerEmail"
              value={formData.managerEmail}
              onChange={handleChange}
              placeholder="Manager Email"
              className="w-full px-4 py-2 bg-gray-100 rounded-md border border-gray-200"
            />
            <input
              type="tel"
              name="managerWhatsapp"
              value={formData.managerWhatsapp}
              onChange={handleChange}
              placeholder="Manager WhatsApp Number"
              className="w-full px-4 py-2 bg-gray-100 rounded-md border border-gray-200"
            />
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="requestVerification"
              name="requestVerification"
              checked={formData.requestVerification}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="requestVerification" className="text-sm text-gray-700 cursor-pointer">
              Request the organization verification
            </label>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrganizationSignUp;