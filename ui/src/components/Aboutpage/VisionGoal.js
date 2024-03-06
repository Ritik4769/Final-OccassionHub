import vision from '../../images/vision.jpg'
import goal from '../../images/goals.jpg'
import approach from '../../images/approach.jpg'
function VisionGoal() {
  return (<>
    <section id="what-we-do" class="what-we-do" style={{ backgroundColor: "black" }}>
      <div class="container">

        <div class="section-title">
          <h2>We <span style={{ color: "#FF0057" }}>Create Events</span> That Lasts</h2>
          <p>From Wedding Functions to Birthday Parties or Corporate Events to Musical Functions,</p>
          <p> We offer a full range of Events Management Services that scale to your needs & budget</p>
        </div>

        <div class="row">
          <div class="col-lg-4 col-md-6 d-flex align-items-stretch">
            <div class="icon-box">
              <div class="icon">
                <img src={vision} alt="" />
              </div>
              <h4><a href="">Our Vision</a></h4>
              <p>Aorem ipsum dolor sit amet consectetur elit sed tempor incididunt ut labore etua dolore mag aliqua minim veniam quis nostrud exercitation</p>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0">
            <div class="icon-box">
              <div class="icon"><img src={approach} alt="" /></div>
              <h4><a href="">Our Approach</a></h4>
              <p>Aorem ipsum dolor sit amet consectetur elit sed tempor incididunt ut labore etua dolore mag aliqua minim veniam quis nostrud exercitation</p>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0">
            <div class="icon-box">
              <div class="icon"><img src={goal} alt="" /></div>
              <h4><a href="">Our Goal</a></h4>
              <p>Aorem ipsum dolor sit amet consectetur elit sed tempor incididunt ut labore etua dolore mag aliqua minim veniam quis nostrud exercitation</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  </>)
}
export default VisionGoal