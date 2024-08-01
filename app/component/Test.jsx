"use client"

import React, { useState } from 'react'

function Test() {
const [textValue, setTextValue] = useState("")
const [textData, setTextData] = useState([])

const extractTextLink = (e) => {
e.preventDefault();
const data = textValue.split("\n").map(text => text.trim()).filter(text => text.length > 0);
setTextData(data)
}

console.log(textData)
  return (
    <div>
      <form onSubmit={handleForm} className="">
        <textarea name="" onChange={(e) => setTextValue(e.target.value)} rows="10" cols="50" value={textValue} id="" className="border" ></textarea>
        <button type='submit'>send</button>
      </form>
      {}
      <div className=""></div>
    </div>
  )
}

export default Test;
