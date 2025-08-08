
'use client';

import React, { useState, ChangeEvent, FormEvent, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, X } from 'lucide-react';

interface PersonalSignUpProps {
  onToggle: () => void;
}

const PersonalSignUp: React.FC<PersonalSignUpProps> = ({ onToggle }) => {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [showInterestDropdown, setShowInterestDropdown] = useState(false);
  const [customInterest, setCustomInterest] = useState('');
  const [showProfessionDropdown, setShowProfessionDropdown] = useState(false);
  const [customProfession, setCustomProfession] = useState('');
  const interestRef = useRef<HTMLDivElement>(null);
  const professionRef = useRef<HTMLDivElement>(null);

  const [dragActive, setDragActive] = useState(false);
const fileInputRef = useRef<HTMLInputElement>(null);


const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
  e.preventDefault();
  e.stopPropagation();
  setDragActive(true);
};

const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
  e.preventDefault();
  e.stopPropagation();
  setDragActive(false);
};

const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
  e.preventDefault();
  e.stopPropagation();
  setDragActive(true);
};

const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
  e.preventDefault();
  e.stopPropagation();
  setDragActive(false);
  
  if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
    setFile(e.dataTransfer.files[0]);
  }
};
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
    'Fintech',
    'Product Management',
    'Business Analysis',
    'Project Management',
    'Quality Assurance',
    'Network Engineering',
    'Database Administration',
    'System Administration',
    'IT Consulting',
    'Technical Writing',
    'Data Analysis',
    'Business Intelligence',
    'Robotics',
    'IoT',
    'Augmented Reality',
    'Virtual Reality',
    'Computer Vision',
    'Natural Language Processing',
    'Big Data',
    'Embedded Systems',
    'Computer Graphics',
    'Human-Computer Interaction',
    'Bioinformatics',
    'Quantum Computing',
    'Ethical Hacking',
    'Penetration Testing',
    'Social Media Marketing',
    'Content Creation',
    'SEO',
    'Graphic Design',
    'Animation',
    'Video Editing',
    'Photography',
    'Music Production',
    'Creative Writing',
    'Entrepreneurship',
    'Startups',
    'Venture Capital',
    'Investment Banking',
    'Financial Planning',
    'Accounting',
    'Taxation',
    'Insurance',
    'Real Estate',
    'Healthcare',
    'Biotechnology',
    'Pharmaceuticals',
    'Medical Research',
    'Nursing',
    'Psychology',
    'Counseling',
    'Teaching',
    'Academic Research',
    'Journalism',
    'Public Relations',
    'Event Management',
    'Hospitality',
    'Tourism',
    'Fashion Design',
    'Interior Design',
    'Architecture',
    'Civil Engineering',
    'Mechanical Engineering',
    'Electrical Engineering',
    'Chemical Engineering',
    'Aerospace Engineering',
    'Environmental Science',
    'Sustainability',
    'Agriculture',
    'Food Technology',
    'Supply Chain Management',
    'Logistics',
    'Human Resources',
    'Recruitment',
    'Law',
    'Legal Services',
    'Public Policy',
    'International Relations',
    'Non-profit',
    'Social Work',
    'Volunteering'
  ];

  const predefinedProfessions = [
    'Software Engineer',
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'Mobile Developer',
    'DevOps Engineer',
    'Data Scientist',
    'Data Analyst',
    'Machine Learning Engineer',
    'AI Researcher',
    'Cybersecurity Specialist',
    'Network Engineer',
    'Systems Administrator',
    'Database Administrator',
    'Cloud Architect',
    'UI/UX Designer',
    'Graphic Designer',
    'Product Manager',
    'Project Manager',
    'Business Analyst',
    'Quality Assurance Engineer',
    'Technical Writer',
    'IT Consultant',
    'Digital Marketer',
    'SEO Specialist',
    'Content Creator',
    'Social Media Manager',
    'Video Editor',
    'Animator',
    'Photographer',
    'Musician',
    'Writer',
    'Entrepreneur',
    'Startup Founder',
    'Venture Capitalist',
    'Investment Banker',
    'Financial Analyst',
    'Accountant',
    'Tax Consultant',
    'Insurance Agent',
    'Real Estate Agent',
    'Doctor',
    'Surgeon',
    'Nurse',
    'Pharmacist',
    'Biotechnologist',
    'Medical Researcher',
    'Psychologist',
    'Counselor',
    'Teacher',
    'Professor',
    'Academic Researcher',
    'Journalist',
    'Public Relations Specialist',
    'Event Planner',
    'Hotel Manager',
    'Tour Guide',
    'Fashion Designer',
    'Interior Designer',
    'Architect',
    'Civil Engineer',
    'Mechanical Engineer',
    'Electrical Engineer',
    'Chemical Engineer',
    'Aerospace Engineer',
    'Environmental Scientist',
    'Sustainability Consultant',
    'Agricultural Specialist',
    'Food Technologist',
    'Supply Chain Manager',
    'Logistics Coordinator',
    'HR Manager',
    'Recruiter',
    'Lawyer',
    'Legal Advisor',
    'Policy Analyst',
    'Diplomat',
    'Non-profit Manager',
    'Social Worker',
    'Volunteer Coordinator',
    'Student',
    'Freelancer',
    'Retired'
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

  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    gender: "",
    nationality: "",
    state: "",
    interests: [] as string[],
    profession: "",
    experience: "",
    email: "",
    password: "",
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
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

  const addCustomProfession = () => {
    if (customProfession.trim()) {
      setFormData(prev => ({ ...prev, profession: customProfession.trim() }));
      setShowProfessionDropdown(false);
      setCustomProfession('');
    }
  };

  const handleProfessionSelect = (profession: string) => {
    setFormData(prev => ({ ...prev, profession }));
    setShowProfessionDropdown(false);
    setCustomProfession('');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (interestRef.current && !interestRef.current.contains(event.target as Node)) {
        setShowInterestDropdown(false);
      }
      if (professionRef.current && !professionRef.current.contains(event.target as Node)) {
        setShowProfessionDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validate required fields
    const requiredFields = ['name', 'dob', 'gender', 'nationality', 'state', 'email', 'password', 'profession', 'experience'];
    
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
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'interests') {
        form.append(key, JSON.stringify(value));
      } else {
        form.append(key, value.toString());
      }
    });
    if (file) form.append("profile_image", file);
    form.append("ifOrganization", "false");
    
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        body: form,
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem('userId', data.userId);
        router.push('/dashboard');
      } else {
        alert(data.error || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      alert("Request failed.");
    }
  };

  return (
    <div className="h-auto w-full px-4 py-8 md:px-8 lg:px-16 overflow-hidden">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold mb-6" style={{ color: "#2d3748" }}>
            About you
          </h2>
        </div>

        <div className="mb-10">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div>
              <h3 className="text-xl font-semibold" style={{ color: "#2d3748" }}>
                Personal Info
              </h3>
              <p className="text-sm text-gray-600">Provide your personal info</p>
            </div>

            <div className="space-y-4 w-full md:w-auto">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-100 rounded-md border border-gray-200"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">DOB</label>
                  <div className="relative">
                    <select
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      className="w-full appearance-none px-4 py-2 bg-gray-100 rounded-md border border-gray-200"
                      required
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
                      <ChevronDown />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">Gender</label>
                  <div className="relative">
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-gray-100 rounded-md border border-gray-200 appearance-none"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                      <option value="Prefer not to say">Prefer not to say</option>
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
                      required
                    >
                      <option value="">Select Nationality</option>
                      {countries.map(country => (
                        <option key={country} value={country}>{country}</option>
                      ))}
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
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-100 rounded-md border border-gray-200"
                  required
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
                  required
                />
              </div>

              {/* <div>
                <label className="block text-sm text-gray-600 mb-1">Profile Picture</label>
                <div className="flex items-center justify-between w-full px-4 py-2 bg-gray-100 rounded-md border border-gray-200">
                  <input type="file" onChange={handleFileChange} className="flex-1 text-gray-600 text-sm" />
                </div>
              </div> */}

              <div>
  <label className="block text-sm text-gray-600 mb-1">Profile Picture</label>
  <div 
    className={`w-full border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
      dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
    }`}
    onClick={() => fileInputRef.current?.click()}
    onDragEnter={handleDragEnter}
    onDragLeave={handleDragLeave}
    onDragOver={handleDragOver}
    onDrop={handleDrop}
  >
    <input 
      type="file" 
      ref={fileInputRef}
      onChange={handleFileChange} 
      className="hidden" 
    />
    {file ? (
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-medium text-gray-700">{file.name}</span>
          <button 
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setFile(null);
            }}
            className="text-red-500 hover:text-red-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <span className="text-sm text-gray-500">Click or drag to replace</span>
      </div>
    ) : (
      <div className="flex flex-col items-center">
        <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
        </svg>
        <p className="text-sm text-gray-600">
          <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
        </p>
        <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 5MB</p>
      </div>
    )}
  </div>
</div>

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
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Profession</h3>
          <div className="relative" ref={professionRef}>
            <div
              className="w-full px-4 py-2 bg-gray-100 rounded-md border border-gray-200 cursor-pointer flex justify-between items-center"
              onClick={() => setShowProfessionDropdown(!showProfessionDropdown)}
            >
              <span className="text-gray-700">
                {formData.profession || 'Select Profession'}
              </span>
              <ChevronDown className="h-4 w-4" />
            </div>

            {showProfessionDropdown && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                <div className="p-2 border-b">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={customProfession}
                      onChange={(e) => setCustomProfession(e.target.value)}
                      placeholder="Add custom profession..."
                      className="flex-1 px-3 py-1 text-sm border border-gray-300 rounded"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomProfession())}
                    />
                    <button
                      type="button"
                      onClick={addCustomProfession}
                      className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Add
                    </button>
                  </div>
                </div>
                
                {predefinedProfessions.map((profession) => (
                  <div
                    key={profession}
                    className="px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm"
                    onClick={() => handleProfessionSelect(profession)}
                  >
                    {profession}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mb-10">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Experience</h3>
          <div className="relative">
            <select
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-100 rounded-md border border-gray-200 appearance-none"
              required
            >
              <option value="">Select Experience</option>
              <option value="0-1">0-1 year</option>
              <option value="1-2">1-2 years</option>
              <option value="2-3">2-3 years</option>
              <option value="3-5">3-5 years</option>
              <option value="5-7">5-7 years</option>
              <option value="7-10">7-10 years</option>
              <option value="10-15">10-15 years</option>
              <option value="15-20">15-20 years</option>
              <option value="20+">20+ years</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <ChevronDown className="h-4 w-4" />
            </div>
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

export default PersonalSignUp;