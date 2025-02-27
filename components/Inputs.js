import { send, upload } from "@/assets";
import Image from "next/image";
const Inputs = () => {
  return (
    <div className="w-100 d-flex justify-content-center align-items-center">
      <input
        type="text"
        className="w-25 rounded p-3 text-white placeholder-light  gradient me-md-3 border-0"
        placeholder="Enter your message"
      />
      <button className="p-3 bg-dark text-black fw-bold rounded-md text-xl gradient w-md-10 text-md-2xl rounded border-0">
        <Image src={send} alt="send" height="20" width="30" />
      </button>
    </div>
  );
};

export default Inputs;
