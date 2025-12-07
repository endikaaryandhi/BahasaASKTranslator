import { useState } from 'react';
import { translateSentence, decodeSentence } from './utils/translator';

function App() {
  const [inputText, setInputText] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    setCopied(false);
  };

  const resultText = isReversed 
    ? decodeSentence(inputText) 
    : translateSentence(inputText);

  const handleSwap = () => {
    setIsReversed(!isReversed);
    setInputText(''); 
    setCopied(false);
  };

  const handleCopy = () => {
    if (resultText) {
      navigator.clipboard.writeText(resultText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 md:p-6 bg-[#f0f0f0] bg-[radial-gradient(#00000033_1px,transparent_1px)] [background-size:20px_20px] font-mono text-black">
      
      <div className="w-full max-w-md md:max-w-2xl bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000] relative overflow-visible transition-all duration-300">
        
        <div className="bg-[#FFD23F] border-b-4 border-black p-3 md:p-4 flex items-center justify-between gap-2 relative z-10">
          
          <div className="flex-1 text-center">
            <span className="text-xs sm:text-sm md:text-lg font-black uppercase tracking-tight truncate block">
              {isReversed ? 'BAHASA ASK' : 'NORMAL'}
            </span>
          </div>

          <button 
            onClick={handleSwap}
            className="w-8 h-8 md:w-10 md:h-10 bg-white border-2 border-black rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all active:scale-90 cursor-pointer shadow-[2px_2px_0px_0px_#000] z-20 shrink-0"
            title="Tukar Bahasa"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 md:w-5 md:h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
            </svg>
          </button>

          <div className="flex-1 text-center">
             <span className="text-xs sm:text-sm md:text-lg font-black uppercase tracking-tight truncate block">
              {isReversed ? 'NORMAL' : 'BAHASA ASK'}
            </span>
          </div>

        </div>

        <div className="p-4 sm:p-6 md:p-8 space-y-8 md:space-y-12 relative">
          
          <div className="space-y-2 relative pt-2">
            <div className={`absolute top-0 left-0 px-2 md:px-3 py-0.5 md:py-1 border-2 border-black shadow-[2px_2px_0px_0px_#000] text-[10px] md:text-xs font-bold text-white uppercase tracking-wider transform -rotate-1 transition-colors duration-300 ${isReversed ? 'bg-[#EE4266]' : 'bg-[#337AFF]'}`}>
              {isReversed ? 'Input (ASK)' : 'Input (Normal)'}
            </div>
            <textarea
              value={inputText}
              onChange={handleInputChange}
              placeholder={isReversed ? "Contoh: MatASKi akASKu..." : "Contoh: Mati aku..."}
              className="w-full h-32 md:h-40 p-3 md:p-4 text-base md:text-lg font-bold border-4 border-black bg-white focus:outline-none focus:bg-gray-50/50 transition-all placeholder:text-gray-400 placeholder:font-normal resize-none mt-4"
            />
          </div>

          <div className="space-y-2 relative pt-2">
             <div className={`absolute top-0 right-0 px-2 md:px-3 py-0.5 md:py-1 border-2 border-black shadow-[2px_2px_0px_0px_#000] text-[10px] md:text-xs font-bold text-white uppercase tracking-wider transform rotate-1 transition-colors duration-300 ${isReversed ? 'bg-[#337AFF]' : 'bg-[#EE4266]'}`}>
              {isReversed ? 'Hasil (Normal)' : 'Hasil (ASK)'}
            </div>
            
            <div className="relative mt-4">
              <div className={`w-full min-h-32 md:min-h-40 p-3 md:p-4 text-lg md:text-xl font-bold border-4 border-black bg-[#E0E7FF] text-black whitespace-pre-wrap ${resultText ? 'break-all max-h-60 md:max-h-80 overflow-y-auto' : 'flex items-center'}`}>
                {resultText || <span className="opacity-30 uppercase text-sm md:text-base font-normal">Menunggu input...</span>}
              </div>

              {resultText && (
                <button
                  onClick={handleCopy}
                  className="absolute bottom-[-15px] left-0 right-0 mx-auto w-fit bg-black text-white px-4 md:px-5 py-1.5 md:py-2 border-2 border-white font-bold text-xs md:text-sm uppercase tracking-wider hover:bg-[#0EAD69] hover:border-black hover:text-black hover:shadow-[4px_4px_0px_0px_#000] active:shadow-none transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap"
                >
                  {copied ? (
                    <>
                      <span>OK!</span>
                    </>
                  ) : (
                    <>
                      <span>SALIN</span>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 md:w-4 md:h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5" />
                      </svg>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="bg-black text-white p-3 md:p-4 border-t-4 border-black text-center mt-2">
            <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest">
                &copy; {new Date().getFullYear()} CIA bagian Grobogan
            </p>
        </div>
        
      </div>
    </div>
  );
}

export default App;