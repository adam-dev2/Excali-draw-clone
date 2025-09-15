import React, { useRef, useEffect, useState, useCallback } from 'react';

const CanvasGuide = () => {
  const canvasRef = useRef(null);
  const drawingCanvasRef = useRef(null);
  const animationCanvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentTool, setCurrentTool] = useState('pen');
  const [brushSize, setBrushSize] = useState(5);
  const [brushColor, setBrushColor] = useState('#000000');

  // Basic Canvas Setup and Drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw some basic shapes
    drawBasicShapes(ctx, canvas);
  }, []);

  const drawBasicShapes = (ctx, canvas) => {
    // Rectangle
    ctx.fillStyle = '#3B82F6';
    ctx.fillRect(20, 20, 100, 80);
    
    // Circle
    ctx.fillStyle = '#EF4444';
    ctx.beginPath();
    ctx.arc(200, 60, 40, 0, Math.PI * 2);
    ctx.fill();
    
    // Line
    ctx.strokeStyle = '#10B981';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(280, 20);
    ctx.lineTo(380, 100);
    ctx.stroke();
    
    // Text
    ctx.fillStyle = '#8B5CF6';
    ctx.font = '20px Arial';
    ctx.fillText('Hello Canvas!', 20, 140);
    
    // Gradient
    const gradient = ctx.createLinearGradient(0, 160, 200, 160);
    gradient.addColorStop(0, '#F59E0B');
    gradient.addColorStop(1, '#EF4444');
    ctx.fillStyle = gradient;
    ctx.fillRect(20, 160, 200, 40);
  };

  // Drawing functionality
  const startDrawing = useCallback((e) => {
    setIsDrawing(true);
    const canvas = drawingCanvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(x, y);
  }, []);

  const draw = useCallback((e) => {
    if (!isDrawing) return;
    
    const canvas = drawingCanvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ctx = canvas.getContext('2d');
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = currentTool === 'eraser' ? '#FFFFFF' : brushColor;
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  }, [isDrawing, brushSize, brushColor, currentTool]);

  const stopDrawing = useCallback(() => {
    setIsDrawing(false);
  }, []);

  const clearCanvas = () => {
    const canvas = drawingCanvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // Animation example
  useEffect(() => {
    const canvas = animationCanvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    let animationId;
    let angle = 0;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Rotating circle
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = 50;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      
      ctx.fillStyle = '#8B5CF6';
      ctx.beginPath();
      ctx.arc(x, y, 15, 0, Math.PI * 2);
      ctx.fill();
      
      // Sine wave
      ctx.strokeStyle = '#10B981';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let i = 0; i < canvas.width; i++) {
        const waveY = centerY + Math.sin((i + angle * 50) * 0.02) * 30;
        if (i === 0) {
          ctx.moveTo(i, waveY);
        } else {
          ctx.lineTo(i, waveY);
        }
      }
      ctx.stroke();
      
      angle += 0.02;
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  // Download canvas as image
  const downloadCanvas = (canvasRef, filename) => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Canvas in React + Tailwind Guide</h1>
        <p className="text-gray-600">Complete examples of working with HTML5 Canvas in React</p>
      </div>

      {/* Basic Canvas Example */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">1. Basic Canvas Drawing</h2>
        <canvas 
          ref={canvasRef}
          className="w-full h-48 border border-gray-300 rounded-lg"
          style={{ maxWidth: '500px' }}
        />
        <button
          onClick={() => downloadCanvas(canvasRef, 'basic-canvas.png')}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Download Image
        </button>
      </div>

      {/* Interactive Drawing Canvas */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">2. Interactive Drawing Canvas</h2>
        
        {/* Controls */}
        <div className="mb-4 space-y-3">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentTool('pen')}
                className={`px-3 py-1 rounded ${
                  currentTool === 'pen' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
              >
                Pen
              </button>
              <button
                onClick={() => setCurrentTool('eraser')}
                className={`px-3 py-1 rounded ${
                  currentTool === 'eraser' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
              >
                Eraser
              </button>
              <button
                onClick={clearCanvas}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Clear
              </button>
            </div>
            
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Size:</label>
              <input
                type="range"
                min="1"
                max="50"
                value={brushSize}
                onChange={(e) => setBrushSize(e.target.value)}
                className="w-20"
              />
              <span className="text-sm w-8">{brushSize}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Color:</label>
              <input
                type="color"
                value={brushColor}
                onChange={(e) => setBrushColor(e.target.value)}
                className="w-8 h-8 rounded border"
              />
            </div>
          </div>
        </div>

        <canvas
          ref={drawingCanvasRef}
          width={600}
          height={300}
          className="w-full border border-gray-300 rounded-lg cursor-crosshair bg-white"
          style={{ maxWidth: '600px', maxHeight: '300px' }}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        />
        
        <button
          onClick={() => downloadCanvas(drawingCanvasRef, 'drawing.png')}
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Download Drawing
        </button>
      </div>

      {/* Animation Canvas */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">3. Animated Canvas</h2>
        <canvas
          ref={animationCanvasRef}
          className="w-full h-48 border border-gray-300 rounded-lg bg-gray-50"
          style={{ maxWidth: '500px' }}
        />
        <p className="mt-2 text-sm text-gray-600">
          Animated rotating circle and sine wave using requestAnimationFrame
        </p>
      </div>

      {/* Code Examples */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Key Concepts & Code Examples</h2>
        
        <div className="space-y-4 text-sm">
          <div>
            <h3 className="font-semibold text-gray-800">1. Canvas Setup with useRef:</h3>
            <code className="block bg-gray-800 text-green-400 p-2 rounded mt-1">
              {`const canvasRef = useRef(null);
const canvas = canvasRef.current;
const ctx = canvas.getContext('2d');`}
            </code>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800">2. Responsive Canvas Sizing:</h3>
            <code className="block bg-gray-800 text-green-400 p-2 rounded mt-1">
              {`canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;`}
            </code>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800">3. Mouse Event Handling:</h3>
            <code className="block bg-gray-800 text-green-400 p-2 rounded mt-1">
              {`const rect = canvas.getBoundingClientRect();
const x = e.clientX - rect.left;
const y = e.clientY - rect.top;`}
            </code>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800">4. Animation Loop:</h3>
            <code className="block bg-gray-800 text-green-400 p-2 rounded mt-1">
              {`const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // ... drawing code ...
  requestAnimationFrame(animate);
};`}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CanvasGuide;