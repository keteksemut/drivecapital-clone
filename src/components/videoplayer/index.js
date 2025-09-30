import ReactPlayer from "react-player";

export const VideoPlayer = ({ url, className, playing, setPlayVideo }) => {
    return (
        <div className={className}>
            <div onClick={() => setPlayVideo(false)} className="overlay" />
            <ReactPlayer
                url={url}
                playing={playing}
                controls={true}
                config={{
                    youtube: {
                        playerVars: {
                            controls: 1,
                            modestbranding: 1,
                        },
                    },
                }}
            />
        </div>
    );
};