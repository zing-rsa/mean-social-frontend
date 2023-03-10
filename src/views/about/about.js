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
                        <div className='about-header-lower'><i>Software Developer - Website author</i></div>
                    </div>
                </div>
                <div className="about-body">
                    Mern social is a code project that aims to simulate a social media similar to Twitter, where users can create accounts, log in, and post short messages + media to share with others. Users can also follow and unfollow other users, as well as like and reply to each others posts.
                    <br /><br />The primary purpose of this project was to explore the JavaScript(MERN) ecosystem and improve my skills in React and API design. Through working on the project, I've gained some hands-on experience building a production ready application and had to tackle common real-world challenges like data modeling, user authentication, and efficient data persistence. Additionally, by mimicking the functionality of a popular social media platform, I've had the chance to learn about the different design patterns and strategies used in building such platforms. During planning I aimed to create the website to be as production ready as possible in an effort to learn more applicable skills. Where I could, I have also tried to minimize the use of libraries to gain a more vanilla understanding of the technology.
                    <br /><br />Overall, this project provided an opportunity to expand my skill-set, learn more about the JavaScript ecosystem, and further my experience in developing web applications. I plan for this project to act as a platform where I can implement features that I become interested to explore in future.
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