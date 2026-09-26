import React, { useState, useCallback, useEffect, useRef } from 'react';

const App = () => {
  const [length, setLength] = useState(6);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passRef = useRef(null)
  
  const passwordGenerator = useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str+="0123456789"
    if(charAllowed) str+="!@#$%^&*()-{}[]~/"

    for(let i=1; i<=length; i++){
      let char = Math.floor(Math.random()*(str.length+1))
      pass += str.charAt(char)
    }
    setPassword(pass)




  }, [length, numAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(()=>{
    passRef.current?.select()
    passRef.current?.setSelectionRange(0,20)
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(()=> {passwordGenerator()}, [length, numAllowed, charAllowed, passwordGenerator])

  return (
    <div>
    <div className='w-ful text-2xl rounded-xl text-orange-400 mx-30 my-10 px-4 py-8 text-center bg-gray-700'>
      <h1 className='text-white text-center my-3'> Password Generator</h1>
      <div className='flex rounded-lg overflow-hidden mb-4 bg-white'>
        <input
        type="text"
        value={password}
        className='outline-none w-full bg-white py-1 px-5 mx-2 rounded-xl'
        placeholder='password'
        readOnly
        ref={passRef}
        />
        <button 
        onClick={copyPasswordToClipboard}
        
        className='outline-none px-3 bg-blue-600 text-white shrink-0'>Copy</button>

      </div>
      <div className='flex text-sm gap-x-7 justify-center-safe'>
        <div className='flex items-center gap-x-1'>
          <input
          type="range"
          min={6}
          max={16}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>{
            console.log(e.target);
            
            setLength(e.target.value)
          }}
          />
        
          <label>Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
          type='checkbox'
          defaultChecked={numAllowed}
          id='numInput'
          onChange={()=>{
            setNumAllowed((prev)=>!prev)
          }}
          />
          <label htmlFor='numInput'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
          type='checkbox'
          defaultChecked={charAllowed}
          id='charInput'
          onChange={()=>{
            setCharAllowed((prev)=>!prev)
          }}
          />
          
          <label htmlFor='charInput'>Character</label>
          </div>
        
      </div>
    </div>
    </div>
  );
}

export default App;
