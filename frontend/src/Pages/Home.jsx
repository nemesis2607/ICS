import React from 'react';
import Hero from '../components/Hero.jsx'
import Biography from '../components/Biography.jsx'
import Departments from '../components/Departments.jsx'
import MessageForm from '../components/MessageForm.jsx'


const Home = () =>{
    return(
        <div>
<Hero title={"Welcome to Immigration Consultancy Management System | Your Trusted Solution Partner"} imageUrl={"/hero.png"} />
<Biography imageUrl={"/about.png"}/>
<Departments/>
<MessageForm/>
        </div>
    )
}



export default Home