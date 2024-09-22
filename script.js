document.addEventListener("DOMContentLoaded", () => {
  feather.replace();

  const playPauseButton = document.getElementById("play-pause");
  const audio = document.getElementById("audio");
  const songDuration = document.getElementById("song-duration");
  const lyricsContainer = document.getElementById("lyrics-container");
  let intervalId;

  const lyrics = [
    {
      time: 0,
      text: "Manusia Hebat! Kita disatukan oleh pendidikan dan dipisahkan untuk masa depan!",
    },
    {
      time: 3,
      text: "Nur Wahyu Lestari. Tidak ada kata yang cukup untuk menggambarkan rasa terima kasihku. Perjalanan ini menjadi lebih bermakna karena kebersamaanmu. Meski kita berpisah jalan, semangatmu akan selalu jadi inspirasi. Teruslah berkarya dan jangan pernah berhenti bermimpi. Sampai jumpa di puncak yang lebih tinggi!",
    },
    {
      time: 8,
      text: "Terima kasih banyak Mery Susanti, atas semua usaha dan kebersamaan yang luar biasa. Kami percaya kamu akan terus bersinar dan sukses di perjalanan barumu. Jangan pernah berhenti bermimpi dan mengejar apa yang kamu inginkan. Semoga selalu diberikan kelancaran, dan semangat terus untuk hari-hari mendatang!",
    },
    {
      time: 11,
      text: "Terima kasih Ana Terta, atas kebersamaan dan setiap momen indah yang kita lalui. Perjalanan ini mungkin berakhir, tapi semangat dan kenangan akan selalu menyala. Tetaplah bersinar, mengejar impianmu dengan penuh keyakinan. Sampai jumpa di puncak keberhasilan, dengan senyum dan hati yang penuh semangat!",
    },
    {
      time: 16,
      text: "Setiap orang ada masanya dan setiap masa ada orangnya.  ",
    },
    {
      time: 20,
      text: "Terimakasih udah jadi support system selama beberapa bulan belakangan.",
    },
    {
      time: 23,
      text: "Gimanapun akhirnya pertemanan kita nanti, aku beruntung bisa kenal orang se hebat kalian.  ",
    },
    {
      time: 27,
      text: "akhirnya kita sampai dititik dimana kita dipaksa untuk berpisah satu sama lain. senang mengenal kalian, dan semoga pertemanan kita tetap terjaga walau terpisah jarak yang jauh",
    },
    {
      time: 32,
      text: "Tetap sehat dan hidup lebih lama, sampai bahagia terlihat. ",
    },
    {
      time: 37,
      text: "Terima kasih atas kebersamaannya, sampai jumpa di lain kesempatan. Tetap semangat dan jaga kesehatan!",
    },
    { time: 44, text: "Sayang Kalian Banyak-banyak!!" },
  ];

  playPauseButton.addEventListener("click", () => {
    togglePlay();
  });

  function togglePlay() {
    if (audio.paused) {
      audio.play();
      playPauseButton.innerHTML = '<i data-feather="pause"></i>';
      feather.replace();
      displayDuration();
      startPageTransition();
      syncLyrics();
    } else {
      audio.pause();
      playPauseButton.innerHTML = '<i data-feather="play"></i>';
      feather.replace();
      clearInterval(intervalId);
      clearInterval(lyricsInterval);
    }
  }

  function displayDuration() {
    audio.addEventListener("loadedmetadata", () => {
      const duration = formatTime(audio.duration);
      songDuration.textContent = duration;
    });

    audio.addEventListener("timeupdate", () => {
      const currentTime = formatTime(audio.currentTime);
      const duration = formatTime(audio.duration);
      songDuration.textContent = currentTime + " / " + duration;
    });
  }

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedTime = `${minutes}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
    return formattedTime;
  }

  function preloadImages(pages) {
    return new Promise((resolve) => {
      let loadedCount = 0;
      const totalImages = pages.length;

      pages.forEach((page) => {
        const img = page.querySelector("img");
        if (img.complete) {
          loadedCount++;
          if (loadedCount === totalImages) resolve();
        } else {
          img.onload = () => {
            loadedCount++;
            if (loadedCount === totalImages) resolve();
          };
        }
      });
    });
  }

  const rightPages = document.querySelectorAll(".right-page");
  let currentPage = 0;

  function showPage(pageIndex) {
    rightPages.forEach((page, index) => {
      if (index === pageIndex) {
        page.style.transform = "rotateY(0deg)";
        page.style.zIndex = 2;
        page.style.visibility = "visible";
      } else if (index < pageIndex) {
        page.style.transform = "rotateY(-180deg)";
        page.style.zIndex = 1;
        page.style.visibility = "visible";
      } else {
        page.style.transform = "rotateY(0deg)";
        page.style.zIndex = 0;
        page.style.visibility = "visible";
      }
    });

    if (pageIndex < rightPages.length - 1) {
      rightPages[pageIndex + 1].style.transform = "rotateY(0deg)";
      rightPages[pageIndex + 1].style.zIndex = 1;
      rightPages[pageIndex + 1].style.visibility = "visible";
    }
  }

  function nextPage() {
    if (currentPage < rightPages.length - 1) {
      currentPage++;
    } else {
      currentPage = 0;
    }
    showPage(currentPage);
  }

  function startPageTransition() {
    intervalId = setInterval(nextPage, 4000);
  }

  function syncLyrics() {
    const lyricsInterval = setInterval(() => {
      const currentTime = audio.currentTime;
      const currentLyric = lyrics.find(
        (lyric) => Math.floor(lyric.time) === Math.floor(currentTime)
      );
      if (currentLyric) {
        lyricsContainer.textContent = currentLyric.text;
      }
    }, 1000);
  }

  preloadImages(rightPages).then(() => {
    showPage(currentPage);
  });
});
