import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";

// eslint-disable-next-line react/prop-types
export default function SignaturePad({ onSave, onClose }) {
//   const sigCanvas = useRef(null);
    const [signature,setSignature] = useState(null);

  const handleSave = () => {
    console.log('Save signature clicked');
    if(!signature) {
      console.log('No signature canvas found');
      return;
    }
    try {
      const canvas = signature.getCanvas();
      const signatureDataUrl = canvas.toDataURL("image/png");
      console.log('Signature saved successfully');
      onSave(signatureDataUrl);
    } catch (error) {
      console.error('Error saving signature:', error);
    }
  };

  const handleClear = () => {
    console.log('Clear signature clicked');
    if (signature) {
      signature.clear();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-[50000]" style={{ zIndex: 50000 }}>
      <div className="bg-white p-4 rounded-md shadow-lg relative z-[50001]" style={{ zIndex: 50001 }}>
        <h2 className="text-lg font-bold mb-2">Sign Below</h2>
        <SignatureCanvas
          ref={(ref)=> setSignature(ref)}
          penColor="black"
          canvasProps={{ className: "border border-gray-300 w-[300px] h-[150px]" }}
        />
        <div className="mt-2 flex justify-between gap-2">
          <button 
            onClick={handleClear}
            className="px-4 py-1 bg-red-500 hover:bg-red-600 text-white rounded transition-colors duration-200"
            style={{ position: 'relative', zIndex: 50002, pointerEvents: 'all' }}
          >
            Clear
          </button>
          <button 
            onClick={handleSave} 
            className="px-4 py-1 bg-green-500 hover:bg-green-600 text-white rounded transition-colors duration-200"
            style={{ position: 'relative', zIndex: 50002, pointerEvents: 'all' }}
          >
            Save
          </button>
          <button 
            onClick={onClose} 
            className="px-4 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded transition-colors duration-200"
            style={{ position: 'relative', zIndex: 50002, pointerEvents: 'all' }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
