import {SocialIcon} from 'react-social-icons'

const Contact = () => {
    return (
<div className="text-center m-10">
    <h1 className="text-green-600 text-center text-5xl p-3 m-4">Contact Me</h1>
    <p className='text-3xl'>Email</p>
    <p className='mb-10 mt-2'>Example@example.co.uk</p>
    <p className='text-3xl'>Socials</p>
    <div className='m-4'>
        <SocialIcon/>
    </div>
</div>
    )
  };
  
  export default Contact;