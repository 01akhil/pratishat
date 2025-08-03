// 'use client';

// import React, { useState, ChangeEvent, FormEvent } from 'react';
// import { useRouter } from 'next/navigation';
// import { ChevronDown } from 'lucide-react';

// interface PersonalSignUpProps {
//   onToggle: () => void;
// }

// const PersonalSignUp: React.FC<PersonalSignUpProps> = ({ onToggle }) => {

//   const router = useRouter();

//   const [formData, setFormData] = useState({
//     name: "",
//     dob: "",
//     gender: "",
//     nationality: "",
//     state: "",
//     interests: "",
//     profession: "",
//     experience: "",
//     email: "",
//     password: "",
//   });

//   const [file, setFile] = useState<File | null>(null);

//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setFile(e.target.files[0]);
//     }
//   };

//   const handleChange = (
//     e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();

//     const form = new FormData();
//     Object.entries(formData).forEach(([key, value]) => {
//       form.append(key, value);
//     });
//     if (file) form.append("profile_image", file);
//     form.append("ifOrganization", "false");
    
//     for (let pair of form.entries()) {
//   console.log(`${pair[0]}: ${pair[1]}`);
// }

//     try {
//       const res = await fetch("/api/signup", {
//         method: "POST",
//         body: form,
//       });

//       const data = await res.json();

//       if (res.ok) {
//         localStorage.setItem("token", data.token);
//         localStorage.setItem('userId', data.userId);
//         router.push('/dashboard');
        
//         // Redirect or do other logic
//       } else {
//         alert(data.error || "Something went wrong.");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Request failed.");
//     }
//   };

//   return (
//     <div className="h-auto w-full px-4 py-8 md:px-8 lg:px-16 overflow-hidden">
      
//             <form onSubmit={handleSubmit}>
//         <div className="flex items-center justify-between">
//         <h2 className="text-2xl font-bold mb-6" style={{ color: "#2d3748" }}>
//           About you
//         </h2>

            
//         </div>

//         <div className="mb-10">
//           <div className="flex justify-between ">
//             <div>
//               <h3 className="text-xl font-semibold" style={{ color: "#2d3748" }}>
//                 Personal Info
//               </h3>
//               <p className="text-sm text-gray-600">Provide your personal info</p>
//             </div>

//             <div className="space-y-4">
//             <div>
//               <label className="block text-sm text-gray-600 mb-1">Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 bg-gray-100 rounded-md border border-gray-200"
//               />
//             </div>

//             <div className="grid grid-cols-4 gap-4">

//             <div>
//   <label className="block text-sm text-gray-600 mb-1">DOB</label>
//   <div className="relative">
//     <select
//       name="dob"
//       value={formData.dob}
//       onChange={handleChange}
//       className="w-full appearance-none px-4 py-2 bg-gray-100 rounded-md border border-gray-200"
//     >
//       <option value="">Select Year</option>
//       {Array.from({ length: 2025 - 1950 + 1 }, (_, index) => {
//         const year = 1950 + index;
//         return (
//           <option key={year} value={year} className="">
//             {year}
//           </option>
//         );
//       })}
//     </select>
//     <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//       <ChevronDown />
//     </div>
//   </div>
//             </div>


//             <div>
//   <label className="block text-sm text-gray-600 mb-1">Gender</label>
//   <div className="relative">
//     <select
//       name="gender"
//       value={formData.gender}
//       onChange={handleChange}
//       className="w-full px-4 py-2 bg-gray-100 rounded-md border border-gray-200 appearance-none"
//     >
//       <option value="">Select Gender</option>
//       <option value="Male">Male</option>
//       <option value="Female">Female</option>
//     </select>
//     <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//       <ChevronDown />
//     </div>
//   </div>
// </div>



// <div>
//   <label className="block text-sm text-gray-600 mb-1">Nationality</label>
//   <div className="relative">
//     <select
//       name="nationality"
//       value={formData.nationality}
//       onChange={handleChange}
//       className="w-full px-4 py-2 bg-gray-100 rounded-md border border-gray-200 appearance-none"
//     >
//       <option value="">Select Nationality</option>
//       <option value="Afghanistan">Afghanistan</option>
//       <option value="Albania">Albania</option>
//       <option value="Algeria">Algeria</option>
//       <option value="Andorra">Andorra</option>
//       <option value="Angola">Angola</option>
//       <option value="Argentina">Argentina</option>
//       <option value="Australia">Australia</option>
//       <option value="Austria">Austria</option>
//       <option value="Bangladesh">Bangladesh</option>
//       <option value="Belgium">Belgium</option>
//       <option value="Bhutan">Bhutan</option>
//       <option value="Brazil">Brazil</option>
//       <option value="Canada">Canada</option>
//       <option value="China">China</option>
//       <option value="Denmark">Denmark</option>
//       <option value="Egypt">Egypt</option>
//       <option value="Finland">Finland</option>
//       <option value="France">France</option>
//       <option value="Germany">Germany</option>
//       <option value="India">India</option>
//       <option value="Indonesia">Indonesia</option>
//       <option value="Italy">Italy</option>
//       <option value="Japan">Japan</option>
//       <option value="Mexico">Mexico</option>
//       <option value="Nepal">Nepal</option>
//       <option value="Netherlands">Netherlands</option>
//       <option value="New Zealand">New Zealand</option>
//       <option value="Norway">Norway</option>
//       <option value="Pakistan">Pakistan</option>
//       <option value="Russia">Russia</option>
//       <option value="Singapore">Singapore</option>
//       <option value="South Africa">South Africa</option>
//       <option value="Spain">Spain</option>
//       <option value="Sri Lanka">Sri Lanka</option>
//       <option value="Sweden">Sweden</option>
//       <option value="Switzerland">Switzerland</option>
//       <option value="United Kingdom">United Kingdom</option>
//       <option value="United States">United States</option>
//       <option value="Vietnam">Vietnam</option>
//       {/* Add more countries if you want */}
//     </select>
//     <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//       <ChevronDown />
//     </div>
//   </div>
// </div>

//               <div>
//                 <label className="block text-sm text-gray-600 mb-1">State</label>
//                 <div className="relative">
//                   <input
//                     type="text"
//                     name="state"
//                     value={formData.state}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 bg-gray-100 rounded-md border border-gray-200"
//                   />
                 
//                 </div>
//               </div>
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

// <div>
//       <label className="block text-sm text-gray-600 mb-1">Profile Picture</label>
//       <div className="flex items-center justify-between w-full px-4 py-2 bg-gray-100 rounded-md border border-gray-200">
//         <input type="file" onChange={handleFileChange} className="flex-1 text-gray-600" />
        
//       </div>
//     </div>
//           </div>

            
//           </div>

          
//         </div>

//         {/* <div className="mb-10 flex items-center ">
//           <div className="mb-2 mr-24">
//             <h3 className="text-xl font-semibold" style={{ color: "#2d3748" }}>
//               Interests
//             </h3>
//             <p className="text-sm text-gray-600">Provide your interests</p>
//           </div>

//           <div className="w-[72vw] relative flex items-center justify-center">
//             <input
//               type="text"
//               name="interests"
//               value={formData.interests}
//               onChange={handleChange}
//               className="w-full px-4 py-2 bg-gray-100 rounded-md border border-gray-200"
//             />
//             <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//               <ChevronDown />
//             </div>
//           </div>
//         </div> */}


//         <div className="mb-10 flex items-center">
//   <div className="mb-2 mr-24">
//     <h3 className="text-xl font-semibold" style={{ color: "#2d3748" }}>
//       Interests
//     </h3>
//     <p className="text-sm text-gray-600">Select your interest</p>
//   </div>

//   <div className="w-[72vw] relative flex items-center justify-center">
//     <select
//       name="interests"
//       value={formData.interests}
//       onChange={handleChange}
//       className="w-full px-4 py-2 bg-gray-100 rounded-md border border-gray-200 appearance-none"
//     >
//       <option value="" disabled>
//         -- Select your interest --
//       </option>
//       <option value="Software Development">Software Development</option>
//       <option value="Data Science">Data Science</option>
//       <option value="Artificial Intelligence">Artificial Intelligence</option>
//       <option value="Cybersecurity">Cybersecurity</option>
//       <option value="UI/UX Design">UI/UX Design</option>
//       <option value="Cloud Computing">Cloud Computing</option>
//       <option value="Digital Marketing">Digital Marketing</option>
//       <option value="Product Management">Product Management</option>
//       <option value="Finance">Finance</option>
//       <option value="Human Resources">Human Resources</option>
//       <option value="Consulting">Consulting</option>
//       <option value="Healthcare Technology">Healthcare Technology</option>
//       <option value="Entrepreneurship">Entrepreneurship</option>
//     </select>

//     <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//       <ChevronDown />
//     </div>
//   </div>
// </div>


//         <div className="mb-10 flex justify-between">
//   <div className="mb-2 mr-12">
//     <h3 className="text-xl font-semibold" style={{ color: "#2d3748" }}>
//       Profession
//     </h3>
//     <p className="text-sm text-gray-600">Provide your profession and experience</p>
//   </div>

//   <div className="space-y-4 w-[97vw]">
//     {/* Profession Dropdown */}
//     <div className="relative flex items-center justify-center">
//       <select
//         name="profession"
//         value={formData.profession}
//         onChange={handleChange}
//         className="w-full px-4 py-2 bg-gray-100 rounded-md border border-gray-200 appearance-none"
//       >
//         <option value="">Select Profession</option>
//         <option value="Software Engineer">Software Engineer</option>
//         <option value="Data Scientist">Data Scientist</option>
//         <option value="Doctor">Doctor</option>
//         <option value="Teacher">Teacher</option>
//         <option value="Business Analyst">Business Analyst</option>
//         <option value="Lawyer">Lawyer</option>
//         <option value="Designer">Designer</option>
//         <option value="Marketing Manager">Marketing Manager</option>
//         {/* Add more professions here if needed */}
//       </select>
//       <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//         <ChevronDown />
//       </div>
//     </div>

//     {/* Experience Dropdown */}
//     <div className="relative">
//       <label className="block text-sm text-gray-600 mb-1">Experience</label>
//       <div className="flex items-center justify-center">
//         <select
//           name="experience"
//           value={formData.experience}
//           onChange={handleChange}
//           className="w-full px-4 py-2 bg-gray-100 rounded-md border border-gray-200 appearance-none"
//         >
//           <option value="">Select Experience (in years)</option>
//           <option value="1">1 year</option>
//           <option value="2">2 years</option>
//           <option value="3">3 years</option>
//           <option value="5">5 years</option>
//           <option value="7">7 years</option>
//           <option value="10">10 years</option>
//           <option value="15">15 years</option>
//           <option value="20">20+ years</option>
//         </select>
//         <div className="absolute inset-y-0 right-0 top-5 flex items-center pr-3 pointer-events-none">
//           <ChevronDown />
//         </div>
//       </div>
//     </div>
//   </div>
// </div>


//         <div className="flex justify-end">
//           <button
//             type="submit"
//             className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//           >
//             Proceed
//           </button>
//         </div>
//       </form>

//     </div>
//   );
// };

// export default PersonalSignUp;





'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown } from 'lucide-react';

interface PersonalSignUpProps {
  onToggle: () => void;
}

const PersonalSignUp: React.FC<PersonalSignUpProps> = ({ onToggle }) => {

  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    gender: "",
    nationality: "",
    state: "",
    interests: "",
    profession: "",
    experience: "",
    email: "",
    password: "",
  });

  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });
    if (file) form.append("profile_image", file);
    form.append("ifOrganization", "false");
    
    for (let pair of form.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

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
                  <label className="block text-sm text-gray-600 mb-1">Gender</label>
                  <div className="relative">
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-gray-100 rounded-md border border-gray-200 appearance-none"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
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

              <div>
                <label className="block text-sm text-gray-600 mb-1">Profile Picture</label>
                <div className="flex items-center justify-between w-full px-4 py-2 bg-gray-100 rounded-md border border-gray-200">
                  <input type="file" onChange={handleFileChange} className="flex-1 text-gray-600 text-sm" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-10 flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="mb-2 md:mr-24">
            <h3 className="text-xl font-semibold" style={{ color: "#2d3748" }}>
              Interests
            </h3>
            <p className="text-sm text-gray-600">Select your interest</p>
          </div>

          <div className="w-full md:w-[72vw] relative flex items-center justify-center">
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

        <div className="mb-10 flex flex-col md:flex-row justify-between gap-6">
          <div className="mb-2 md:mr-12">
            <h3 className="text-xl font-semibold" style={{ color: "#2d3748" }}>
              Profession
            </h3>
            <p className="text-sm text-gray-600">Provide your profession and experience</p>
          </div>

          <div className="space-y-4 w-full md:w-[97vw]">
            <div className="relative flex items-center justify-center">
              <select
                name="profession"
                value={formData.profession}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-100 rounded-md border border-gray-200 appearance-none"
              >
                <option value="">Select Profession</option>
                <option value="Software Engineer">Software Engineer</option>
                <option value="Data Scientist">Data Scientist</option>
                <option value="Doctor">Doctor</option>
                <option value="Teacher">Teacher</option>
                <option value="Business Analyst">Business Analyst</option>
                <option value="Lawyer">Lawyer</option>
                <option value="Designer">Designer</option>
                <option value="Marketing Manager">Marketing Manager</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <ChevronDown />
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm text-gray-600 mb-1">Experience</label>
              <div className="flex items-center justify-center">
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-100 rounded-md border border-gray-200 appearance-none"
                >
                  <option value="">Select Experience (in years)</option>
                  <option value="1">1 year</option>
                  <option value="2">2 years</option>
                  <option value="3">3 years</option>
                  <option value="5">5 years</option>
                  <option value="7">7 years</option>
                  <option value="10">10 years</option>
                  <option value="15">15 years</option>
                  <option value="20">20+ years</option>
                </select>
                <div className="absolute inset-y-0 right-0 top-5 flex items-center pr-3 pointer-events-none">
                  <ChevronDown />
                </div>
              </div>
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