const playAudio = (src: string | undefined): void => {
  if (src) {
    const audio = new Audio(`./public/${src}`);
    if (HTMLMediaElement.HAVE_FUTURE_DATA) audio.play();
  }
};

export default playAudio;
