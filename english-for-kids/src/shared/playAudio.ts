import correctSoundSrc from '../assets/correct.mp3';
import wrongSoundSrc from '../assets/error.mp3';

const correctSound = new Audio(correctSoundSrc);
const wrongSound = new Audio(wrongSoundSrc);

export const playAudio = async (src: string | undefined): Promise<void | null> => {
  if (src) {
    const audio = new Audio(src);
    audio.play();
    audio.onended = () => {
      audio.src = '';
      audio.srcObject = null;
      audio.remove();
      Promise.resolve();
    };
  }
  return null;
};

export const playCorrectSound = (): void => {
  correctSound.play();
};

export const playWrongSound = (): void => {
  wrongSound.play();
};
