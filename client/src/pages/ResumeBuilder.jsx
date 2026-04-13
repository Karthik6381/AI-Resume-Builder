import React from 'react'
import { dummyResumeData } from '../assets/assets';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeftIcon, Briefcase, ChevronLeft,ChevronRight, FileText, FolderIcon, GraduationCap, Sparkles, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import PersonalInfoForm from '../components/PersonalInfoForm';
import ResumePreview from '../components/ResumePreview';
import TemplateSelector from '../components/TemplateSelector';




const ResumeBuilder = () => {

  const { resumeId} = useParams();

  const [resumeData, setResumeData] = useState({
    _id: '',
    title: '',
    personal_info: {},
    professional_summary: '',
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: '',
    accent_color: '',
    public: false,
  })

 

  const [activeSectionIndex, setActiveSectionIndex] = useState(0)
  const [removeBackground, setRemoveBackground] = useState(false);

  const section = [
    { id: 'personal_info', name: 'Personal_Info', icon: User },
    { id: 'summary', name: 'Summary', icon: FileText },
    { id: 'experience', name: 'Experience', icon: Briefcase},
    { id: 'education', name: 'Education', icon: GraduationCap},
    { id: 'project', name: 'Project', icon: FolderIcon},
    { id: 'skills', name: 'Skills', icon: Sparkles},

  ]
  const activeSection = section[activeSectionIndex]



useEffect(() => {
  const resume = dummyResumeData.find((resume) => resume._id === resumeId);

  if (resume) {
    setTimeout(() => {
      setResumeData(resume);
      document.title = resume.title;
    }, 0);
  }
}, [resumeId]);
 

  return (

    <div>

      <div className='px-4 pt-6 pb-2'>
        <Link to={'/app'} className='inline-flex gap-2 item-center text-center text-slate-500 hover:text-slate-700 transition-all'>
          <ArrowLeftIcon className='size-4'/> Back to Dashboard
        
        </Link>
      </div>

      <div className='px-4 pb-8'>
        <div className='grid lg:grid-cols-2 gap-8'>
          {/* Left panel - form */}
          <div className='relative rounded-lg overflow-hidden'>
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1'>
              {/* progress bar using  activeSectionIndex*/}
              <hr className='absolute top-0 left-0 right-0 border-2 border-gray-200'/>
              <hr className='absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-green-600 border-none transition-all duration-2000'
               style={{width: `${activeSectionIndex * 100 / (section.length - 1)}%`}}/>

               {/*section navigaton*/}
               <div className='flex justify-between items-center mb-6 border-b border-gray-300 py-1'>
                
                
                <div className='flex justify-between items-center mb-6 border-b
                border-gray-300 py-1'>

                  <TemplateSelector selectedTemplate={resumeData.template} onChange={(template)=>setResumeData(prev => ({...prev, template}))}/>
                </div>


                <div className='flex items-center'>
                  {activeSectionIndex !== 0 && (
                    <button className='flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all' disabled={activeSectionIndex === 0} onClick={()=> setActiveSectionIndex((prevIndex) => Math.max(0, prevIndex - 1))}>
                      <ChevronLeft className='size-4'/> Previous
                    </button>
                  )}


                      <button className={`flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all ${activeSectionIndex === section.length - 1 && 'opacity-50'}`} disabled={activeSectionIndex === section.length - 1} onClick={()=> setActiveSectionIndex((prevIndex) => Math.min(section.length - 1, prevIndex + 1))}>
                      <ChevronRight className='size-4'/> Next
                    </button>

                </div>

               </div>

                {/* form content */}
               <div className='space-y-6'>
                {activeSection.id === 'personal_info' && (
                  <PersonalInfoForm data={resumeData.personal_info} onChange={(data)=>setResumeData(prev=> ({...prev, personal_info:data}))} removeBackground={removeBackground} setRemoveBackground={setRemoveBackground}/>
                )

                }

               </div>

            </div>

          </div>

          {/* Right panel - resume preview */}
          <div className='className="lg:col-span-7 max-lg:mt-6"'>
            <div>
             { /*---buttons---*/}
            </div>
            <ResumePreview data={resumeData} template={resumeData.template} 
            accentColor={resumeData.accent_color}/>
          </div>
        </div>
      </div>
    
    </div>
  )
}

export default ResumeBuilder