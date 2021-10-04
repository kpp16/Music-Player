import React, {useState, useEffect, useRef, LegacyRef} from 'react';
import styles from '../../styles/AudioPlayer.module.css';
import { GrPlayFill, GrPauseFill } from 'react-icons/gr';
import {BsArrowRight, BsArrowLeft} from 'react-icons/bs';
import {GiNextButton, GiPreviousButton} from 'react-icons/gi';

const AudioPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [musicName, setMusicName] = useState("Current Music Name");
    const [source, setSource] = useState("../../static/cipher.mp3");

    const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
    const progressBar = useRef<HTMLInputElement | null>(null);
    const animationRef = useRef<Number | 0>();

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
    [isPlaying, audioPlayerRef])

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

    }, [audioPlayerRef?.current?.onloadeddata, audioPlayerRef?.current?.readyState])

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

    return(
        <div className={styles.heading}>
            <h2>{musicName}</h2>
            <br />
            <img className={styles.image} src="../../static/img1.png"></img>
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
                <button className={styles.beforeAfter}><GiPreviousButton /></button>

                {/* seek backward */}
                <button className={styles.forwardBackward} onClick={backTen}><BsArrowLeft /> 10</button>

                {/* Play/Pause */}
                <button className={styles.playPause} onClick={togglePlayPause}>{isPlaying? <GrPauseFill /> : <GrPlayFill />}</button>

                {/* seek forward */}
                <button className={styles.forwardBackward} onClick={forwardTen}><BsArrowRight /> 10</button>

                {/* Song after */}
                <button className={styles.beforeAfter}><GiNextButton /></button>

                <audio id = "a1" preload="metadata" ref={audioPlayerRef} src={source}>
                </audio>
            </div>
        </div>
    );
}

export default AudioPlayer;