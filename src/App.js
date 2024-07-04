import React, { useEffect, useRef, useState } from 'react';
// import axios from 'axios';
import './App.css';
import * as THREE from 'three';

  
const App = () => {
  const [textInput, setTextInput] = useState('');
  const [modelUrl, setModelUrl] = useState('');
  const mountRef = useRef(null);
  useEffect(() => {
    const mount = mountRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    const animate = function () {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      mount.removeChild(renderer.domElement);
    };
  }, []);


  const handleGenerateModel = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/request/Bunny");
        console.log(response.json())
        setModelUrl();
    } catch (error) {
      console.error('Error generating model:', error);
      // Можно добавить обработку ошибок здесь
    }

  };

  return (
    <div className="app">
      <div className='titleContainer'>
        <div className='titleText'>
          <h1>OmniShaper</h1>
          <h2>Service for generating 3D model using text</h2>
        </div>
        <div className="input-container">
          <textarea
            className="text-input"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Write text for generating 3D model..."
          />
          <button className="generate-button" onClick={handleGenerateModel}>
            Generate Model
          </button>
      </div>
      </div>
        <div className="model-viewer" ref={mountRef}>
        </div>
    </div>
  );
};

export default App;
