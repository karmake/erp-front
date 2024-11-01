import { Tabs, Tab, ProgressBar, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Breadcrumb from "app/components/Breadcrumb";

export default function ContactDetails() {
  return (
    <section>
      <Breadcrumb
        routeSegments={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
          { name: "Contact Details" }
        ]}
      />

      <div className="ul-contact-detail">
        <Row>
          <Col lg={4}>
            <Card className="o-hidden">
              <img
                className="d-block w-100"
                src="/assets/images/products/iphone-1.jpg"
                alt="First slide"
              />

              <Card.Body>
                <div className="ul-contact-detail__info">
                  <Row>
                    <Col xs={6} className="text-center">
                      <div className="ul-contact-detail__info-1">
                        <h5>Name</h5>
                        <span>Genelia Deshmukh</span>
                      </div>
                      <div className="ul-contact-detail__info-1">
                        <h5>Name</h5>
                        <span>Genelia Deshmukh</span>
                      </div>
                    </Col>

                    <Col xs={6} className="text-center">
                      <div className="ul-contact-detail__info-1">
                        <h5>Name</h5>
                        <span>Genelia Deshmukh</span>
                      </div>
                      <div className="ul-contact-detail__info-1">
                        <h5>Name</h5>
                        <span>Genelia Deshmukh</span>
                      </div>
                    </Col>

                    <Col xs={12} className="text-center">
                      <div className="ul-contact-detail__info-1">
                        <h5>Address</h5>
                        <span>DieSachbearbeiter Choriner Straße 49 10435 Berlin</span>
                      </div>
                    </Col>

                    <Col xs={12} className="text-center">
                      <div className="ul-contact-detail__social">
                        <div className="ul-contact-detail__social-1">
                          <button type="button" className="btn btn-facebook btn-icon m-2">
                            <span className="ul-btn__icon">
                              <i className="i-Facebook-2" />
                            </span>
                          </button>

                          <span className="t-font-boldest ul-contact-detail__followers">400</span>
                        </div>

                        <div className="ul-contact-detail__social-1">
                          <button type="button" className="btn btn-twitter btn-icon m-2">
                            <span className="ul-btn__icon">
                              <i className="i-Twitter" />
                            </span>
                          </button>

                          <span className="t-font-boldest ul-contact-detail__followers">900</span>
                        </div>

                        <div className="ul-contact-detail__social-1">
                          <button type="button" className="btn btn-dribble btn-icon m-2">
                            <span className="ul-btn__icon">
                              <i className="i-Dribble" />
                            </span>
                          </button>

                          <span className="t-font-boldest ul-contact-detail__followers">658</span>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={8}>
            <Card className="mb-4">
              <Card.Header className="bg-transparent">Basic Tabs</Card.Header>

              <Card.Body>
                <Tabs defaultActiveKey="Home">
                  <Tab eventKey="Home" title="Home">
                    <div className="ul-contact-detail__timeline">
                      <Row>
                        <Col lg={12}>
                          <div className="ul-contact-detail__timeline-row">
                            <Row>
                              <Col lg={1}>
                                <div className="ul-contact-detail__left-timeline">
                                  <div className="ul-widget3-img">
                                    <img
                                      src="/assets/images/faces/1.jpg"
                                      className="img-fluid"
                                      id="userDropdown"
                                      alt=""
                                      data-toggle="dropdown"
                                      aria-haspopup="true"
                                      aria-expanded="false"
                                    />
                                  </div>
                                </div>
                              </Col>

                              <Col lg={11}>
                                <div className="ul-contact-detail__right-timeline">
                                  <span className="ul-widget4__title d-block">Timity Clarkson</span>
                                  <small className="text-mute">10 minutes</small>
                                  <p>
                                    assign a new task
                                    <Link href="#">Weblayout</Link>
                                  </p>
                                  <div className="ul-contact-detail__timeline-image">
                                    <img
                                      className="d-block"
                                      src="/assets/images/products/iphone-1.jpg"
                                      alt="First slide"
                                    />
                                    <img
                                      className="d-block"
                                      src="/assets/images/products/iphone-1.jpg"
                                      alt="First slide"
                                    />
                                    <img
                                      className="d-block"
                                      src="/assets/images/products/iphone-1.jpg"
                                      alt="First slide"
                                    />
                                  </div>
                                </div>
                              </Col>
                            </Row>
                          </div>

                          <div className="ul-contact-detail__timeline-row">
                            <Row>
                              <Col lg={1}>
                                <div className="ul-contact-detail__left-timeline">
                                  <div className="ul-widget3-img">
                                    <img
                                      src="/assets/images/faces/1.jpg"
                                      id="userDropdown"
                                      alt=""
                                      data-toggle="dropdown"
                                      aria-haspopup="true"
                                      aria-expanded="false"
                                    />
                                  </div>
                                </div>
                              </Col>

                              <Col lg={11}>
                                <div className="ul-contact-detail__right-timeline">
                                  <span className="ul-widget4__title d-block">Timity Clarkson</span>
                                  <small className="text-mute">10 minutes</small>

                                  <div className="ul-contact-detail__timeline-image-2 mt-3">
                                    <img
                                      className="d-block"
                                      src="/assets/images/products/iphone-1.jpg"
                                      alt="First slide"
                                    />
                                    <div className="ul-contact-detail__timeline-image-info">
                                      <p style={{ width: "80%" }}>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        Integer nec odio. Praesent libero. Sed cursus ante dapibus
                                        diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.
                                        Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed
                                        augue semper porta.
                                      </p>
                                      <button type="button" className="btn btn-primary btn-lg m-1">
                                        Weblayout
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </Col>
                            </Row>
                          </div>

                          <div className="ul-contact-detail__timeline-row">
                            <Row>
                              <Col lg={1}>
                                <div className="ul-contact-detail__left-timeline">
                                  <div className="ul-widget3-img">
                                    <img
                                      src="/assets/images/faces/1.jpg"
                                      id="userDropdown"
                                      alt=""
                                      data-toggle="dropdown"
                                      aria-haspopup="true"
                                      aria-expanded="false"
                                    />
                                  </div>
                                </div>
                              </Col>

                              <Col lg={11}>
                                <div className="ul-contact-detail__right-timeline">
                                  <span className="ul-widget4__title d-block">Timity Clarkson</span>
                                  <small className="text-mute">10 minutes</small>

                                  <p className="mt-3">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                                    nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed
                                    nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis
                                    ipsum. Praesent mauris. Fusce nec tellus sed augue semper
                                  </p>
                                </div>
                              </Col>
                            </Row>
                          </div>

                          <div className="ul-contact-detail__timeline-row">
                            <Row>
                              <Col lg={1}>
                                <div className="ul-contact-detail__left-timeline">
                                  <div className="ul-widget3-img">
                                    <img
                                      src="/assets/images/faces/1.jpg"
                                      id="userDropdown"
                                      alt=""
                                    />
                                  </div>
                                </div>
                              </Col>

                              <Col lg={11}>
                                <div className="ul-contact-detail__right-timeline">
                                  <span className="ul-widget4__title d-block">Timity Clarkson</span>
                                  <small className="text-mute">10 minutes</small>
                                  <p>
                                    assign a new task
                                    <Link href="#"> Weblayout</Link>
                                  </p>
                                </div>
                              </Col>
                            </Row>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Tab>

                  <Tab eventKey="Profile" title="Profile">
                    <Row>
                      <Col lg={12}>
                        <div className="ul-contact-detail__profile">
                          <div className="ul-contact-detail__inner-profile">
                            <h4 className="heading">Full Name</h4>
                            <span className="tetx-muted">Timity Clarkson</span>
                          </div>

                          <div className="ul-contact-detail__inner-profile">
                            <h4 className="heading">Full Name</h4>
                            <span className="tetx-muted">Timity Clarkson</span>
                          </div>
                          <div className="ul-contact-detail__inner-profile">
                            <h4 className="heading">Full Name</h4>
                            <span className="tetx-muted">Timity Clarkson</span>
                          </div>
                          <div className="ul-contact-detail__inner-profile">
                            <h4 className="heading">Full Name</h4>
                            <span className="tetx-muted">Timity Clarkson</span>
                          </div>
                        </div>
                        <div className="custom-separator"></div>
                      </Col>

                      <Col lg={12}>
                        <div className="ul-contact-dwtail__profile-swcription">
                          <p className="mt-3">
                            Lorem Ipsum is simply dummy text of the printing and typesetting
                            industry. Lorem Ipsum has been the industry's standard dummy text ever
                            since the 1500s, when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. It has survived not only five
                            centuries
                          </p>
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting
                            industry. Lorem Ipsum has been the industry's standard dummy text ever
                            since the 1500s, when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. It has survived not only five
                            centuries
                          </p>
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting
                            industry. Lorem Ipsum has been the industry's standard dummy text ever
                            since the 1500s, when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. It has survived not only five
                            centuries
                          </p>
                        </div>
                      </Col>

                      <Col lg={12}>
                        <h4 className="card-title mb-3">Skills</h4>
                        <div className="custom-separator"></div>

                        <span className=""> Wordpress</span>
                        <ProgressBar
                          className="progress mb-3 mt-2"
                          now={10}
                          striped
                          animated
                          label="10%"
                          variant="primary"
                        />

                        <span className=""> HTML 5</span>
                        <ProgressBar
                          className="progress mb-3 mt-2"
                          now={25}
                          striped
                          animated
                          label="25%"
                          variant="success"
                        />

                        <span>React.js</span>
                        <ProgressBar
                          className="progress mb-3 mt-2"
                          now={50}
                          striped
                          animated
                          label="50%"
                          variant="info"
                        />

                        <span>Photoshop</span>
                        <ProgressBar
                          className="progress mb-3 mt-2"
                          now={75}
                          striped
                          animated
                          label="75%"
                          variant="warning"
                        />
                      </Col>
                    </Row>
                  </Tab>

                  <Tab eventKey="Contact" title="Contact">
                    <form className="mt-3">
                      <div className="form-group row">
                        <label for="inputEmail3" className="col-sm-2 col-form-label">
                          Email
                        </label>
                        <div className="col-sm-10">
                          <input
                            type="email"
                            className="form-control"
                            id="inputEmail3"
                            placeholder="Email"
                          />
                        </div>
                      </div>

                      <div className="form-group row">
                        <label for="inputPassword3" className="col-sm-2 col-form-label">
                          Password
                        </label>
                        <div className="col-sm-10">
                          <input
                            type="password"
                            className="form-control"
                            id="inputPassword3"
                            placeholder="Password"
                          />
                        </div>
                      </div>
                      <fieldset className="form-group">
                        <div className="row">
                          <div className="col-form-label col-sm-2 pt-0">Radios</div>
                          <div className="col-sm-10">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="gridRadios"
                                id="gridRadios1"
                                value="option1"
                              />
                              <label className="form-check-label ml-3" for="gridRadios1">
                                First radio
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="gridRadios"
                                id="gridRadios2"
                                value="option2"
                              />
                              <label className="form-check-label ml-3" for="gridRadios2">
                                Second radio
                              </label>
                            </div>
                            <div className="form-check disabled ">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="gridRadios"
                                id="gridRadios3"
                                value="option3"
                                disabled=""
                              />
                              <label className="form-check-label ml-3" for="gridRadios3">
                                Third disabled radio
                              </label>
                            </div>
                          </div>
                        </div>
                      </fieldset>
                      <div className="form-group row">
                        <div className="col-sm-2">Checkbox</div>
                        <div className="col-sm-10">
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="gridCheck1" />
                            <label className="form-check-label ml-3" for="gridCheck1">
                              Example checkbox
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-10">
                          <button type="submit" className="btn btn-primary">
                            Sign in
                          </button>
                        </div>
                      </div>
                    </form>
                  </Tab>
                </Tabs>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </section>
  );
}
