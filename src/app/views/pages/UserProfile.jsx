import { Link } from "react-router-dom";
import { Tabs, Tab, Col, Card, Row } from "react-bootstrap";
import Breadcrumb from "app/components/Breadcrumb";

export default function UserProfile() {
  return (
    <section>
      <Breadcrumb
        routeSegments={[
          { name: "Home", path: "/" },
          { name: "Pages", path: "/pages" },
          { name: "User Profile" }
        ]}
      />

      <div className="card user-profile o-hidden mb-4">
        <div
          className="header-cover"
          style={{ backgroundImage: "url('/assets/images/photo-wide-5.jpeg')" }}
        />

        <div className="user-info">
          <img className="profile-picture avatar-lg mb-2" src="/assets/images/faces/1.jpg" alt="" />
          <p className="m-0 text-24">Timothy Carlson</p>
          <p className="text-muted m-0">Digital Marketer</p>
        </div>

        <div className="card-body pt-4">
          <Tabs defaultActiveKey="Timeline" className="justify-content-center profile-nav mb-4">
            <Tab eventKey="Timeline" title="Timeline">
              <div
                className="tab-pane fade active show"
                id="timeline"
                role="tabpanel"
                aria-labelledby="timeline-tab">
                <ul className="timeline clearfix">
                  <li className="timeline-line" />
                  <li className="timeline-item">
                    <div className="timeline-badge">
                      <i className="badge-icon bg-primary text-white i-Cloud-Laptop" />
                    </div>
                    <div className="timeline-card card">
                      <div className="card-body">
                        <div className="mb-1">
                          <strong className="me-1">Timothy Carlson</strong>
                          added a new photo
                          <p className="text-muted">3 hours ago</p>
                        </div>
                        <img
                          className="rounded mb-2"
                          src="/assets/images/photo-wide-1.jpg"
                          alt=""
                        />
                        <div className="mb-3">
                          <span className="me-1">Like</span>
                          <span>Comment</span>
                        </div>
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Write comment"
                            aria-label="comment"
                          />
                          <div className="input-group-append">
                            <button className="btn btn-primary" type="button" id="button-comment1">
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="timeline-item">
                    <div className="timeline-badge">
                      <img className="badge-img" src="/assets/images/faces/1.jpg" alt="" />
                    </div>
                    <div className="timeline-card card">
                      <div className="card-body">
                        <div className="mb-1">
                          <strong className="me-1">Timothy Carlson</strong>
                          updated his sattus
                          <p className="text-muted">16 hours ago</p>
                        </div>
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi dicta beatae
                          illo illum iusto iste mollitia explicabo quam officia. Quas ullam,
                          quisquam architecto aspernatur enim iure debitis dignissimos suscipit
                          ipsa.
                        </p>
                        <div className="mb-3">
                          <span className="me-1">Like</span>
                          <span>Comment</span>
                        </div>
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Write comment"
                            aria-label="comment"
                          />
                          <div className="input-group-append">
                            <button className="btn btn-primary" type="button" id="button-comment2">
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>

                <ul className="timeline clearfix">
                  <li className="timeline-line" />
                  <li className="timeline-group text-center">
                    <button className="btn btn-icon-text btn-primary">
                      <i className="i-Calendar-4" /> 2018
                    </button>
                  </li>
                </ul>

                <ul className="timeline clearfix">
                  <li className="timeline-line" />

                  <li className="timeline-item">
                    <div className="timeline-badge">
                      <i className="badge-icon bg-danger text-white i-Love-User" />
                    </div>

                    <div className="timeline-card card">
                      <div className="card-body">
                        <div className="mb-1">
                          <strong className="me-1">New followers</strong>
                          <p className="text-muted">2 days ago</p>
                        </div>
                        <p>
                          <Link to="/">Henry krick</Link> and 16 others followed you
                        </p>
                        <div className="mb-3">
                          <span className="me-1">Like</span>
                          <span>Comment</span>
                        </div>
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Write comment"
                            aria-label="comment"
                          />
                          <div className="input-group-append">
                            <button className="btn btn-primary" type="button" id="button-comment3">
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li className="timeline-item">
                    <div className="timeline-badge">
                      <i className="badge-icon bg-primary text-white i-Cloud-Laptop" />
                    </div>
                    <div className="timeline-card card">
                      <div className="card-body">
                        <div className="mb-1">
                          <strong className="me-1">Timothy Carlson</strong>
                          added a new photo
                          <p className="text-muted">2 days ago</p>
                        </div>
                        <img
                          className="rounded mb-2"
                          src="/assets/images/photo-wide-2.jpg"
                          alt=""
                        />
                        <div className="mb-3">
                          <span className="me-1">Like</span>
                          <span>Comment</span>
                        </div>
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Write comment"
                            aria-label="comment"
                          />
                          <div className="input-group-append">
                            <button className="btn btn-primary" type="button" id="button-comment4">
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>

                <ul className="timeline clearfix">
                  <li className="timeline-line" />
                  <li className="timeline-group text-center">
                    <button className="btn btn-icon-text btn-warning">
                      <i className="i-Calendar-4" /> Joined in 2013
                    </button>
                  </li>
                </ul>
              </div>
            </Tab>

            <Tab eventKey="About" title="About">
              <h4>Personal Information</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, commodi quam!
                Provident quis voluptate asperiores ullam, quidem odio pariatur. Lorem ipsum, dolor
                sit amet consectetur adipisicing elit. Voluptatem, nulla eos? Cum non ex voluptate
                corporis id asperiores doloribus dignissimos blanditiis iusto qui repellendus
                deleniti aliquam, vel quae eligendi explicabo.
              </p>

              <hr />

              <Row>
                <Col md={4} xs={6}>
                  <div className="mb-4">
                    <p className="text-primary mb-1">
                      <i className="i-Calendar text-16 me-1" /> Birth Date
                    </p>
                    <span>1 Jan, 1994</span>
                  </div>

                  <div className="mb-4">
                    <p className="text-primary mb-1">
                      <i className="i-Edit-Map text-16 me-1" /> Birth Place
                    </p>
                    <span>Dhaka, DB</span>
                  </div>

                  <div className="mb-4">
                    <p className="text-primary mb-1">
                      <i className="i-Globe text-16 me-1" /> Lives In
                    </p>

                    <span>Dhaka, DB</span>
                  </div>
                </Col>

                <Col md={4} xs={6}>
                  <div className="mb-4">
                    <p className="text-primary mb-1">
                      <i className="i-MaleFemale text-16 me-1" /> Gender
                    </p>

                    <span>1 Jan, 1994</span>
                  </div>

                  <div className="mb-4">
                    <p className="text-primary mb-1">
                      <i className="i-MaleFemale text-16 me-1" /> Email
                    </p>

                    <span>example@ui-lib.com</span>
                  </div>
                  <div className="mb-4">
                    <p className="text-primary mb-1">
                      <i className="i-Cloud-Weather text-16 me-1" />
                      Website
                    </p>

                    <span>www.ui-lib.com</span>
                  </div>
                </Col>

                <Col md={4} xs={6}>
                  <div className="mb-4">
                    <p className="text-primary mb-1">
                      <i className="i-Business-Man text-16 me-1" />
                      Profession
                    </p>

                    <span>Digital Marketer</span>
                  </div>

                  <div className="mb-4">
                    <p className="text-primary mb-1">
                      <i className="i-Conference text-16 me-1" />
                      Experience
                    </p>

                    <span>8 Years</span>
                  </div>

                  <div className="mb-4">
                    <p className="text-primary mb-1">
                      <i className="i-Home1 text-16 me-1" /> School
                    </p>

                    <span>School of Digital Marketing</span>
                  </div>
                </Col>
              </Row>

              <hr />

              <h4>Other Info</h4>

              <p className="mb-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum dolore labore
                reiciendis ab quo ducimus reprehenderit natus debitis, provident ad iure sed aut
                animi dolor incidunt voluptatem. Blanditiis, nobis aut.
              </p>

              <Row>
                <Col md={2} sm={4} xs={6} className="text-center">
                  <i className="i-Plane text-32 text-primary" />
                  <p className="text-16 mt-1">Traveling</p>
                </Col>

                <Col md={2} sm={4} xs={6} className="text-center">
                  <i className="i-Camera text-32 text-primary" />
                  <p className="text-16 mt-1">Photography</p>
                </Col>

                <Col md={2} sm={4} xs={6} className="text-center">
                  <i className="i-Car-2 text-32 text-primary" />
                  <p className="text-16 mt-1">Driving</p>
                </Col>

                <Col md={2} sm={4} xs={6} className="text-center">
                  <i className="i-Atom text-32 text-primary" />
                  <p className="text-16 mt-1">Gaming</p>
                </Col>

                <Col md={2} sm={4} xs={6} className="text-center">
                  <i className="i-Music-Note-2 text-32 text-primary" />
                  <p className="text-16 mt-1">Music</p>
                </Col>

                <Col md={2} sm={4} xs={6} className="text-center">
                  <i className="i-Shopping-Bag text-32 text-primary" />
                  <p className="text-16 mt-1">Shopping</p>
                </Col>
              </Row>
            </Tab>

            <Tab eventKey="Friends" title="Friends">
              <div className="row">
                <Col md={3}>
                  <Card body className="card-profile-1 mb-4 text-center">
                    <div className="avatar box-shadow-2 mb-3">
                      <img src="/assets/images/faces/16.jpg" alt="" />
                    </div>

                    <h5 className="m-0">Jassica Hike</h5>
                    <p className="mt-0">UI/UX Designer</p>

                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae cumque.
                    </p>

                    <button className="btn btn-primary btn-rounded">Contact Jassica</button>

                    <div className="card-socials-simple mt-4">
                      <span className="cursor-pointer px-1">
                        <i className="i-Linkedin-2" />
                      </span>
                      <span className="cursor-pointer px-1">
                        <i className="i-Facebook-2" />
                      </span>
                      <span className="cursor-pointer px-1">
                        <i className="i-Twitter" />
                      </span>
                    </div>
                  </Card>
                </Col>

                <Col md={3}>
                  <Card body className="card-profile-1 mb-4 text-center">
                    <div className="avatar box-shadow-2 mb-3">
                      <img src="/assets/images/faces/2.jpg" alt="" />
                    </div>
                    <h5 className="m-0">Frank Powell</h5>
                    <p className="mt-0">UI/UX Designer</p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae cumque.
                    </p>
                    <button className="btn btn-primary btn-rounded">Contact Frank</button>
                    <div className="card-socials-simple mt-4">
                      <span className="cursor-pointer px-1">
                        <i className="i-Linkedin-2" />
                      </span>
                      <span className="cursor-pointer px-1">
                        <i className="i-Facebook-2" />
                      </span>
                      <span className="cursor-pointer px-1">
                        <i className="i-Twitter" />
                      </span>
                    </div>
                  </Card>
                </Col>

                <Col md={3}>
                  <Card body className="card-profile-1 mb-4 text-center">
                    <div className="avatar box-shadow-2 mb-3">
                      <img src="/assets/images/faces/3.jpg" alt="" />
                    </div>
                    <h5 className="m-0">Arthur Mendoza</h5>
                    <p className="mt-0">UI/UX Designer</p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae cumque.
                    </p>
                    <button className="btn btn-primary btn-rounded">Contact Arthur</button>

                    <div className="card-socials-simple mt-4">
                      <span className="cursor-pointer px-1">
                        <i className="i-Linkedin-2" />
                      </span>
                      <span className="cursor-pointer px-1">
                        <i className="i-Facebook-2" />
                      </span>
                      <span className="cursor-pointer px-1">
                        <i className="i-Twitter" />
                      </span>
                    </div>
                  </Card>
                </Col>

                <Col md={3}>
                  <Card body className="card-profile-1 mb-4 text-center">
                    <div className="avatar box-shadow-2 mb-3">
                      <img src="/assets/images/faces/4.jpg" alt="" />
                    </div>

                    <h5 className="m-0">Jacqueline Day</h5>
                    <p className="mt-0">UI/UX Designer</p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae cumque.
                    </p>
                    <button className="btn btn-primary btn-rounded">Contact Jacqueline</button>

                    <div className="card-socials-simple mt-4">
                      <span className="cursor-pointer px-1">
                        <i className="i-Linkedin-2" />
                      </span>
                      <span className="cursor-pointer px-1">
                        <i className="i-Facebook-2" />
                      </span>
                      <span className="cursor-pointer px-1">
                        <i className="i-Twitter" />
                      </span>
                    </div>
                  </Card>
                </Col>
              </div>
            </Tab>

            <Tab eventKey="Photos" title="Photos">
              <Row>
                <Col md={4}>
                  <Card className="text-white o-hidden mb-3">
                    <Card.Img src="/assets/images/products/headphone-1.jpg" alt="" />

                    <div className="card-img-overlay">
                      <div className="p-1 text-left card-footer font-weight-light d-flex">
                        <span className="me-3 d-flex align-items-center gap-1">
                          <i className="i-Speach-Bubble-6" />
                          12
                        </span>

                        <span className="d-flex align-items-center gap-2">
                          <i className="i-Calendar-4" />
                          03.12.2018
                        </span>
                      </div>
                    </div>
                  </Card>
                </Col>

                <Col md={4}>
                  <Card className="text-white o-hidden mb-3">
                    <Card.Img src="/assets/images/products/headphone-2.jpg" alt="" />

                    <div className="card-img-overlay">
                      <div className="p-1 text-left card-footer font-weight-light d-flex">
                        <span className="me-3 d-flex align-items-center gap-1">
                          <i className="i-Speach-Bubble-6" />
                          12
                        </span>
                        <span className="d-flex align-items-center gap-2">
                          <i className="i-Calendar-4" />
                          03.12.2018
                        </span>
                      </div>
                    </div>
                  </Card>
                </Col>

                <Col md={4}>
                  <Card className="text-white o-hidden mb-3">
                    <Card.Img src="/assets/images/products/headphone-3.jpg" alt="" />

                    <div className="card-img-overlay">
                      <div className="p-1 text-left card-footer font-weight-light d-flex">
                        <span className="me-3 d-flex align-items-center gap-1">
                          <i className="i-Speach-Bubble-6" />
                          12
                        </span>
                        <span className="d-flex align-items-center gap-2">
                          <i className="i-Calendar-4" />
                          03.12.2018
                        </span>
                      </div>
                    </div>
                  </Card>
                </Col>

                <Col md={4}>
                  <Card className="text-white o-hidden mb-3">
                    <Card.Img src="/assets/images/products/iphone-1.jpg" alt="" />

                    <div className="card-img-overlay">
                      <div className="p-1 text-left card-footer font-weight-light d-flex">
                        <span className="me-3 d-flex align-items-center gap-1">
                          <i className="i-Speach-Bubble-6" />
                          12
                        </span>
                        <span className="d-flex align-items-center gap-2">
                          <i className="i-Calendar-4" />
                          03.12.2018
                        </span>
                      </div>
                    </div>
                  </Card>
                </Col>

                <Col md={4}>
                  <Card className="text-white o-hidden mb-3">
                    <Card.Img src="/assets/images/products/iphone-2.jpg" alt="" />

                    <div className="card-img-overlay">
                      <div className="p-1 text-left card-footer font-weight-light d-flex">
                        <span className="me-3 d-flex align-items-center gap-1">
                          <i className="i-Speach-Bubble-6" />
                          12
                        </span>
                        <span className="d-flex align-items-center gap-2">
                          <i className="i-Calendar-4" />
                          03.12.2018
                        </span>
                      </div>
                    </div>
                  </Card>
                </Col>

                <Col md={4}>
                  <Card className="text-white o-hidden mb-3">
                    <Card.Img src="/assets/images/products/watch-1.jpg" alt="" />

                    <div className="card-img-overlay">
                      <div className="p-1 text-left card-footer font-weight-light d-flex">
                        <span className="me-3 d-flex align-items-center gap-1">
                          <i className="i-Speach-Bubble-6" />
                          12
                        </span>

                        <span className="d-flex align-items-center gap-2">
                          <i className="i-Calendar-4" />
                          03.12.2018
                        </span>
                      </div>
                    </div>
                  </Card>
                </Col>
              </Row>
            </Tab>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
