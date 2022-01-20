import useStore from '../lib/store';
import Image from 'next/image';
import Link from 'next/link';
import SignupForm from './Signup/SignupForm';
import signet from '../images/logo/signet.svg'
import logo from '../images/logo/logotype_invert.svg'
import { faDiscord, faGithub} from '@fortawesome/free-brands-svg-icons' 
import { faCog, faSignOutAlt} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Header(props: { isSignedUp: boolean; }) {

    const { isSignedUp, setSignUpState } = useStore((state) => ({
        isSignedUp: state.isSignedUp,
        setSignUpState: state.setSignUpState,
    }));

    return (
    <div id="header" className="bg-decensored-gradient w-full">
        <div className="flex gap-y-5 p-4 justify-between items-center">
            <div id="logo">
                <Link href="/">
                    <a className="block h-10 flex gap-1">
                        <Image
                            src={signet}
                            alt="Signet"
                            className="h-full"
                        />
                        <Image  
                            src={logo}
                            alt="Logo"
                            className="h-full hidden sm:block opacity-0"
                        />
                    </a>
                </Link>
            </div>
            <div id="header_nav_items" className="text-white text-lg flex items-center">
                <Link href="https://github.com/mikrohash/decensored">
                    <a target="_blank" title="github" rel="noreferrer">
                        <FontAwesomeIcon icon={faGithub} />
                    </a>
                </Link>
                <span className="mx-2">|</span>
                <Link href="https://t.co/Lmou3Qx5Ap">
                    <a target="_blank" title="discord" rel="noreferrer">
                        <FontAwesomeIcon icon={faDiscord} />
                    </a>
                </Link>
                { props.isSignedUp &&  
                    <>
                    <Link href="/settings">
                        <a target="_blank" title="settings" rel="noreferrer" className="ml-5">
                            <FontAwesomeIcon icon={faCog} />
                        </a>
                    </Link> 
                    <FontAwesomeIcon onClick={setSignUpState} icon={faSignOutAlt} className="cursor-pointer ml-5" />    
                    </>      
                }
            </div>
        </div>
        { !props.isSignedUp && <SignupForm type="signup" />}
    </div>
    )
}