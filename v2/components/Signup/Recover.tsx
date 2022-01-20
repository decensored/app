import React from 'react';
import useStore from '../../lib/store';

export default function Recover(props: {type: string; handleClick: React.MouseEventHandler<HTMLSpanElement> | undefined; }) {

    const { isSignedUp, setSignUpState } = useStore((state) => ({
        isSignedUp: state.isSignedUp,
        setSignUpState: state.setSignUpState,
    }));

    return (
        <div className="mt-2 min-h-[42px]">
            <div className="flex gap-3">
                <div className="grow shrink">
                    <input className="form-input p-3 rounded w-full" type="text" placeholder="Paste in your key"></input>
                </div>
                <button onClick={setSignUpState} className="bg-purple-500 hover:bg-purple-700 text-white font-bold px-4 rounded whitespace-nowrap">Recover</button>
            </div>
            <p className="text-center text-white text-sm decoration-white-8 py-3 underline hover:no-underline cursor-pointer">
            <span onClick={props.handleClick}>Sign up with account</span>
            </p>
        </div>
    )
}