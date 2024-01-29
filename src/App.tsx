import Select, { GroupBase, OptionsOrGroups } from "react-select";
import "./App.css";
import data from "./data.json";
import { WhatsappIcon, WhatsappShareButton } from "react-share";
import { useState } from "react";
import useFilter from "./useFilter";
interface Option {
  value: string;
  label: string;
}
type BungalowData = {
  [key: string]: {
    category?: string;
    number: string;
    location: string;
    LongLat: string;
  };
};
const categoryOptions: Option[] = [
  { value: "A", label: "A" },
  { value: "B", label: "B" },
  { value: "C", label: "C" },
  { value: "D", label: "D" },
];

let jsonData: BungalowData = data;
function App() {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [locationUrl, setLocationUrl] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>("A");
  const [filterData, setFilterData] = useState<
    OptionsOrGroups<Option, GroupBase<Option>> | undefined
  >(undefined);

  useFilter(jsonData, selectedCategory, setFilterData);

  const handleChange = (selectedOption: Option | null) => {
    setSelectedOption(selectedOption);
    if (selectedOption) {
      setLocationUrl(
        jsonData[selectedOption.value as keyof BungalowData].location
      );
    } else {
      setLocationUrl(null);
    }
  };

  const handleGetLocation = () => {
    if (locationUrl) {
      window.location.href = locationUrl;
    }
  };

  const handleCopyLocation = () => {
    const location =
      jsonData[selectedOption?.value as keyof typeof jsonData]?.location;

    console.log(location.toString());

    if (location) {
      try {
        navigator.clipboard
          .writeText(location)
          .then(() => {
            alert(`Banglow Location copied to clipboard!`);
          })
          .catch((error) => {
            console.error("Unable to copy to clipboard", error);
          });
      } catch (error) {
        const textarea = document.createElement("textarea");
        textarea.value = location;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        alert(`Banglow Location copied to clipboard!`);
      }
    }
  };

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      boxShadow: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "2px solid #000000",
      borderRadius: "10px",
      backgroundColor: "#ffffff",
      color: "#000000",
      textAlign: "center",
      outline: "none",
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      overflow: "hidden",
      backgroundColor: state.isSelected ? "#000000" : "#ffffff",
      color: state.isSelected ? "#ffffff" : "#000000",
      borderRadius: "8px",
      ":hover": {
        backgroundColor: state.isSelected ? "#000000" : "#000000",
        color: state.isSelected ? "#ffffff" : "#ffffff",
      },
    }),
  };

  const whatsappButtonStyle: any = {
    backgroundColor: "#1a1a1a",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    padding: "0.4rem 1rem",
    cursor: "pointer",
    width: "60%",
    textAlign: "center",
    margin: "auto",
  };

  const WhatsappIconStyle: any = {
    display: "inline-block",
    marginLeft: "5px",
  };

  return (
    <>
      <div>
        <div className="flex w-full pt-[20px]">
          <img src="./logo.jpg" alt="Logo" className="mb-4 w-[50%]" />
          <img src="./logo2.jpg" alt="Logo" className="mb-4 w-[50%]" />
        </div>
      </div>
      <div className="h-screen bg-white text-black pt-[100px]">
        <h1 className="text-2xl font-bold mb-4">Search Banglows</h1>
        <div className="flex items-center justify-center">
          <Select
            className="w-[20%] mx-[20px] text-[14px]"
            options={categoryOptions}
            onChange={(selectedOption) => {
              setSelectedCategory(selectedOption?.value || null);
              setSelectedOption(null);
            }}
            value={categoryOptions.find(
              (option) => option.value === selectedCategory
            )}
            placeholder="A"
            defaultValue={categoryOptions[0]}
            isSearchable={false}
            styles={{ ...customStyles }}
          />
          <Select
            className="w-[50%] text-center cursor-none text-[14px]"
            value={selectedOption}
            onChange={handleChange}
            options={filterData}
            isSearchable={true}
            placeholder="Select Bungalow"
            styles={{ ...customStyles }}
          />
        </div>

        {selectedOption && (
          <>
            <div className="mt-4">
              <p className="mb-2">
                You selected: {selectedCategory} -{" "}
                {jsonData[selectedOption.value].number}
              </p>

              <div className="flex items-center justify-evenly flex-col">
                <button
                  className="btn text-white inline-block w-[60%] m-[0.4rem]"
                  onClick={handleCopyLocation}
                >
                  Copy Location Link
                </button>
                <WhatsappShareButton
                  url={locationUrl || "#"}
                  title="Avadh Helicolina Location to Bunglow "
                  separator=" : "
                  className="Demo__some-network__share-button"
                  style={whatsappButtonStyle}
                >
                  <span style={{ flex: 1 }}>Send Via Whatsapp</span>
                  <WhatsappIcon size={32} round style={WhatsappIconStyle} />
                </WhatsappShareButton>
                <button
                  className="btn text-white inline-block w-[60%] m-[0.4rem]"
                  onClick={handleGetLocation}
                >
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
