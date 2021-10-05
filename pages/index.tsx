import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import AudioPlayer from "./components/AudioPlayer";

const Home: NextPage = () => {
  return (
    <div>
      <AudioPlayer />
    </div>
  )
}

export default Home
