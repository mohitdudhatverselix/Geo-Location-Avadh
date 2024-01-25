import Select from 'react-select';
import './App.css';
import * as data from './data.json';
import { WhatsappIcon, WhatsappShareButton } from 'react-share';
import { useState } from 'react';

interface Option {
  value: string;
  label: string;
}

type BungalowData = {
  [key: string]: {
    number: string;
    location: string;
    LongLat: string;
  };
};
let jsonData:any  = data ;

function App() {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [locationUrl, setLocationUrl] = useState<string | null>(null);

  const options: Option[] = Object.keys(jsonData).map((key) => ({
  value: key,
  label: jsonData[key].number,
}));

const handleChange = (selectedOption: Option | null) => {
  setSelectedOption(selectedOption);
  if (selectedOption) {
    // Type assertion here
    setLocationUrl(jsonData[selectedOption.value as keyof BungalowData].location);
  } else {
    setLocationUrl(null);
  }
};

  const handleCopyLocation = () => {
    if (selectedOption) {
      const rawUrl = locationUrl || jsonData[selectedOption.value as keyof typeof jsonData].location;
  
      navigator.clipboard.writeText(rawUrl)
        .then(() => {
          alert(`Banglow Location copied to clipboard!`);
        })
        .catch((error) => {
          console.error('Unable to copy to clipboard', error);
        });
    }
  };
  

  const handleGetLocation = () => {
    if (locationUrl) {
      window.location.href = locationUrl;
    }
  };

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      boxShadow: 'none',
      display:'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '2px solid #000000',
      borderRadius: '20px',
      backgroundColor: '#ffffff',
      color: '#000000',
      textAlign: 'center',
      outline: 'none',
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      overflow: 'hidden',
      backgroundColor: state.isSelected ? '#000000' : '#ffffff',
      color: state.isSelected ? '#ffffff' : '#000000',
      borderRadius: '8px',
      ':hover': {
        backgroundColor: state.isSelected ? '#000000' : '#000000',
        color: state.isSelected? '#ffffff' : '#ffffff',
      },
    }),
  };
  const whatsappButtonStyle : any = {
    backgroundColor: '#1a1a1a',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    padding: '0.4rem 1rem',
    cursor: 'pointer',
    width: '60%',
    textAlign : 'center',
    margin: 'auto',
  };

  const WhatsappIconStyle: any = {
    display: 'inline-block',
    marginLeft: '5px',
  };

  return (
    <>
      <div>
        <div className='flex w-full pt-[20px]'>
          <img src="./logo.jpg" alt="Logo" className="mb-4 w-[50%]" />
          <img src="./logo2.jpg" alt="Logo" className="mb-4 w-[50%]" />
        </div>
      </div>
      <div className="h-screen bg-white text-black pt-[100px]">
        <h1 className='text-2xl font-bold mb-4'>Search Banglows</h1>
        
        <Select
          className='w-[40%] m-auto text-center cursor-none'
          value={selectedOption}
          onChange={handleChange}
          options={options}
          isSearchable={true}
          placeholder="Select a Bungalow"
          styles={{...customStyles}}
        />
        {selectedOption && (
          <>
             <div className="mt-4">
            <p className='mb-2'>You selected: {jsonData[selectedOption.value].number}</p>
          
            <div className='flex items-center justify-evenly flex-col'>
              <button className='btn text-white inline-block w-[60%] m-[0.4rem]' onClick={handleCopyLocation}>
                Copy Location Link
              </button>
              <WhatsappShareButton
          url={locationUrl || "#"}
          title="Avadh Helicolina Location to Bunglow "
          separator=" : "
          className="Demo__some-network__share-button"
          style={whatsappButtonStyle}
        >
       <span style={{flex: 1 }}>Send Via Whatsapp</span>
          <WhatsappIcon size={32} round style={WhatsappIconStyle}/>
        </WhatsappShareButton>
              <button className='btn text-white inline-block w-[60%] m-[0.4rem]' onClick={handleGetLocation}>
                Get Direction
              </button>
            </div>
          </div>
     
          </>
       
        )}



      </div>
    </>
  );
}

export default App;
