import * as THREE from 'three'; // Core Three.js library
import { OrbitControls } from 'jsm/controls/OrbitControls.js'; // Orbit controls for camera movement
import getStarfield from './starsAndglow/getStarfield.js'; // Import your custom starfield module
import { getFresnelMat } from './starsAndglow/getFresnelMat.js'; // Import your custom Fresnel material module

document.addEventListener('DOMContentLoaded', () => {
  // Basic Scene Setup
  const w = window.innerWidth;
  const h = window.innerHeight;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
  camera.position.z = 5;
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(w, h);
  document.body.appendChild(renderer.domElement);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

  // Earth Group Setup
  const earthGroup = new THREE.Group();
  earthGroup.rotation.z = (-23.4 * Math.PI) / 180;
  scene.add(earthGroup);
  new OrbitControls(camera, renderer.domElement);

  const detail = 12;
  const loader = new THREE.TextureLoader();

  const geometry = new THREE.IcosahedronGeometry(1, detail);
  const material = new THREE.MeshPhongMaterial({
    map: loader.load('../textures/Alpine.png'),
    specularMap: loader.load('../textures/Alpine.png'),
    bumpMap: loader.load('../textures/Alpine.png'),
    bumpScale: 0.04,
  });
  const earthMesh = new THREE.Mesh(geometry, material);
  earthGroup.add(earthMesh);

  const textureOptions = document.querySelectorAll('.texture-option');

  textureOptions.forEach((option) => {
    option.addEventListener('click', () => {
      const selectedTexture = option.getAttribute('data-texture');
      material.map = loader.load(`../textures/${selectedTexture}`);
      material.needsUpdate = true;
    });
  });

  const cloudsMat = new THREE.MeshStandardMaterial({
    map: loader.load('../textures/clouds/04_earthcloudmap.jpg'),
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    alphaMap: loader.load('../textures/clouds/05_earthcloudmaptrans.jpg'),
  });
  const cloudsMesh = new THREE.Mesh(geometry, cloudsMat);
  cloudsMesh.scale.setScalar(1.003);
  earthGroup.add(cloudsMesh);

  const fresnelMat = getFresnelMat();
  const glowMesh = new THREE.Mesh(geometry, fresnelMat);
  glowMesh.scale.setScalar(1.01);
  earthGroup.add(glowMesh);
  glowMesh.visible = false;

  // Starfield Setup
  const stars = getStarfield({ numStars: 2000 });
  scene.add(stars);

  const sunLight = new THREE.DirectionalLight(0xffffff, 2.0);
  sunLight.position.set(-2, 0.5, 1.5);
  scene.add(sunLight);

  // Cloud Texture Selection
  const cloudTextureSelect = document.getElementById('cloudTextureSelect');

  cloudTextureSelect.addEventListener('change', (event) => {
    const selectedTexture = event.target.value;
    cloudsMat.map = loader.load(`../textures/clouds/${selectedTexture}`);
    cloudsMat.needsUpdate = true;
  });

  // Initial load for the clouds material
  cloudsMat.map = loader.load(`../textures/clouds/${cloudTextureSelect.value}`);
  cloudsMat.needsUpdate = true;

  // Glow Toggle Functionality
  const glowToggle = document.getElementById('glowToggle');
  const glowColorPicker = document.getElementById('glowColorPicker');
  glowToggle.addEventListener('change', () => {
    glowMesh.visible = glowToggle.checked;
    glowColorPicker.style.display = glowToggle.checked ? 'block' : 'none';
  });

  glowColorPicker.addEventListener('input', () => {
    const color = new THREE.Color(glowColorPicker.value);
    fresnelMat.updateColors(
      color.getHex(),
      fresnelMat.uniforms.color2.value.getHex()
    );
  });

  // Cloud Speed Control
  const cloudSpeedSlider = document.getElementById('cloudSpeed');
  const cloudSpeedValue = document.getElementById('cloudSpeedValue');

  cloudSpeedSlider.addEventListener('input', () => {
    cloudSpeedValue.textContent = cloudSpeedSlider.value;
  });

  // Handle Window Resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Animation Loop
  function animate() {
    requestAnimationFrame(animate);
    earthMesh.rotation.y += 0.0016;
    cloudsMesh.rotation.y += parseFloat(cloudSpeedSlider.value);
    glowMesh.rotation.y += 0.002;
    stars.rotation.y -= 0.0002;

    renderer.render(scene, camera);
  }
  animate();

  // Capture Screenshot
  function captureScreenshot() {
    renderer.render(scene, camera); // Force one more render to ensure scene is updated
    return renderer.domElement.toDataURL('image/png');
  }

  // Download Image Button Click
  const downloadButton = document.getElementById('downloadImage');
  downloadButton.addEventListener('click', () => {
    const screenshot = captureScreenshot();
    const a = document.createElement('a');
    a.href = screenshot;
    a.download = 'planet.png'; // Set the default filename for download
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a); // Clean up the element after clicking
  });
});
