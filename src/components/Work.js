import React from 'react';

import '../assets/styles/components/work.css';

import WorkImg1 from '../assets/static/img/work1-1.PNG';
import WorkImg2 from '../assets/static/img/work1-2.PNG';
import WorkImg3 from '../assets/static/img/work1-3.PNG';

const Work = () => (
    <>
        <section className='work-section' id='work'>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 mb-5">
                        <h1 className='work-title'>Selected Work</h1>
                    </div>
                    <div className="row work-subsection">
                        <div className="col-lg-5 col-sm-12 work-img-container">
                            <img src={WorkImg1} alt="" width='96%' className='work-img'/>
                        </div>
                        <div className="col-lg-6 col-sm-12">
                            <h4 className='work-subtitle'>Data Recorder</h4>
                            <p className='work-paraphrase'>
                                This page was build in two versions. It has as a goal to record data client easily and intuitively. I participated in this project as Frontend Developer
                                implement technologies like JQuery, Bootstrap, and Razor coded in tandem with a backend made in C#.
                            </p>
                        </div>
                    </div>
                    <div className="row work-subsection">
                        <div className="col-lg-5 col-sm-12 work-img-container">
                            <img src={WorkImg2} alt="" width='96%' className='work-img'/>
                        </div>
                        <div className="col-lg-6 col-sm-12">
                            <h4 className='work-subtitle'>First Version</h4>
                            <p className='work-paraphrase'>
                                Here you can see the earliest version. It was made based on wizard design since it has to show every step one by one to complete the main
                                form, validating while the client is filling each field.
                            </p>
                        </div>
                    </div>
                    <div className="row work-subsection">
                        <div className="col-lg-5 col-sm-12 work-img-container">
                            <img src={WorkImg3} alt="" width='96%' className='work-img'/>
                        </div>
                        <div className="col-lg-6 col-sm-12">
                            <h4 className='work-subtitle'>Second Version</h4>
                            <p className='work-paraphrase'>
                                Now you can see the latest version. That was modified to record the equal data that the first version but in only one step, validating
                                all fields at the same time.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
);


export default Work;