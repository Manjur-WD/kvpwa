import videoKv from "../../../assets/images/kv-video.mp4"

const VideoSection = () => {
  return (
    <>
      <section className="video-section">
      <video src={videoKv} muted autoPlay loop className=""></video>
      </section>
    </>
  )
}

export default VideoSection
