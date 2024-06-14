import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

import { styles } from '../styles';
import { EarthCanvas } from './canvas';
import { SectionWrapper } from '../hoc';
import { slideIn } from '../motion';
import PopupMessage from './popup';

const Contact = () => {
  const formRef = useRef(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({ show: false, message: '', type: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Update axios.post to use the new backend URL
      const response = await axios.post('https://portfoliobackend-1-8cgk.onrender.com/api/contact', form);
      setPopup({ show: true, message: 'Thank you, I will get back to you as soon as possible.', type: 'success' });
      setForm({
        name: '',
        email: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending email:', error);
      setPopup({ show: true, message: 'Something went wrong', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleClosePopup = () => {
    setPopup({ show: false, message: '', type: '' });
  };

  return (
    <div className='xl:mt-12 xl:flex-row flex flex-col-reverse gap-10 overflow-hidden'>
      <motion.div
        variants={slideIn('left', 'tween', 0.2, 1)}
        className='flex-1 bg-black-100 p-8 rounded-2xl'
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact Me</h3>
        <motion.div className='flex'>
          <a href="https://www.instagram.com/rajdeep._08"><img src="/src/assets/instagram.png" alt="Instagram Icon" className="mt-4 mr-4 w-12 h-12 object-contain" /></a>
          <a href="https://github.com/rajdeep564"><img src="/src/assets/github1.png" alt="github Icon" className="mt-4 mr-4 w-12 h-12 object-contain" /></a>
          <a href="https://www.linkedin.com/in/rajdeep-singh-chavda-728743256/"><img src="/src/assets/linkedin.png" alt="linkedin Icon" className="mt-4 mr-4 w-12 h-12 object-contain" /></a>
        </motion.div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='mt-12 flex flex-col gap-8'
        >
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Name</span>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder="What's your name?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border border-transparent focus:border-white font-medium'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Email</span>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border border-transparent focus:border-white font-medium'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Message</span>
            <textarea
              rows='7'
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder="What do you want to say? :)"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border border-transparent focus:border-white font-medium'
            />
          </label>
          <button
            type='submit'
            className='bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl'
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </motion.div>
      <motion.div
        variants={slideIn('right', 'tween', 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px] flex items-end justify-center'
      >
        <EarthCanvas />
      </motion.div>
      <AnimatePresence>
        {popup.show && (
          <PopupMessage message={popup.message} onClose={handleClosePopup} type={popup.type} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
