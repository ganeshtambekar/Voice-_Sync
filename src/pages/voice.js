// import { useState } from 'react'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import useClipboard from "react-use-clipboard";
import { BiSolidCopyAlt } from "react-icons/bi";
import { BsFillMicFill } from "react-icons/bs";
import { BsFillMicMuteFill } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import { SiConvertio } from "react-icons/si";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { user } from "@nextui-org/react";
import { content } from "@/tailwind.config";
import { UserAuth } from "../utils/auth";

const Dashboard = () =>
{
  const router = useRouter();
  const [copyTxt, setCopyTxt] = useState();
  const [isCopied, setCopied] = useClipboard(copyTxt);
  const [summary, setSummary] = useState();

  const { user } = UserAuth();
  console.log(user);
  const [listening, setListening] = useState(false);

  const startListening = () =>
  {
    SpeechRecognition.startListening({ continuous: true, language: "en-In" });
    setListening(true);
  };
  const stopListening = () =>
  {
    SpeechRecognition.stopListening();
    setListening(false);
  };

  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  useEffect(() =>
  {
    console.log("first");
    console.log(transcript);
  }, [transcript]);

  //   if (!browserSupportsSpeechRecognition) {
  //     return toast("Something went wrong, please try again");
  //   }

  //Handle Speech Recognition
  const handleSummary = async () =>
  {
    const data = {
      data: {
        processed_text: "This is an example text which will be generated as a summary. From the model. We have paused the model for now. For full demo please contact us. Thank you",
      },
    };
    setSummary(data.data.processed_text);
    //
  };

  return (
    <>
      <Navbar />
      <div className="max-w-screen-lg mx-auto  flex items-center justify-center flex-col py-16">
        <h1 className="text-center font-semibold text-2xl  flex  items-center justify-center gap-x-3">
          Sync your Voice with Text
          <SiConvertio className="text-purple-700" />
        </h1>
        <p>
          Note: To copy written text, firstly click once on the white board
          after clicking Stop button.
        </p>

        {/* Text Div */}
        <div className="md:px-20 w-full h-full">
          <div
            className="text-sm w-full min-h-96   shadow-gray-200 shadow-md rounded-2xl my-4 p-2 cursor-pointer flex"
            onClick={() => setCopyTxt(transcript)}
          >
            <div className="w-full min-h-[100%] border-2 flex-1 border-dashed border-purple-400 rounded-xl p-4">
              Text: {summary?.length ? summary : transcript}
            </div>
          </div>
        </div>

        {/* Buttons Section */}
        <div className="flex items-center justify-center gap-x-6">
          <button
            onClick={startListening}
            className="flex items-center justify-center py-1.5 px-3 gap-x-2  bg-purple-500 shadow-md shadow-purple-100 text-white rounded-xl active:bg-purple-700"
          >
            <BsFillMicFill />
            {
              /* if listning show listening */ console.log(
              SpeechRecognition.listening
            )
            }
            {listening ? "Listening.." : "Start"}
          </button>
          <button
            onClick={stopListening}
            className="flex items-center justify-center py-1.5 px-3 gap-x-2 bg-purple-500 shadow-md shadow-purple-100 text-white rounded-xl active:bg-purple-700"
          >
            <BsFillMicMuteFill />
            Stop
          </button>
          <button
            onClick={setCopied}
            className="flex items-center justify-center py-1.5 px-3 gap-x-2 bg-purple-500 shadow-md shadow-purple-100 text-white rounded-xl active:bg-purple-700"
          >
            <BiSolidCopyAlt />
            {isCopied ? " Copied" : " Copy to clipboard"}
          </button>

          <button
            onClick={handleSummary}
            className="flex items-center justify-center py-1.5 px-3 gap-x-2 bg-purple-500 shadow-md shadow-purple-100 text-white rounded-xl active:bg-purple-700"
          >
            <FaCheckCircle />
            Generate MOM
          </button>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
