import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import AudioPlayer from './components/AudioPlayer';

const audioplayer: NextPage = () => {
  return (
    <div>
      <AudioPlayer />
    </div>
  )
}

export default audioplayer;
