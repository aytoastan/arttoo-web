'use client'
import { useEffect, useState } from "react";
import { Web3AuthNoModal as Web3Auth } from "@web3auth/no-modal";
import { CHAIN_NAMESPACES, IProvider, UX_MODE, WALLET_ADAPTERS, WEB3AUTH_NETWORK } from "@web3auth/base";
import { CommonPrivateKeyProvider } from "@web3auth/base-provider";
import { AuthAdapter } from "@web3auth/auth-adapter";
import { useRouter } from "next/navigation";

const clientId = "BFs2h8r746dvrENIbMHAKycuCW1ubQU3h7sV7ZROg4c-PoQ8skAS2fF5V89PW69z5iOnauTOvSEZ8DdjL5XXHmg";
export default function Home() {
  const [email, setEmail] = useState('')
  const router = useRouter()

  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean | null>(false);
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailLoading, setIsEmailLoading] = useState(false)
  useEffect(() => {
    const init = async () => {
      try {
        const chainConfig = {
          chainNamespace: CHAIN_NAMESPACES.OTHER,
          chainId: "fd2adfa8",
          rpcTarget: "https://fullnode.devnet.sui.io:443",
          displayName: "Sui Devnet",
          blockExplorerUrl: "https://suiexplorer.com/?network=devnet",
          ticker: "SUI",
          tickerName: "Sui",
          logo: "https://cryptologos.cc/logos/sui-sui-logo.png?v=029",
        };

        const privateKeyProvider = new CommonPrivateKeyProvider({ config: { chainConfig } });

        const web3auth = new Web3Auth({
          clientId,
          privateKeyProvider,
          web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
        });

        setWeb3auth(web3auth);

        const authAdapter = new AuthAdapter({
          adapterSettings: {
            uxMode: UX_MODE.REDIRECT,
          },
        });

        web3auth.configureAdapter(authAdapter);

        await web3auth.init();

        setProvider(web3auth.provider);
        if (web3auth.connected) {
          setLoggedIn(true);
          router.push('/trade')
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);
  const handleGoogleLogin = async () => {
    setIsLoading(true)
    if (!web3auth) {
      return;
    }
    const web3authProvider = await web3auth.connectTo(WALLET_ADAPTERS.AUTH, {
      loginProvider: "google",
    });
    setProvider(web3authProvider);
    console.log('web3authProvider', provider)
  }
  const handleEmailLogin = async () => {
    if(!email || !email.trim() || isEmailLoading) return
    setIsEmailLoading(true) 
    if(!web3auth) return
    const web3authProvider = await web3auth.connectTo(WALLET_ADAPTERS.AUTH, {
      loginProvider: "email_passwordless",
      extraLoginOptions: {
        login_hint: email.trim(),
      },
    });
    setProvider(web3authProvider);
  }
  if (loggedIn) {
    return <div>
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-[30px] font-[600] leading-[45px] myLabel mt-[40px] md:w-full w-[80%] mx-auto text-center">
          Login Success, Redirecting...
        </div>
      </div>
    </div>
  }
  return <div className='md:h-full w-full flex md:items-center flex-col md:px-[0px] px-[20px]'>
    <div className='text-[30px] font-[600] leading-[45px] md:w-[444px] md:mt-[80px] mt-[40px] myLabel poppins'>
      Login
    </div>
    <div className="md:w-[444px] mt-[40px]">
      <div className='text-[16px] font-[400] leading-[24px] myLabel poppins'>Email</div>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your Email" className='w-full h-[48px] p-[14px_16px] login_input mt-[8px] poppins' />
      
      <div className="w-full mt-[40px] login_submit_button poppins" onClick={handleEmailLogin}>
        {isEmailLoading ? <div className="w-[20px] h-[20px] rounded-full border-t-2 border-b-2 border-gray-900 animate-spin"></div> : "Log in"}
      </div>
      {/* <div className="w-full flex justify-center mt-[24px] text-[14px] font-[400] leading-[20px] text-[#6B6B6B]">
        Don’t have an account?  <Link href="/auth/register" className="font-[500] ml-[4px] myLabel">Register Now</Link>
      </div> */}
      <div className="w-full flex mt-[48px] mb-[40px] items-center">
        <div className="flex-1 h-[1px] bg-black-0-1"></div>
        <div className="text-[16px] font-[400] leading-[20px] text-black-0-6 px-[16px] poppins">Or continue with</div>
        <div className="flex-1 h-[1px] bg-black-0-1"></div>
      </div>
      <div className="w-full social_login_button poppins font-[500] leading-[20px]" onClick={handleGoogleLogin}>
        {isLoading ? <div className="w-[20px] h-[20px] rounded-full border-t-2 border-b-2 border-gray-900 animate-spin"></div> : <>
          <svg className="mr-[8px]" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.1716 8.368H17.5003V8.33341H10.0003V11.6667H14.7099C14.0228 13.6072 12.1766 15.0001 10.0003 15.0001C7.23908 15.0001 5.00033 12.7613 5.00033 10.0001C5.00033 7.23883 7.23908 5.00008 10.0003 5.00008C11.2749 5.00008 12.4345 5.48091 13.3174 6.26633L15.6745 3.90925C14.1862 2.52216 12.1953 1.66675 10.0003 1.66675C5.39824 1.66675 1.66699 5.398 1.66699 10.0001C1.66699 14.6022 5.39824 18.3334 10.0003 18.3334C14.6024 18.3334 18.3337 14.6022 18.3337 10.0001C18.3337 9.44133 18.2762 8.89591 18.1716 8.368Z" fill="#FFC107" />
            <path d="M2.62781 6.12125L5.36572 8.12917C6.10656 6.29501 7.90072 5.00001 10.0003 5.00001C11.2749 5.00001 12.4345 5.48084 13.3174 6.26625L15.6745 3.90917C14.1861 2.52209 12.1953 1.66667 10.0003 1.66667C6.79947 1.66667 4.02364 3.47376 2.62781 6.12125Z" fill="#FF3D00" />
            <path d="M9.9998 18.3334C12.1523 18.3334 14.1081 17.5096 15.5869 16.17L13.0077 13.9875C12.1429 14.6452 11.0862 15.0009 9.9998 15C7.8323 15 5.99189 13.618 5.29855 11.6892L2.58105 13.783C3.96022 16.4817 6.76105 18.3334 9.9998 18.3334Z" fill="#4CAF50" />
            <path d="M18.1712 8.36791H17.5V8.33333H10V11.6667H14.7096C14.3809 12.5902 13.7889 13.3972 13.0067 13.9879L13.0079 13.9871L15.5871 16.1696C15.4046 16.3354 18.3333 14.1667 18.3333 9.99999C18.3333 9.44124 18.2758 8.89583 18.1712 8.36791Z" fill="#1976D2" />
          </svg>
          Google
        </>}

      </div>
      {/* <div className="w-full social_login_button mt-[8px]">
        <img src={'/mdi_facebook.png'} alt="sui" className='w-[20px] h-[20px] mr-[8px]' />
        Sui Wallet
      </div> */}
      <div className="h-[40px] md:hidden"></div>
    </div>
  </div>
}

