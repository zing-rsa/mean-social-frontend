import zing from '../../assets/zing-long.jpg';
import './about.css';

function About() {
    return (
        <div className='about-page'>
            <div className='about-container'>
                <div className="about-header">
                    <div className="about-header-avatar-container">
                        <img className='about-avatar' src={zing}></img>
                    </div>
                    <div className='about-header-text'>
                        <div className='about-header-upper'>zing-rsa</div>
                        <div className='about-header-lower'><i>Software Developer - Project author</i></div>
                    </div>
                </div>
                <div className="about-body">
                Mern Social is a code project that simulates a social media similar to Twitter, where users can create accounts, log in, and post short messages + media to share with others. Other interactions include mentions/tags, follows, likes and comments, which will all generate notifications.  
                <br /><br />The purpose of the project was to explore the JavaScript(MERN) ecosystem and improve my skills in React and API design. Where I could, I have minimized use of libraries to get a more vanilla understanding of the technology. For example, I was curious how production applications implement their login/refresh mechanism so the one used in this site is written completely by me.
                <br /><br />I plan to leave the project as an open sandbox with the aim to explore and implement ideas that spike my curiosity in the future. Contributions welcome.
                <br /><br />Thanks for checking it out.
                </div>
                <div className='about-links'>
                    <div className='about-link'>Backend - <a href='https://github.com/zing-rsa/mern-social-backend' target='_blank'>github.com/zing-rsa/mern-social-backend</a></div>
                    <div className='about-link'>Frontend - <a href='https://github.com/zing-rsa/mern-social-frontend' target='_blank'>github.com/zing-rsa/mern-social-frontend</a></div>
                </div>
            </div>
        </div>
    )
}

export default About;