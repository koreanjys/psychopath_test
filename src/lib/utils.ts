export const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};

export const shareResults = (title: string, text: string, url?: string) => {
  if (navigator.share) {
    navigator.share({
      title,
      text,
      url: url || window.location.href
    });
  } else {
    // Fallback for browsers that don't support Web Share API
    navigator.clipboard.writeText(`${text} ${url || window.location.href}`);
    alert('링크가 클립보드에 복사되었습니다!');
  }
};

export const downloadImage = (canvas: HTMLCanvasElement, filename: string) => {
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL();
  link.click();
};

export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};
