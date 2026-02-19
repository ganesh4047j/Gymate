import React, { useEffect } from 'react';

interface ScienceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScienceModal: React.FC<ScienceModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose}></div>
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
         <img 
            src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=300" 
            className="absolute top-[10%] left-[5%] w-32 h-32 md:w-64 md:h-64 object-cover rounded-full opacity-20 animate-float mix-blend-screen grayscale"
            style={{animationDelay: '0s', animationDuration: '8s'}}
         />
         <img 
            src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=300" 
            className="absolute bottom-[10%] right-[5%] w-40 h-40 md:w-80 md:h-80 object-cover opacity-10 animate-float mix-blend-screen grayscale"
            style={{animationDelay: '2s', animationDuration: '10s'}}
         />
         <div 
            className="absolute top-[40%] right-[15%] w-20 h-20 md:w-40 md:h-40 border-4 border-primary/30 rounded-full opacity-30 animate-float"
            style={{animationDelay: '1s', animationDuration: '6s'}}
         ></div>
      </div>

      <div className="relative bg-[#0F0F0F] border border-white/10 rounded-2xl max-w-5xl w-full max-h-[85vh] shadow-[0_0_100px_rgba(255,217,0,0.15)] flex flex-col z-10 overflow-hidden">
        
        <div className="flex justify-between items-center p-6 md:p-8 border-b border-white/5 bg-[#0F0F0F]/80 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-3">
             <div className="bg-primary/20 p-2 rounded-lg">
                <span className="material-symbols-outlined text-primary text-2xl">science</span>
             </div>
             <div>
                <h3 className="font-display font-black text-xl md:text-3xl text-white uppercase italic tracking-tighter">Gymate Lab</h3>
                <p className="text-xs text-text-muted uppercase tracking-widest">R&D Division</p>
             </div>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors border border-white/5">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        <div className="overflow-y-auto custom-scrollbar p-6 md:p-12 space-y-16">
           
           <div className="flex flex-col md:flex-row gap-12 items-center">
             <div className="flex-1 space-y-4">
               <div className="text-primary font-mono text-sm mb-2">01. BIOMECHANICS</div>
               <h4 className="font-display font-bold text-3xl md:text-4xl text-white uppercase">Anatomy Driven Design</h4>
               <p className="text-gray-400 leading-relaxed text-lg">
                 We utilize 3D motion capture technology to analyze the force vectors during compound movements. Every curve in our equipment is calculated to optimize joint articulation, reducing shear force while maximizing muscle recruitment.
               </p>
               <ul className="space-y-2 mt-4 text-gray-300">
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span>Optimized Heel Pitch for Squat Depth</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span>Metatarsal Flex Grooves</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span>Lateral Stability Walls</li>
               </ul>
             </div>
             <div className="w-full md:w-1/2 aspect-video bg-gradient-to-br from-gray-900 to-black rounded-xl border border-white/10 p-1 relative overflow-hidden group">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1574680096141-1cddd32e38e1?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-700"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-3/4 h-3/4 border border-primary/30 rounded-lg relative">
                      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary"></div>
                      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary"></div>
                      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary"></div>
                      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary"></div>
                      <div className="absolute inset-0 flex items-center justify-center text-primary/80 font-mono text-xs">ANALYZING VECTORS...</div>
                   </div>
                </div>
             </div>
           </div>

           <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

           <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
             <div className="flex-1 space-y-4">
               <div className="text-primary font-mono text-sm mb-2">02. MATERIALS</div>
               <h4 className="font-display font-bold text-3xl md:text-4xl text-white uppercase">Aerospace Grade Composites</h4>
               <p className="text-gray-400 leading-relaxed text-lg">
                 Our Titan-Grip material isn't just leather; it's a proprietary composite compressed under 50 tons of pressure. This increases density by 40% without adding bulk, providing the intra-abdominal pressure support of a 13mm belt in a 10mm profile.
               </p>
             </div>
             <div className="w-full md:w-1/2 aspect-video bg-surface-dark rounded-xl border border-white/10 relative overflow-hidden flex items-center justify-center p-8">
                <div className="w-full h-full flex items-end gap-2 relative z-10">
                   <div className="w-1/4 bg-white/10 h-[40%] rounded-t relative group">
                      <div className="absolute -top-6 w-full text-center text-xs text-gray-500">Standard</div>
                   </div>
                   <div className="w-1/4 bg-white/20 h-[60%] rounded-t relative group">
                      <div className="absolute -top-6 w-full text-center text-xs text-gray-500">Premium</div>
                   </div>
                   <div className="w-1/4 bg-primary h-[90%] rounded-t relative group shadow-[0_0_20px_rgba(255,217,0,0.3)]">
                      <div className="absolute -top-6 w-full text-center text-xs text-primary font-bold">Gymate</div>
                   </div>
                </div>
                <div className="absolute inset-0 grid grid-rows-4 w-full h-full pointer-events-none">
                   <div className="border-t border-white/5 w-full"></div>
                   <div className="border-t border-white/5 w-full"></div>
                   <div className="border-t border-white/5 w-full"></div>
                </div>
             </div>
           </div>

           <div className="bg-gradient-to-r from-surface-dark to-black p-8 rounded-xl border border-white/10 relative overflow-hidden">
             <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
               <div>
                  <h4 className="text-white font-bold text-2xl mb-2">Tested Beyond Failure</h4>
                  <p className="text-gray-400 text-sm max-w-lg">We spent 2,000+ hours in R&D and stress-test every prototype to 150% of its rated capacity before shipping.</p>
               </div>
               <div className="flex gap-8">
                  <div className="text-center">
                     <div className="text-3xl font-black text-primary font-display">2k+</div>
                     <div className="text-[10px] uppercase text-gray-500 tracking-wider">Hours R&D</div>
                  </div>
                  <div className="text-center">
                     <div className="text-3xl font-black text-primary font-display">150%</div>
                     <div className="text-[10px] uppercase text-gray-500 tracking-wider">Stress Rating</div>
                  </div>
               </div>
             </div>
           </div>

        </div>
        
        <div className="p-6 border-t border-white/10 bg-[#0F0F0F]/95 backdrop-blur flex justify-between items-center sticky bottom-0 z-20">
           <span className="text-xs text-gray-500 font-mono">LAB_REF: 2023-QC-A</span>
           <button onClick={onClose} className="text-sm font-bold text-white hover:text-primary transition-colors uppercase tracking-widest">
              Close Report
           </button>
        </div>
      </div>
    </div>
  );
};
