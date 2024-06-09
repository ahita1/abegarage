import { Link } from "react-router-dom"


function HomeFirst() {
  return (
  <section className="video video-section">
            <div data-parallax='{"y": 50}' className="sec-bg1"></div>
            <div className="auto-container">
                <h5>Working since 1999</h5>
                <h2>Tuneup Your Car <br /> to Next Level</h2>
                <div className="video-box">
                    <div className="video-btn"><Link to="https://www.youtube.com/watch?v=nfP5N9Yc72A&amp;t=28s"
                            className="overlay-link lightbox-image video-fancybox ripple"><i className="flaticon-play"></i></Link>
                    </div>
                    <div className="text">Watch intro video <br/> about us</div>
                </div>
            </div>
        </section>
  )
}

export default HomeFirst