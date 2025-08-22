import React, { useEffect, useRef } from "react";
import * as faceapi from "face-api.js";
import "./FacialExpression.css";
import axios from "axios";

export default function FacialExpression({ setSongs, setDetectedMood }) {
  const videoRef = useRef();

  const loadModels = async () => {
    const MODEL_URL = "/models";
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
  };

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error("Error accessing webcam: ", err));
  };

  async function detectMood() {
    const detections = await faceapi
      .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();

    if (!detections || detections.length === 0) {
      console.log("No face detected!");
      setDetectedMood(null);
      setSongs([]);
      return;
    }

    let mostProbableExpression = 0;
    let _expression = "";

    for (const expression of Object.keys(detections[0].expressions)) {
      const probability = detections[0].expressions[expression];
      if (probability > mostProbableExpression) {
        mostProbableExpression = probability;
        _expression = expression;
      }
    }

    console.log("Detected mood:", _expression);
    setDetectedMood(_expression); // <-- update mood in App

    // Fetch songs for mood
    axios
      .get(`http://localhost:3000/songs?mood=${_expression}`)
      .then((response) => {
        console.log(response.data);
        setSongs(response.data.songs || []);
      })
      .catch((err) => console.error("Error fetching songs:", err));
  }

  useEffect(() => {
    loadModels().then(startVideo);
  }, []);

  return (
    <div className="mood-element">
      <video ref={videoRef} autoPlay muted className="user-video-feed" />
      <button onClick={detectMood}>Detect Mood</button>
    </div>
  );
}
