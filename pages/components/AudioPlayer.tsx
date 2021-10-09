import React, {useState, useEffect, useRef, LegacyRef, useCallback} from 'react';
import styles from '../../styles/AudioPlayer.module.css';
import { GrPlayFill, GrPauseFill } from 'react-icons/gr';
import {BsArrowRight, BsArrowLeft} from 'react-icons/bs';
import {GiNextButton, GiPreviousButton} from 'react-icons/gi';

const AudioPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [musicName, setMusicName] = useState("");
    const [source, setSource] = useState("../../static/cipher.mp3");
    const [imgSource, setImgSource] = useState("../../static/img1.png");
    const [audioData, setAudioData] = useState("");
    const [id, setID] = useState(1);

    // References
    const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
    const progressBar = useRef<HTMLInputElement | null>(null);
    const animationRef = useRef<Number | 0>();

    const url = "https://cead-183-83-187-103.ngrok.io/audiocontroller/next/";


    // Fetch data from the backend to load music when the page is refreshed
    useEffect(() => {
        const fetch_data = async () => {
            const uurl = url + "1";
            console.log("URL:", uurl);
            try{
                const res = await fetch(uurl);
                const audio_data = await res.json();
                console.log("Audio data: ", audio_data);
                setAudioData(audio_data);
                setMusicName(audio_data.name);
                setSource(audio_data.audioLocation);
                setImgSource(audio_data.imageLocation);
                setID(audio_data.id);
            } catch (error) {
                console.log("Error fetching URL: ", error);
            }
        };
        fetch_data();
    }, []);

    // Previous and next buttons
    const next = useCallback(async () => {
        const new_id = id + 1;
        const uurl = url + String(new_id);
            console.log("URL:", url);
            try{
                const res = await fetch(uurl);
                const audio_data = await res.json();
                console.log("Audio data: ", audio_data);
                setAudioData(audio_data);
                setMusicName(audio_data.name);
                setSource(audio_data.audioLocation);
                setImgSource(audio_data.imageLocation);
                setID(audio_data.id);
                start();
                setIsPlaying(true);
            } catch (error) {
                console.log("Error fetching URL: ", error);
            }
    }, [id]);
    const prev = useCallback(async () => {
        const new_id = id - 1;
        const uurl = url + String(new_id);
            console.log("URL:", url);
            try{
                const res = await fetch(uurl);
                const audio_data = await res.json();
                console.log("Audio data: ", audio_data);
                setAudioData(audio_data);
                setMusicName(audio_data.name);
                setSource(audio_data.audioLocation);
                setImgSource(audio_data.imageLocation);
                setID(audio_data.id);
                start();
                setIsPlaying(true);
            } catch (error) {
                console.log("Error fetching URL: ", error);
            }
    }, [id]);

    const togglePlayPause = () => {
        const prev = isPlaying
        setIsPlaying(!prev);
        if (!prev) {
            audioPlayerRef.current!.play();
            animationRef.current = requestAnimationFrame(whilePlaying)
        } else {
            audioPlayerRef.current?.pause();
            cancelAnimationFrame(Number(animationRef.current));
        }
    }
    useEffect(() => {
        isPlaying? audioPlayerRef.current?.play() : audioPlayerRef.current?.pause();
    },
    [isPlaying, audioPlayerRef]);

    useEffect(() => {
        var seconds = audioPlayerRef.current?.duration;
        if (seconds == null) {
            seconds = 0;
        } else {
            seconds = Math.floor(seconds);
        }
        console.log("Seconds: ", seconds);
        setDuration(seconds);
        progressBar.current!.max = String(seconds);

    }, [audioPlayerRef?.current?.onloadeddata, audioPlayerRef?.current?.readyState]);

    const whilePlaying = () => {
        progressBar.current!.value = String(audioPlayerRef.current!.currentTime);
        changePlayerCurrentTime();
        animationRef.current = requestAnimationFrame(whilePlaying);
    }

    const calculateTime = (secs: number) => {
        const minutes = Math.floor(secs / 60);
        const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const seconds = Math.floor(secs % 60);
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${returnedMinutes}:${returnedSeconds}`;
    }

    const changeRange = () => {
        audioPlayerRef.current!.currentTime = Number(progressBar.current!.value);
        changePlayerCurrentTime();
    }

    const changePlayerCurrentTime = () => {
        progressBar.current!.style.setProperty('--seek-before-width', `${Number(progressBar.current!.value) / duration * 100}%`)
        setCurrentTime(Number(progressBar.current!.value));
    }


    const backTen = () => {
        progressBar.current!.value = String(Number(progressBar.current!.value) - 10);
        changeRange();
    }

    const forwardTen = () => {
        progressBar.current!.value = String(Number(progressBar.current!.value) + 10);
        changeRange();
    }

    const start = () => {
        progressBar.current!.value = "0";
        changeRange();
        setIsPlaying(false);
    }

    return(
        <div className={styles.heading}>
            <h2>{musicName}</h2>
            <br />
            <div className={styles.imageDiv}>
                <img className={styles.image} src={imgSource}></img>
            </div>
            <div>
                <div className={styles.sliderTime}>
                    {/* Current Time */}
                    {calculateTime(currentTime)}
                    {/* Slider */}
                    <input className={styles.slider} type="range" ref={progressBar} defaultValue="0" onChange={changeRange}></input>
                    {/* Remaining Time */}
                    {calculateTime(duration)}
                </div>
                <br />

                {/* Song before */}
                <button className={styles.beforeAfter} onClick={prev}><GiPreviousButton /></button>

                {/* seek backward */}
                <button className={styles.forwardBackward} onClick={backTen}><BsArrowLeft /> 10</button>

                {/* Play/Pause */}
                <button className={styles.playPause} onClick={togglePlayPause}>{isPlaying? <GrPauseFill /> : <GrPlayFill />}</button>

                {/* seek forward */}
                <button className={styles.forwardBackward} onClick={forwardTen}><BsArrowRight /> 10</button>

                {/* Song after */}
                <button className={styles.beforeAfter} onClick={next}><GiNextButton /></button>

                <audio id = "a1" preload="metadata" ref={audioPlayerRef} src={source}>
                </audio>
            </div>
        </div>
    );
}

export default AudioPlayer;