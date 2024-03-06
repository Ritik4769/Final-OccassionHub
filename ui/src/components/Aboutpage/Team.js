import anjali from '../../images/anjali.jpg'
import aarti from '../../images/aarti.jpg'
import ritik from '../../images/ritik.jpg'
import jayanti from '../../images/jayanti.jpg'
function Team() {
  return (<>
    <section id="team" class="team bg-dark">
      <div class="container">
        <div class="section-title">
          <h2><span style={{ color: "#FF0057" }}>Events</span> Team Members</h2>
          <p>We make your events smart & impactful by personalised event management services</p>
        </div>
        <div style={{ display: "flex" }} class="row">
          <div class="card  col-md-6" style={{ maxWidth: "500px" }}>
            <div class="row g-0">
              <div class=" images col-md-6">
                <img src={anjali} class="img-fluid rounded-start" alt="..." />
              </div>
              <div class="col-md-6">
                <div class="card-body">
                  <div class="ui-decor-2 "></div>
                  <h5 class="card-title cardtitle">Ava Taylor</h5>
                  <h6 class="card-word">Supervisor</h6>
                  <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>

                </div>
              </div>
            </div>
          </div>
          <div class="card  col-md-6" style={{ maxWidth: "500px" }}>
            <div class="row g-0">
              <div class=" images col-md-6">
                <img src={aarti} class="img-fluid rounded-start" alt="..." />
              </div>
              <div class="col-md-6">
                <div class="card-body">
                  <div class="ui-decor-2 "></div>
                  <h5 class="card-title cardtitle">Kethy Hilton</h5>
                  <h6 class="card-word">Events Manager</h6>
                  <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>

                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex" }} class="row" >
          <div class="card  col-md-6" style={{ maxWidth: "500px" }}>
            <div class="row g-0">
              <div class="images col-md-6">
                <img src={ritik} class="img-fluid rounded-start" alt="..." />
              </div>
              <div class="col-md-6">
                <div class="card-body">
                  <div class="ui-decor-2 "></div>
                  <h5 class="card-title cardtitle">Charles Hasman</h5>
                  <h6 class="card-word">Founder & Director</h6>
                  <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>

                </div>
              </div>
            </div>
          </div>
          <div class="card  col-md-6" style={{ maxWidth: "500px" }}>
            <div class="row g-0">
              <div class="images col-md-6">
                <img src={jayanti} class="img-fluid rounded-start" alt="..." />
              </div>
              <div class="col-md-6">
                <div class="card-body">
                  <div class="ui-decor-2 "></div>
                  <h5 class="card-title cardtitle">Anna Sydney</h5>
                  <h6 class="card-word">Events Manager</h6>
                  <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>)
}
export default Team