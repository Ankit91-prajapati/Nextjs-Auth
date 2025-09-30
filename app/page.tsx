

export default function Home() {
  return (
    <div className="w-screen h-screen bg-gradient-to-t from-blue-600 to-slate-300">
      <div className="relative w-full h-64 bg-blue-300 overflow-hidden flex flex-row items-center justify-center">
     
        <svg
          className="absolute bottom-0 w-full h-24"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#3b82f6"
            fill-opacity="1"
            d="M0,160L60,165.3C120,171,240,181,360,176C480,171,600,149,720,160C840,171,960,213,1080,218.7C1200,224,1320,192,1380,176L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
}
