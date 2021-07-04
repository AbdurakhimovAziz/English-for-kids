const playAudio = (src: string | undefined): HTMLAudioElement | null => {
  if (src) {
    const audio = new Audio(src);
    if (HTMLMediaElement.HAVE_FUTURE_DATA) audio.play();
    return audio;
  }
  return null;
};

export default playAudio;
