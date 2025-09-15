import React,{useRef} from 'react';
import CanvasGuide from './CANVASGUIDE';
import Whiteboard from './Whiteboard';

const App = () => {
  const ctx = useRef(null);
  return (
    <>  
      {/* <div className='h-screen w-screen bg-zinc-900 p-6 flex justify-center items-center'>
        <canvas ref={ctx} className='bg-gray-100 border-1 border-zinc-400 max-w-5xl w-full m-auto '>

        </canvas>
      </div> */}
      {/* <CanvasGuide /> */}
      <Whiteboard />
    </>
  )
}

export default App