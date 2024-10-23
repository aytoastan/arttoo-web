import React, { FormEvent, useCallback, useEffect, useState } from 'react';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

interface SubmitResponse {
  error?: string;
}

const useEmailSubmit = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageError, setMessageError] = useState('');

  const validateEmail = (email: string): boolean => {
    return EMAIL_REGEX.test(email);
  };

  const clearMessages = useCallback(() => {
    setMessage('');
    setMessageError('');
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (message || messageError) {
      timer = setTimeout(clearMessages, 2000);
    }
    return () => clearTimeout(timer);
  }, [message, messageError, clearMessages]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    clearMessages();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    clearMessages();

    try {
      if (!email) {
        throw new Error('Email is required');
      }

      if (!validateEmail(email)) {
        throw new Error('Invalid email format');
      }

      const response = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data: SubmitResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit email');
      }

      setMessage('Email successfully submitted!');
      setEmail('');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Something went wrong!';
      setMessageError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail: handleEmailChange,
    loading,
    message,
    messageError,
    handleSubmit,
  };
};

const Footer = () => {
  const { email, setEmail, loading, message, messageError, handleSubmit } = useEmailSubmit();

  return (
    <footer className='bg-black'>
      <div className='max-w-screen-2xl w-[90vw] mx-auto sm:w-[85vw] py-16'>
        <div className='flex flex-col lg:flex-row lg:justify-between gap-8'>
          <div className='flex flex-col gap-8'>
            <h3 className='text-white  text-[30px] sm:text-[44px] lg:text-[60px] leading-[39.3px] sm:leading-[51.23px] lg:leading-[78.6px] font-medium '>
              Ready to Own <span className='italic'>Your Piece of History?</span>
            </h3>

            <div className='flex gap-2 flex-col font-poppins'>
              <form className='border border-white rounded-full p-1 max-w-[400px] w-full flex' onSubmit={handleSubmit}>
                <input
                  type='text'
                  className='focus:outline-none bg-transparent px-4 py-2 w-full text-white'
                  placeholder='johndoe@gmail.com'
                  id='email'
                  value={email}
                  onChange={setEmail}
                  disabled={loading}
                />
                <button disabled={loading} className='bg-white px-4 py-2 rounded-full text-black'>
                  Submit
                </button>
              </form>
              <p className='text-white text-[11.5px] lg:text-base leading-[19.2px] font-light'>
                Join the Waitlist & Get Informed when New Artworks are Available!
              </p>
              {message && <p className='text-green-600 text-sm'>{message}</p>}
              {messageError && <p className='text-red-600 text-sm'>{messageError}</p>}
            </div>
          </div>
          <div className='flex flex-col gap-4 min-w-48'>
            <p className='text-2xl text-white leading-[19.2px] font-light'>Follow us on</p>
            <div className='inline-flex gap-2'>
              <a href='https://x.com/arttoo_official' target='_blank'>
                <svg className='h6 w-6' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50'>
                  <path
                    fill='#fff'
                    d='M5.92 6l14.662 21.375L6.23 44h3.18l12.576-14.578 10 14.578H44L28.682 21.67 42.199 6h-3.17L27.275 19.617 17.934 6H5.92zm3.797 2h7.164l23.322 34H33.04L9.717 8z'
                  ></path>
                </svg>
              </a>
              <a href='https://t.me/arttoonetwork' target='_blank'>
                <svg className='h6 w-6' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'>
                  <path
                    fill='#fff'
                    d='M25.154 3.984a2.718 2.718 0 00-.894.217c-.25.1-1.204.51-2.707 1.154-1.505.646-3.497 1.5-5.621 2.415-4.25 1.827-9.028 3.884-11.475 4.937-.092.04-.413.142-.754.408-.34.266-.703.818-.703 1.432 0 .495.236.987.533 1.281.297.294.612.44.881.549l4.58 1.873c.202.617 1.298 3.973 1.553 4.795.168.543.327.883.535 1.152.104.135.225.253.371.346.059.037.123.066.188.092l.004.002c.014.006.027.016.043.021.028.01.047.011.085.02.153.049.307.08.444.08.585 0 .943-.322.943-.322l.022-.016 3.01-2.604 3.65 3.454c.051.072.53.73 1.588.73.627 0 1.125-.315 1.445-.65.32-.336.519-.688.604-1.131v-.002c.079-.419 3.443-17.69 3.443-17.69l-.006.024c.098-.45.124-.868.016-1.281a1.748 1.748 0 00-.75-1.022 1.798 1.798 0 00-1.028-.264zm-.187 2.09c-.005.03.003.015-.004.049l-.002.012-.002.011s-3.323 17.05-3.445 17.7c.009-.05-.032.048-.075.107-.06-.04-.181-.094-.181-.094l-.02-.021-4.986-4.717-3.525 3.047 1.048-4.2s6.557-6.786 6.952-7.18c.318-.317.384-.427.384-.536 0-.146-.076-.252-.246-.252-.153 0-.359.149-.469.219-1.433.913-7.724 4.58-10.544 6.22-.449-.183-3.562-1.458-4.618-1.888l.014-.006 11.473-4.938 5.62-2.414c1.48-.634 2.51-1.071 2.626-1.119z'
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
